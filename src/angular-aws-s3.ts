import { dateYMD, xAmzDate } from "./Date";
import { IConfig, DeleteResponse, UploadResponse } from "./types";
import { throwError } from "./ErrorThrower";
import GetUrl from "./Url";
import Policy from "./Policy";
import Signature from "./Signature";

class AWSS3UploadClient {
  private readonly config: IConfig = {} as IConfig
  constructor(config?: IConfig) {
    if (config) {
      this.config = config
    }
  }

  public async uploadFile(file: File, contentType: string, presignedURL?: string, newFileName?: string, acl?: string): Promise<UploadResponse> {

    if (!file) {
      throw new Error(`File cannot be empty`);
    }

    if (!presignedURL) {
      throwError(this.config, file);
    }

    if (presignedURL) {
      try {
        const payload = {
          method: "PUT",
          headers: {
            'Content-Type': contentType
          },
          body: file
        }
        await fetch(presignedURL, payload)

        return Promise.resolve({
          status: 200,
          body: "Upload complete"
        });
      } catch (err) {
        return Promise.resolve({
          status: 400,
          body: "Upload failed"
        });
      }
    } else {
      const fd = new FormData();
      const url: string = GetUrl(this.config);
      const directory: string = `${this.config.dirName ? this.config.dirName + "/" : ""}`;
      const key: string = `${directory}${newFileName}`;
      const location: string = `${url}${key}`
      const aclFinal: string = acl === undefined || acl === "" ? "public-read" : acl

      fd.append("key", key);
      fd.append("acl", aclFinal);
      fd.append("Content-Type", contentType);
      fd.append("x-amz-meta-uuid", "14365123651274");
      fd.append("x-amz-server-side-encryption", "AES256");
      fd.append("X-Amz-Date", xAmzDate);
      fd.append(
        "X-Amz-Credential",
        `${this.config.accessKeyId}/${dateYMD}/${this.config.region}/s3/aws4_request`
      );
      fd.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
      fd.append("x-amz-meta-tag", "");
      fd.append("Policy", Policy.getPolicy(this.config, aclFinal));
      fd.append("X-Amz-Signature", Signature.getSignature(
        this.config,
        dateYMD,
        Policy.getPolicy(this.config, aclFinal))
      );
      fd.append("file", file);

      const data = await fetch(url, { method: "post", body: fd });
      if (!data.ok) return Promise.reject(data);
      return Promise.resolve({
        bucket: this.config.bucketName,
        key: key,
        location: location,
        status: data.status
      });
    }
  }

  public async deleteFile(fileName: string): Promise<DeleteResponse> {
    const region: string = `${this.config.region ? "-" + this.config.region : ""}`;
    const directory: string = `${this.config.dirName ? this.config.dirName + "/" : ""}`;
    const pathFile: string = `${directory}${fileName}`;
    const url: string = `https://${this.config.bucketName}.s3${region}.amazonaws.com/${pathFile}`;

    const deleteResult = await fetch(url, { method: "delete" });
    if (!deleteResult.ok) return Promise.reject(deleteResult);
    return Promise.resolve({
      ok: deleteResult.ok,
      status: deleteResult.status,
      message: "File Deleted",
      fileName: pathFile
    });
  }
}

export default AWSS3UploadClient;

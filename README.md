# angular-aws-s3
Open Source Module to Upload your Media and files into AWS S3 Bucket directly from Front-end.
<br>
AWSS3 - A Javascript Library for AWS S3 File Upload

## This project is a fork of [aws-s3-upload-ash](https://github.com/oismaelash/aws-s3-upload-ash) 

I thank the original authors for their work on this project.

### Changes
* Update cryptojs dependency version to a version without vulnerabilities.

# NPM
https://www.npmjs.com/package/angular-aws-s3

## How to use(youtube)
* How to use with React/Next.js = https://youtu.be/kMsIUTNVlaU
* How to use with Angular(12) = https://youtu.be/LV1U_1G0vYs
* How to use with Vue = https://youtu.be/9x5LGaL2W7E
# How to get

Using NPM

```
npm install angular-aws-s3
```
Using Yarn 

```
yarn add angular-aws-s3
```



# Examples Uploading a file

## React using Next.js
- https://github.com/ismaelash/aws-s3-upload-nextjs

## Angular 12
- https://github.com/ismaelash/aws-s3-upload-angular12

## Vue
- https://github.com/ismaelash/aws-s3-upload-vue

## ***Deleting an existing file into directory in your bucket public***

In this case the file that we want to delete is in the folder 'photos'

```js
import AWSS3UploadClient from 'angular-aws-s3';


const config = {
    bucketName: 'bucketName',
    dirName: 'media',
    region: 'us-east-1',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    s3Url: 'https://bucketName.s3.amazonaws.com/'
}

const S3CustomClient = new AWSS3UploadClient(config);

const newFileNameWithExtesion = 'fileName.extesion';

S3CustomClient
    .deleteFile(newFileNameWithExtesion)
    .then(response => console.log(response))
    .catch(err => console.error(err))

  /**
   * {
   *   Response: {
   *      ok: true,
   *      status: 204,
   *      message: 'File deleted',
   *      fileName: 'media/fileName.extesion';
   *   }
   * }
   */
});
```

## ***Deleting an existing file without directory in your bucket public***

```js
import AWSS3UploadClient from 'angular-aws-s3';


const config = {
    bucketName: 'bucketName',
    region: 'us-east-1',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    s3Url: 'https://bucketName.s3.amazonaws.com/'
}

const S3CustomClient = new AWSS3UploadClient(config);

const newFileNameWithExtesion = 'fileName.extesion';

S3CustomClient
    .deleteFile(newFileNameWithExtesion)
    .then(response => console.log(response))
    .catch(err => console.error(err))

  /**
   * {
   *   Response: {
   *      ok: true,
   *      status: 204,
   *      message: 'File deleted',
   *      fileName: 'fileName.extesion';
   *   }
   * }
   */
});
```

# Important
1. If you bucket is public use only this parameters: file, contentType, newFileNameWithExtesion see the example above
2. If you bucket is private(with Objects can be public) use presignedURL parameter (recommended)

## ***AWS S3 Links***

- S3 Bucket Policies: https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html
- ACL: https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html
- Presigned URL: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html
- Upload Presigned URL: https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html
- Input html: https://www.w3schools.com/tags/tag_input.asp
- S3 Bucket Cors: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html

## License
**MIT**

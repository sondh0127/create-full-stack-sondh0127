/* eslint-disable class-methods-use-this */
import AWS from 'aws-sdk'
import {PassThrough} from 'stream'

import {
  ResolversParentTypes,
  Scalars,
  UploadedFileResult,
} from '../graphql/__generated__'

type S3UploadConfig = {
  accessKeyId: string
  secretAccessKey: string
  destinationBucketName: string
  // region?: string;
}

type S3UploadStream = {
  writeStream: PassThrough
  promise: Promise<AWS.S3.ManagedUpload.SendData>
}

export class AWSS3Uploader {
  private s3: AWS.S3

  public config: S3UploadConfig

  constructor(config: S3UploadConfig) {
    AWS.config = new AWS.Config()
    AWS.config.update({
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4',
      // region: config.region || "ca-central-1",
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    })

    this.s3 = new AWS.S3()
    this.config = config
  }

  public async upload(params: Omit<AWS.S3.Types.PutObjectRequest, 'Bucket'>) {
    return this.s3
      .upload({
        Bucket: this.config.destinationBucketName,
        ...params,
      })
      .promise()
  }

  public createDestinationFilePath(
    fileName: string,
    mimetype: string,
    encoding: string,
  ): string {
    return fileName
  }
}

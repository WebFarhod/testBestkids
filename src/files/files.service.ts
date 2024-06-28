import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as B2 from 'backblaze-b2';
@Injectable()
export class FilesService {
  b2: B2;
  constructor() {
    this.b2 = new B2({
      applicationKeyId: process.env.BACKBLAZE_APPLICATION_KEY_ID,
      applicationKey: process.env.BACKBLAZE_APPLICATION_KEY,
    });
  }
  async create(file: Express.Multer.File) {
    // try {
    await this.b2.authorize();
    const { authorizationToken, uploadUrl } = (
      await this.b2.getUploadUrl({
        bucketId: process.env.BUCKED_ID,
      })
    ).data;
    const { buffer } = file;
    console.log('====================================');
    console.log('buffer', buffer);
    console.log('====================================');
    const response = (
      await this.b2.uploadFile({
        uploadUrl: uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName: `image${+Date.now()}.${file.mimetype.split('/')[1]}`,
        data: buffer,
      })
    ).data;
    // return {
    //   fileId: response.fileId,
    //   url: `${'https://f003.backblazeb2.com/file'}/${process.env.BUCKED_NAME}/${response.fileName}`,
    // };

    return `${'https://f003.backblazeb2.com/file'}/${process.env.BUCKED_NAME}/${response.fileName}`;
    // } catch (error) {
    //   console.log('====================================');
    //   console.log('error', error);
    //   console.log('====================================');
    //   throw new HttpException(
    //     'something went wrong',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  async delete(fileId: string) {
    await this.b2.authorize();
    try {
      const file = (
        await this.b2.getFileInfo({
          fileId: fileId,
        })
      ).data;
      try {
        await this.b2.deleteFileVersion({
          fileId: fileId,
          fileName: file.fileName,
        });
      } catch (error) {
        throw new HttpException(
          'The file could not be deleted, please try again ',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw new HttpException('file not found', HttpStatus.NOT_FOUND);
    }
  }
}

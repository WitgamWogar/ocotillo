import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';

// Allow only images
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const generateFilename = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const storageName = uuidv4();
  callback(null, `${name}${storageName}${fileExtName}`);
};
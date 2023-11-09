import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { FastifyRequest } from 'fastify';
import { db } from '@/db';
import { BadRequestError } from '@/errors';

const fileTypeMap = {
  'audio/mpeg': 'mp3',
};

interface CustomFastifyRequest extends FastifyRequest {
  file: any;
  files: any
}

export class Provider {
  private collection: string;

  constructor(collectionName: string) {
    db.addCollection(collectionName);

    this.collection = collectionName;
  }

  async create(request: CustomFastifyRequest) {
    const body = request.body as any;

    const extension = fileTypeMap[body.file.mimetype];
    const fileName = `${uuid()}.${extension}`;

    fs.writeFileSync(`./public/files/${fileName}`, await body.file.toBuffer());

    const fileData = {
      name: fileName,
      type: body.file.mimetype,
      extension,
    };

    const document = db.collection(this.collection).create(fileData);

    return document;
  }

  async get(request: FastifyRequest) {
    const params = request.params as any;

    if (!params.id) {
      throw new BadRequestError('No id provided');
    }

    return db.collection(this.collection).getById(params.id);
  }
};

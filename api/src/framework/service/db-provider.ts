import { FastifyRequest } from 'fastify';
import { Provider } from '../types';
import { getServiceName } from '@/framework/utilities';
import { db } from '@/db';
import { BadRequestError } from '@/errors';

export class DbProvider implements Provider {
  private collection: string;

  constructor(collectionName: string) {
    db.addCollection(collectionName);
    this.collection = collectionName;
  }

  async find(request: FastifyRequest) {
    return db.collection(this.collection).find();
  }

  async get(request: FastifyRequest) {
    const params = request.params as Record<string, string>;


    if (!params.id) {
      throw new BadRequestError('No id provided');
    }

    return db.collection(this.collection).getById(params.id);
  }

  async create(request: FastifyRequest) {
    return db.collection(this.collection).create(request.body);
  }

  async patch(request: FastifyRequest) {
    const params = request.params as Record<string, string>;

    if (!params.id) {
      throw new BadRequestError('No id provided');
    }

    return db.collection(this.collection).findByIdAndUpdate(params.id, request.body);
  }

  async remove(request: FastifyRequest) {
    const params = request.params as Record<string, string>;

    if (!params.id) {
      throw new BadRequestError('No id provided');
    }

    return db.collection(this.collection).remove(params.id);
  }
}

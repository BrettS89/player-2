import Fastify from 'fastify';
import { get } from './get';
import { set } from './set';
import { registerServices } from './service/register';
import { NotFoundError } from '@/errors';

const fastify = Fastify({
  logger: true,
  bodyLimit: 52428800,
}); 

const app = {
  ...fastify,
  get,
  set,
  registerServices,
  service(name: string) {
    const service = this.get(name);

    if (!service) {
      throw new NotFoundError('No service exists with this name');
    }

    return service;
  },
};

interface ExtraFields {
  get: any;
  set: any;
  service: any;
}

declare module 'fastify' {
  interface FastifyInstance extends ExtraFields {}
}

export const createApp = () => {
  return app;
};

export type App = typeof app;
export * from './types';
export * from './service/db-provider';
export * from './service/service';
export * from './validate';

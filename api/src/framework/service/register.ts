//@ts-nocheck
import { FastifyRequest, FastifyReply } from 'fastify';
import { Service } from './service';
import { App } from '..';

export function registerServices(services: Service[]) {
  services.forEach(service => registerService(this, service));
};

const registerService = (app: App, service: Service) => {
  app.set(service.name, service);

  if (service.provider.find) app.route(find(service));
  if (service.provider.get) app.route(get(service));
  if (service.provider.create) app.route(create(service));
  if (service.provider.patch) app.route(patch(service));
  if (service.provider.update) app.route(update(service));
  if (service.provider.remove) app.route(remove(service));
};

const find = (service: Service) => {
  return {
    method: 'GET',
    url: service.path,
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const res = await service.find(request);

      reply.code(200).send(res);
    },
  };
};

const get = (service: Service) => {
  return {
    method: 'GET',
    url: `${service.path}/:id`,
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const res = await service.get(request);

      reply.code(200).send(res);
    },
  };
};

const create = (service: Service) => {
  return {
    method: 'POST',
    url: service.path,
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const res = await service.create(request);

      reply.code(201).send(res);
    },
  };
};

const patch = (service: Service) => {
  return {
    method: 'PATCH',
    url: `${service.path}/:id`,
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const res = await service.patch(request);

      reply.code(200).send(res);
    },
  };
};

const update = (service: Service) => {
  return {
    method: 'PUT',
    url: `${service.path}/:id`,
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const res = await service.update(request);
      reply.code(200).send(res);
    },
  };
};

const remove = (service: Service) => {
  return {
    method: 'DELETE',
    url: `${service.path}/:id`,
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
      const res = await service.remove(request);
      reply.send(res);
    },
  };
};

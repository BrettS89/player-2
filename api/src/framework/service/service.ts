import { FastifyRequest } from 'fastify';
import { Schemas, Provider, Hooks } from '../types'
import { executeAfterHooks, executeBeforeHooks } from './hooks';

interface Config {
  schemas: Schemas;
  provider: Provider;
  name: string;
  path: string;
  hooks: Hooks;
  model?: any;
}

export class Service {
  readonly schemas: Schemas;
  readonly provider: Provider;
  readonly name: string;
  readonly path: string;
  readonly hooks: Hooks;
  readonly model?: any;

  constructor(config: Config) {
    this.schemas = config.schemas;
    this.provider = config.provider;
    this.name = config.name;
    this.path = config.path;
    this.hooks = config.hooks;
    this.model = config.model;
  }

  async create(request: FastifyRequest) {
    const req = await executeBeforeHooks({
      request,
      method: 'create',
      hooks: this.hooks,
    });

    const data = await this.provider.create!(req);

    const res = await executeAfterHooks({
      method: 'create',
      hooks: this.hooks,
      result: data,
      request,
    });

    return res;
  }

  async find(request: FastifyRequest) {
    const req = await executeBeforeHooks({
      request,
      method: 'find',
      hooks: this.hooks,
    });

    const data = await this.provider.find?.(req);

    const res = await executeAfterHooks({
      method: 'find',
      hooks: this.hooks,
      result: data,
      request,
    });

    return res;
  }

  async get(request: FastifyRequest) {
    const req = await executeBeforeHooks({
      request,
      method: 'get',
      hooks: this.hooks,
    });

    const data = await this.provider.get?.(req);

    const res = await executeAfterHooks({
      method: 'get',
      hooks: this.hooks,
      result: data,
      request,
    });

    return res;
  }

  async patch(request: FastifyRequest) {
    const req = await executeBeforeHooks({
      request,
      method: 'patch',
      hooks: this.hooks,
    });

    const data = await this.provider.patch?.(req);

    const res = await executeAfterHooks({
      method: 'patch',
      hooks: this.hooks,
      result: data,
      request,
    });

    return res;
  }

  async remove(request: FastifyRequest) {
    const req = await executeBeforeHooks({
      request,
      method: 'patch',
      hooks: this.hooks,
    });

    const data = await this.provider.remove?.(req);

    const res = await executeAfterHooks({
      method: 'patch',
      hooks: this.hooks,
      result: data,
      request,
    });

    return res;
  }
}

import _cloneDeep from 'lodash/cloneDeep';
import { Hooks } from '@/framework/types';
import { FastifyRequest } from 'fastify';
import { App } from '..';
import { app } from '@/app';

interface BeforeHooksProps {
  hooks: Hooks;
  method: 'get' | 'find' | 'create' | 'patch' | 'remove';
  request: FastifyRequest;
}

interface AfterHooksProps {
  hooks: Hooks;
  method: 'get' | 'find' | 'create' | 'patch' | 'remove';
  request: FastifyRequest;
  result: any;
}

export type BeforeHook = (ctx: FastifyRequest) => FastifyRequest | Promise<FastifyRequest>;

export type AfterHook = (ctx: { result: any, app: App }) => any;

export const executeBeforeHooks = async (ctx: BeforeHooksProps): Promise<FastifyRequest> => {
  const hooks = ctx.hooks.before?.[ctx.method] ?? [];

  let request = _cloneDeep(ctx.request);

  for (let hook of hooks) {
    request = await hook(request);
  }

  return request;
};

export const executeAfterHooks = async (ctx: AfterHooksProps): Promise<any> => {
  const allHooks = ctx.hooks.after?.all ?? [];
  const methodHooks = ctx.hooks.after?.[ctx.method] ?? [];

  const hooks = [...allHooks, ...methodHooks];

  let result = _cloneDeep(ctx.result);
  for (let hook of hooks) {
    result = await hook({ result, app });
  }

  return result;
};

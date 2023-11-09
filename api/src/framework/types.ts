import { FastifyRequest } from 'fastify';
import { App } from '.';

interface _SchemaObject {
  id?: string;
  $id?: string;
  $schema?: string;
  [x: string]: any;
}

export interface SchemaObject extends _SchemaObject {
  id?: string;
  $id?: string;
  $schema?: string;
  $async?: false;
  [x: string]: any;
}

export interface AsyncSchema extends _SchemaObject {
  $async: true;
}

export type AnySchemaObject = SchemaObject | AsyncSchema;
export type Schema = SchemaObject | boolean;
export type AnySchema = Schema | AsyncSchema;

export interface Schemas {
  attributes?: AnySchema;
  create?: AnySchema;
  update?: AnySchema;
  patch?: AnySchema;
}

export interface Provider {
  find?(request: FastifyRequest): Promise<any>;
  get?(request: FastifyRequest): Promise<any>;
  create?(request: FastifyRequest): Promise<any>;
  patch?(request: FastifyRequest): Promise<any>;
  update?(request: FastifyRequest): Promise<any>;
  remove?(request: FastifyRequest): Promise<any>;
}

export interface Hooks {
  before?: {
    all?: Function[],
    find?: Function[];
    get?: Function[];
    create?: Function[];
    patch?: Function[];
  };
  after?: {
    all?: Function[],
    find?: Function[];
    get?: Function[];
    create?: Function[];
    patch?: Function[];
  };
}

export type Middleware = (app: App) => void;

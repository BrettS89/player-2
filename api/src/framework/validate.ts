import Ajv, { AnySchema } from 'ajv';
import { BeforeHook } from './service/hooks';
import { BadRequestError } from '@/errors';

export type ValidateFn = (schema: AnySchema) => BeforeHook;

export const validate: ValidateFn = (schema) => {
  return (request) => {
    const ajv = new Ajv();

    const valid = ajv.validate(schema, request.body);

    if (!valid) {
      throw new BadRequestError(ajv.errors?.[0].message);
    }

    return request;
  };
};

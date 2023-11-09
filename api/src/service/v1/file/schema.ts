import { Static, Type } from '@sinclair/typebox'
import { Schemas } from '@/framework/types';

export const attributes = Type.Object({
  id: Type.String(),
  name: Type.String(),
  type: Type.String(),
  extension: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

const create = Type.Object({
  name: Type.String(),
  type: Type.String(),
  extension: Type.String(),
});

const patch = Type.Partial(create);

export type FileType = Static<typeof attributes>;

export const schemas: Schemas = {
  create,
  patch,
};

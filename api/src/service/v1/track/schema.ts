import { Static, Type } from '@sinclair/typebox'
import { Schemas } from '@/framework/types';
import { attributes as File } from '@/service/v1/file/schema';

const attributes = Type.Object({
  id: Type.String(),
  fileId: Type.String(),
  title: Type.String(),
  artist: Type.String(),
  file: Type.Optional(File),
  createdAt: Type.String(),
  updatedAt: Type.String(),
});

const create = Type.Object({
  fileId: Type.String(),
  title: Type.String(),
  artist: Type.String(),
}, { additionalProperties: false });

const patch = Type.Partial(create, { additionalProperties: false });

export type TrackType = Static<typeof attributes>;

export const schemas: Schemas = {
  create,
  patch,
};

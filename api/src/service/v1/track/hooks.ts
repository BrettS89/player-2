import { Hooks, App, validate } from '@/framework';
import { TrackType, schemas } from './schema';
import { FileType } from '../file/schema';

const resolveFile = async ({ result, app }: { result: TrackType | TrackType[], app: App }): Promise<TrackType | TrackType[]> => {
  if (Array.isArray(result)) {
    const tracksWithFiles = [];

    for (let track of result) {
      const file = await app.service('v1/file').get({ params: { id: track.fileId } }) as FileType;

      tracksWithFiles.push({
        ...track,
        file,
      });
    }

    return tracksWithFiles;
  } else {
    const file = await app.service('v1/file').get({ params: { id: result.fileId } }) as FileType;

    return {
      ...result,
      file,
    };
  }
};

export const hooks: Hooks = {
  before: {
    create: [
      validate(schemas.create),
    ],
    patch: [
      validate(schemas.patch,),
    ],
  },
  after: {
    all: [
      resolveFile,
    ],
  }
};

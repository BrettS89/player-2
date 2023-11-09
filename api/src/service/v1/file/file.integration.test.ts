import { app } from '@/app';
import fs from 'fs';

describe('Service: v1/file', () => {
  it ('registers a service', () => {
    const service = app.service('v1/file');

    expect(service).toBeTruthy();
  });

  let writeFileSyncSpy;

  describe('CREATE', () => {
    it('creates a file', async () => {
      writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
      writeFileSyncSpy.mockReturnValueOnce('test');

      const file = await app.service('v1/file').create({
        body: {
          file: {
            mimetype: 'audio/mpeg',
            toBuffer() {},
          },
        },
      });
    
      expect(file.extension).toBe('mp3');
    });
  });

  describe('GET', () => {
    it('gets a file', async () => {
      writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
      writeFileSyncSpy.mockReturnValueOnce('test');

      const file = await app.service('v1/file').create({
        body: {
          file: {
            mimetype: 'audio/mpeg',
            toBuffer() {},
          },
        },
      });

      const actual = await app.service('v1/file').get({
        params: {
          id: file.id
        },
      });

      expect(actual).toStrictEqual(file);
    });
  });
});

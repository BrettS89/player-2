import { app } from '@/app';
import fs from 'fs';

describe('Service: v1/track', () => {
  it ('registers a service', () => {
    const service = app.service('v1/track');

    expect(service).toBeTruthy();
  });

  let writeFileSyncSpy;

  describe('CREATE', () => {
    it('creates a track', async () => {
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

      const track = await app.service('v1/track').create({
        body: {
          title: 'test',
          artist: 'artist',
          fileId: file.id,
        },
      });
    
      expect(track.title + track.artist).toBe('testartist');
    });

    it('resolves a file', async () => {
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

      const track = await app.service('v1/track').create({
        body: {
          title: 'test',
          artist: 'artist',
          fileId: file.id,
        },
      });
    
      expect(typeof track.file.name).toBe('string');
    });
  });

  describe('GET', () => {
    it('gets a track', async () => {
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

      const track = await app.service('v1/track').create({
        body: {
          title: 'test',
          artist: 'artist',
          fileId: file.id,
        },
      });

      const actual = await app.service('v1/track').get({
        params: {
          id: track.id,
        },
      });

      expect(actual.title + actual.artist).toBe('testartist');
    });

    it('resolves a file', async () => {
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

      const track = await app.service('v1/track').create({
        body: {
          title: 'test',
          artist: 'artist',
          fileId: file.id,
        },
      });

      const actual = await app.service('v1/track').get({
        params: {
          id: track.id,
        },
      });

      expect(typeof actual.file.name).toBe('string');
    });
  });
});

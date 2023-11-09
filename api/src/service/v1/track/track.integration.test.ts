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

    it('throws when bad request data passed', () => {
      const fn = () => app.service('v1/track').create({
        body: {
          hello: 'world',
        }
      });

      expect(fn).rejects.toThrow("must have required property 'fileId'");
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

  describe('FIND', () => {
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

      await app.service('v1/track').create({
        body: {
          title: 'test',
          artist: 'artist',
          fileId: file.id,
        },
      });

      await app.service('v1/track').create({
        body: {
          title: 'test2',
          artist: 'artist',
          fileId: file.id,
        },
      });

      const actual = await app.service('v1/track').find();

      expect(actual).toHaveLength(2);
    });

    it('resolves a files', async () => {
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

      await app.service('v1/track').create({
        body: {
          title: 'test',
          artist: 'artist',
          fileId: file.id,
        },
      });

      await app.service('v1/track').create({
        body: {
          title: 'test2',
          artist: 'artist',
          fileId: file.id,
        },
      });

      const actual = await app.service('v1/track').find();

      expect(typeof actual[0].file.name).toBe('string');
    });
  });

  describe('PATCH', () => {
    it('patches a track', async () => {
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

      await app.service('v1/track').patch({
        params: {
          id: track.id,
        },
        body: {
          title: 'So what'
        },
      });

      const actual = await app.service('v1/track').get({
        params: {
          id: track.id,
        },
      });

      expect(actual.title).toBe('So what');
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

      await app.service('v1/track').patch({
        params: {
          id: track.id,
        },
        body: {
          title: 'So what'
        },
      });

      const actual = await app.service('v1/track').get({
        params: {
          id: track.id,
        },
      });

      expect(typeof actual.file.name).toBe('string');
    });

    it('throws when bad request data passed', () => {
      const fn = () => app.service('v1/track').patch({
        params: {
          id: 'test',
        },
        body: {
          hello: 'world',
        }
      });

      expect(fn).rejects.toThrow();
    });
  });

  describe('REMOVE', () => {
    it('removes a track', async () => {
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

      await app.service('v1/track').remove({
        params: {
          id: track.id,
        },
      });

      const actual = await app.service('v1/track').find();

      expect(actual).toHaveLength(0);
    });

  });
});

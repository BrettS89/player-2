import { ActionTypes } from '../actions';
import { trackReducer } from './track';
import { Track } from '../../types';

describe('Reducer: player', () => {
  it ('returns state as default action', () => {
    const expected = {
      tracks: [],
      playing: undefined,
    };

    const actual = trackReducer(undefined, { type: ActionTypes.SET_APP_INITIALIZED, payload: undefined });

    expect(actual).toStrictEqual(expected);
  });

  it ('it sets tracks', () => {
    const tracks: Track[] = [
      {
        id: 'test',
        title: 'test',
        artist: 'test',
        fileId: 'test',
        createdAt: 'test',
        updatedAt: 'test',
      }
    ];

    const actual = trackReducer(undefined, { type: ActionTypes.SET_TRACKS, payload: tracks });

    expect(actual.tracks).toStrictEqual(tracks);
  });

  it ('it sets playing', () => {
    const track: Track = {
      id: 'test',
      title: 'test',
      artist: 'test',
      fileId: 'test',
      createdAt: 'test',
      updatedAt: 'test',
    };

    const actual = trackReducer(undefined, { type: ActionTypes.SET_TRACK_PLAYING, payload: track });

    expect(actual).toStrictEqual({ tracks: [], playing: track });
  });
});

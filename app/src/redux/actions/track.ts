import { Track } from '../../types';
import { ActionTypes, Action } from './types';

export const setTracks: Action<Track[]> = (payload) => ({
  type: ActionTypes.SET_TRACKS,
  payload,
});

export const setTrackPlaying: Action<Track> = (payload) => ({
  type: ActionTypes.SET_TRACK_PLAYING,
  payload,
});

export const uploadTrack: Action<{ artist: string; title: string; file: File; callback: Function }> = (payload) => ({
  type: ActionTypes.ON_UPLOAD_TRACK,
  payload,
});

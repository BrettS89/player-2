import { Reducer } from 'redux';
import { ActionTypes } from '../actions';
import { Track } from '../../types';

interface Action {
  type: ActionTypes;
  payload: any;
}

export interface TrackState {
  tracks: any[];
  playing?: Track;
}

const INITIAL_STATE: TrackState = {
  tracks: [],
  playing: undefined,
};

export const trackReducer: Reducer<TrackState, Action> = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case ActionTypes.SET_TRACKS:
      return {
        ...state,
        tracks: payload,
      };
      
    case ActionTypes.SET_TRACK_PLAYING:
      return {
        ...state,
        playing: payload,
      };

    default:
      return state;
  }
};

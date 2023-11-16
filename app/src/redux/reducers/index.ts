import { combineReducers } from 'redux';
import { appReducer, AppState } from './app';
import { trackReducer, TrackState } from './track';

export interface StoreState {
  app: AppState;
  track: TrackState;
}

export const reducers = combineReducers({
  app: appReducer,
  track: trackReducer,
});

import {
  call, put, takeLatest, select
} from 'redux-saga/effects';
import _cloneDeep from 'lodash/cloneDeep';
import { ActionTypes, setAppInitialized } from '../../actions';
import { StoreState, setTracks } from '../../index';
import { findTracks } from '../../../api';
import { Track } from '../../../types';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default [
  appLoadWatcher,
];

function * appLoadWatcher() {
  yield takeLatest(ActionTypes.ON_APP_LOAD, appLoadHandler);
}

interface AppLoad {
  type: ActionTypes.ON_APP_LOAD;
  payload: {
    navigate(str: string): void;
    path?: string;
  }
}

function * appLoadHandler({ payload }: AppLoad): any {
  try {
    yield sleep(750);
    
    const track: Track[] = yield call(findTracks);

    yield put(setTracks(track));

  } catch(e) {
    console.log(e);
  }

  yield put(setAppInitialized(true));
}

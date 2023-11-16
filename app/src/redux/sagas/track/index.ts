import {
  call, put, takeLatest, select
} from 'redux-saga/effects';
import _cloneDeep from 'lodash/cloneDeep';
import { ActionTypes, setAppInitialized } from '../../actions';
import { StoreState, setTracks } from '../../index';
import { Track } from '../../../types';

export default [
  uploadTrackWatcher,
];

function * uploadTrackWatcher() {
  yield takeLatest(ActionTypes.ON_UPLOAD_TRACK, uploadTrackHandler);
}

interface UploadTrack {
  type: ActionTypes.ON_APP_LOAD;
  payload: {
    artist: string;
    title: string;
    file: File;
  }
}

function * uploadTrackHandler({ payload }: UploadTrack): any {
  try {


  } catch(e) {
    console.log(e);
  }
}

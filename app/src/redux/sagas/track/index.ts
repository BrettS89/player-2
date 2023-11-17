import axios from 'axios';
import {
  call, put, takeLatest, select
} from 'redux-saga/effects';
import _cloneDeep from 'lodash/cloneDeep';
import { ActionTypes, setAppInitialized } from '../../actions';
import { StoreState, setTracks, trackSelector } from '../../index';
import { uploadFile, createTrack } from '../../../api';
import { Track } from '../../../types';

const url = process.env.REACT_APP_API_URL;

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
    callback: Function;
  }
}

function * uploadTrackHandler({ payload }: UploadTrack): any {
  try {
    const trackState: StoreState['track'] = yield select(trackSelector);

    const formData = new FormData();

    formData.append('file', payload.file);

    const uploadFn = () => axios({
      url: `${url}/v1/file`,
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });

    const { data } = yield call(uploadFn);

    const createTrackFn = () => createTrack({
      title: payload.title,
      artist: payload.artist,
      fileId: data.id,
    });

    const track = yield call(createTrackFn);

    const updatedTracks = [...trackState.tracks, track];

    yield put(setTracks(updatedTracks));

    payload.callback();

  } catch(e) {
    console.log(e);
  }
}

import { all, fork, takeLatest, put, delay } from 'redux-saga/effects';
import { ADD_FILE_FAILURE, ADD_FILE_REQUEST, ADD_FILE_SUCCESS } from '../reducers/file';
import axios from 'axios';

function addFileAPI() {
  return axios.post('/file', fileData)
}

function* addFile() {
  try {
    // const result = yield call(addFileAPI, action.data);
    yield delay(2000);
    yield put({
      type: ADD_FILE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: ADD_FILE_FAILURE,
      error: e,
    });
  }
}

function* watchAddFile() {
  yield takeLatest(ADD_FILE_REQUEST, addFile);
}

export default function* fileSaga() {
  yield all([
    fork(watchAddFile)
  ]);
}
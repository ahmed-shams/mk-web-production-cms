import { all, call, fork, takeLatest, put, delay } from 'redux-saga/effects';
import {
  ADD_FILE_FAILURE,
  ADD_FILE_REQUEST,
  ADD_FILE_SUCCESS,
  LOAD_ALL_FILE_FAILURE,
  LOAD_ALL_FILE_REQUEST,
  LOAD_ALL_FILE_SUCCESS
} from '../reducers/file';
import axios from 'axios';

function loadFileAPI() {
  return axios.get('/files')
}

function* loadFile() {
  try {
    // const result = yield call(addFileAPI, action.data);
    console.log("All files are being loaded and tree view is getting updated with the files");
    yield put({
      type: LOAD_ALL_FILE_SUCCESS,
      // data: result.data
    });
  } catch (e) {
    yield put({
      type: LOAD_ALL_FILE_FAILURE,
      error: e,
    });
  }
}

function* watchLoadFile() {
  yield takeLatest(LOAD_ALL_FILE_REQUEST, loadFile);
}

function addFileAPI(fileData) {
  console.log("inside addfileapi");
  return axios.post('http://localhost:3001/api/file', fileData);
}

function* addFile(action) {
  console.log("file: ", action.data);
  try {
    const result = yield call(addFileAPI, action.data);
    console.log("backed result: ", result.data);
    yield put({
      type: ADD_FILE_SUCCESS,
      data: result.data
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
    fork(watchAddFile),
    fork(watchLoadFile)
  ]);
}

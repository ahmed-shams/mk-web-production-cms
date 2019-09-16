import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import {
  ADD_FILE_FAILURE,
  ADD_FILE_REQUEST,
  ADD_FILE_SUCCESS,
  LOAD_ALL_FILE_FAILURE,
  LOAD_ALL_FILE_REQUEST,
  LOAD_ALL_FILE_SUCCESS,
  LOAD_FILE_FAILURE,
  LOAD_FILE_REQUEST,
  LOAD_FILE_SUCCESS,
  EDIT_FILE_FAILURE,
  EDIT_FILE_REQUEST,
  EDIT_FILE_SUCCESS,
  REMOVE_FILE_REQUEST,
  REMOVE_FILE_SUCCESS,
  REMOVE_FILE_FAILURE
} from '../reducers/file';
import axios from 'axios';

function loadFileAPI() {
  return axios.get('/file/nav');
}

function* loadFile() {
  try {
    const result = yield call(loadFileAPI);
    yield put({
      type: LOAD_ALL_FILE_SUCCESS,
      data: result.data
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
  return axios.post('/file', fileData, {
    withCredentials: true
  });
}


function* addFile(action) {
  try {
    const result = yield call(addFileAPI, action.data);
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

function editFileAPI(fileData) {
  return axios.put('/file', fileData, {
    withCredentials: true
  });
}


function* editFile(action) {
  console.log("edit file: ", action.data);
  try {
    let data;
    const result = yield call(editFileAPI, action.data);
    data = result.data;
    // folder check and add children
    if (result.data.isFolder) {
      console.log("data hitting here in is Folder after add file");
      data.children = [];
    }
    yield put({
      type: EDIT_FILE_SUCCESS,
      data: data
    });
  } catch (e) {
    yield put({
      type: EDIT_FILE_FAILURE,
      error: e,
    });
  }
}

function* watchEditFile() {
  yield takeLatest(EDIT_FILE_REQUEST, editFile);
}


// Load current file
function loadCurrFileAPI(id) {
  return axios.get(`/file/${id}`);
}

function* loadCurrFile(action) {
  try {
    const result = yield call(loadCurrFileAPI, action.data.fileId);
    yield put({
      type: LOAD_FILE_SUCCESS,
      data: result.data.revisions
    });
  } catch (e) {
    yield put({
      type: LOAD_FILE_FAILURE,
      error: e,
    });
  }
}

function* watchLoadCurrFile() {
  yield takeLatest(LOAD_FILE_REQUEST, loadCurrFile);
}


function removeFileAPI(id) {
  return axios.delete(`/file/${id}`, {
    withCredentials: true,
  });
}

function* removeFile(action) {
  try {
    const parentId = action.data.parentId;
    const result = yield call(removeFileAPI, action.data.fileId);
    yield put({
      type: REMOVE_FILE_SUCCESS,
      data: {
        id: result.data,
        parentId: parentId
      }
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_FILE_FAILURE,
      error: e,
    });
  }
}

function* watchRemoveFile() {
  yield takeLatest(REMOVE_FILE_REQUEST, removeFile);
}

export default function* fileSaga() {
  yield all([
    fork(watchAddFile),
    fork(watchLoadFile),
    fork(watchEditFile),
    fork(watchLoadCurrFile),
    fork(watchRemoveFile)
  ]);
}

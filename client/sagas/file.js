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
} from '../reducers/file';
import axios from 'axios';

function loadFileAPI() {
  return axios.get('http://localhost:3001/api/file/nav');
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
  return axios.post('http://localhost:3001/api/file', fileData, {
    withCredentials: true
  });
}


function* addFile(action) {
  console.log("here add file")
  try {
    let data;
    const result = yield call(addFileAPI, action.data);
    data = result.data;
    console.log("data: ", data);
    // folder check and add children
    if (result.data.isFolder) {
      console.log("data hitting here in is Folder after add file");
      data.children = [];
    }
    yield put({
      type: ADD_FILE_SUCCESS,
      data: data
    });
  } catch (e) {
    yield put({
      type: ADD_FILE_FAILURE,
      error: e,
    });
  }
}

function* watchAddFile() {
  console.log("watch add file");
  yield takeLatest(ADD_FILE_REQUEST, addFile);
}

function editFileAPI(fileData) {
  return axios.put('http://localhost:3001/api/file', fileData, {
    withCredentials: true
  });
}


function* editFile(action) {
  try {
    let data;
    const result = yield call(editFileAPI, action.data);
    console.log("Data back from server: ", result.data);
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
  return axios.get(`http://localhost:3001/api/file/${id}`);
}

function* loadCurrFile(action) {
  console.log("file id: ", action.data.fileId);
  try {
    const result = yield call(loadCurrFileAPI, action.data.fileId);
    console.log("result.data: ", result.data);
    // result.data has both file and revisions
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



export default function* fileSaga() {
  yield all([
    fork(watchAddFile),
    fork(watchLoadFile),
    fork(watchEditFile),
    fork(watchLoadCurrFile)
  ]);
}

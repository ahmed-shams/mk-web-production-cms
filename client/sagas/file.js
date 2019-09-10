import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
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


// function addCommentAPI(data) {
//   return axios.post(`/post/${data.postId}/comment`, { content: data.content }, {
//     withCredentials: true,
//   });
// }

function* addFile(action) {
  try {
    let data;
    const result = yield call(addFileAPI, action.data);
    data = result.data;
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
  yield takeLatest(ADD_FILE_REQUEST, addFile);
}

export default function* fileSaga() {
  yield all([
    fork(watchAddFile),
    fork(watchLoadFile)
  ]);
}

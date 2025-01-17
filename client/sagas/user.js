import { all, call, fork, put, takeEvery, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user';

const dummyUser = {
  id: 1,
  username: 'sehwan'
}

function logInAPI(loginData) {
  console.log("loginData: ", loginData);
  return axios.post('https://h5lletpqa0.execute-api.us-east-1.amazonaws.com/dev/api/user/login', loginData, {
    withCredentials: true,
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      // data: dummyUser
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function signUpAPI(signUpData) {
  console.log("signup data in saga: ", signUpData);
  return axios.post('https://h5lletpqa0.execute-api.us-east-1.amazonaws.com/dev/api/user', signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,

    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function logOutAPI() {
  return axios.post('/user/logout', {}, {
    withCredentials: true,
  });
}

function* logOut() {
  try {
    // yield call(logOutAPI);
    yield delay(2000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp)
  ]);
}

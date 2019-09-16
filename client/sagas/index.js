import { all, call } from 'redux-saga/effects';
import file from './file';
import user from './user';
import { backUrl } from '../config/config';
import axios from 'axios';

axios.defaults.baseURL = `${backUrl}/api`;

export default function* rootSaga() {
  yield all([
    call(file),
    call(user)
  ]);
};

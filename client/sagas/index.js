import { all, call } from 'redux-saga/effects';
import file from './file';
import user from './user';

export default function* rootSaga() {
  yield all([
    call(post),
    call(user)
  ]);
};

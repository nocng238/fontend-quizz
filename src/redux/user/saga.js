import { all, takeEvery } from 'redux-saga/effects';

import types from './types';

export function* getUsersSaga() {}

export function* getUserSaga() {}

export function* createUserSaga() {}

export function* updateUserSaga() {}

export function* deleteUserSaga() {}

export default function* rootSaga() {
  yield all([
    yield takeEvery(types.GET_USERS, getUsersSaga),
    yield takeEvery(types.GET_USERS, getUserSaga),
    yield takeEvery(types.CREATE_USER, createUserSaga),
    yield takeEvery(types.UPDATE_USER, updateUserSaga),
    yield takeEvery(types.DELETE_USER, deleteUserSaga),
  ]);
}

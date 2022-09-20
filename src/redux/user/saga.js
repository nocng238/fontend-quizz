import { all, call, put, takeEvery } from 'redux-saga/effects';

import { getUsersApi, getUserApi } from './api';

import types from './types';

export function* getUsersSaga({ payload: { options } }) {
  try {
    const { data } = yield call(getUsersApi, options);

    yield put({
      type: types.GET_USERS_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    yield put({ type: types.GET_USERS_ERROR });
  }
}

export function* getUserSaga({ payload: { userId } }) {
  try {
    const { data } = yield call(getUserApi, userId);

    yield put({
      type: types.GET_USER_SUCCESS,
      payload: {
        user: data,
      },
    });
  } catch (error) {
    yield put({ type: types.GET_USER_ERROR });
  }
}

export function* createUserSaga() {}

export function* updateUserSaga() {}

export function* deleteUserSaga() {}

export default function* rootSaga() {
  yield all([
    yield takeEvery(types.GET_USERS, getUsersSaga),
    yield takeEvery(types.GET_USER, getUserSaga),
    yield takeEvery(types.CREATE_USER, createUserSaga),
    yield takeEvery(types.UPDATE_USER, updateUserSaga),
    yield takeEvery(types.DELETE_USER, deleteUserSaga),
  ]);
}

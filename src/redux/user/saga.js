import { all, call, put, takeEvery } from 'redux-saga/effects';

import { getUsersApi, createUserApi, getUserApi, updateUserApi } from './api';

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

export function* createUserSaga({ payload: { user } }) {
  try {
    const { data } = yield call(createUserApi, user);

    yield put({
      type: types.CREATE_USER_SUCCESS,
      payload: {
        message: data.message,
      },
    });

    yield put({
      type: types.GET_USERS,
      payload: {
        options: {},
      },
    });
  } catch (error) {
    const { data } = error.response;
    yield put({
      type: types.CREATE_USER_ERROR,
      payload: { message: data.message },
    });
  }
}

export function* updateUserSaga({ payload }) {
  try {
    const { data } = yield call(updateUserApi, payload);

    yield put({
      type: types.UPDATE_USER_SUCCESS,
      payload: {
        message: data.message,
      },
    });

    yield put({
      type: types.GET_USERS,
      payload: {
        options: {},
      },
    });
  } catch (error) {
    const { data } = error.response;
    yield put({
      type: types.UPDATE_USER_ERROR,
      payload: { message: data.message },
    });
  }
}

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

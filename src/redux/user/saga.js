import { all, call, put, takeEvery } from 'redux-saga/effects';

import types from './types';
import {
  getUsersApi,
  createUserApi,
  getUserApi,
  updateUserApi,
  // deleteUserApi,
  // resetPasswordApi,
} from './api';

export function* getUsersSaga({ payload: { options } }) {
  try {
    const { data } = yield call(getUsersApi, options);
    // console.log('DAta from saga : ', data);
    yield put({
      type: types.GET_USERS_SUCCESS,
      // payload: {
      //   data,
      // },
      payload: { data },
    });
  } catch (error) {
    yield put({ type: types.GET_USERS_ERROR });
  }
}

export function* getUserSaga() {
  try {
    const { data } = yield call(getUserApi);
    yield put({
      type: types.GET_USER_SUCCESS,
      // payload: {
      //   user: data,
      // },
      payload: { data },
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
    yield call(updateUserApi, payload);
    yield put({
      type: types.UPDATE_USER_SUCCESS,
      payload: payload.user,
    });
  } catch (error) {
    const { data } = error.response;
    yield put({
      type: types.UPDATE_USER_ERROR,
      payload: { message: data.message },
    });
  }
}

// export function* deleteUserSaga({ payload: { userId } }) {
//   try {
//     const { data } = yield call(deleteUserApi, userId);

//     yield put({
//       type: types.DELETE_USER_SUCCESS,
//       payload: {
//         message: data.message,
//       },
//     });

//     yield put({
//       type: types.GET_USERS,
//       payload: {
//         options: {
//           sort: initState.sort,
//         },
//       },
//     });
//   } catch (error) {
//     const { data } = error.response;
//     yield put({
//       type: types.DELETE_USER_ERROR,
//       payload: { message: data.message },
//     });
//   }
// }

// export function* resetPasswordSaga({ payload: { userId } }) {
//   try {
//     const { data } = yield call(resetPasswordApi, userId);

//     yield put({
//       type: types.RESET_PASSWORD_SUCCESS,
//       payload: {
//         message: data.message,
//       },
//     });

//     yield put({
//       type: types.GET_USERS,
//       payload: {
//         options: {
//           sort: initState.sort,
//         },
//       },
//     });
//   } catch (error) {
//     const { data } = error.response;
//     yield put({
//       type: types.RESET_PASSWORD_ERROR,
//       payload: { message: data.message },
//     });
//   }
// }

export default function* rootSaga() {
  yield all([
    yield takeEvery(types.GET_USERS, getUsersSaga),
    yield takeEvery(types.GET_USER, getUserSaga),
    // yield takeEvery(types.CREATE_USER, createUserSaga),
    yield takeEvery(types.UPDATE_USER, updateUserSaga),
    // yield takeEvery(types.DELETE_USER, deleteUserSaga),
    // yield takeEvery(types.RESET_PASSWORD, resetPasswordSaga),
  ]);
}

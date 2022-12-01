import { all, takeEvery, put, call } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken } from '@iso/lib/helpers/utility';
import types from './types';
import { loginApi, getTokenApi } from './api';

const history = createBrowserHistory();

export function* loginSaga({ payload }) {
  const { creadentials } = payload;
  console.log('creadentials from saga', creadentials);

  try {
    const { data } = yield call(loginApi, creadentials);
    // const ac_token = 'assadfsaaf';

    yield put({
      type: types.LOGIN_SUCCESS,
      payload: {
        idToken: data.ac_token,
        message: data.message,
        user: data.user,
      },
    });
  } catch (error) {
    const { data } = error.response;
    console.log('error in saga', data);
    yield put({
      type: types.LOGIN_ERROR,
      payload: {
        message: data.message,
      },
    });
  }
}

export function* loginSuccess({ payload }) {
  yield localStorage.setItem('id_token', payload.idToken);
  yield localStorage.setItem('avatar', payload.user.avatar);
  yield localStorage.setItem('role', payload.user.role);
  console.log('loggin  success func in saga works');
}

export function* logoutSaga() {
  yield clearToken();
  yield localStorage.removeItem('avatar');
  yield localStorage.removeItem('role');
  history.push('/signin');
}

export function* checkAuthorization() {
  const token = getToken().get('id_token');

  if (token) {
    yield put({
      type: types.LOGIN_SUCCESS,
      payload: {
        token,
      },
    });
  }
}

// export function* forgotPasswordSaga({ payload }) {
//   try {
//     const { data } = yield call(forgotPasswordApi, payload.email);

//     yield put({
//       type: types.FORGOT_PASSWORD_SUCCESS,
//       payload: {
//         message: data.message,
//       },
//     });
//   } catch (error) {
//     const { data } = error.response;
//     yield put({
//       type: types.FORGOT_PASSWORD_ERROR,
//       payload: {
//         message: data.message,
//       },
//     });
//   }
// }

export default function* rootSaga() {
  yield all([
    yield takeEvery(types.LOGIN_REQUEST, loginSaga),
    yield takeEvery(types.LOGIN_SUCCESS, loginSuccess),
    yield takeEvery(types.LOGOUT, logoutSaga),
    yield takeEvery(types.CHECK_AUTHORIZATION, checkAuthorization),
    // yield takeEvery(types.FORGOT_PASSWORD, forgotPasswordSaga),
  ]);
}

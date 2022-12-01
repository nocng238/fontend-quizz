import types from './types';

const initState = {
  idToken: localStorage.getItem('id_token'),
  message: null,
  isSuccess: false,
  user: null,
};

export default function authReducer(state = initState, { type, payload }) {
  switch (type) {
    case types.LOGIN_SUCCESS:
      const { idToken } = payload;
      return {
        ...state,
        idToken: idToken,
        message: payload.message,
        isSuccess: true,
      };
    case types.LOGIN_ERROR:
    case types.LOGOUT:
      return initState;
    default:
      return state;
  }
}

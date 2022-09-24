import types from './types';

const initState = {
  users: [],
  user: {},
  page: 1,
  limit: 10,
  total: 0,
  status: 'all',
  isSuccess: false,
  message: null,
};

export default function userReducer(state = initState, { type, payload }) {
  switch (type) {
    case types.GET_USERS_SUCCESS:
      const { users, status, page, total, limit } = payload.data;

      return {
        ...state,
        users,
        total,
        page,
        limit,
        status,
      };

    case types.GET_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
      };

    case types.GET_USER_ERROR:
      return {
        ...state,
        user: {},
      };

    case types.CREATE_USER_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
    case types.DELETE_USER_SUCCESS:
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: payload.message,
        isSuccess: true,
      };

    case types.CREATE_USER_ERROR:
    case types.UPDATE_USER_ERROR:
    case types.DELETE_USER_ERROR:
    case types.RESET_PASSWORD_ERROR:
      return {
        ...state,
        message: payload.message,
      };

    case types.CLEAR_NOTIFICATION:
      return {
        ...state,
        message: null,
        isSuccess: false,
      };

    case types.DELETE_USER:
      return state;

    default:
      return state;
  }
}

import types from './types';

export const initState = {
  users: [],
  avatar: localStorage.getItem('avatar'),
  user: {},
  page: 1,
  limit: 10,
  sort: '',
  total: 0,
  status: [],
  isSuccess: false,
  message: null,
};

export default function userReducer(state = initState, { type, payload }) {
  switch (type) {
    case types.GET_USERS:
      return {
        ...state,
      };

    case types.GET_USERS_SUCCESS:
      // const response = payload.data;
      // console.log('payload from reducer', payload);
      return {
        ...state,
        users: payload.data.users,
        total: payload.data.total,
        // total: response.total,
        // page: response.page,
      };

    case types.SET_PARAMS_USER_LIST:
      const { page, limit, sort, status } = payload.options;

      return {
        ...state,
        page,
        limit,
        sort,
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
      return {
        ...state,
        user: payload,
      };
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

import types from './types';

const initState = {
  users: [],
  user: {},
  page: 1,
  limit: 10,
  total: 0,
  status: 'all',
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

    case types.CREATE_USER:
      return state;

    case types.UPDATE_USER:
      return state;

    case types.DELETE_USER:
      return state;

    default:
      return state;
  }
}

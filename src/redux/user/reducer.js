import types from './types';

const initState = {
  users: [],
};

export default function userReducer(state = initState, { type, payload }) {
  switch (type) {
    case types.GET_USERS:
      return state;

    case types.GET_USER:
      return state;

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

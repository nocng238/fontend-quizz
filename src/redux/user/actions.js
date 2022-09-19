import types from './types';

export default {
  getUsersAction: (options) => ({
    type: types.GET_USERS,
    payload: { options },
  }),
  getUserAction: (userId) => ({ type: types.GET_USER, payload: { userId } }),
  createUser: (user) => ({ type: types.CREATE_USER, payload: { user } }),
  updateUserAction: (userId) => ({
    type: types.UPDATE_USER,
    payload: { userId },
  }),
  deleteUserAction: (userId) => ({
    type: types.DELETE_USER,
    payload: { userId },
  }),
};

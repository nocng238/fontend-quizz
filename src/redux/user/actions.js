import types from './types';

export default {
  getUsersAction: (options) => ({
    type: types.GET_USERS,
    payload: { options },
  }),
  setParamsUserListAction: (options) => ({
    type: types.SET_PARAMS_USER_LIST,
    payload: { options },
  }),
  getUserAction: (userId) => ({ type: types.GET_USER, payload: { userId } }),
  createUserAction: (user) => ({ type: types.CREATE_USER, payload: { user } }),
  updateUserAction: (userId, user) => ({
    type: types.UPDATE_USER,
    payload: {
      userId,
      user,
    },
  }),
  deleteUserAction: (userId) => ({
    type: types.DELETE_USER,
    payload: { userId },
  }),
  resetPasswordAction: (userId) => ({
    type: types.RESET_PASSWORD,
    payload: { userId },
  }),
  clearNotificationAction: () => ({ type: types.CLEAR_NOTIFICATION }),
};

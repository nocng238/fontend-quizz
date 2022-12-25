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
  getUserAction: () => ({ type: types.GET_USER }),
  createUserAction: (user) => ({ type: types.CREATE_USER, payload: { user } }),
  updateUserAction: (user) => ({
    type: types.UPDATE_USER,
    payload: {
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

const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  GET_INFO: 'GET_INFO',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (creadentials) => ({
    type: actions.LOGIN_REQUEST,
    payload: { creadentials },
  }),
  logout: () => ({
    type: actions.LOGOUT,
  }),
  getInfo: () => ({
    type: actions.GET_INFO,
  }),
};
export default actions;

import { all } from 'redux-saga/effects';

import authSagas from '@iso/redux/auth/saga';
import contactSagas from '@iso/redux/contacts/saga';
import invoicesSagas from '@iso/redux/invoice/saga';

import profileSaga from '@iso/redux/profile/saga';

export default function* rootSaga() {
  yield all([authSagas(), contactSagas(), invoicesSagas(), profileSaga()]);
}

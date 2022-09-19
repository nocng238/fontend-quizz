import { combineReducers } from 'redux';

import App from '@iso/redux/app/reducer';
import Auth from '@iso/redux/auth/reducer';
import Contacts from '@iso/redux/contacts/reducer';
import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';
import Invoices from '@iso/redux/invoice/reducer';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';
import Profile from '@iso/redux/profile/reducer';
import User from '@iso/redux/user/reducer';

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Contacts,
  Invoices,
  Profile,
  User,
});

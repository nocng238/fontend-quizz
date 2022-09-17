import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import Boot from './redux/boot';
import Routes from './router';
import AppProvider from './AppProvider';

const App = () => (
  <Provider store={store}>
    <AppProvider>
      <Routes />
    </AppProvider>
  </Provider>
);
Boot()
  .then(() => App())
  .catch((error) => console.error(error));

export default App;

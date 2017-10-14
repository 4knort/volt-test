import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';

import 'styles';

import store from './store';
import AppRouter from './router';

const rootElement = document.getElementById('app-root');

render(
  <Provider store={store}>
    <AppRouter history={hashHistory} />
  </Provider>,
  rootElement
);
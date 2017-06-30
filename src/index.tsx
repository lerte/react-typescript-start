// declare var module: any;
// declare var require: any;
// declare module "react-hot-loader";
import * as React from 'react';
import { render } from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { App } from './components/App';

import './global-styles';

const root = document.getElementById('app');

const renderApp = () => (
  <AppContainer>
    <App />
  </AppContainer>
);

render(renderApp(), root);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    require('./components/App');
    render(renderApp(), root);
  });
}

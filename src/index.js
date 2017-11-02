/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(<App />, document.getElementById('app'));

// check if HMR (Hot Module Replacement) is enabled
if (module.hot) {
  // accept update of dependency
  module.hot.accept();
}

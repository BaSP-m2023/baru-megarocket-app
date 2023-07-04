import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes/index';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './Redux/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

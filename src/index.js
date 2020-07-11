import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './redux/reducers';
import './index.scss';

const StoreInstance = createStore(
  reducers,
  compose(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={StoreInstance}>
      <App />
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory} from 'react-router';
import io from 'socket.io-client';

import reducer from './reducer/reducer';
import App from './App';
import Voting from './components/Voting';
import Results from './components/Results';

const store = createStore(reducer);

const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('state', state =>
  store.dispatch({type: 'SET_STATE', state})
);

const routes = <Route component={App}>
  <Route path="/" component={Voting} />
  <Route path="/results" component={Results} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);

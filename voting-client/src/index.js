import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import reducer from './reducer/reducer';
import {Router, Route, hashHistory} from 'react-router';

import App from './App';
import Voting from './components/Voting';
import Results from './components/Results';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  payload:{
    state: {
      vote: {
        pair: ['Sunshine', '28 Days Later'],
        tally: {Sunshine: 2}
      }
    }
  }
});

const routes = <Route component={App}>
  <Route path="/" component={Voting} />
  <Route path="/results" component={Results} />
</Route>;

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('root')
);

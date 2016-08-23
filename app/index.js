import makeStore from './store';
import startServer from './server';

export const store = makeStore();
startServer();

store.dispatch({
  type: 'SET_ENTRIES',
  payload: {
    entries: require('./entries.json')
  }
});
store.dispatch({type: 'NEXT'});

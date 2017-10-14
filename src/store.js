import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'modules';

const store = createStore(rootReducer, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension && process.env.NODE_ENV === 'development'
    ? window.devToolsExtension()
    : f => f
));

export default store;
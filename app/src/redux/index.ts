import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducers, StoreState } from './reducers';
import { sagas } from './sagas';

export * from './reducers';
export * from './actions';

const sagaMiddleware = createSagaMiddleware();

const store = () => {
  const middlewares = [
    sagaMiddleware,
  ];

  const store = createStore(
    reducers,
    compose(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(sagas);

  return store;
};

export default store;

// SELECTORS
export const appSelector = (state: StoreState) => state.app;
export const trackSelector = (state: StoreState) => state.track;

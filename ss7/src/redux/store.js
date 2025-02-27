import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from './reducer';
import userSaga from '../saga/userSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(userReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(userSaga);

export default store;

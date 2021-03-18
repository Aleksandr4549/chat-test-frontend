import { Action, createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import authReducer from './reducers/auth-reducer';
import initializeReducer from './reducers/initialize-reducer';
import chatReducer from './reducers/chat-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  initializeApp: initializeReducer,
  chat: chatReducer,
});

export type RootReducerType = typeof rootReducer;

export type StateType = ReturnType<RootReducerType>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export type ThunkType = ThunkAction<void, StateType, unknown, Action<string>>

export default store;
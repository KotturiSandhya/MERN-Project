import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './login/reducer';
import userReducer from './home/todo/reducer';
import {combineReducers } from 'redux';
import errorReducer from './errorReducer';
const initialState = {};

const rootReducer = combineReducers({
    login: loginReducer,
    userList: userReducer,
    errors: errorReducer
})


const store = createStore(
    rootReducer, 
    initialState, 
    compose(applyMiddleware(thunk), 
            window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
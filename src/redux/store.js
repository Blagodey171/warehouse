import { createStore, combineReducers, applyMiddleware } from 'redux';
import appReducer from './appReducer';
import headerReducer from './headerReducer';
import loginReducer from './loginReducer';
import thunk from 'redux-thunk';

let reducers = combineReducers({
    appReducer,
    headerReducer,
    loginReducer,
})

let store = createStore(reducers, applyMiddleware(thunk))

export default store;
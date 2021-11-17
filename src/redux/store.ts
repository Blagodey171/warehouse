import { createStore, combineReducers, applyMiddleware} from 'redux';
import appReducer from './appReducer';
import headerReducer from './headerReducer/headerReducer';
import loginReducer from './loginReducer';
import thunk from 'redux-thunk';

let reducers = combineReducers({
    appReducer,
    headerReducer,
    loginReducer,
})

let store = createStore(reducers, applyMiddleware(thunk))
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
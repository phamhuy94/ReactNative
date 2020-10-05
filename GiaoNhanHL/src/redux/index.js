import {combineReducers} from 'redux'
import todos from './todos/reducer'
import user from './user/reducer'
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    todos,user
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store


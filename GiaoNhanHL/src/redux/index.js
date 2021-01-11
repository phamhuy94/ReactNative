import {combineReducers} from 'redux'
import user from './user/reducer'
import authentication from './authentication/reducer'
import giaoNhan from './GiaoNhan/reducer'
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user,authentication,giaoNhan
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store


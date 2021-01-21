import {combineReducers, createStore, applyMiddleware} from 'redux'
import user from './user/reducer'
import authentication from './authentication/reducer'
import giaoNhan from './GiaoNhan/reducer'
import nghiPhep from './nghiPhep/reducer';
import xacNhan from './xacNhan/reducer';
import DNTT from './DNTT/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user, authentication, giaoNhan, nghiPhep, xacNhan, DNTT
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store


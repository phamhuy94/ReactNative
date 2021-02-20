import {combineReducers, createStore, applyMiddleware} from 'redux'
import user from './user/reducer'
import authentication from './authentication/reducer'
import giaoNhan from './GiaoNhan/reducer'
import nghiPhep from './nghiPhep/reducer';
import xacNhan from './xacNhan/reducer';
import DNTT from './DNTT/reducer';
import quangDuong from './quangDuong/reducer'; 
import thunk from 'redux-thunk';
import tamUng from './tamUng/reducer';

const rootReducer = combineReducers({
    user, authentication, giaoNhan, nghiPhep, xacNhan, DNTT, quangDuong, tamUng
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store


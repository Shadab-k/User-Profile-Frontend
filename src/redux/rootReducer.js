import { combineReducers } from "redux";
import AuthSlice from './auth/reducer';

const RootReducer=combineReducers({
    AuthSlice,
})

export default RootReducer;
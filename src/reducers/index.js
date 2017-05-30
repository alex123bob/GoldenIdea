import { combineReducers } from 'redux';
import sidebarReducer from './sidebar-reducer';

const allReducers = combineReducers({
    sidebar: sidebarReducer,
});

export default allReducers;

import { combineReducers } from 'redux';
import siderReducer from '../containers/sider/reducer';
import activeMenuItemReducer from '../containers/sider/activemenuitem-reducer';

const allReducers = combineReducers({
  siderReducer: siderReducer,
  activeMenuItemReducer: activeMenuItemReducer
});

export default allReducers;

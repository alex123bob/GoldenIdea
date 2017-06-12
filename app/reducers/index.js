import { combineReducers } from 'redux';
import siderReducer from '../containers/sider/reducer';
import activeMenuItemReducer from '../containers/sider/activemenuitem-reducer';
import activeIdeaReducer from './activeidea-reducer';

const allReducers = combineReducers({
  siderReducer: siderReducer,
  activeMenuItemReducer: activeMenuItemReducer,
  activeIdeaReducer: activeIdeaReducer
});

export default allReducers;

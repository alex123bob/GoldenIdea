import { combineReducers } from 'redux';
import contentTitleReducer from 'containers/contentct/contenttitle-reducer';

const allReducers = combineReducers({
    contentTitle: contentTitleReducer,
});

export default allReducers;

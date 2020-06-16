import { combineReducers } from 'redux';
import info from './info';
import tags from './tags';
import repositories from './repositories';

export default combineReducers({
    info,
    tags,
    repositories,
});

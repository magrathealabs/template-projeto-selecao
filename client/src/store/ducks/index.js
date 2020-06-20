import { combineReducers } from 'redux';
import auth from './auth';
import info from './info';
import tags from './tags';
import repositories from './repositories';

export default combineReducers({
    auth,
    info,
    tags,
    repositories,
});

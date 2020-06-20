import { createStore } from 'redux';

import { loadState, saveState } from './localStorage';

import reducers from './ducks/';

const persistedState = loadState();
const store = createStore(reducers, persistedState);

store.subscribe(() => {
    saveState({
        auth: store.getState().auth,
        info: store.getState().info,
        tags: store.getState().tags,
        repositories: store.getState().repositories,
    });
});

export default store;

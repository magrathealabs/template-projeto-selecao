import store from '../store/';

export const isAuthenticated = () => {
    const state = store.getState();
    return state.auth.token !== undefined;
};
export const getToken = () => {
    const state = store.getState();
    return state.auth.token;
};

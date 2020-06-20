import store from '../store/';

export const TOKEN_KEY = '@magrathea-token';

export const isAuthenticated = () => {
    const state = store.getState();
    return state.auth.token !== undefined;
};
export const getToken = () => {
    const state = store.getState();
    return state.auth.token;
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

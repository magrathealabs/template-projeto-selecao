// Actions
export const Types = {
    SET_TOKEN: 'auth/SET_TOKEN',
};

//  Reducer
export default function reducer(state = {}, action = {}) {
    switch (action.type) {
        case Types.SET_TOKEN:
            console.log('Save token: ', action);
            return Object.assign({}, state, { token: action.token });
        default:
            return state;
    }
}

// Action Creators
export const Creators = {
    setToken: (token) => ({
        type: Types.SET_TOKEN,
        token: token,
    }),
};

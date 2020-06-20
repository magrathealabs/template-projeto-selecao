// Actions
export const Types = {
    SET: 'info/SET',
    SET_TOKEN: 'info/SET_TOKEN',
};

//  Reducer
export default function reducer(state = {}, action = {}) {
    switch (action.type) {
        case Types.SET:
            return Object.assign({}, state, action.info);

        case Types.SET_TOKEN:
            return Object.assign({}, state, { auth_token: action.token });
        default:
            return state;
    }
}

// Action Creators
export const Creators = {
    setInfo: (info) => ({
        type: Types.SET,
        info: info,
    }),
    setToken: (token) => ({
        type: Types.SET_TOKEN,
        token: token,
    }),
};

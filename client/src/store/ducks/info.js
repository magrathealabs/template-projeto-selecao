// Actions
export const Types = {
    SET: 'info/SET',
};

//  Reducer
export default function reducer(state = {}, action = {}) {
    switch (action.type) {
        case Types.SET:
            return Object.assign({}, state, action.info);

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
};

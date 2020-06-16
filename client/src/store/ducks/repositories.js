// Actions
export const Types = {
    SET: 'repositories/SET',
};

const INITIAL_STATE = {
    list: [],
};

//  Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case Types.SET:
            return Object.assign({}, state, { list: action.repositories });
        default:
            return state;
    }
}

// Action Creators
export const Creators = {
    setInfo: (repositories) => ({
        type: Types.SET,
        repositories: repositories,
    }),
};

// Actions
export const Types = {
    SET: 'tag/SET',
};

const INITIAL_STATE = {
    list: [],
};

//  Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case Types.SET:
            return Object.assign({}, state, { list: [...state.list, ...action.tags] });
        default:
            return state;
    }
}

// Action Creators
export const Creators = {
    setTags: (tags) => ({
        type: Types.SET,
        tags: tags,
    }),
};

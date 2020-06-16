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
        default:
            return state;
    }
}

// Action Creators
export const Creators = {
    setInfo: (tags) => ({
        type: Types.SET,
        tags: tags,
    }),
};

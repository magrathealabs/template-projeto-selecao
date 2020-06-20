// Actions
export const Types = {
    SET: 'tag/SET',
    SET_REPO_TAGS: 'tag/SET_REPO_TAGS',
};

const INITIAL_STATE = {
    list: [],
    repoTags: {},
};

//  Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case Types.SET:
            let unique = [...new Set([...state.list, ...action.tags])];
            return Object.assign({}, state, { list: unique });
        case Types.SET_REPO_TAGS:
            const repo = {};
            repo[action.id] = action.tags;
            console.log(repo);
            return Object.assign({}, state, repo);

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
    setRepoTags: (repoId, tags) => ({
        type: Types.SET_REPO_TAGS,
        id: repoId,
        tags: tags,
    }),
};

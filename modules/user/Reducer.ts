import Types from './Types';
const INITIAL_STATE = {
    data: {},
    profile: {},
    isLoading: false,
    dataLoading: false,
    isUserLoading: false
};

export default function users(state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case Types.GET_USER_SUCCESS: {
            return {
                ...state,
                data: payload
            };
        }
        case Types.GET_PROFILE_SUCCESS: {
            return {
                ...state,
                profile: payload
            };
        }

        case Types.ADD_LOADING_USER: {
            return {
                ...state,
                isLoading: payload
            };
        }
        case Types.ADD_LOADING_USER_DATA: {
            return {
                ...state,
                dataLoading: payload
            };
        }

        case Types.ADD_USER_LOADING_AUTH: {
            return {
                ...state,
                isUserLoading: payload
            };
        }

        default: {
            return state;
        }
    }
}

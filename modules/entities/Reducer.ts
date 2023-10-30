import Types from "./Types";

const INITIAL_STATE = {
  entities: [],
  numberOfEntities: 0,
  isLoading: false,
  singleEntity: {},
};

export default function stockitem(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case Types.SEARCH_ENTITY_SUCCESS: {
      return {
        ...state,
        entities: payload.content,
        numberOfEntities: payload.count,
      };
    }
    case Types.SEARCH_USER_ENTITY_SUCCESS: {
      return {
        ...state,
        entities: payload.content,
        numberOfEntities: payload.count,
      };
    }
    case Types.CREATE_ENTITY_SUCCESS: {
      return {
        ...state,
        entities: [action.payload, ...state.entities],
      };
    }
    case Types.GET_ENTITY_SUCCESS: {
      return {
        ...state,
        singleEntity: payload,
      };
    }
    case Types.ENTITY_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    default: {
      return state;
    }
  }
}

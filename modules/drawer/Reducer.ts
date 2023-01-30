import Types from "./Types";

const INITIAL_STATE = {
  drawerActionControl: {
    isOpen: false,
    type: "",
    component: "",
  },
};

export default function cashDrawer(
  state = INITIAL_STATE,
  action: { type: any; payload: any }
) {
  const { type, payload } = action;
  switch (type) {
    case Types.DRAWER: {
      return {
        ...state,
        drawerActionControl: payload,
      };
    }
    default: {
      return state;
    }
  }
}

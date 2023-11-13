import Types from "./Types";

export const drawerActionToggle = (
  isOpen: boolean,
  type: string,
  component: string,
  defaultValue: {}
) => ({
  type: Types.DRAWER,
  payload: { isOpen, type, component, defaultValue },
});

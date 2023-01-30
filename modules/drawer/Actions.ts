import Types from "./Types";

export const drawerActionToggle = (
  isOpen: boolean,
  type: string,
  component: string
) => ({
  type: Types.DRAWER,
  payload: { isOpen, type, component },
});

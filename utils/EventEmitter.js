import { dispatcher } from "react-dispatch";
const emitter = {
  dispatch: dispatcher.dispatch,
  subscribe: dispatcher.on,
  off: dispatcher.off,
};
export default emitter;

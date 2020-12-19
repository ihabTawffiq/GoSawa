import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import config from "./config";
import { createStore, applyMiddleware, compose } from "redux";
import rootreducer from "./reducers/rootReducer";

function saveToLocalStorage(state) {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem("state", serializeState);
  } catch (e) {
    console.log(e);
  }
}

function loadFormLocalStorage() {
  try {
    const serializeState = localStorage.getItem("state");
    if (serializeState === null) return undefined;
    return JSON.parse(serializeState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
const persistedState = loadFormLocalStorage();
const store = createStore(
  rootreducer,
  persistedState,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(config, {
      attachAuthIsReady: true,
    }),
    reduxFirestore(config)
  )
);
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;

import { combineReducers } from "redux";
import authreducer from "./authReducer";

// import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootreducer = combineReducers({
  // firestore: firestoreReducer,
  auth: authreducer,

  firebase: firebaseReducer,
});

export default rootreducer;

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./server/store";
import Login from "./Components/Login/login";
import AddAdmin from "./Forms/Add/AddAdmin/addAdmin"
import AddRoute from "./Forms/Add/AddRoute/addRoute"
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      {/* <App />*/}
      {/*<Login />*/}
      {/*<AddAdmin />*/}
      <AddRoute />
    </Provider>,
    document.getElementById("root")
  );
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
});

import config from "../config";
const firebase2 = config.auth();

export const SignIn = (cred) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .signInWithEmailAndPassword(cred.email, cred.password)
      .then(() => {
        firebase2.onAuthStateChanged((user) => {
          if (user) {
            user.getIdTokenResult().then((token) => {
              // console.log(token.claims);
              const owner = token.claims.owner;
              const admin = token.claims.admin;

              firestore
                .collection("admins")
                .doc(user.uid)
                .get()
                .then((snap) => {
                  dispatch({
                    type: "LOGIN_SUCCESS",
                    owner: owner,
                    admin: admin,
                    profile: snap.data(),
                  });
                });
            });
          }
        });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};
/////////////////////////////////////////////////
export const signOut = (uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "LOGOUT_SUCCESS" });
        return window.location.assign("/");
      })
      .catch((err) => {
        dispatch({ type: "LOGOUT_ERROR", err });
      });
  };
};

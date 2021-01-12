import swal from "sweetalert";

const initstate = {
  profile: {},
};

const authreducer = (state = initstate, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      swal(action.err.message);
      return {
        ...state,
        successM: null,
        falederror: null,
      };

    case "LOGIN_SUCCESS":
      swal({
        title: "ًWelcome",
        icon: "success",
        button: false,
      });
      setTimeout(() => {
        window.location.assign(
          "/"
        ); /* will be updated to Profile for user,assistant,amrElsafiy */
      }, 2000);
      return {
        ...state,

        owner: action.owner,
        admin: action.admin,
        profile: action.profile,
      };
    case "UPDATE_SUCCESS":
      swal("Success Change Password the new one is : " + action.password);
      return {
        ...state,
        successM: null,
        falederror: null,
      };

    case "LOGOUT_SUCCESS":
      setTimeout(() => {
        window.location.assign(
          "/"
        ); /* will be updated to Profile for user,assistant,amrElsafiy */
      }, 1000);
      return {};
    case "UPDATE_PASSWORD_FAILED":
      swal(action.error.message);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authreducer;

const SET_SESSION = "users/set-session";
const DROP_SESSION = "users/drop-session";

export const setUserSession = (userDetails) => {
  return {
    type: SET_SESSION,
    user: userDetails,
  };
};

export const dropUserSession = () => {
  return {
    type: DROP_SESSION,
  };
};

export const authenticate = () =>
  async function (dispatch) {
    const res = await fetch("/api/users/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await res.json();
    if (!user.errors) {
      dispatch(setUserSession(user));
    } else {
      dispatch(setUserSession(null));
    }
    return user;
  };

export const login = (email, password) =>
  async function (dispatch) {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const user = await res.json();
    if (!user.errors) {
      dispatch(setUserSession(user));
    } else {
      dispatch(setUserSession(null));
    }
    return user;
  };

export const logout = () =>
  async function (dispatch) {
    const res = await fetch("/api/users/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await res.json();
    return dispatch(dropUserSession());
  };

export const signUp = (username, email, role, password) =>
  async function (dispatch) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        role,
        password,
      }),
    });
    const user = await response.json();
    if (!user.errors) {
      dispatch(setUserSession(user));
    } else {
      dispatch(setUserSession(null));
    }
    return user;
  };

const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, user: action.user };
    case DROP_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;

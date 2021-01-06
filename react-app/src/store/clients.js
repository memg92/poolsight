const GET_ALL_CLIENTS = "clients/get-all-clients";
const GET_CLIENT = "clients/get-client";
const ADD_CLIENT = "clients/add-client";
const DELETE_CLIENT = "clients/delete-client";

export const getAllClients = (clientsDetail) => {
  return {
    type: GET_ALL_CLIENTS,
    clients: clientsDetail,
  };
};

export const getClient = (clientData) => {
  return {
    type: GET_ALL_CLIENTS,
    clients: clientData,
  };
};

export const deleteClient = () => {
  return {
    type: DELETE_CLIENT,
  };
};

export const getClients = (userId) =>
  async function (dispatch) {
    const res = await fetch(`/api/clients/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const clients = await res.json();
    if (!clients.error) {
      dispatch(getAllClients(clients));
    } else {
      dispatch(getAllClients(null));
    }
    console.log(clients);
    return clients;
  };

// export const login = (email, password) =>
//   async function (dispatch) {
//     const res = await fetch("/api/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });

// export const logout = () =>
//   async function (dispatch) {
//     const res = await fetch("/api/users/logout", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     await res.json();
//     return dispatch(dropUserSession());
//   };

// export const signUp = (username, email, role, password) =>
//   async function (dispatch) {
//     const response = await fetch("/api/users/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         email,
//         role,
//         password,
//       }),
//     });
//     const user = await response.json();
//     if (!user.errors) {
//       dispatch(setUserSession(user));
//     } else {
//       dispatch(setUserSession(null));
//     }
//     return user;
//   };

const clientsReducer = (state = { clients: null }, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return { ...state, clients: action.clients };
    case DELETE_CLIENT:
      return { ...state, clients: null };
    default:
      return state;
  }
};

export default clientsReducer;

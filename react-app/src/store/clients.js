const GET_ALL_CLIENTS = "clients/get-all-clients";
// const GET_CLIENT = "clients/get-client";
// const ADD_CLIENT = "clients/add-client";

export const getAllClients = (clientsDetail) => {
  return {
    type: GET_ALL_CLIENTS,
    clients: clientsDetail,
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
    return clients;
  };

export const getClient = (clientId) =>
  async function (dispatch) {
    const res = await fetch(`/api/clients/${clientId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const client = await res.json();
    return client;
  };

export const addClient = (clientDetails) =>
  async function (dispatch) {
    const [
      firstname,
      lastname,
      street,
      city,
      state,
      phone,
      email,
    ] = clientDetails;
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        street,
        city,
        state,
        phone,
        email,
      }),
    });
    const client = await response.json();
    return client;
  };

export const editClient = (...clientDetails) =>
  async function (dispatch) {
    const [
      clientId,
      firstname,
      lastname,
      street,
      city,
      state,
      phone,
      email,
    ] = clientDetails;
    const response = await fetch(`/api/clients/${clientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        street,
        city,
        state,
        phone,
        email,
      }),
    });
    const client = await response.json();
    return client;
  };

export const deleteClient = (clientId) =>
  async function (dispatch) {
    console.log(clientId);
    const res = await fetch(`/api/clients/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const client = await res.json();
    return client;
  };

const clientsReducer = (state = { clients: null }, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return { ...state, clients: action.clients };
    default:
      return state;
  }
};

export default clientsReducer;

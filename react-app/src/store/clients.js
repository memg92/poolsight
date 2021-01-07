const GET_ALL_CLIENTS = "clients/get-all-clients";
const GET_CLIENT = "clients/get-client";
const ADD_CLIENT = "clients/add-client";

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

export const addClient = (clientDetails) =>
  async function (dispatch) {
    const [
      firstName,
      lastName,
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
        firstName,
        lastName,
        street,
        city,
        state,
        phone,
        email,
      }),
    });
    const client = await response.json();
    if (!client.errors) {
      dispatch(getAllClients(client));
    }
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

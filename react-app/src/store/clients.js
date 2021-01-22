const GET_ALL_CLIENTS = "clients/get-all-clients";
const ADD_CLIENT = "clients/add-client";
const EDIT_CLIENT = "clients/edit-client";
const RESET_CLIENT = "clients/reset-client";

export const getAllClients = (clientsDetail) => {
  return {
    type: GET_ALL_CLIENTS,
    clients: clientsDetail,
  };
};
export const addCurrentClient = (clientDetail) => {
  return {
    type: ADD_CLIENT,
    client: clientDetail,
  };
};
export const editCurrentClient = (clientDetail) => {
  return {
    type: EDIT_CLIENT,
    client: clientDetail,
  };
};
export const resetClients = () => {
  return {
    type: RESET_CLIENT,
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
    if (!client.error) {
      dispatch(addCurrentClient(client.client));
    }
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
    if (!client.errors) {
      dispatch(addCurrentClient(client));
    }
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
    if (!client.error) {
      dispatch(editCurrentClient(client));
    }
    return client;
  };

export const deleteClient = (clientId) =>
  async function (dispatch) {
    const res = await fetch(`/api/clients/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const client = await res.json();
    return client;
  };

const clientsReducer = (state = { clients: null, client: null }, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return { ...state, clients: action.clients };
    case ADD_CLIENT:
      return { ...state, client: action.client };
    case EDIT_CLIENT:
      return { ...state, client: action.client };
    case RESET_CLIENT:
      return { clients: null, client: null };
    default:
      return state;
  }
};

export default clientsReducer;

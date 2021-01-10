import { addCurrentClient } from "./clients";

const GET_ALL_POOLS = "pools/get-all-pools";
const ADD_CLIENT_POOLS = "pools/add-client-pools";
const ADD_POOL = "pools/add-pool";

export const getAllPools = (poolsDetail) => {
  return {
    type: GET_ALL_POOLS,
    pools: poolsDetail,
  };
};

export const addClientPools = (poolData) => {
  return {
    type: ADD_CLIENT_POOLS,
    clientPools: poolData,
  };
};

export const getPools = () =>
  async function (dispatch) {
    const res = await fetch(`/api/pools/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const pools = await res.json();
    if (!pools.error) {
      dispatch(getAllPools(pools));
    } else {
      dispatch(getAllPools(null));
    }
    return pools;
  };

export const getClientPools = (clientId) =>
  async function (dispatch) {
    const res = await fetch(`/api/pools/${clientId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const pools = await res.json();

    if (!pools.error) {
      dispatch(addClientPools(pools));
      dispatch(addCurrentClient(pools.pools[0].client));
    }
    return pools;
  };

export const createClientPool = (poolDetails) =>
  async function (dispatch) {
    const [
      clientId,
      street,
      city,
      state,
      poolSize,
      propertyType,
      monthlyRate,
      serviceDay,
      filterChanged,
    ] = poolDetails;

    const response = await fetch("/api/pools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        street,
        city,
        state,
        poolSize,
        propertyType,
        monthlyRate,
        serviceDay,
        filterChanged,
      }),
    });
    const pool = await response.json();
    if (!pool.errors) {
      dispatch(addClientPools(pool));
      dispatch(addCurrentClient(pool.client));
    }
    return pool;
  };

const poolsReducer = (state = { pools: null, clientPools: null }, action) => {
  switch (action.type) {
    case GET_ALL_POOLS:
      return { ...state, pools: action.pools };
    case ADD_CLIENT_POOLS:
      return { ...state, clientPools: action.clientPools };
    default:
      return state;
  }
};

export default poolsReducer;

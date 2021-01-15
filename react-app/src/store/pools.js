import { addCurrentClient } from "./clients";
import { addClientRepairs } from "./repairs";
import { addClientTasks } from "./tasks";

const GET_ALL_POOLS = "pools/get-all-pools";
const ADD_CLIENT_POOLS = "pools/add-client-pools";
const DELETE_CLIENT_POOLS = "pools/delete-client-pools";

export const getAllPools = (poolsDetail) => {
  return {
    type: GET_ALL_POOLS,
    pools: poolsDetail,
  };
};

export const addClientPools = (poolData) => {
  // console.log("poolsDAta:", poolData.pools);
  return {
    type: ADD_CLIENT_POOLS,
    clientPools: poolData,
  };
};
export const deleteClientPool = (poolId) => {
  return {
    type: DELETE_CLIENT_POOLS,
    clientPools: poolId,
  };
};

export const getPools = () =>
  async function (dispatch) {
    const res = await fetch(`/api/pools`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //expected res = {pools: [...]}
    const pools = await res.json();
    // console.log(pools);
    if (!pools.error) {
      dispatch(getAllPools([...pools.pools]));
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
    //expected res = {pools: [...]}
    const pools = await res.json();

    if (!pools.error) {
      console.log("pool res", pools);
      dispatch(addClientPools(pools.pools));
      dispatch(addCurrentClient(pools.pools[0].client));
      pools.pools.forEach((pool) => {
        dispatch(addClientRepairs(pool.repairs));
        pool.repairs.forEach((repair) => {
          dispatch(addClientTasks(repair.tasks));
        });
      });
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
    //expected res = {pool: {...}}
    const pool = await response.json();
    // console.log("\n\npool res:", pool, "\n\n");
    if (!pool.errors) {
      dispatch(addClientPools([pool.pool]));
    }
    return pool;
  };

export const deletePool = (poolId) =>
  async function (dispatch) {
    const res = await fetch(`/api/pools/${poolId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const pool = await res.json();
    if (!pool.error) {
      dispatch(deleteClientPool(poolId));
    }
    return pool;
  };

const poolsReducer = (state = { pools: [], clientPools: [] }, action) => {
  switch (action.type) {
    case GET_ALL_POOLS:
      if (action.pools) {
        if (action.pools.length) {
          return { ...state, pools: [...action.pools] };
        }
        return state;
      }
      return state;
    case ADD_CLIENT_POOLS:
      if (action.clientPools) {
        if (action.clientPools.length) {
          //spread new data into pools array
          return {
            ...state,
            clientPools: [...state.clientPools, ...action.clientPools],
          };
        }
        return {
          ...state,
          clientPools: [...state.clientPools, action.clientPools],
        };
      }
      return state;
    case DELETE_CLIENT_POOLS:
      //remove pool where poolId does not match ids in the store
      return {
        ...state,
        clientPools: state.clientPools.filter(
          (pool) => pool.id !== action.clientPools
        ),
      };
    default:
      return state;
  }
};

export default poolsReducer;

import { addCurrentClient } from "./clients";
import { setClientRepairs, deleteClientRepair, resetRepairs } from "./repairs";
import { setClientTasks } from "./tasks";

const SET_ALL_POOLS = "pools/set-all-pools";
const ADD_CLIENT_POOLS = "pools/add-client-pools";
const SET_CLIENT_POOLS = "pools/set-client-pools";
const DELETE_CLIENT_POOLS = "pools/delete-client-pools";
const RESET_POOLS = "pools/reset-pools";

export const setAllPools = (poolsDetail) => {
  return {
    type: SET_ALL_POOLS,
    pools: poolsDetail,
  };
};

export const addClientPools = (poolData) => {
  return {
    type: ADD_CLIENT_POOLS,
    clientPools: poolData,
  };
};
export const setClientPools = (poolData) => {
  return {
    type: SET_CLIENT_POOLS,
    clientPools: poolData,
  };
};
export const deleteClientPool = (poolId) => {
  return {
    type: DELETE_CLIENT_POOLS,
    clientPools: poolId,
  };
};
export const resetPools = () => {
  return {
    type: RESET_POOLS,
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
    if (!pools.error) {
      dispatch(setAllPools([...pools.pools]));
    } else {
      dispatch(setAllPools(null));
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
      //add pools, client info, and associated repairs to the store
      dispatch(setClientPools(pools.pools));
      dispatch(addCurrentClient(pools.pools[0].client));
      let repairs = [];
      let tasks = [];
      pools.pools.forEach((pool) => {
        if (pool.repairs.length) {
          pool.repairs.forEach((repair) => {
            repairs.push(repair);
            if (repair.tasks.length) {
              tasks.push(...repair.tasks);
            }
          });
        }
      });
      if (repairs.length) {
        dispatch(setClientRepairs(repairs));
      }
      if (tasks.length) {
        dispatch(setClientTasks(tasks));
      }
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
      filterCleaned,
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
        filterCleaned,
      }),
    });
    //expected res = {pool: {...}}
    const pool = await response.json();
    if (!pool.errors) {
      dispatch(addClientPools([pool.pool]));
      dispatch(setAllPools(pool.pool));
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
      let poolRepairs = pool.deleted.repairs;
      poolRepairs.forEach((repair) => dispatch(deleteClientRepair(repair.id)));
    }
    return pool;
  };

const poolsReducer = (state = { pools: [], clientPools: [] }, action) => {
  switch (action.type) {
    case SET_ALL_POOLS:
      // debugger;
      if (action.pools) {
        if (action.pools.length) {
          return { ...state, pools: [...action.pools] };
        }
        return { ...state, pools: action.pools };
      }
      return { ...state, pools: [] };
    case SET_CLIENT_POOLS:
      if (action.clientPools) {
        if (action.clientPools.length) {
          //spread new data into pools array
          return {
            ...state,
            clientPools: [...action.clientPools],
          };
        }
        return {
          ...state,
          clientPools: [action.clientPools],
        };
      }
      return { ...state, clientPools: [] };
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
      return { ...state, clientPools: [] };
    case DELETE_CLIENT_POOLS:
      //remove pool where poolId does not match ids in the store
      return {
        ...state,
        clientPools: state.clientPools.filter(
          (pool) => pool.id !== action.clientPools
        ),
      };
    case RESET_POOLS:
      return { pools: [], clientPools: [] };
    default:
      return state;
  }
};

export default poolsReducer;

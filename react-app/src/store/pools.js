const GET_ALL_POOLS = "pools/get-all-pools";
const GET_POOL = "pools/get-pool";
const ADD_POOL = "pools/add-pool";

export const getAllPools = (poolsDetail) => {
  return {
    type: GET_ALL_POOLS,
    pools: poolsDetail,
  };
};

export const getPool = (poolData) => {
  return {
    type: GET_ALL_POOLS,
    pools: poolData,
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

export const addPool = (poolDetails) =>
  async function (dispatch) {
    const [
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
      dispatch(getAllPools(pool));
    }
    return pool;
  };

const poolsReducer = (state = { pools: null }, action) => {
  switch (action.type) {
    case GET_ALL_POOLS:
      return { ...state, pools: action.pools };
    default:
      return state;
  }
};

export default poolsReducer;

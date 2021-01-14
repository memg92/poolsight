const GET_ALL_REPAIRS = "repairs/get-all-repairs";
const ADD_CLIENT_REPAIRS = "repairs/add-client-repairs";
const EDIT_CLIENT_REPAIRS = "repairs/edit-client-repairs";
const DELETE_CLIENT_REPAIRS = "repairs/delete-client-repairs";

export const getAllRepairs = (repairsDetail) => {
  return {
    type: GET_ALL_REPAIRS,
    repairs: repairsDetail,
  };
};

export const addClientRepairs = (repairData) => {
  // console.log("repairsDAta:", repairData.repairs);
  return {
    type: ADD_CLIENT_REPAIRS,
    clientRepairs: repairData,
  };
};
export const editClientRepairs = (repairData) => {
  // console.log("repairsDAta:", repairData.repairs);
  return {
    type: EDIT_CLIENT_REPAIRS,
    clientRepairs: repairData,
  };
};
export const deleteClientRepair = (repairId) => {
  return {
    type: DELETE_CLIENT_REPAIRS,
    clientRepairs: repairId,
  };
};

export const getRepairs = () =>
  async function (dispatch) {
    const res = await fetch(`/api/repairs`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //expected res = {repairs: [...]}
    const repairs = await res.json();
    if (!repairs.error) {
      dispatch(getAllRepairs(repairs.repairs));
    } else {
      dispatch(getAllRepairs(null));
    }
    return repairs;
  };

export const getClientRepairs = (clientId) =>
  async function (dispatch) {
    const res = await fetch(`/api/repairs/${clientId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //expected res = {repairs: [...]}
    const repairs = await res.json();

    if (!repairs.error) {
      console.log(repairs);
      dispatch(addClientRepairs(repairs.repairs));
      // dispatch(addCurrentClient(repairs.repairs[0].client));
    }
    return repairs;
  };

export const createClientRepair = (repairDetails) =>
  async function (dispatch) {
    const [poolId, title, description] = repairDetails;

    const response = await fetch("/api/repairs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poolId,
        title,
        description,
      }),
    });
    //expected res = {repair: {...}}
    const repair = await response.json();
    if (!repair.errors) {
      dispatch(addClientRepairs([repair.repair]));
    }
    return repair;
  };

export const editRepair = (...repairDetails) =>
  async function (dispatch) {
    const [repairId, poolId, title, description] = repairDetails;
    const response = await fetch(`/api/repairs/${repairId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poolId,
        title,
        description,
      }),
    });
    const repair = await response.json();
    if (!repair.error) {
      dispatch(editClientRepairs([repair]));
    }
    return repair;
  };

export const deleteRepair = (repairId) =>
  async function (dispatch) {
    const res = await fetch(`/api/repairs/${repairId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const repair = await res.json();
    if (!repair.error) {
      dispatch(deleteClientRepair(repairId));
    }
    return repair;
  };

const repairsReducer = (state = { repairs: [], clientRepairs: [] }, action) => {
  switch (action.type) {
    case GET_ALL_REPAIRS:
      return { ...state, repairs: [...action.repairs] };
    case ADD_CLIENT_REPAIRS:
      //spread new data into repairs array
      return {
        ...state,
        clientRepairs: [...state.clientRepairs, ...action.clientRepairs],
      };
    case EDIT_CLIENT_REPAIRS:
      const index = state.clientRepairs.findIndex(
        (repair) => repair.id === action.clientRepairs[0].id
      );
      console.log(index, state.clientRepairs);
      if (index > -1) {
        return {
          ...state,
          clientRepairs: [
            ...state.clientRepairs.slice(0, index),
            action.clientRepairs[0],
            ...state.clientRepairs.slice(index + 1),
          ],
        };
      }
      return {
        ...state,
        clientRepairs: [...state.clientRepairs, action.clientRepairs[0]],
      };
    case DELETE_CLIENT_REPAIRS:
      //remove repair where repairId does not match ids in the store
      return {
        ...state,
        clientRepairs: state.clientRepairs.filter(
          (repair) => repair.id !== action.clientRepairs
        ),
      };
    default:
      return state;
  }
};

export default repairsReducer;

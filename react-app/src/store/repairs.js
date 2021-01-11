import { addCurrentClient } from "./clients";

const GET_ALL_REPAIRS = "repairs/get-all-repairs";
const ADD_CLIENT_REPAIRS = "repairs/add-client-repairs";
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
export const deleteClientRepair = (repairId) => {
  return {
    type: DELETE_CLIENT_REPAIRS,
    clientRepairs: repairId,
  };
};

export const getRepairs = () =>
  async function (dispatch) {
    const res = await fetch(`/api/repairs/`, {
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
    const [
      clientId,
      street,
      city,
      state,
      repairSize,
      propertyType,
      monthlyRate,
      serviceDay,
      filterChanged,
    ] = repairDetails;

    const response = await fetch("/api/repairs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        street,
        city,
        state,
        repairSize,
        propertyType,
        monthlyRate,
        serviceDay,
        filterChanged,
      }),
    });
    //expected res = {repair: [...]}
    const repair = await response.json();
    console.log("\n\nrepair res:", repair, "\n\n");
    if (!repair.errors) {
      dispatch(addClientRepairs([repair.repair]));
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

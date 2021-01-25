const GET_ALL_TASKS = "tasks/get-all-tasks";
const ADD_CLIENT_TASKS = "tasks/add-client-tasks";
const EDIT_CLIENT_TASK = "tasks/edit-client-task";
const DELETE_CLIENT_TASKS = "tasks/delete-client-tasks";
const RESET_TASKS = "tasks/reset-tasks";

export const getAllTasks = (tasksDetail) => {
  return {
    type: GET_ALL_TASKS,
    tasks: tasksDetail,
  };
};

export const addClientTasks = (taskData) => {
  return {
    type: ADD_CLIENT_TASKS,
    clientTasks: taskData,
  };
};
export const editClientTask = (taskData) => {
  return {
    type: EDIT_CLIENT_TASK,
    clientTasks: taskData,
  };
};
export const deleteClientTask = (taskId) => {
  return {
    type: DELETE_CLIENT_TASKS,
    clientTasks: taskId,
  };
};
export const resetTasks = () => {
  return {
    type: RESET_TASKS,
  };
};

export const getTasks = () =>
  async function (dispatch) {
    const res = await fetch(`/api/tasks`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //expected res = {tasks: [...]}
    const tasks = await res.json();
    if (!tasks.error) {
      dispatch(getAllTasks(tasks.tasks));
    } else {
      dispatch(getAllTasks(null));
    }
    return tasks;
  };

export const getClientTasks = (clientId) =>
  async function (dispatch) {
    const res = await fetch(`/api/tasks/${clientId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //expected res = {tasks: [...]}
    const tasks = await res.json();

    if (!tasks.error) {
      dispatch(addClientTasks(tasks.tasks));
      // dispatch(addCurrentClient(tasks.tasks[0].client));
    }
    return tasks;
  };

export const createClientTask = (taskDetails) =>
  async function (dispatch) {
    const [repairId, title, rate, cost, description] = taskDetails;

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repairId,
        title,
        rate,
        cost,
        description,
      }),
    });
    //expected res = {task: {...}}
    const task = await response.json();
    if (!task.errors) {
      dispatch(addClientTasks([task.task]));
    }
    return task;
  };

export const editTask = (...taskDetails) =>
  async function (dispatch) {
    const [taskId, title, rate, cost, description, complete] = taskDetails;
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        rate,
        cost,
        description,
        complete,
      }),
    });
    const task = await response.json();
    if (!task.error) {
      dispatch(editClientTask([task]));
    }
    return task;
  };

export const deleteTask = (taskId) =>
  async function (dispatch) {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const task = await res.json();
    if (!task.error) {
      dispatch(deleteClientTask(taskId));
    }
    return task;
  };

const tasksReducer = (state = { tasks: [], clientTasks: [] }, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return { ...state, tasks: [...action.tasks] };
    case ADD_CLIENT_TASKS:
      //spread new data into tasks array
      return {
        ...state,
        clientTasks: [...state.clientTasks, ...action.clientTasks],
      };
    case EDIT_CLIENT_TASK:
      const index = state.clientTasks.findIndex(
        (task) => task.id === action.clientTasks[0].id
      );
      if (index > -1) {
        return {
          ...state,
          clientTasks: [
            ...state.clientTasks.slice(0, index),
            action.clientTasks[0],
            ...state.clientTasks.slice(index + 1),
          ],
        };
      }
      return {
        ...state,
        clientTasks: [...state.clientTasks, action.clientTasks[0]],
      };
    case DELETE_CLIENT_TASKS:
      //remove task where taskId does not match ids in the store
      return {
        ...state,
        clientTasks: state.clientTasks.filter(
          (task) => task.id !== action.clientTasks
        ),
      };
    case RESET_TASKS:
      return {
        tasks: [],
        clientTasks: [],
      };
    default:
      return state;
  }
};

export default tasksReducer;

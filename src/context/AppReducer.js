export default (state, action) => {
  switch (action.type) {
    case "REMOVE_USER":
      return {
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }
    case "ADD_TASK":
      return {
        tasks: [action.payload, ...state.tasks]
      }

    case "RETRIEVED_TASKS":
      // console.log("Action payload: ", action.payload)
      return {
        tasks: [...action.payload, ...state.tasks]
      }
    // case "RETRIEVED_TASK":
    //   const inProgressTask = action.payload
    //   return {
    //     inProgressTask
    //   }

    case "EDIT_USER":
      const updatedTask = action.payload
      const updatedTasks = state.tasks.map(task => {
        if (task.id === updatedTask.id) {
          return updatedTask
        } else {
          return task
        }
      })
      return {
        tasks: updatedTasks
      }

    default:
      return state
  }
}

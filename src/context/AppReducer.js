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
      return {
        tasks: [...action.payload, ...state.tasks]
      }

    case "EDIT_TASK":
      const editedTask = action.payload
      const editedTasks = state.tasks.map(task => {
        if (task.id === editedTask.id) {
          return editedTask
        } else {
          return task
        }
      })
      console.log("before return: ", editedTasks)
      return {
        tasks: editedTasks
      }

    case "UPDATE_TASK_STATUS":
      const updatedTasksStatus = state.tasks.map(task => {
        if (task.status === "Not Started Yet") {
          return { ...task, status: "In progress" }
        } else {
          return task
        }
      })
      return {
        tasks: updatedTasksStatus
      }

    case "UPDATE_TASK_DUEDATE":
      const todayDate = new Date()
      const datedueTotal = todayDate.getDate() + todayDate.getMonth() + todayDate.getFullYear() + 7
      console.log("duedate: ", datedueTotal)

      const updatedTasksDueDate = state.tasks.map(task => {
        const taskDate = new Date(task.date)
        const taskDateTotal = taskDate.getDate() + taskDate.getMonth() + taskDate.getFullYear()
        console.log("taskDateTotal: ", taskDateTotal)

        function addDays(date, days) {
          var result = new Date(date)
          result.setDate(result.getDate() + days)
          return result
        }

        if (taskDateTotal === datedueTotal) {
          console.log(task.date)

          return { ...task, date: addDays(taskDate, 10).toISOString().slice(0, 10) }
        } else {
          return task
        }
      })
      return {
        tasks: updatedTasksDueDate
      }

    default:
      return state
  }
}

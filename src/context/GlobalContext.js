import React, { createContext, useReducer } from "react"
import AppReducer from "./AppReducer"
let airtable = require("airtable")
export let base = new airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_PRACTICE_BASE)

const initialState = {
  tasks: []
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const removeTask = id => {
    dispatch({
      type: "REMOVE_USER",
      payload: id
    })
  }

  const addTask = task => {
    dispatch({
      type: "ADD_TASK",
      payload: task
    })
  }

  const retrievedTasks = tasks => {
    dispatch({
      type: "RETRIEVED_TASKS",
      payload: tasks
    })
  }

  const editTask = task => {
    dispatch({
      type: "EDIT_USER",
      payload: task
    })
  }

  // const retrievedTask = ([tasks]) => {
  //   dispatch({
  //     type: "RETRIEVED_TASK",
  //     payload: [tasks]
  //   })
  // }

  return (
    <GlobalContext.Provider
      value={{
        tasks: state.tasks,
        removeTask,
        addTask,
        retrievedTasks,
        editTask
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

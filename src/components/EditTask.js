import React, { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"
import { GlobalContext } from "../context/GlobalContext"

function EditTask(props) {
  const { tasks, editTask } = useContext(GlobalContext)
  const [selectedTask, setSelectedTask] = useState({
    id: "",
    name: "",
    status: "",
    date: ""
  })
  const history = useHistory()
  const currentTaskId = props.match.params.id
  const axios = require("axios")

  useEffect(() => {
    const taskId = currentTaskId
    const selectedTask = tasks.find(task => task.id === taskId)
    setSelectedTask(selectedTask)
  }, [tasks, currentTaskId])

  const handleEditSubmit = async e => {
    e.preventDefault()
    console.log("selectedid: ", selectedTask.id)
    await axios
      .put(`https://l62skuyz33.execute-api.ap-southeast-1.amazonaws.com/Prod/updaterecordid/${selectedTask.id}`, {
        task: selectedTask.name,
        status: selectedTask.status,
        duedate: selectedTask.date
      })
      .then(
        response => {
          console.log("response: ", response)
        },
        error => {
          console.log(error)
        }
      )
    editTask(selectedTask)
    history.push("/")
  }

  const handleInputChange = e => {
    setSelectedTask({ ...selectedTask, name: e.target.value })
  }

  const handleStatusChange = e => {
    setSelectedTask({ ...selectedTask, status: e.target.value })
  }

  const handleDueDateChange = e => {
    setSelectedTask({ ...selectedTask, date: e.target.value })
  }

  return (
    <Form onSubmit={handleEditSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input id="name" onChange={handleInputChange} value={selectedTask.name} type="text" />
        <Label for="status">Status</Label>
        <Input value={selectedTask.status} type="select" name="select" id="status" onChange={handleStatusChange}>
          <option>Done</option>
          <option>In progress</option>
          <option>Not Started Yet</option>
        </Input>
        <Label for="date">Due Date</Label>
        <Input onChange={handleDueDateChange} value={selectedTask.date} type="date" name="date" id="date" />
      </FormGroup>
      <Button type="submit">Edit Task</Button>
      <Link to="/" className="btn btn-danger ml-2">
        Cancel
      </Link>
    </Form>
  )
}

export default EditTask

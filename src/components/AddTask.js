import React, { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"
import { GlobalContext } from "../context/GlobalContext"

function AddTask() {
  const { addTask } = useContext(GlobalContext)
  const history = useHistory()
  const [name, setName] = useState("")
  const [status, setStatus] = useState("")
  const [date, setDate] = useState("")
  const axios = require("axios")
  const { v4: uuidv4 } = require("uuid")

  const handleAddSubmit = async e => {
    e.preventDefault()
    const task = {
      id: uuidv4(),
      name,
      status,
      date
    }

    await axios
      .post("https://l62skuyz33.execute-api.ap-southeast-1.amazonaws.com/Prod/createrecord", {
        task: task.name,
        status: task.status,
        duedate: task.date,
        uuid: task.id
      })
      .then(
        response => {
          console.log("response: ", response)
          console.log(task)
          console.log("uuid: ", uuidv4())
          addTask(task)
        },
        error => {
          console.log(error)
        }
      )
    history.push("/")
  }

  return (
    <Form onSubmit={handleAddSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input id="name" onChange={e => setName(e.target.value)} type="text" placeholder="Enter your task" value={name} />
        <Label for="status">Status</Label>
        <Input type="select" name="select" id="status" onChange={e => setStatus(e.target.value)}>
          <option value="Done">Done</option>
          <option value="In progress">In progress</option>
          <option value="Not Started Yet">Not Started Yet</option>
        </Input>
        <Label for="date">Due Date</Label>
        <Input onChange={e => setDate(e.target.value)} value={date} type="date" name="date" id="date" placeholder="Due Date" />
      </FormGroup>
      <Button type="submit">Submit</Button>
      <Link to="/" className="btn btn-danger ml-2">
        Cancel
      </Link>
    </Form>
  )
}

export default AddTask

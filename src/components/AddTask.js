import React, { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"
import { GlobalContext, base } from "../context/GlobalContext"

function AddTask() {
  const { addTask } = useContext(GlobalContext)
  const history = useHistory()
  const [name, setName] = useState("")
  const [status, setStatus] = useState("")
  const [date, setDate] = useState("")

  const handleAddSubmit = e => {
    const task = {
      id: "",
      name,
      status,
      date
    }

    base("Todo List").create(
      [
        {
          fields: {
            Task: task.name,
            Status: task.status,
            "Due Date": task.date
          }
        }
      ],
      function (err, records) {
        if (err) {
          console.error(err)
          return
        }
        records.forEach(function (record) {
          task.id = record.getId()
          addTask(task)
        })
      }
    )
    console.log(task)
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

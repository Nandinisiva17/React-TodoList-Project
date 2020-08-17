import React, { useContext } from "react"
import { ListGroup, ListGroupItem, ListGroupItemText, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { GlobalContext, base } from "../context/GlobalContext"

function TaskList() {
  const { tasks, removeTask } = useContext(GlobalContext)
  const axios = require("axios")
  return (
    <ListGroup>
      {tasks.map(task => (
        <ListGroupItem key={task.id}>
          <ListGroupItemText>
            <strong>Task: </strong>
            {task.name}
          </ListGroupItemText>
          <ListGroupItemText>
            <strong>Status: </strong>
            {task.status}
          </ListGroupItemText>
          <ListGroupItemText>
            <strong>Due Date: </strong>
            {task.date}
          </ListGroupItemText>
          <div className="ml-auto">
            <Link to={`/edittask/${task.id}`} className="btn btn-warning mr-1">
              Edit
            </Link>
            <Button
              onClick={async () => {
                removeTask(task.id)
                console.log(task.id)
                let result = await axios.delete(`https://a2p861ej4f.execute-api.ap-southeast-1.amazonaws.com/Prod/deleterecordid/${task.id}`)
                console.log(result.status)
                // base("Todo List").destroy(task.id)
              }}
              className="btn btn-danger"
            >
              Delete
            </Button>
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>
  )
}

export default TaskList

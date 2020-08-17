import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav, NavItem, NavbarBrand, Container, Button } from "reactstrap"
import { GlobalContext } from "../context/GlobalContext"

function Heading() {
  const { retrievedTasks, updateTaskStatus, updateTaskDueDate } = useContext(GlobalContext)
  const [disabled, setDisabled] = useState(false)
  const axios = require("axios")

  const handleClick = async () => {
    const tasks = []

    await axios.get("https://l62skuyz33.execute-api.ap-southeast-1.amazonaws.com/Prod/retrieverecord").then(results => {
      const records = results.data

      records.message.forEach(record => {
        tasks.push({ id: record.fields.uuid, name: record.fields.Task, status: record.fields.Status, date: record.fields["Due Date"] })
      })
    })
    retrievedTasks(tasks)
    setDisabled(!disabled)
  }

  const handleGetStarted = async e => {
    e.preventDefault()

    updateTaskStatus()
    await axios.put("https://l62skuyz33.execute-api.ap-southeast-1.amazonaws.com/Prod/updatestatus", {}).then(
      response => {
        console.log("response: ", response)
      },
      error => {
        console.log(error)
      }
    )
  }

  const handleDeadline = async e => {
    e.preventDefault()
    updateTaskDueDate()
    await axios.put("https://l62skuyz33.execute-api.ap-southeast-1.amazonaws.com/Prod/updateduedate", {}).then(
      response => {
        console.log("response: ", response)
      },
      error => {
        console.log(error)
      }
    )
  }

  return (
    <>
      {handleClick}
      <Navbar color="dark" dark>
        <Container>
          <NavbarBrand>My Task List</NavbarBrand>
          <Nav>
            <NavItem>
              <Link to="/addtask" className="btn btn-primary mr-1">
                Add Task
              </Link>
              <Button onClick={handleClick} disabled={disabled} className="btn btn-primary mr-1">
                Database Records
              </Button>
              <Button onClick={handleGetStarted} className="btn btn-primary mr-1">
                Get Started
              </Button>
              <Button onClick={handleDeadline} className="btn btn-primary">
                Postpone Deadline
              </Button>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Heading

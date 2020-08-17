import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav, NavItem, NavbarBrand, Container, Button } from "reactstrap"
import { GlobalContext, base } from "../context/GlobalContext"

function Heading() {
  const { retrievedTasks } = useContext(GlobalContext)
  const [disabled, setDisabled] = useState(false)
  const axios = require("axios")

  const handleClick = async () => {
    const tasks = []

    // await fetch("https://ah0d5n98cf.execute-api.ap-southeast-1.amazonaws.com/Prod/retrieverecord")
    //   .then(res => res.json())
    //   .then(records => {
    //     console.log(records)
    //     records.message.forEach(record => {
    //       console.log(record)
    //       tasks.push({ id: record.fields.id, name: record.fields.Task, status: record.fields.Status, date: record.fields["Due Date"] })
    //     })
    //   })
    //   .catch(e => {
    //     console.log("Error", e)
    //   })
    await axios.get("https://a2p861ej4f.execute-api.ap-southeast-1.amazonaws.com/Prod/retrieverecord").then(results => {
      const records = results.data
      records.message.forEach(record => {
        tasks.push({ id: record.fields.uuid, name: record.fields.Task, status: record.fields.Status, date: record.fields["Due Date"] })
      })
    })
    retrievedTasks(tasks)
    setDisabled(!disabled)
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
              <Button onClick={handleClick} disabled={disabled} className="btn btn-primary">
                Database Records
              </Button>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Heading

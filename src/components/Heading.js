import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Navbar, Nav, NavItem, NavbarBrand, Container, Button } from "reactstrap"
import { GlobalContext, base } from "../context/GlobalContext"

function Heading() {
  const { retrievedTasks } = useContext(GlobalContext)
  const [disabled, setDisabled] = useState(false)

  const handleClick = async () => {
    const tasks = []
    const records = await base("Todo List").select({ view: "Grid view" }).firstPage()
    records.forEach(record => {
      tasks.push({ id: record.id, name: record.fields.Task, status: record.fields.Status, date: record.fields["Due Date"] })
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

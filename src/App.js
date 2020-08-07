import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./components/Home"
import AddTask from "./components/AddTask"
import EditTask from "./components/EditTask"
import { GlobalProvider } from "./context/GlobalContext"
import "bootstrap/dist/css/bootstrap.min.css"

const App = () => {
  return (
    <div style={{ maxWidth: "60rem", margin: "4rem auto" }}>
      <pre>{process.env.REACT_APP_AIRTABLE_API_KEY}</pre>
      <GlobalProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/addtask" component={AddTask} />
            <Route path="/edittask/:id" component={EditTask} />
          </Switch>
        </Router>
      </GlobalProvider>
    </div>
  )
}

export default App

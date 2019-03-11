import * as React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import './App.css'
import { NavBar } from './NavBar'

function Index() {
  return <h2>Home</h2>
}

function Login() {
  return <h2>Login</h2>
}

function Logout() {
  return <h2>Logout</h2>
}

function Secured() {
  return <h2>Secured</h2>
}

function Hidden() {
  return <h2>Hidden</h2>
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar className='NavBar' links={[
              {
                target: "/", label: 'Home',
              },
              {
                target: "/secured", label: 'Secured',
              },
              {
                target: "/hidden", label: 'Hidden',
              },
              {
                target: "/login", label: 'Login',
              },
              {
                target: "/logout", label: 'Logout',
              },
            ]} />
            <header className="App-header">
              <Route path="/" exact component={Index} />
              <Route path="/login/" component={Login} />
              <Route path="/logout/" component={Logout} />
              <Route path="/secured/" component={Secured} />
              <Route path="/hidden/" component={Hidden} />
            </header>
          </div>
        </Router>
      </div>

    )
  }
}

export default App

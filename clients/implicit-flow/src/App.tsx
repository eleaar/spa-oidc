import * as React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthenticationProvider, AuthenticationConsumer, withOidcSecure } from "@axa-fr/react-oidc-context"

import { MainNav } from './MainNav'
import { MainContent } from './MainContent'
import { keycloackConfiguration } from './openIdConfig'

function Index() {
  return <h2>Home</h2>
}

function Public() {
  return <h2>Public</h2>
}

function Secured() {
  return <h2>Secured</h2>
}

function Hidden() {
  return <h2>Hidden</h2>
}

export class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <AuthenticationProvider configuration={keycloackConfiguration}>
            <div>
              <AuthenticationConsumer>{({login, logout, oidcUser}) => (
                <MainNav
                  title="Welcome to the example"
                  links={[
                    {
                      target: "/", label: 'Home',
                    },
                    {
                      target: "/public", label: 'Public',
                    },
                    {
                      target: "/secured", label: 'Secured',
                    },
                    {
                      target: "/hidden", label: 'Hidden', active: !!oidcUser
                    },
                  ]}
                  user={oidcUser ? oidcUser.profile.name : undefined}
                  onLogin={login}
                  onLogout={logout}
                />
              )}</AuthenticationConsumer>
              <MainContent >
                <Route path="/" exact component={Index} />
                <Route path="/public/" component={Public} />
                <Route path="/secured/" component={withOidcSecure(Secured)} />
                <Route path="/hidden/" component={withOidcSecure(Hidden)} />
              </MainContent>
            </div>
          </AuthenticationProvider>
        </Router>
      </div>

    )
  }
}

import * as React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthenticationProvider, oidcLog, AuthenticationConsumer, withOidcSecure } from "@axa-fr/react-oidc-context";

import { MainNav } from './MainNav'
import { MainContent } from './MainContent'

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

type AuthenticationConsumerProps = {
  login: () => void
  logout: () => void
}

const oidcConfiguration = {
  client_id: "2t7AiiLPfpQF8r9tjUg3wkXHHGbdEjph",
  response_type: "id_token token",
  scope: "openid profile email",
  authority: "https://eleaar.eu.auth0.com",
  redirect_uri: "http://localhost:3000/authentication/callback",
  silent_redirect_uri: "http://localhost:3000/authentication/silent_callback",
  post_logout_redirect_uri: "http://localhost:3000/",
  automaticSilentRenew: true,
  loadUserInfo: true,
  triggerAuthFlow: true
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <AuthenticationProvider
            configuration={oidcConfiguration}
            loggerLevel={oidcLog.DEBUG}
          >
            <div>
              <AuthenticationConsumer>{({login, logout, oidcUser}: AuthenticationConsumerProps) => (
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

export default App

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

type Auth0Profile = {
  sub: string
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  name: string
  nickname: string
  // locale: "en"
  // picture: "https://lh6.googleusercontent.com/-eXDZAshoz0M/AAAAAAAAAAI/AAAAAAAAAAo/-e7thP7EJ20/photo.jpg"
  // updated_at: "2019-03-14T12:07:34.105Z"
}

type KeycloakProfile = {
  sub: string
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  name: string
  preferred_username: string

  // s_hash: "5I3SA7TszrOsE25rMikSDw"
  // session_state: "8e130416-881d-4db2-8ff4-bf171f66583f"
  // jti: "e1bdf753-5be6-410c-9bfd-17c54e9301c5"
  // typ: "ID"
  // acr: "1"
  // auth_time: 1552643062
  // azp: "testing-app"
}

type OidcProfile = Auth0Profile | KeycloakProfile

type OidcUser  = {
  id_token: string
  access_token: string
  refresh_token?: string
  // token_type: "Bearer"
  expired: boolean
  expires_at: number
  expires_in: number
  // session_state: undefined
  // state: {url: "/hidden"}
  profile: OidcProfile
  // scope: undefined
  scopes: ReadonlyArray<string>
}

type AuthenticationConsumerProps = {
  login: () => void
  logout: () => void
  oidcUser: OidcUser | null | undefined
}

const oidcConfiguration = {
  response_type: "id_token token",
  scope: "openid profile email",
  redirect_uri: "http://localhost:3000/authentication/callback",
  silent_redirect_uri: "http://localhost:3000/authentication/silent_callback",
  post_logout_redirect_uri: "http://localhost:3000/",
  automaticSilentRenew: true,
  loadUserInfo: true,
  triggerAuthFlow: true,
}

const auth0Configuration = {
  ...oidcConfiguration,
  authority: "https://eleaar.eu.auth0.com",
  client_id: "2t7AiiLPfpQF8r9tjUg3wkXHHGbdEjph",
}

const keycloackConfiguration = {
  ...oidcConfiguration,
  authority: "http://localhost:8080/auth/realms/Test",
  client_id: "testing-app",
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <AuthenticationProvider
            configuration={keycloackConfiguration}
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

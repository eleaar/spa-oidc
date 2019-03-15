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

export const auth0Configuration = {
  ...oidcConfiguration,
  authority: "https://eleaar.eu.auth0.com",
  client_id: "2t7AiiLPfpQF8r9tjUg3wkXHHGbdEjph",
}

export const keycloackConfiguration = {
  ...oidcConfiguration,
  authority: "http://localhost:8080/auth/realms/Test",
  client_id: "testing-app",
}

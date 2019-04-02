declare module "@axa-fr/react-oidc-context" {

  type AuthenticationProviderProps = {
    configuration: {
      authority: string
      client_id: string
      response_type: string
      scope: string
      silent_redirect_uri: string
      post_logout_redirect_uri: string
      automaticSilentRenew: boolean
      loadUserInfo: boolean
      triggerAuthFlow: boolean
    }
  }
  export class AuthenticationProvider extends React.Component<AuthenticationProviderProps, any> { }

  // could be modeled in terms of scopes, content may also depend on the provider
  // not sure about which fields are actually optional
  export type OidcProfile = {
    sub: string
    email?: string
    email_verified?: boolean
    family_name?: string
    given_name?: string
    name: string // optional?
    preferred_username?: string
    nickname?: string
    locale?: string
  }

  export type OidcUser  = {
    id_token: string
    access_token: string
    refresh_token?: string
    expired: boolean
    expires_at: number
    expires_in: number
    profile: OidcProfile
    scope?: string
    scopes: ReadonlyArray<string>
  }

  export type AuthenticationConsumerArgs = {
    login: () => void
    logout: () => void
    oidcUser: OidcUser | null | undefined
  }

  type AuthenticationConsumerProps = {
    children: (args: AuthenticationConsumerArgs) => React.Element
  }

  export class AuthenticationConsumer extends React.Component<AuthenticationConsumerProps, any> { }

  export function withOidcSecure<P>(component: React.ComponentType<P>): React.ComponentClass<P>

  export type UserManager = {
    signinSilent(): Promise<OidcUser>
  }

  export function getUserManager(): UserManager

}

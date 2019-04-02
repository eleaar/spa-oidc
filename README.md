# spa-oidc

Examples of the alternatives in securing a SPA using OpenID Connect

## Launch Keycloak

```
cd docker
docker-compose up -d
```

Keycloak is available at <http://localhost:8080>, user `admin`/`admin`.

## Launch SPA

```
cd clients/implicit-flow
yarn install
yarn start
```

## Test SPA

You can test the app at <http://localhost:3000>

You can log with the keycloak preconfigured user `luke`/`luke`.

You can also try and use the Auth0 config (change it in the code) and
log with an external provider, such as your Google account.
However, note that logouts don't work out of the box for Auth0.

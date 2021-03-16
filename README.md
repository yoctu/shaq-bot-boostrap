# Shaq Bot Boostrap

TODO: Service description

## Quick start

1. Clone the project
2. Install dependencies: `npm install && cd nodered && npm install && cd ..`
3. Run: `NODE_ENV='dev' INSTANCES='SHAQID' CREDENTIAL="..." SEMATEXT="..." PORT=1880 npm start`
4. Go Node-RED admin page with http://localhost:1880/nodered/ for breaking things (default access is admin/password)
5. Use webservice with http://localhost:1880/api as base URL
6. Have fun

## Run

Basic running command: `env NODE_ENV='dev' INSTANCES='SHAQID' PORT=1880 npm start`

`NODE_ENV` environment variable is __mandatory__ for loading config file stored at the root directory of this project. By default we provide 3 configuration environments: `dev`, `test` and `prod` that will load respectivelly the file `config_dev.json`, `config_test.json` and `config_prod.json`.

There are another environment variables for setting project options. You can add another environment variables like this: `env PASSWORD='$2b$08$mERTOjDUSwijQo5cFLuT0eBaCZ/Kvnv4eOisOqahm.WDAuQ3Hrv4S' ENV='test' PORT=1880 DISABLE_EDITOR=1 ENABLE_PROJECT=0 npm start`

### Env variables

* `NODE_ENV`: mandatory, the configuration environment. Can be `dev`, `test` and `prod`.
* `INSTANCES`: mandatory, the list separate with comma of Shaq instance code to listen on.
* `CREDENTIAL`: mandatory, the list separate with comma of Shaq instance code base64 credential to listen on.
* `SEMATEXT`: The Sematext log ID. If not present no log will be send to Sematext
* `PORT`: the TCP port that service listen. `80` by default.
* `DISABLE_EDITOR`: Set to `1` disable the Node-RED editor, `0` to enable. `0` by default.
* `ENABLE_PROJECT`: Set to `1` enable project in the Node-RED instance, `0` to disable. `0` by default.
* `PASSWORD`: Set the Nodre-RED editor password. Creadentials are `admin`/`password` by default.

#### Auth0 integration

If `AUTH0_DOMAIN` env variable is set so Auth0 integration will be use for user authentication:

* `AUTH0_DOMAIN`: Auth0 application Domain
* `AUTH0_CLIENTID`: Auth0 application Client ID
* `AUTH0_CLIENTSECRET`: Auth0 application Client Secret
* `AUTH0_CALLBACKURL`: Callback URL where Auth0 redirect the user to the nodered instance

User must have the user_metadata `https://shaq.yoctu.solutions/nodered` set to `1` in order to be credential.

### Project configuration

The `prod` environment config file:

```json
```

TODO

## Endpoints definitions

1. Run the project: `NODE_ENV='dev' INSTANCES='SHAQID' CREDENTIAL="..." SEMATEXT="..." PORT=1880 npm start`
2. Open http://localhost:1880/api.html (TODO)

## How to contribute

1. Run the project with the Node-RED editor activated and modify flows.
2. Test, test and test and test
3. Commit your change on `develop` branch (or do a pull request on `develop` branch with Github)

### Testing

We use Jest as testing framework and we maintain functional tests.

For running tests:

1. run the project with `NODE_ENV='dev' INSTANCES='SHAQID' CREDENTIAL="..." SEMATEXT="..." PORT=1880 npm start`
2. run tests with `env PORT=1880 npm run test`

__All new features must have functionnal tests.__

## Dockerfile

1. build `docker build -t project_name .`
2. run `docker run -e NODE_ENV='dev' -e PORT=1880 -e INSTANCES='SHAQID' -e CREDENTIAL="..." -e SEMATEXT="..." -p 8080:1880 project_name:latest`

## Hosting & Continous Deploiement

TODO

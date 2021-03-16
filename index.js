const http = require('http')
const express = require("express")
const RED = require("node-red")
const debug = require('debug')
const app = express()

app.use(function (req, res, next) {
  debug('yoctu:api')(req.protocol + '://' + req.headers.host + req.url)
  next()
})

app.use("/", express.static("public"))

const server = http.createServer(app)

const port = process.env.PORT || 80

var adminAuth = {
  type: "credentials",
  users: [{
      username: "admin",
      password: process.env.PASSWORD || "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",
      permissions: "*"
  }]
}

if (process.env.AUTH0_DOMAIN) {
  adminAuth = {
    users: [{
      username: "admin",
      permissions: "*"
    }],
    type:"strategy",
    strategy: {
      name: "auth0",
      label: 'Sign in with Auth0',
      icon: "fa-id-card",
      strategy: require("passport-auth0").Strategy,
      options: {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENTID,
        clientSecret: process.env.AUTH0_CLIENTSECRET,
        callbackURL: process.env.AUTH0_CALLBACKURL,
        verify: function(req, token, tokenSecret, profile, done) {
          if ('https://shaq.yoctu.solutions/nodered' in profile._json && profile._json['https://shaq.yoctu.solutions/nodered'] == 1) {
            profile.username = "admin"
            return done(null, profile)
          }

          return done(null, false, { message: 'Unable to login.' })
        }
      },
    }
  }
}

const settings = {
  httpAdminRoot: "/nodered",
  httpNodeRoot: "/api",
  userDir: process.cwd() + "/nodered/",
  flowFile: "flows_yoctu.json",
  credentialSecret: "my-secret",
  disableEditor: !!+process.env.DISABLE_EDITOR || false,
  editorTheme: {
    projects: {
      enabled: !!+process.env.ENABLE_PROJECT || false
    }
  },
  adminAuth: adminAuth,
  httpNodeCors: true,
  functionGlobalContext: {
    socketioclient: require('socket.io-client'),
  }
}

RED.init(server, settings)
app.use(settings.httpAdminRoot, RED.httpAdmin)
app.use(settings.httpNodeRoot, RED.httpNode)

server.listen(process.env.PORT || 80)
RED.start()

app.use(express.json())

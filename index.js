const http = require('http');
const express = require("express");
const RED = require("node-red");
const debug = require('debug');
const app = express();

app.use(function (req, res, next) {
    debug('yoctu:api')(req.protocol + '://' + req.headers.host + req.url);
    next();
})

app.use("/", express.static("public"))

const server = http.createServer(app)

var settings = {
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
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: process.env.PASSWORD || "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",
            permissions: "*"
        }]
    },
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

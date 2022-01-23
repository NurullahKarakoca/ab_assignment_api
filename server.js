const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

var token;

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.url === "/login" && req.method === "POST") {
        if (req.body.identityNumber === 11111111111 && req.body.password === "123456") {
            token = Math.random().toString(36)
            res.send(token);
        } else {
            res.sendStatus(401)
        }
    }
    else if (req.headers.authorization !== "Bearer "+token) {
         res.sendStatus(401)
    }
    else {
        if(req.url === "/logout"){
            token = null;
            res.sendStatus(200)
        }else{
            next()
        }
    }
})
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

const http = require("http");

const { app, PORT } = require("./app/index");
const { Postgres } = require("./config/postgres");
const { MongoDB } = require("./config/mongodb");

const server = http.createServer(app);

server.listen(PORT, () => {
   console.log("server listening on port: " + PORT);
});

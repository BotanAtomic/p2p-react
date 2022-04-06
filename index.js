require("dotenv").config();
const server = require("./servers/app");
const peerApp = require("./servers/peer");
const peerSocketConnection = require("./sockets/peerSocket");

process.env.PORT = process.env.PORT || "3001"

peerSocketConnection(server);

server.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server is listening on ${process.env.PORT}`);
});

peerApp.listen(9000, "0.0.0.0", () => {
    console.log(`Server is listening on 9000`);
});

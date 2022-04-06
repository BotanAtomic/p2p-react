const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const {v4: uuidV4} = require("uuid");
const bodyParser = require('body-parser');
const {ExpressPeerServer} = require("peer");

const accountSid = 'ACc0addf6039a85527e84946b8eb8dba5a';
const authToken = '70c5068b4d78acd5a24a4a9e23ade59c';
const twilioClient = require('twilio')(accountSid, authToken);

const app = express();

// app.use(express.static(path.join(__dirname, "..", "..", "streams-react/build")));
//

const server = http.createServer(app);

const peerServer = ExpressPeerServer(server);

app.use("/peerjs", peerServer);

app.use(cors());
app.use(express.json());


app.get("/api/uuid", (req, res) => {
    res.send({id: uuidV4()});
});

app.post("/api/sms", (req, res) => {
    const request = req.body

    console.log(request)

    const number = request["number"]
    const uri = request["uri"]

    if (!number || !uri) {
        res.send({failed: true})
        return;
    }
    twilioClient.messages
        .create({
            body: `Bonjour,\nVous avez fait appel aux pompiers, voici le lien ${uri}`,
            messagingServiceSid: 'MG41137deca4ac2150e3ddaae5833d85ee',
            to: number
        })
        .then(message => res.send({response: message.sid}))
        .catch(e => console.log(e))
        .done();

})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "/streams-react/build/index.html"));
});

module.exports = server;

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const http = require("http");
const path = require("path");
const socket = require("socket.io");

const clients = require("./clients");

const notifications = require("./routes/notifications");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/notifications", notifications);
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const server = http.createServer(app);

const io = socket(server, { cors: { origin: "*" } });

const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  // store socket connections
  clients.set(socket.id, socket);

  socket.on("disconnect", () => {
    // remove socket connection
    clients.delete(socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

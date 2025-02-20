const express = require("express");
const clients = require("../clients");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    data: [
      {
        date: new Date(2025, 0, 1),
        id: 1,
        message: "Notification from server.js",
      },
    ],
  });
});

router.post("/", (req, res) => {
  // get client socket from map
  const clientSocket = clients.get(req.headers["x-socket-id"]);
  // broadcast from client socket
  if (clientSocket) {
    clientSocket.broadcast.emit("notify", req.body);
  }
  res.status(200).json({ message: "success" });
});

module.exports = router;

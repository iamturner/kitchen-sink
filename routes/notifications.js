const express = require("express");

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

module.exports = router;

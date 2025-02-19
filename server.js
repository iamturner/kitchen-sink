const cors = require("cors");
const express = require("express");
const path = require("path");

const app = express();

app.use(cors());

const notifications = require("./routes/notifications");

app.use("/api/notifications", notifications);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

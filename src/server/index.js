const cors = require("cors");
const express = require("express");
const http = require("http");
const parser = require("body-parser");
const path = require("path");
const socket = require("socket.io");

const { ApolloServer } = require("apollo-server-express");

const clients = require("./clients");
const resolvers = require("./resolvers");
const typeDefs = require("./typedefs");

// Express app
const app = express();

app.use(cors());
app.use(parser.json());
app.use(express.static(path.join(__dirname, "../../dist")));

// HTTP server
const httpServer = http.createServer(app);

// Apollo server
const server = new ApolloServer({
  context: ({ req }) => {
    // return request headers
    return req.headers;
  },
  cors: {
    origin: "*",
  },
  resolvers,
  typeDefs,
});

const io = socket(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  // store socket connections
  clients.set(socket.id, socket);

  socket.on("disconnect", () => {
    // remove socket connection
    clients.delete(socket.id);
  });
});

const launch = async () => {
  // start Apollo server
  await server.start();

  server.applyMiddleware({ app, path: "/api" });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../dist", "index.html"));
  });

  const port = process.env.PORT || 3000;

  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

launch();

import cors from "cors";
import express from "express";
import http from "http";
import parser from "body-parser";
import path from "path";
import { Server as Socket } from "socket.io";

const { ApolloServer } = require("apollo-server-express");

import clients from "./clients";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";
import { prepare } from "./utilities";

// Express app
const app = express();

app.use(cors());
app.use(parser.json());

app.get("*", async (req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
    next();
  } else {
    // ...
    const filePath = path.resolve(__dirname, "../../dist", "index.html");

    const data = await prepare(filePath, req);

    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.send(data);
  }
});

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

const io = new Socket(httpServer, { cors: { origin: "*" } });

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

  server.applyMiddleware({ app, path: "/graphql" });

  const port = process.env.PORT || 3000;

  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

launch();

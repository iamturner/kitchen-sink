import cors from "cors";
import express from "express";
import http from "http";
import parser from "body-parser";
import path from "path";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { Server as SocketServer } from "socket.io";

import clients from "./clients";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";
import { prepare } from "./utilities";

// Express app
const app = express();

app.use(cors());
app.use(parser.json());

app.use(async (req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.png|.map|\/graphql)$/i.test(req.path)) {
    next();
  } else {
    const filePath = path.resolve(__dirname, "../../dist", "index.html");
    // prepare file for SEO / server rendering
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
  resolvers,
  typeDefs,
});

// Socket.io server
const io = new SocketServer(httpServer, { cors: { origin: "*" } });

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

  // use Express and allow access to headers in resolvers
  app.use(
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { req, res };
      },
    }),
  );

  const port = process.env.PORT || 3000;

  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

launch();

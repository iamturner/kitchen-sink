const cors = require("cors");
const express = require("express");
const http = require("http");
const parser = require("body-parser");
const path = require("path");
const socket = require("socket.io");

const { ApolloServer, gql } = require("apollo-server-express");

const clients = require("./clients");

// Express app
const app = express();

app.use(cors());
app.use(parser.json());
app.use(express.static(path.join(__dirname, "../../dist")));

// HTTP server
const httpServer = http.createServer(app);

// Apollo server
const server = new ApolloServer({
  typeDefs: gql`
    type Notification {
      id: String
      message: String
    }
    type Query {
      notifications: [Notification]
    }
    type Mutation {
      createNotification(id: String!, message: String!): Notification
    }
  `,
  resolvers: {
    Query: {
      notifications: () => [
        {
          id: "1",
          message: "Notification from Apollo server",
        },
      ],
    },
    Mutation: {
      createNotification: (parent, { id, message }, context) => {
        // get client socket from map
        const clientSocket = clients.get(context["x-socket-id"]);
        // broadcast from client socket
        if (clientSocket) {
          clientSocket.broadcast.emit("notify", { id, message });
        }
        return { id, message };
      },
    },
  },
  context: ({ req }) => {
    // return request headers
    return req.headers;
  },
  cors: {
    origin: "*",
  },
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

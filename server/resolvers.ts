import clients from "./clients";

const resolvers = {
  Query: {
    notifications: () => [
      {
        id: "1",
        message: "Notification from Apollo server",
      },
    ],
  },
  Mutation: {
    createNotification: (parent, { id, message }, { req }) => {
      // get client socket from map
      const clientSocket = clients.get(req.headers["x-socket-id"]);
      // broadcast from client socket
      if (clientSocket) {
        clientSocket.broadcast.emit("notify", { id, message });
      }
      return { id, message };
    },
  },
};

export default resolvers;

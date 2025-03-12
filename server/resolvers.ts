import clients from "./clients";

const resolvers = {
  Query: {
    notifications: () => [
      {
        date: new Date(2025, 0, 0),
        id: "1",
        message: "Notification from Apollo server",
      },
    ],
  },
  Mutation: {
    createNotification: (parent, { id, message }, { req }) => {
      // get client socket from map
      const clientSocket = clients.get(req.headers["x-socket-id"]);
      // handle notification date on server
      const now = new Date();
      // broadcast from client socket
      if (clientSocket) {
        clientSocket.broadcast.emit("notify", { date: now, id, message });
      }
      return { date: now, id, message };
    },
  },
};

export default resolvers;

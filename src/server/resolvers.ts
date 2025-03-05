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
};

export default resolvers;

const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
`;

export default typeDefs;

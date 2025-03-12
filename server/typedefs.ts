import { GraphQLScalarType, Kind } from "graphql";
import gql from "graphql-tag";

// creat custom Date scalar
new GraphQLScalarType({
  name: "Date",
  description: "Custom scalar type for dates",
  // value sent to client from server
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime();
    }
    throw Error("Expected `Date` object");
  },
  // incoming value from client
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value);
    }
    throw Error("Expected number value");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // invalud value
    return null;
  },
});

const typeDefs = gql`
  scalar Date

  type Notification {
    date: Date!
    id: String!
    message: String!
  }
  type Query {
    notifications: [Notification]
  }
  type Mutation {
    createNotification(id: String!, message: String!): Notification
  }
`;

export default typeDefs;

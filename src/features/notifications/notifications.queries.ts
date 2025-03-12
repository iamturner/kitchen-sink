import { gql } from "@apollo/client";

const CreateNotification = gql`
  mutation CreateNotification($id: String!, $message: String!) {
    createNotification(id: $id, message: $message) {
      id
      message
    }
  }
`;

const GetNotifications = gql`
  query GetNotifications {
    notifications {
      date
      id
      message
    }
  }
`;

export { CreateNotification, GetNotifications };

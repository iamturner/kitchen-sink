import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Button } from "../components";
import { useSocket } from "../socket";

// random user ID
const user = `user_${Math.random().toString(32).slice(2)}`;

const CREATE_NOTIFICATION = gql`
  mutation CreateNotification($id: String!, $message: String!) {
    createNotification(id: $id, message: $message) {
      id
      message
    }
  }
`;

const HomePage = () => {
  const { isConnected, socket } = useSocket();

  // ...
  const [createNotification] = useMutation(CREATE_NOTIFICATION, {
    context: {
      headers: {
        "Content-Type": "application/json",
        // include socket.io ID in headers
        "X-Socket-ID": socket.id,
      },
    },
  });

  const sendNotification = async () => {
    // generate a random notification ID
    const id = Math.random().toString(36).slice(2);
    // post to local Apollo server
    try {
      await createNotification({
        variables: { id, message: `Message from ${user}` },
      });
    } catch (error) {
      // handle error
    }
  };

  return (
    <>
      {isConnected && (
        <>
          <p className="logged-in-as">connected as: {user}</p>
        </>
      )}
      <div className="wrapper">
        <h1>👨🏻‍💻 Kitchen Sink</h1>
        <ul>
          <li>React</li>
          <li>Emotion</li>
          <li>Typescript</li>
          <br />
          <li>Redux</li>
          <br />
          <li>Express</li>
          <li>Apollo</li>
          <li>Socket.io</li>
          <br />
          <li>Babel</li>
          <li>Webpack</li>
          <br />
          <li>React Testing Library</li>
          <li>Playwright (visual testing only)</li>
          <br />
          <li>Storybook</li>
        </ul>
        <Button
          color="primary"
          disabled={!isConnected}
          onClick={sendNotification}
          type="button"
        >
          Send Notification
        </Button>
      </div>
    </>
  );
};

export default HomePage;

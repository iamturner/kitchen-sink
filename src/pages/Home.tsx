import React, { useCallback } from "react";
import { Button } from "../components";
import { useSocket } from "../socket";

// random user ID
const user = `user_${Math.random().toString(32).slice(2)}`;

const HomePage = () => {
  const { isConnected, socket } = useSocket();

  const sendNotification = useCallback(async () => {
    // generate a random ID
    const id = Math.random().toString(36).slice(2);
    // create notification object
    const data = {
      date: new Date().toISOString(),
      id,
      message: `Message from ${user}`,
    };
    try {
      // post to local Express server
      const response = await fetch("http://localhost:3000/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // include socket.io ID in headers
          "X-Socket-ID": socket.id,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      // log JSON from response
      console.log(await response.json());
    } catch (error) {
      // handle error
    }
    // update function when socket connects
  }, [socket.connected]);

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

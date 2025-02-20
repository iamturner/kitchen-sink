import React, { useEffect, useState } from "react";
import { Button } from "../components";
import socket from "../socket";

// random user ID
const user = `user_${Math.random().toString(32).slice(2)}`;

const HomePage = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const sendNotification = () => {
    // generate a random ID
    const id = Math.random().toString(36).slice(2);
    // create notification object
    const data = {
      date: new Date().toISOString(),
      id,
      message: `Message from ${user}`,
    };
    // dispatch notification
    socket.emit("notify", data);
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
          disabled={!socket.connected}
          onClick={sendNotification}
          type="button"
        >
          {isConnected ? "Send" : "Create"} Notification
        </Button>
      </div>
    </>
  );
};

export default HomePage;

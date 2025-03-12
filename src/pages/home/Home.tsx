import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "../../components";
import { useSocket } from "../../lib/socket";
import { useNotifications } from "../../features/notifications";

// random user ID
const user = `user_${Math.random().toString(32).slice(2)}`;

const HomePage = () => {
  const { isConnected } = useSocket();

  const { send } = useNotifications();

  return (
    <>
      <Helmet>
        <title>Welcome | Home Page</title>
      </Helmet>
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
          <li className="break">Typescript</li>

          <li className="break">Redux</li>

          <li>Express</li>
          <li>Apollo</li>
          <li className="break">Socket.io</li>

          <li>Babel</li>
          <li className="break">Webpack</li>

          <li>React Testing Library</li>
          <li className="break">Playwright (visual testing only)</li>

          <li>Storybook</li>
        </ul>
        <Button
          color="primary"
          disabled={!isConnected}
          onClick={() => send(`Message from ${user}`)}
          type="button"
        >
          Send Notification
        </Button>
      </div>
    </>
  );
};

export default HomePage;

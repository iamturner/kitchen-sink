import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "./components";
import { Notifications, notificationActions } from "./features";

const App = () => {
  const dispatch = useDispatch();

  return (
    <>
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
          <li>Playwright (visual testing)</li>
        </ul>
        <Button
          color="primary"
          onClick={() =>
            dispatch(
              notificationActions.create(
                `Redux Notification: ${Math.random().toString(36).slice(2)}`,
              ),
            )
          }
          type="button"
        >
          Click Here
        </Button>
      </div>
      <Notifications />
    </>
  );
};

export default App;

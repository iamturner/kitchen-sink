import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "../components";
import { notificationActions } from "../features";

const HomePage = () => {
  const dispatch = useDispatch();

  const createNotification = () => {
    // generate a random ID
    const id = Math.random().toString(36).slice(2);
    // create notification object
    const data = {
      date: new Date().toISOString(),
      id,
      message: `Redux Notification: ${id}`,
    };
    // dispatch notification
    dispatch(notificationActions.create(data));
  };

  return (
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
      <Button color="primary" onClick={createNotification} type="button">
        Create Notification
      </Button>
    </div>
  );
};

export default HomePage;

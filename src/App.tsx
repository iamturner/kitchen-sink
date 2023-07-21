import React from "react";
import { Button } from "./components";

const App = () => {
  return (
    <div className="wrapper">
      <h1>👨🏻‍💻 Kitchen Sink</h1>
      <ul>
        <li>React</li>
        <li>Emotion</li>
        <li>Typescript</li>
        <br />
        <li>Babel</li>
        <li>Webpack</li>
        <br />
        <li>React Testing Library</li>
        <li>Playwright (visual testing)</li>
      </ul>
      <Button type="button" variant="primary">
        This button does nothing
      </Button>
    </div>
  );
};

export default App;

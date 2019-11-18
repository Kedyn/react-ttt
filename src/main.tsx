import * as React from "react";
import { render } from "react-dom";
import Game from "./components/Game";

class App extends React.Component {
  public render(): React.ReactNode {
    return <Game />;
  }
}

render(<App />, document.getElementById("root"));

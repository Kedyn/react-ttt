import * as React from "react";
import { render } from "react-dom";
import Game from "./components/game/Game";

class App extends React.Component {
  public render(): React.ReactNode {
    return <Game boardSize={25} />;
  }
}

render(<App />, document.getElementById("root"));

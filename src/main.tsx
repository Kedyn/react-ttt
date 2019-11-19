import * as React from "react";
import { render } from "react-dom";
import Game from "./components/game/Game";
import Intro from "./components/Intro";

export interface IAppProps {}

export interface IAppState {
  view: string;
  size: number;
}

class App extends React.Component<IAppProps, IAppState> {
  public constructor(props: IAppProps) {
    super(props);

    this.state = {
      view: "intro",
      size: 9
    };
  }

  public handleChangeView = (dimension: number): void => {
    this.setState({ view: "game", size: dimension * dimension });
  };

  public render(): React.ReactNode {
    if (this.state.view == "intro") {
      return <Intro onChange={this.handleChangeView} />;
    } else {
      return <Game boardSize={this.state.size} />;
    }
  }
}

render(<App />, document.getElementById("root"));

import * as React from "react";
import { render } from "react-dom";
import Game from "./components/game/Game";
import Intro from "./components/Intro";

export interface IAppProps {}

export interface IAppState {
  view: string;
  size: number;
  ai: boolean;
}

class App extends React.Component<IAppProps, IAppState> {
  public constructor(props: IAppProps) {
    super(props);

    this.state = {
      view: "intro",
      size: 9,
      ai: false
    };
  }

  public handleChangeView(dimension: number = 3, ai: boolean = false): void {
    this.setState(state => {
      return {
        view: state.view === "game" ? "intro" : "game",
        size: dimension * dimension,
        ai: ai
      };
    });
  }

  public render(): React.ReactNode {
    if (this.state.view == "intro") {
      return (
        <Intro
          onChangeScreen={(dimension, ai) =>
            this.handleChangeView(dimension, ai)
          }
        />
      );
    } else {
      return (
        <Game
          boardSize={this.state.size}
          ai={this.state.ai}
          onChangeScreen={() => this.handleChangeView()}
        />
      );
    }
  }
}

render(<App />, document.getElementById("root"));

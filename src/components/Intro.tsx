import * as React from "react";

export interface IIntroProps {
  onChangeScreen(dimension: number, ai: boolean): void;
}

export interface IIntroState {
  dimension: string;
  ai: boolean;
}

export default class Intro extends React.Component<IIntroProps, IIntroState> {
  public constructor(props: IIntroProps) {
    super(props);

    this.state = {
      dimension: "3",
      ai: false
    };
  }

  public handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ dimension: event.target.value });
  }

  public handleInputChange() {
    this.setState(state => {
      return { ai: !state.ai };
    });
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    this.props.onChangeScreen(parseInt(this.state.dimension), this.state.ai);
  };

  public render() {
    return (
      <div className="content">
        <h1>Welcome to TicTacToe in ReactJS using TypeScript</h1>
        <br />
        <form className="center-form" onSubmit={this.handleSubmit}>
          <label>
            Size of grid dimension:
            <br />
            <input
              type="number"
              min="3"
              value={this.state.dimension}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.handleChange(event)
              }
            />
          </label>
          <br />
          <label>
            <input
              name="isGoing"
              type="checkbox"
              checked={this.state.ai}
              onChange={() => this.handleInputChange()}
            />
            Play against AI
          </label>
          <br />
          <input type="submit" value="Play" />
        </form>
      </div>
    );
  }
}

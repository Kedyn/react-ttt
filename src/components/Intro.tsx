import * as React from "react";

export interface IIntroProps {
  onChange(size: number): void;
}

export interface IIntroState {
  size: string;
}

export default class Intro extends React.Component<IIntroProps, IIntroState> {
  public constructor(props: IIntroProps) {
    super(props);

    this.state = {
      size: "3"
    };
  }

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ size: event.target.value });
  };

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    this.props.onChange(parseInt(this.state.size));
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
              value={this.state.size}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <input type="submit" value="Play" />
        </form>
      </div>
    );
  }
}

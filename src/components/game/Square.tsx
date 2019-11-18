import * as React from "react";

export interface ISquareProps {
  onClick(): void;
  value: string;
}

export interface ISquareState {}

export default class Square extends React.Component<
  ISquareProps,
  ISquareState
> {
  constructor(props: ISquareProps) {
    super(props);

    this.state = {};
  }

  public render(): React.ReactNode {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

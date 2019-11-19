import * as React from "react";

export interface ISquareProps {
  onClick(): void;
  value: string;
  winner: boolean;
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
    let class_name = "square";

    if (this.props.winner) class_name += " win";

    return (
      <button className={class_name} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

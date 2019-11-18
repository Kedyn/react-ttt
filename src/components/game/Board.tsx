import * as React from "react";
import Square from "./Square";

export interface IBoardProps {
  squares: Array<string>;
  onClick(i: number): void;
}

export interface IBoardState {}

export default class Board extends React.Component<IBoardProps, IBoardState> {
  constructor(props: IBoardProps) {
    super(props);

    this.state = {};
  }

  public render(): React.ReactNode {
    const { squares } = this.props;

    const squares_per_row: number = Math.sqrt(squares.length);

    let content: Array<React.ReactNode> = [];

    for (
      let start_index: number = 0;
      start_index < squares.length;
      start_index += squares_per_row
    ) {
      const current_squares: Array<string> = squares.slice(
        start_index,
        start_index + squares_per_row
      );

      content.push(
        <div key={start_index} className="board-row">
          {current_squares.map((square, index) => (
            <Square
              key={start_index + index}
              value={square}
              onClick={() => this.props.onClick(start_index + index)}
            />
          ))}
        </div>
      );
    }

    return <React.Fragment>{content}</React.Fragment>;
  }
}

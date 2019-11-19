import * as React from "react";
import Square from "./Square";

export interface IBoardProps {
  squares: Array<string>;
  onClick(i: number): void;
  winningIndices: Array<number>;
}

export interface IBoardState {}

export default class Board extends React.Component<IBoardProps, IBoardState> {
  constructor(props: IBoardProps) {
    super(props);

    this.state = {};
  }

  public render(): React.ReactNode {
    const { squares, winningIndices } = this.props;

    const squares_per_row: number = Math.sqrt(squares.length);

    let content: Array<React.ReactNode> = [];

    for (let row: number = 0; row < squares_per_row; row++) {
      let row_content: Array<React.ReactNode> = [];

      for (let col: number = 0; col < squares_per_row; col++) {
        const index: number = row * squares_per_row + col;
        const is_winner: boolean = winningIndices.includes(index);

        row_content.push(
          <Square
            key={index}
            value={squares[index]}
            onClick={() => this.props.onClick(index)}
            winner={is_winner}
          />
        );
      }

      content.push(
        <div key={row} className="board-row">
          {row_content}
        </div>
      );
    }

    return <React.Fragment>{content}</React.Fragment>;
  }
}

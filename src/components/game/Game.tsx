import * as React from "react";
import { calculateWinner } from "../../tools/tttWinner";
import Board from "./Board";

export interface IGameProps {
  boardSize: number;
}

export interface ISquareObjects {
  squares: Array<string>;
}

export interface IGameState {
  history: Array<ISquareObjects>;
  stepNumber: number;
  xIsNext: boolean;
}

export default class Game extends React.Component<IGameProps, IGameState> {
  public constructor(props: IGameProps) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(props.boardSize).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  public handleClick(i: number): void {
    const history: Array<ISquareObjects> = this.state.history.slice(
      0,
      this.state.stepNumber + 1
    );
    const current: ISquareObjects = history[history.length - 1];
    const squares: Array<string> = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  public jumpTo(step: number): void {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  public render(): React.ReactNode {
    const history: Array<ISquareObjects> = this.state.history;
    const current: ISquareObjects = history[this.state.stepNumber];
    const winner: string = calculateWinner(current.squares);

    const moves: React.ReactNode = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status: string;

    if (winner) {
      status = "Winner: " + winner;
    } else {
      if (current.squares.filter(value => value === null).length) {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      } else {
        status = "It's a tie... refresh the page to untie it.";
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

import * as React from "react";
import { calculateWinner, IWinner } from "../../tools/tttWinner";
import Board from "./Board";
import { aiMove } from "../../tools/ai";

export interface IGameProps {
  boardSize: number;
  ai: boolean;
  onChangeScreen(): void;
}

export interface ISquareObjects {
  squares: Array<string>;
  move: number;
}

export interface IGameState {
  history: Array<ISquareObjects>;
  stepNumber: number;
  xIsNext: boolean;
  order: string;
}

export default class Game extends React.Component<IGameProps, IGameState> {
  public constructor(props: IGameProps) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(props.boardSize).fill(null),
          move: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      order: "Descending"
    };
  }

  private aiMove(): void {
    const squares: Array<string> = this.state.history[this.state.stepNumber]
      .squares;
    const winner: string = calculateWinner(squares).winner;

    if (!this.state.xIsNext && !winner && this.props.ai) {
      this.handleClick(aiMove(squares));
    }
  }

  public handleClick(i: number): void {
    const history: Array<ISquareObjects> = this.state.history.slice(
      0,
      this.state.stepNumber + 1
    );
    const current: ISquareObjects = history[history.length - 1];
    const squares: Array<string> = current.squares.slice();
    const winner: string = calculateWinner(squares).winner;

    if (winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState(
      state => {
        return {
          history: history.concat([
            {
              squares: squares,
              move: i
            }
          ]),
          stepNumber: history.length,
          xIsNext: !state.xIsNext
        };
      },
      () => this.aiMove()
    );
  }

  public jumpTo(step: number): void {
    this.setState(
      {
        stepNumber: step,
        xIsNext: step % 2 === 0
      },
      () => this.aiMove()
    );
  }

  public changeOrder(): void {
    this.setState(state => {
      return {
        order: state.order === "Descending" ? "Ascending" : "Descending"
      };
    });
  }

  public render(): React.ReactNode {
    const { history, stepNumber, order } = this.state;
    const { onChangeScreen, boardSize, ai } = this.props;

    const current: ISquareObjects = history[stepNumber];
    const winning_conditions: IWinner = calculateWinner(current.squares);
    const winner: string = winning_conditions.winner;
    const squares_per_row: number = Math.sqrt(current.squares.length);

    let moves: Array<React.ReactNode> = history.map((step, move) => {
      let desc_content: React.ReactNode;
      let desc: string = "Go to game start";

      if (move) {
        const row: number = Math.floor(step.move / squares_per_row) + 1;
        const col: number = (step.move % squares_per_row) + 1;
        desc = "Go to move #" + move + " (" + row + "," + col + ")";
      }

      desc_content = <React.Fragment>{desc}</React.Fragment>;

      if (move === stepNumber) {
        desc_content = (
          <React.Fragment>
            <strong>{desc}</strong>
          </React.Fragment>
        );
      }

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc_content}</button>
        </li>
      );
    });

    if (order === "Ascending") moves = moves.reverse();

    let status: React.ReactNode;

    if (winner) {
      status = (
        <React.Fragment>
          Winner: {winner}...
          <br />
          <button onClick={() => onChangeScreen()}>
            Restart (Go back to menu!)
          </button>
        </React.Fragment>
      );
    } else if (current.squares.filter(value => value === null).length) {
      status = (
        <React.Fragment>
          Next player: {this.state.xIsNext ? "X" : "O"}
        </React.Fragment>
      );
    } else {
      status = (
        <React.Fragment>
          It's a tie...
          <br />
          <button onClick={() => onChangeScreen()}>
            Untie the tie! (Go back to menu!)
          </button>
        </React.Fragment>
      );
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winningIndices={winning_conditions.indices}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.changeOrder()}>{order}</button>
          <ol>{moves}</ol>
        </div>
        {boardSize > 9 && ai && (
          <div>
            Because the grid is too big, the AI can only look 2 steps ahead...
            gl hf!
          </div>
        )}
      </div>
    );
  }
}

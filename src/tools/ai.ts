import { calculateWinner } from "./tttWinner";

interface IScore {
  score: number;
  index: number;
}

function getEmptyIndices(board: Array<string>): Array<number> {
  const answer: Array<number> = [];

  board.forEach((element, index) => {
    if (element === null) answer.push(index);
  });

  return answer;
}

function getScore(board: Array<string>): number {
  const winner: string = calculateWinner(board).winner;

  if (winner === "O") return 7;
  else if (winner === "X") return -7;

  return 0;
}

function minimax(
  board: Array<string>,
  depth: number,
  maximize: boolean
): IScore {
  const empty_indices: Array<number> = getEmptyIndices(board);
  const current_score: number = getScore(board);

  if (empty_indices.length === 0 || current_score !== 0 || depth === 0) {
    return { score: current_score, index: null };
  }

  if (maximize) {
    let best: IScore = { score: -9, index: null };

    empty_indices.forEach(empty_index => {
      board[empty_index] = "O";

      const value: IScore = minimax(board, depth - 1, false);

      if (value.score > best.score) {
        best = { score: value.score, index: empty_index };
      }

      board[empty_index] = null;
    });

    return best;
  } else {
    let worst: IScore = { score: 9, index: null };

    empty_indices.forEach(empty_index => {
      board[empty_index] = "X";

      const value: IScore = minimax(board, depth - 1, true);

      if (value.score < worst.score) {
        worst = { score: value.score, index: empty_index };
      }

      board[empty_index] = null;
    });

    return worst;
  }
}

export function aiMove(board: Array<string>): number {
  let depth = getEmptyIndices(board).length;

  if (board.length > 9) {
    depth = Math.min(getEmptyIndices(board).length, 2);
  }

  return minimax(board, depth, true).index;
}

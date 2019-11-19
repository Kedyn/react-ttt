export interface IWinner {
  winner: string;
  indices: Array<number>;
}

export function calculateWinner(squares: Array<string>): IWinner {
  const squares_per_row: number = Math.sqrt(squares.length);

  let winner: string = null;
  let found_winner: boolean = false;
  let row: number = 0;

  let horizontal: boolean = false;
  let horizontal_failed: boolean = false;
  let vertical: boolean = false;
  let vertical_failed: boolean = false;

  let horizontal_indices: Array<number>;
  let vertical_indices: Array<number>;

  let backward_slash: boolean = false;
  let backward_slash_failed: boolean = false;
  let forward_slash: boolean = false;
  let forward_slash_failed: boolean = false;

  let backward_slash_prev: string = squares[0];
  let forward_slash_prev: string = squares[squares_per_row - 1];

  let backward_slash_indices: Array<number> = [];
  let forward_slash_indices: Array<number> = [];

  let winning_indices: Array<number> = [];

  while (row < squares_per_row && !found_winner) {
    let col: number = 0;

    let horizontal_prev: string = squares[row * squares_per_row];
    let vertical_prev: string = squares[row];

    horizontal_indices = [];
    vertical_indices = [];

    while (col < squares_per_row && !found_winner) {
      const horizontal_index: number = row * squares_per_row + col;
      const vertical_index: number = col * squares_per_row + row;
      const current_horizontal: string = squares[horizontal_index];
      const current_vertical: string = squares[vertical_index];

      horizontal =
        horizontal_prev === current_horizontal && current_horizontal !== null;

      vertical =
        vertical_prev === current_vertical && current_vertical !== null;

      horizontal_prev = current_horizontal;

      vertical_prev = current_vertical;

      if (!horizontal) horizontal_failed = true;

      if (!vertical) vertical_failed = true;

      horizontal_indices.push(horizontal_index);
      vertical_indices.push(vertical_index);

      col++;
    }

    if (horizontal && !horizontal_failed) {
      winner = horizontal_prev;

      winning_indices = horizontal_indices;

      found_winner = true;

      break;
    }

    if (vertical && !vertical_failed) {
      winner = vertical_prev;

      winning_indices = vertical_indices;

      found_winner = true;

      break;
    }

    const backward_slash_index: number = row * (squares_per_row + 1);
    const forward_slash_index: number = (row + 1) * (squares_per_row - 1);
    const current_backward_slash: string = squares[backward_slash_index];
    const current_forward_slash: string = squares[forward_slash_index];

    backward_slash =
      backward_slash_prev === current_backward_slash &&
      current_backward_slash !== null;

    forward_slash =
      forward_slash_prev === current_forward_slash &&
      current_forward_slash !== null;

    backward_slash_prev = current_backward_slash;

    forward_slash_prev = current_forward_slash;

    if (!backward_slash) backward_slash_failed = true;

    if (!forward_slash) forward_slash_failed = true;

    horizontal_failed = false;

    vertical_failed = false;

    backward_slash_indices.push(backward_slash_index);
    forward_slash_indices.push(forward_slash_index);

    row++;
  }

  if (!found_winner) {
    if (backward_slash && !backward_slash_failed) {
      return { winner: backward_slash_prev, indices: backward_slash_indices };
    }
    if (forward_slash && !forward_slash_failed) {
      return { winner: forward_slash_prev, indices: forward_slash_indices };
    }
  }

  return { winner: winner, indices: winning_indices };
}

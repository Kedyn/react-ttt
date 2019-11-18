export function calculateWinner(squares: Array<string>): string {
  const squares_per_row: number = Math.sqrt(squares.length);

  let winner: string = null;
  let found_winner: boolean = false;
  let row: number = 0;

  let horizontal: boolean = false;
  let horizontal_failed: boolean = false;
  let vertical: boolean = false;
  let vertical_failed: boolean = false;

  let backward_slash: boolean = false;
  let backward_slash_failed: boolean = false;
  let forward_slash: boolean = false;
  let forward_slash_failed: boolean = false;

  let backward_slash_prev: string = squares[0];
  let forward_slash_prev: string = squares[squares_per_row - 1];

  while (row < squares_per_row && !found_winner) {
    let col: number = 0;

    let horizontal_prev: string = squares[row * squares_per_row];
    let vertical_prev: string = squares[row];

    while (col < squares_per_row && !found_winner) {
      const current_horizontal: string = squares[row * squares_per_row + col];
      const current_vertical: string = squares[col * squares_per_row + row];

      horizontal =
        horizontal_prev === current_horizontal && current_horizontal !== null;

      vertical =
        vertical_prev === current_vertical && current_vertical !== null;

      horizontal_prev = current_horizontal;

      vertical_prev = current_vertical;

      if (!horizontal) horizontal_failed = true;

      if (!vertical) vertical_failed = true;

      col++;
    }

    if (horizontal && !horizontal_failed) {
      winner = horizontal_prev;

      break;
    }

    if (vertical && !vertical_failed) {
      winner = vertical_prev;

      break;
    }

    const current_backward_slash = squares[row * (squares_per_row + 1)];
    const current_forward_slash = squares[(row + 1) * (squares_per_row - 1)];

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

    row++;
  }

  if (backward_slash && !backward_slash_failed) return backward_slash_prev;
  if (forward_slash && !forward_slash_failed) return forward_slash_prev;

  return winner;
}

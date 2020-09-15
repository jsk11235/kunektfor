export function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function scoreBoard(boardToScore) {
  if (checkBoard(boardToScore) === 1) {
    return 10000;
  }
  if (checkBoard(boardToScore) === 2) {
    return -10000;
  }
  let score = 0;
  for (let x = 0; x < boardToScore.length; x++) {
    for (let y = 0; y < boardToScore[0].length; y++) {
      for (let z = -1; z < 2; z++) {
        for (let w = -1; w < 2; w++) {
          if (
            boardToScore[x]+1 &&
            boardToScore[x][y]+1 &&
            boardToScore[x + w]+1 &&
            boardToScore[x + w][y + z]+1 &&
            boardToScore[x + 2 * w] +1&&
            boardToScore[x + 2 * w][y + 2 * z]+1 &&
            boardToScore[x + 3 * w]+1&&
            boardToScore[x + 3 * w][y + 3 * z]+1

            &&
            (arraysEqual(
              [
                boardToScore[x][y],
                boardToScore[x + w][y + z],
                boardToScore[x + 2 * w][y + 2 * z],
                boardToScore[x + 3 * w][y + 3 * z],
              ],
              [0, 1, 1, 1]
            ) || arraysEqual(
            [
              boardToScore[x][y],
              boardToScore[x + w][y + z],
              boardToScore[x + 2 * w][y + 2 * z],
              boardToScore[x + 3 * w][y + 3 * z],
            ],
            [1, 0, 1, 1]
            ))
          ) {
            score=score+1.5
          }
          if (boardToScore[x]+1 &&
            boardToScore[x][y] +1&&
            boardToScore[x + w]+1 &&
            boardToScore[x + w][y + z]+1 &&
            boardToScore[x + 2 * w]+1&&
            boardToScore[x + 2 * w][y + 2 * z]+1 &&
            boardToScore[x + 3 * w]+1&&
            boardToScore[x + 3 * w][y + 3 * z]+1

            &&
            (arraysEqual(
              [
                boardToScore[x][y],
                boardToScore[x + w][y + z],
                boardToScore[x + 2 * w][y + 2 * z],
                boardToScore[x + 3 * w][y + 3 * z],
              ],
              [0, 2, 2, 2]
            ) ||
            arraysEqual(
              [
                boardToScore[x][y],
                boardToScore[x + w][y + z],
                boardToScore[x + 2 * w][y + 2 * z],
                boardToScore[x + 3 * w][y + 3 * z],
              ],
              [2, 0, 2, 2]
            ))
        )
          {
            score--
          }

        }
      }
    }
  }
  return score
}

export function checkBoard(board) {
  let won = 0;
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      for (let z = 1; z < 3; z++) {
        if (
          x > 2 &&
          y < board[0].length - 3 &&
          arraysEqual(
            [
              board[x][y],
              board[x - 1][y + 1],
              board[x - 2][y + 2],
              board[x - 3][y + 3],
            ],
            [z, z, z, z]
          )
        ) {
          won = z;
        }

        if (
          y < board[0].length - 3 &&
          arraysEqual(
            [board[x][y], board[x][y + 1], board[x][y + 2], board[x][y + 3]],
            [z, z, z, z]
          )
        ) {
          won = z;
        }

        if (
          x > 2 &&
          arraysEqual(
            [board[x][y], board[x - 1][y], board[x - 2][y], board[x - 3][y]],
            [z, z, z, z]
          )
        ) {
          won = z;
        }
        if (
          y < board[0].length - 3 &&
          x < board.length - 3 &&
          arraysEqual(
            [
              board[x][y],
              board[x + 1][y + 1],
              board[x + 2][y + 2],
              board[x + 3][y + 3],
            ],
            [z, z, z, z]
          )
        ) {
          won = z;
        }
      }
    }
  }
  return won;
}

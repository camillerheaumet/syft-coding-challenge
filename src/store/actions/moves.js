export const END_GAME = 'END_GAME';
export const SELECT_CELL = 'SELECT_CELL';
export const RESET_GAME = 'RESET_GAME';
export const WIN_CONDITIONS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

export function selectCell(currentPlayer, row, col) {
  return {
    type: SELECT_CELL,
    currentPlayer,
    row,
    col
  }
}

export function resetGame() {
  return {
    type: RESET_GAME
  }
}

export function checkBoard(board, currentPlayer, row, col) {
  const newBoard = board
  newBoard[row][col] = currentPlayer
  const flatBoard = newBoard.flat(1)
  if (WIN_CONDITIONS.some(idxs => flatBoard[idxs[0]] === currentPlayer && flatBoard[idxs[1]] === currentPlayer && flatBoard[idxs[2]] === currentPlayer)) {
    return function (dispatch) {
      dispatch(endedGame(currentPlayer));
    }
  }
  if (!newBoard.some(rows => rows.includes(null))) {
    return function (dispatch) {
      dispatch(drawGame());
    }
  }

  return {
    type: 'CHECK_BOARD'
  }
}
  
export function drawGame() {
  const resp = window.confirm("Game Over\nDraw!\nWould you like to play again?");
  if (resp) {
    return function (dispatch) {
      dispatch(resetGame());
    }
  }
  return {
    type: 'DRAW_GAME'
  }
}

export function endedGame(currentPlayer) {
  const resp = window.confirm(`Player ${currentPlayer} won!\nYAAAAYYYYY!!!\nWould you like to play again?`);
  if (resp) {
    return function (dispatch) {
      dispatch(resetGame());
    }
  }
  return {
    type: END_GAME,
    currentPlayer
  }
}

export function selectCellAndCheck(board, currentPlayer, row, col) {
  return function (dispatch) {
    dispatch(selectCell(currentPlayer, row, col));
    dispatch(checkBoard(board, currentPlayer, row, col));
  }
}
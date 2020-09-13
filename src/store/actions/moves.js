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

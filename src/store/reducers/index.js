import { combineReducers } from "redux";
import { END_GAME, SELECT_CELL, RESET_GAME, WIN_CONDITIONS } from "../actions/moves";

export const createBoard = (i) =>
  Array(i)
    .fill(null)
    .map(_ =>
      Array(i)
        .fill(null)
    )

export const checkForWinner = (board, action) => {
  const flatBoard = board.flat(1);
  const player = action.currentPlayer;
  if (WIN_CONDITIONS.some(idxs => flatBoard[idxs[0]] === player && flatBoard[idxs[1]] === player && flatBoard[idxs[2]] === player)) {
    return END_GAME
  }
  return action.type
}

export const board = (state = createBoard(3), action) => {
  switch (action.type) {
    case SELECT_CELL: {
      const newBoard = JSON.parse(JSON.stringify(state))
      newBoard[action.row][action.col] = action.currentPlayer
      action.type = checkForWinner(newBoard, action);
      return newBoard
    }
    case RESET_GAME: {
      const newBoard = JSON.parse(JSON.stringify(createBoard(3), action))
      return newBoard
    }
    default: {
      return state
    }
  }
}

export const game = (state = { currentPlayer: 'X', winner: null }, action) => {
  switch (action.type) {
    case SELECT_CELL: {
      return {
        ...state,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X'
      }
    }
    case RESET_GAME: {
      return {
        ...state,
        currentPlayer: 'X'
      }
    }
    case END_GAME: {
      alert(`Player ${state.currentPlayer} won!\nYAAAAYYYYY!!!`);
      return {
        ...state,
        winner: state.currentPlayer
      }
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  board,
  game
})

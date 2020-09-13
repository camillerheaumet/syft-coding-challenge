import { combineReducers } from "redux";
import { END_GAME, SELECT_CELL, RESET_GAME } from "../actions/moves";

export const createBoard = (i) =>
  Array(i)
    .fill(null)
    .map(_ =>
      Array(i)
        .fill(null)
    )

export const board = (state = createBoard(3), action) => {
  switch (action.type) {
    case SELECT_CELL: {
      const newBoard = JSON.parse(JSON.stringify(state))
      newBoard[action.row][action.col] = action.currentPlayer
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

export const game = (state = { currentPlayer: 'X', winner: null, ended: false }, action) => {
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
        currentPlayer: 'X',
        ended: false
      }
    }
    case END_GAME: {
      return {
        ...state,
        winner: state.currentPlayer === 'X' ? 'O' : 'X',
        ended: true
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

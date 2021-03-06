import React from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { drawGame, resetGame, selectCellAndCheck } from '../../store/actions/moves';

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

const getRandomCell = (i) => Math.floor(Math.random() * i)

export const Board = () => {
  const board = useSelector(selectBoard)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()
  let grid = [];

  board.forEach((row, idx) => {
    let rowID = `row${idx}`;
    let cells = [];
    
    row.forEach((cell, i) => {
      let cellID = `cell${i}-${idx}`;
      cells.push(<div onClick={!game.ended ? () => handleCellClick(idx, i) : undefined} className="cell" key={cellID} id={cellID}>{cell}</div>)
    });

    grid.push(<div className="row" key={idx} id={rowID}>{cells}</div>);
  })

  const handleCellClick = (rowIdx, colIdx) => {
    if (board[rowIdx][colIdx] === null) {
      dispatch(selectCellAndCheck(board, game.currentPlayer, rowIdx, colIdx));
    } else {
      alert('This cell is already taken.\nPlease choose a different one.');
    }
  }

  const findRandomEmpty = () => {
    if(board.some(rows => rows.includes(null))) {
      let randomCell = [getRandomCell(board.length), getRandomCell(board.length)];
      while(board[randomCell[0]][randomCell[1]] !== null) {
        randomCell = [getRandomCell(board.length), getRandomCell(board.length)];
      }
      dispatch(selectCellAndCheck(board, game.currentPlayer, randomCell[0], randomCell[1]));
    } else {
      dispatch(drawGame());
    }
  }

  return (
    <div className="Board">
      <div className='title'>It is Player {game.currentPlayer}'s turn</div>
      Board:
      <div className='grid'>{grid}</div>
      <button onClick={!game.ended ? () => findRandomEmpty() : undefined}>Random move for player {game.currentPlayer}</button>
      <button onClick={() => dispatch(resetGame())}>Reset Game</button>
      {game.winner && <div>Last winner was Player {game.winner}</div>}
    </div>
  )
}

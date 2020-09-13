import React from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCell } from '../../store/actions/moves';

const selectBoard = (state) => state.board
const selectGame = (state) => state.game

const getRandomCell = (i) => Math.floor(Math.random() * i)

export const Board = () => {
  const board = useSelector(selectBoard)
  const game = useSelector(selectGame)
  const dispatch = useDispatch()

  let grid = [];
  board.map((row, idx) => {
    let rowID = `row${idx}`;
    let cells = [];
    
    row.map((cell, i) => {
      let cellID = `cell${i}-${idx}`;
      cells.push(<div className="cell" key={cellID} id={cellID}>{cell}</div>)
    });

    grid.push(<div className="row" key={idx} id={rowID}>{cells}</div>);
  })
  console.log(board)

  return (
    <div className="Board">
      {grid}
      Board: { JSON.stringify(board) }
      <div onClick={() => dispatch(
        selectCell(
          game.currentPlayer,
          getRandomCell(board.length),
          getRandomCell(board.length)
        )
      )}>Player {game.currentPlayer}</div>
    </div>
  )
}

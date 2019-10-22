
import React from 'react'
import styled, {keyframes}from 'styled-components'

const Cell = (props) => {
  const {row, col, isFilled, wasKilled, onMouseDown, onMouseEnter, onMouseUp} = props;

  let cell;
  if (isFilled) {
    cell = <StyledCell
      isFilled
      onMouseDown={()=> onMouseDown(row, col)}
      onMouseEnter={()=> onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()} />
  }
  else if (wasKilled) {
    cell  = <StyledCell
      wasKilled
      onMouseDown={()=> onMouseDown(row, col)}
      onMouseEnter={()=> onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()} />
  }
  else {
    cell = <StyledCell
      onMouseDown={()=> onMouseDown(row, col)}
      onMouseEnter={()=> onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()} />
  }
  return (<>{cell}</>)
}

const killAnimation = keyframes `
  from {
    transform: scale(0.3);
    background-color: rgba(0, 0, 66, 0.75);
    border-radius: 100%;
  }
  to {
    transform: scale(1);
    background-color: rgba(0, 190, 218, 0.75);
  }
`

const StyledCell = styled.div `
  width: 20px;
  height: 20px;
  outline: 1px solid palevioletred;
  display: inline-block;
  background-color: ${props => props.isFilled ? "black" : "white"};
  animation: ${props => props.wasKilled ? killAnimation : ""} 1s linear forwards;
  `



export default Cell;

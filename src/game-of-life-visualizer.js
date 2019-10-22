
import React from 'react'
import styled from 'styled-components'
import Cell from './Cell.js'
import { createGlobalStyle } from 'styled-components'


export default class GameOfLifeVisualizer extends React.Component {

  constructor(props) {
    super(props);
    const grid = this.createGrid('');
    const currGrid = [];
    currGrid.push(grid);
    this.state = {
      grid: currGrid,
      showModal: false,
      mouseIsPressed: false,
    };
  }

  handleTypeClick(type) {
    const grid = this.createGrid(type);
    const currGrid = this.state.grid;
    currGrid.push(grid);
    this.setState({grid: currGrid});
  }

  handleStepClick() {
    const grid = this.step();
    const currGrid = this.state.grid;
    currGrid.push(grid);
    this.setState({grid: currGrid});
  }

  handleBackBtnClick() {
    if (this.state.grid.length > 2) {
      let grid = this.state.grid;
      grid.pop();
      this.setState({grid});
    }
  }

  handleAutoRunClick() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const currGrid = this.state.grid;
      const newGrid = this.step();
      currGrid.push(newGrid);
      this.setState({grid: currGrid});
    }, 100)
  }

  handleStopClick() {
    clearInterval(this.interval);
  }

  handleResetClick() {
    // Stop interval
    clearInterval(this.interval);

    const grid = this.createGrid('');
    const currGrid =  [];
    currGrid.push(grid);
    this.setState({grid: currGrid});
  }

  handleHowItWorksClick = () => {
    let show = !this.state.showModal;
    this.setState({showModal: show});
  }

  componentDidMount() {
    const grid = this.createGrid('');
    const currGrid = this.state.grid;
    currGrid.push(grid);
    this.setState({grid: currGrid});
  }

  step() {
    const newGrid = this.createGrid('');
    let currGrid = this.state.grid[this.state.grid.length-1];

    for (let row = 0; row < 40; ++row) {
      for (let col = 0; col < 40; ++col) {
        let neighbors = 0;

        /*
          Any live cell with fewer than two live neighbours dies, as if by underpopulation.
          Any live cell with two or three live neighbours lives on to the next generation.
          Any live cell with more than three live neighbours dies, as if by overpopulation.
          Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        */

        /*
        Edge cases:
        - On left-most or right-most column
        - On top-most or bottom-most row
        - Corners
        */
        // General cases
        if (row > 0 && row < 39 && col > 0 && col < 39) {
          // top
          if (currGrid[row-1][col].isFilled) {
            neighbors += 1
          }
          // top-right
          if (currGrid[row-1][col+1].isFilled) {
            neighbors += 1
          }
          // right
          if (currGrid[row][col+1].isFilled) {
            neighbors += 1
          }
          // bottom-right
          if (currGrid[row+1][col+1].isFilled) {
            neighbors += 1
          }
          // bottom
          if (currGrid[row+1][col].isFilled) {
            neighbors += 1
          }
          // bottom-left
          if (currGrid[row+1][col-1].isFilled) {
            neighbors += 1
          }
          // left
          if (currGrid[row][col-1].isFilled) {
            neighbors += 1
          }
          // top-left
          if (currGrid[row-1][col-1].isFilled) {
            neighbors += 1
          }
        }
        // Corners
        // Top-left
        else if (row === 0 && col === 0) {
          // right
          if (currGrid[row][col+1].isFilled) {
            neighbors += 1
          }
          // bottom-right
          if (currGrid[row+1][col+1].isFilled) {
            neighbors += 1
          }
          // bottom
          if (currGrid[row+1][col].isFilled) {
            neighbors += 1
          }
        }
        // Top-right
        else if (row === 0 && col === 39) {
          // left
          if (currGrid[row][col-1].isFilled) {
            neighbors += 1
          }
          // bottom-left
          if (currGrid[row+1][col-1].isFilled) {
            neighbors += 1
          }
          // bottom
          if (currGrid[row+1][col].isFilled) {
            neighbors += 1
          }
        }
        // Bottom-right
        else if (row === 39 && col === 39) {
          // Top
          if (currGrid[row-1][col].isFilled) {
            neighbors += 1
          }
          // Top-left
          if (currGrid[row-1][col-1].isFilled) {
            neighbors += 1
          }
          // left
          if (currGrid[row][col-1].isFilled) {
            neighbors += 1
          }
        }
        // bottom-left
        else if (row === 39 && col === 0) {
          // top
          if (currGrid[row-1][col].isFilled) {
            neighbors += 1
          }
          // top-right
          if (currGrid[row-1][col+1].isFilled) {
            neighbors += 1
          }
          // right
          if (currGrid[row][col+1].isFilled) {
            neighbors += 1
          }
        }
        // Top Row
        else if (row === 0) {
          // right
          if (currGrid[row][col+1].isFilled) {
            neighbors += 1
          }
          // Bottom-right
          if (currGrid[row+1][col+1].isFilled) {
            neighbors += 1
          }
          // bottom
          if (currGrid[row+1][col].isFilled) {
            neighbors += 1
          }
          // bottom-left
          if (currGrid[row+1][col-1].isFilled) {
            neighbors += 1
          }
          // left
          if (currGrid[row][col-1].isFilled) {
            neighbors += 1
          }
        }
        // Bottom row
        else if (row === 39) {
          // top
          if (currGrid[row-1][col].isFilled) {
            neighbors += 1
          }
          // top-right
          if (currGrid[row-1][col+1].isFilled) {
            neighbors += 1
          }
          // right
          if (currGrid[row][col+1].isFilled) {
            neighbors += 1
          }
          // left
          if (currGrid[row][col-1].isFilled) {
            neighbors += 1
          }
          // top-left
          if (currGrid[row-1][col-1].isFilled) {
            neighbors += 1
          }
        }
        // Left column
        else if (col === 0) {
          // top
          if (currGrid[row-1][col].isFilled) {
            neighbors += 1
          }
          // top right
          if (currGrid[row-1][col+1].isFilled) {
            neighbors += 1
          }
          // right
          if (currGrid[row][col+1].isFilled) {
            neighbors += 1
          }
          // bottom right
          if (currGrid[row+1][col+1].isFilled) {
            neighbors += 1
          }
          // bottom
          if (currGrid[row+1][col].isFilled) {
            neighbors += 1
          }
        }
        // right column
        else if (col === 39) {
          // top
          if (currGrid[row-1][col].isFilled) {
            neighbors += 1
          }
          // bottom
          if (currGrid[row+1][col].isFilled) {
            neighbors += 1
          }
          // bottom left
          if (currGrid[row+1][col-1].isFilled) {
            neighbors += 1
          }
          // left
          if (currGrid[row][col-1].isFilled) {
            neighbors += 1
          }
          // top left
          if (currGrid[row-1][col-1].isFilled) {
            neighbors += 1
          }
        }

        /////////

        if (!currGrid[row][col].isFilled) {
          if (neighbors === 3) {
            newGrid[row][col].isFilled = true;
            newGrid[row][col].wasKilled = currGrid[row][col].wasKilled;
          } else {
            newGrid[row][col].isFilled = false;
            newGrid[row][col].wasKilled = currGrid[row][col].wasKilled;
          }
        } else {
          if (neighbors === 2 || neighbors === 3) {
            newGrid[row][col].isFilled = true;
            newGrid[row][col].wasKilled = currGrid[row][col].wasKilled;
          } else {
            newGrid[row][col].wasKilled = true;
            newGrid[row][col].isFilled = false;
          }
        }
      }
    }
    return newGrid;
  }

  createGrid = (type) => {
    const grid = [];

    if (type === '') {
      for (let row = 0; row < 40; ++row) {
        const currentRow = [];
        for (let col = 0; col < 40; ++col) {
          currentRow.push(createCell(row, col, false));
        }
        grid.push(currentRow);
      }
    }
    else if (type === 'Pulsar') {
      for (let row = 0; row < 40; ++row) {
        const currentRow = [];
        for (let col = 0; col < 40; ++col) {
          if ((col === 0 + 4 || col === 5 + 4 || col === 7 + 4 || col === 12 + 4) &&
            (((row >= 2 + 11 && row <= 4 + 11) || (row >= 8 + 11 && row <= 10 + 11)))) {
              currentRow.push(createCell(row, col, true));
          }
          else if (((col >= 2 + 4 && col <= 4 + 4) || (col >= 8 + 4 && col <= 10 + 4)) &&
            (row === 0 + 11 || row === 5 + 11 || row === 7 + 11 || row === 12 + 11)) {
            currentRow.push(createCell(row, col, true));
          }
          else {
            currentRow.push(createCell(row, col, false));
          }
        }
        grid.push(currentRow);
      }
    }
    else if (type === 'Glider') {
      for (let row = 0; row < 40; ++row) {
        const currentRow = [];
        for (let col = 0; col < 40; ++col) {
          if (col === 2 && (row >= 0 && row <= 2)) {
            currentRow.push(createCell(row, col, true));
          }
          else if (row === 1 && col === 0) {
            currentRow.push(createCell(row, col, true));
          }
          else if (row === 2 && col === 1) {
            currentRow.push(createCell(row, col, true));
          }
          else {
            currentRow.push(createCell(row, col, false));
          }
        }
        grid.push(currentRow);
      }
    }
    else if (type === 'GosperGlider') {
      for (let row = 0; row < 40; ++row) {
        const currentRow = [];
        for (let col = 0; col < 40; ++col) {
          if ((col === 9 || col === 10) && (row === 1 || row === 2)) {
            currentRow.push(createCell(row, col, true))
          } else if ((col === 7 || col === 8) && (row === 35 || row === 36)) {
            currentRow.push(createCell(row, col, true))
          } else if ((row === 11 || row === 17) && (col >= 9 && col <= 11)) {
            currentRow.push(createCell(row, col, true))
          } else if (col === 7 && row >= 13 && row <= 14) {
            currentRow.push(createCell(row, col, true))
          } else if (col === 13 && row >= 13 && row <= 14) {
            currentRow.push(createCell(row, col, true))
          } else if (col === 8 && (row === 12 || row === 16)) {
            currentRow.push(createCell(row, col, true))
          } else if (col === 12 && (row === 12 || row === 16)) {
            currentRow.push(createCell(row, col, true))
          } else if (col === 10 && (row === 15 || row === 18)) {
            currentRow.push(createCell(row, col, true))
          } else if ((col >= 7 && col <= 9) && (row >= 21 && row <= 22)) {
            currentRow.push(createCell(row, col, true))
          } else if ((col === 6 || col === 10) && row === 23) {
            currentRow.push(createCell(row, col, true))
          } else if (((col >= 5 && col <= 6) || (col >= 10 && col <= 11)) && row === 25) {
            currentRow.push(createCell(row, col, true))
          } else {
            currentRow.push(createCell(row, col, false))
          }
        }
        grid.push(currentRow)
      }
    }
    return grid;
  }

  toggleCell(row, col) {
    console.log('here')
    let currGrid = this.state.grid;
    currGrid[row][col].isFilled = true;
    return currGrid;
  }

  handleClick = () => {
    if (this.state.showModal) {
      this.setState({showModal: false})
    }
  }

  handleMouseDown(row, col) {
    console.log('her')
    const newGrid = this.toggleCell(row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    console.log('her')
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.toggleCell(row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    console.log('here')
    this.setState({mouseIsPressed: false});
  }

  render() {
    return (
      <VisualizerWrapper showModal={this.state.showModal} onClick={() => {this.handleClick()}}>
        <GlobalStyle />
        <HeaderWrapper>
          <AppNameWrapper>
            <h1>Game Of Life Visualizer</h1>
          </AppNameWrapper>
          <ButtonsWrapper>
            <Button onClick={() => {this.handleHowItWorksClick()}}>How it works</Button>
            <Button onClick={() => {this.handleTypeClick('Glider')}}>Glider</Button>
            <Button onClick={() => {this.handleTypeClick('Pulsar')}}>Pulsar</Button>
            <Button onClick={() => {this.handleTypeClick('GosperGlider')}}>GosperGlider</Button>
          </ButtonsWrapper>
        </HeaderWrapper>
        <br /><br />
        <GridWrapper>
          <VisualizerBtns>
            <button onClick={() => this.handleStepClick()}>
              Step
            </button>
            <button onClick={() => this.handleBackBtnClick()} >
              Back
            </button>
            <button onClick={() => this.handleAutoRunClick()} >
              Auto-run
            </button>
            <button onClick={() => this.handleStopClick()} >
              Stop
            </button>
            <button onClick={() => this.handleResetClick()} >
              Reset
            </button>
          </VisualizerBtns>
          <br /><br />
          <Grid>
            {this.state.grid[this.state.grid.length-1].map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col, isFilled, wasKilled} = node;
                    return (
                      <Cell
                        row={row}
                        col={col}
                        isFilled={isFilled}
                        wasKilled={wasKilled}
                        onMouseDown={(row, col) => this.handleMouseDown}
                        onMouseEnter={(row, col) => this.handleMouseEnter}
                        onMouseUp={() => this.handleMouseUp}
                        key={nodeIdx} />
                    )
                  })}
                </div>
              )
            })}
          </Grid>
        </GridWrapper>
        <Div showModal={this.state.showModal}></Div>
        <Modal showModal={this.state.showModal} />

      </VisualizerWrapper>
    )
  }
}

const Modal = (props) => {
  let {showModal} = props
  let mod;
  if (showModal) {
    mod = <StyledModal showModal><Rules /></StyledModal>
  } else {
    mod = <StyledModal />
  }
  return (
    <>{mod}</>
  )
}

const Rules = () => {
  return (
    <div>
      <h3>Rules</h3>
      <ul>
        <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
        <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
        <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
      </ul>
    </div>
  )
}


const Div = styled.div `
  position: fixed;
  display: ${props => props.showModal ? "block" : "none"};
  background: ${props => props.showModal ? "rgba(0,0,0,0.6)" : "none"};
  margin: 0;
  padding: 0;
  min-width: 100%;
  min-height: 150vh;
`

const StyledModal = styled.div `
  position: fixed;
  background-color: white;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props => props.showModal ? "inline-block" : "none"};
`

const createCell = (row, col, isFilled) => ({row, col, isFilled,})

const VisualizerWrapper = styled.div `
  display: flex;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  margin-top: -8px;
  align-self: center;
  flex-direction: column;
  justify-content: center;
`

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  html {
    margin: 0;
  }
`

const HeaderWrapper = styled.div `
  display: flex;
  width: inherit;
  height: auto;
  align-self: center;
  background-color: palevioletred;
  justify-content: center;
  font-size: 0.8rem;

`

const AppNameWrapper = styled.div `
  display: flex;
  justify-content: flex-start;
`

const ButtonsWrapper = styled.div `
  display: flex;
  width: 40vw;
  margin-left: 10vw;
  justify-content: space-around;
`

const VisualizerBtns = styled.div `
  align-self: center;
`

const Grid = styled.div `
  width: 800px;
  height: 800px;
  font-size: 0;
  transform: scaleX(-1) rotate(90deg);
  align-self: center;
`

const GridWrapper = styled.div `
  display: flex;
  width: 100vw;
  height: auto;
  margin: 0;
  padding: 0;
  flex-direction: column;
  align-self: center;
  justify-content: flex-start;
`

const Button = styled.button `
  font-family: sans-serif;
`

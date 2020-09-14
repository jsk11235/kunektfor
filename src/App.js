import React, { useState, useEffect } from "react";
import "./App.css";
import { Slot } from "./Slot";
import { checkBoard, scoreBoard } from "./Utils";
import { Circle } from "./Circle";
import { Button } from "./Button";

function App() {
  function generateEmptyBoard() {
    let tmpBoard = [];
    for (let i = 0; i < 6; i++) {
      tmpBoard.push([]);
      for (let j = 0; j < 7; j++) {
        tmpBoard[i].push(0);
      }
    }
    return tmpBoard;
  }

  function initialize() {
    const tmpBoard = generateEmptyBoard();
    setBoard(tmpBoard);
  }

  const [turn, setTurn] = useState(1);
  const [board, setBoard] = useState([]);
  const [recentMove, setRecentMove] = useState(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => initialize(), []);

  useEffect(() => {
      if (waiting && board) {
        const copy = deepCopy(board);
        const c = nextMove(board, 2);
        setBoard(executeMove(c, copy, 2));
        setWaiting(false);
        setTurn(1);
      }
  }, [waiting]);

  const styles = {
    boardStyle: {
      display: "flex",
      flexWrap: "wrap",
    },
  };

  function executeMove(column, prevBoard, testTurn) {
    for (let rowToPlace = prevBoard.length - 1; rowToPlace >= 0; rowToPlace--) {
      if (prevBoard[rowToPlace][column] === 0) {
        let tempBoard = deepCopy(prevBoard);
        tempBoard[rowToPlace][column] = testTurn;
        return tempBoard;
      }
    }
  }

  function deepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function minimax(givenSituation, depth, player, a, b) {
    if (givenSituation) {
      const boardCheck = checkBoard(givenSituation);
      if (!boardCheck) {
        if (depth === 0) {
          return scoreBoard(givenSituation);
        }
        let endScore = 0;
        if (player === 2) {
          endScore = b;
          let copy = deepCopy(givenSituation);
          for (let move = 0; move < 7; move++) {
            let m = minimax(
              executeMove(move, givenSituation, 2),
              depth - 1,
              1,
              a,
              b
            );
            if (m < endScore) {
              givenSituation = deepCopy(copy);
              endScore = m;
              b = endScore;
            }
            if (a>=b){
              return b
            }
          }
        }
        if (player === 1) {
          endScore = a;
          let copy = deepCopy(givenSituation);
          for (let move = 0; move < 7; move++) {
            let m = minimax(
              executeMove(move, givenSituation, 1),
              depth - 1,
              2,
              a,
              b
            );
            if (m > endScore) {
              givenSituation = deepCopy(copy);
              endScore = m;
              a = endScore;
            }
            if (a >= b) {
              return a;
            }
            givenSituation = deepCopy(copy);
          }
        }
        return endScore;
      } else {
        if (boardCheck === 1) {
          return 10000;
        }
        if (boardCheck === 2) {
          return -10000;
        }
      }
    }
  }

  function nextMove(currentBoard, player) {
    let moveMade = 0;
    if (player === 2) {
      let moveMadeResult = 10000;
      let copyBoard = deepCopy(currentBoard);
      for (let n = 0; n < 7; n++) {
        let res = minimax(
          executeMove(n, currentBoard, player),
          5,
          1,
          -10000,
          10000
        );
        if (res < moveMadeResult) {
          moveMadeResult = res;
          moveMade = n;
        }
        currentBoard = deepCopy(copyBoard);
      }
    }
    if (player === 1) {
      let moveMadeResult = -10000;
      let copyBoard = deepCopy(currentBoard);
      for (let n = 0; n < 7; n++) {
        let res = minimax(
          executeMove(n, currentBoard, player),
          5,
          2,
          -10000,
          10000
        );
        if (res > moveMadeResult) {
          moveMadeResult = res;
          moveMade = n;
        }
        currentBoard = deepCopy(copyBoard);
      }
    }
    return moveMade;
  }
  //console.log(minimax([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[2,0,1,1,0,0,0]],6,2,-10000,10000))
  const won = board ? checkBoard(board) : 0;

  return (
    <div>
      <Button title={"Restart"} onClick={() => initialize()} />
      {won ? (
        <div> player {won === 1 ? "red" : "black"} has won the game </div>
      ) : null}
      <div>
        <Circle value={turn} /> 's turn
      </div>
      <div style={styles.boardStyle}>
        {board.map((row, rowIndex) =>
          row.map((currentPiece, index) => (
            <Slot
              value={currentPiece}
              onClick={() => {
                for (
                  let rowToPlace = board.length - 1;
                  rowToPlace >= 0;
                  rowToPlace--
                ) {
                  if (board[rowToPlace][index] === 0 && !won) {
                    let tempBoard = [...board];
                    tempBoard[rowToPlace][index] = turn;
                    setBoard(tempBoard);
                    setTurn(turn === 1 ? 2 : 1);
                    setRecentMove([rowToPlace, index]);
                    setWaiting(true);
                    return;
                  }
                }
              }}
              selected={
                recentMove &&
                recentMove[0] === rowIndex &&
                recentMove[1] === index
              }
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;

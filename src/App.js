import React, { useState } from "react";
import "./App.css";
import { Slot } from "./Slot";
import { arraysEqual } from "./Utils";
import { Circle } from "./Circle";

function App() {
  let tmpBoard = [];
  for (let i = 0; i < 6; i++) {
    tmpBoard.push([]);
    for (let j = 0; j < 7; j++) {
      tmpBoard[i].push(0);
    }
  }
  const [turn, setTurn] = useState(1);
  const [place, setPlace] = useState(null);
  const [board, setBoard] = useState(tmpBoard);
  const styles = {
    boardStyle: {
      display: "flex",
      flexWrap: "wrap",
    },
  };
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
        if (x < board.length - 3 && y < board[0].length - 3) {
          console.log([
            board[x][y],
            board[x + 1][y + 1],
            board[x + 2][y + 2],
            board[x + 3][y + 3],
          ]);
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

  return (
    <div>
      {won ? (
        <div> player {won === 1 ? "red" : "black"} has won the game </div>
      ) : null}
      <div>
        <Circle value={turn}/> 's turn
      </div>
      <div style={styles.boardStyle}>
        {board.map((row) =>
          row.map((currentPiece, index) => (
            <Slot
              value={currentPiece}
              onClick={() => {
                for (
                  let rowToPlace = board.length - 1;
                  rowToPlace >= 0;
                  rowToPlace--
                ) {
                  if (board[rowToPlace][index] === 0) {
                    let tempBoard = [...board];
                    tempBoard[rowToPlace][index] = turn;
                    setBoard(tempBoard);
                    setTurn(turn === 1 ? 2 : 1);
                    return;
                  }
                }
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;

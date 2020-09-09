import React, { useState , useEffect} from "react";
import "./App.css";
import { Slot } from "./Slot";
import { checkBoard } from "./Utils";
import { Circle } from "./Circle";
import {Button} from "./Button";

function App() {
  function initialize () {
    let tmpBoard = [];
    for (let i = 0; i < 6; i++) {
      tmpBoard.push([]);
      for (let j = 0; j < 7; j++) {
        tmpBoard[i].push(0);
      }
    }
    setBoard(tmpBoard)
  }
  useEffect(()=>initialize(),[])
  const [turn, setTurn] = useState(1);
  const [place, setPlace] = useState(null);
  const [board, setBoard] = useState([]);
  const styles = {
    boardStyle: {
      display: "flex",
      flexWrap: "wrap",
    },
  };

  const won = checkBoard(board);

  return (
    <div>
      <Button title={'Restart'} onClick={()=>initialize()} />
      {won ? (
        <div> player {won === 1 ? "red" : "black"} has won the game </div>
      ) : null}
      <div>
        <Circle value={turn} /> 's turn
      </div>
      <div style={styles.boardStyle}>
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

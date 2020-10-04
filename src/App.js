import React, { useState, useEffect, useRef } from "react";
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
    setTurn(1);
    setRecentMove(null);
  }

  const [turn, setTurn] = useState(1);
  const [board, setBoard] = useState([]);
  const [recentMove, setRecentMove] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const waitingRef = useRef(false)
  useEffect(() => initialize(), []);

  useEffect(() => {
    if (waiting && board) {
      console.log('doing work')
      const copy = deepCopy(board);
      if (!checkBoard(board)) {
        const c = nextMove(board, 2);
        setBoard(executeMove(c, copy, 2));
        setTurn(1);
        setRecentMove([getRow(c, board), c]);
      }
      setWaiting(false);
      waitingRef.current = false
    }
  }, [waiting]);

  const styles = {
    boardStyle: {
      display: "flex",
      flexWrap: "wrap",
      width: 648,
    },
    buttonHolder: {
      padding: 4,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: 648,
    },
    difficultyHolder: {
      display: "flex",
    },
  };

  function executeMove(column, prevBoard, testTurn) {
    const row = getRow(column, prevBoard);
    if (!isNaN(row)) {
      let tempBoard = deepCopy(prevBoard);
      tempBoard[getRow(column, prevBoard)][column] = testTurn;
      return tempBoard;
    }
  }

  function getRow(column, prevBoard) {
    for (let rowToPlace = prevBoard.length - 1; rowToPlace >= 0; rowToPlace--) {
      if (prevBoard[rowToPlace][column] === 0) {
        console.log(rowToPlace, column);
        return rowToPlace;
      }
    }
  }

  function deepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  function minimax(givenSituation, depth, player, a, b) {
    if (givenSituation) {
      const boardScore = scoreBoard(givenSituation);
      let endScore = 0;
      if (Math.abs(boardScore) < 10000) {
        if (depth === 0) {
          return { score: scoreBoard(givenSituation), move: null };
        }
        if (player === 2) {
          endScore = b;
          let moveDone = 0;
          for (let move = 0; move < 7; move++) {
            const executedMove = executeMove(move, givenSituation, 2);
            if (executedMove) {
              let m = minimax(executedMove, depth - 1, 1, a, b).score;
              if (m < endScore) {
                endScore = m;
                b = endScore;
                moveDone = move;
              }
              if (a >= b) {
                return { score: b, move: move };
              }
            }
          }
          if (executeMove(moveDone,givenSituation,player)) {
            return {score: endScore, move: moveDone};
          }
        }
        if (player === 1) {
          endScore = a;
          let move = 0;
          let moveDone = 0;
          for (move = 0; move < 7; move++) {
            const executedMove = executeMove(move, givenSituation, player);
            if (executedMove) {
              let mObj = minimax(
                executedMove,
                depth - 1,
                (player % 2) + 1,
                a,
                b
              );
              const m = mObj.score;
              if (m > endScore) {
                endScore = m;
                a = endScore;
                moveDone = move;
              }
              if (a >= b) {
                return { score: a, move: move };
              }
            }
          }
          if (executeMove(moveDone,givenSituation,player)) {
            return {score: endScore, move: moveDone};
          }
        }
      } else {
        if (boardScore === 10000) {
          return { score: 10000, move: null };
        }
        if (boardScore === -10000) {
          return { score: -10000, move: null };
        }
      }
      for (let k = 0 ; k<7;k++){
        if (executeMove(k,givenSituation,player)){
          return {score:endScore,move: k}
        }
      }
    }
  }

  function nextMove(currentBoard, player) {
    return minimax(currentBoard, difficulty + 3, player, -10000, 10000).move;
  }
  const won = board ? checkBoard(board) : 0;

  return (
    <div>
      <div style={styles.header}>
        <div style={styles.difficultyHolder}>
          {["Easy", "Medium", "Hard"].map((element, index) => (
            <div style={styles.buttonHolder}>
              <Button
                title={element}
                onClick={() => setDifficulty(index)}
                isRed={index === difficulty}
              />
            </div>
          ))}
        </div>
        <div>
          {turn-1 ? (
            <div>Computer is thinking</div>
          ) : (
            <div>
              <Circle value={turn} /> 's turn
            </div>
          )}
        </div>
        <div>
          <Button
            title={"Restart"}
            onClick={() => {
              initialize();
            }}
          />
        </div>
      </div>

      {won ? (
        <div> player {won === 1 ? "red" : "black"} has won the game </div>
      ) : null}
      <div style={styles.boardStyle}>
        {board.map((row, rowIndex) =>
          row.map((currentPiece, index) => (
            <Slot
              value={currentPiece}
              onClick={() => {
                const rowToPlace = getRow(index, board);
                console.log('waiting',waitingRef.current)
                if (!won && !waitingRef.current) {
                  waitingRef.current = true

                  let tempBoard = deepCopy(board);
                  tempBoard[rowToPlace][index] = turn;
                  setBoard(tempBoard);
                  setTurn(turn === 1 ? 2 : 1);
                  setRecentMove([rowToPlace, index]);
                  setTimeout(() => setWaiting(true), 100);
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

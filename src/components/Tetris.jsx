import React, { useState } from "react";

//helpers
import { createStage, checkCollision } from "../helpers/gameHelpers";

//components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

//styled components
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

//custom hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  console.log("re-render");

  //specific player functions

  const moverPlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    //reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);

    //status

    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    //incemeta nivel cada 10 lineas
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      //incrementar velocidad
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //game over
      if (player.pos.y < 1) {
        console.log("Game Over");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({
        x: 0,
        y: 0,
        collided: true,
      });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
        console.log("inter on");
      }
    }
  };

  const dropPLayer = () => {
    console.log("inter off");
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        moverPlayer(-1);
      } else if (keyCode === 39) {
        moverPlayer(1);
      } else if (keyCode === 40) {
        dropPLayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
    console.log(keyCode);
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <>
      <StyledTetrisWrapper
        role={"button"}
        tabIndex="0"
        onKeyDown={(e) => move(e)}
        onKeyUp={keyUp}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "50px 0 0 0",
            flexDirection: "column",
          }}
        >
          <h2 style={{ color: "white", fontFamily: "Pixel" }}>
            Tetris <h style={{ fontSize: "1rem" }}>Weibenfalk version</h>
          </h2>
          <p
            style={{
              color: "white",
              fontFamily: "Pixel",
              margin: "10px 0 0 0",
            }}
          >
            Marvin Berrio @2023
          </p>
        </div>
        <StyledTetris>
          <Stage stage={stage} />
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text="Game Over" />
            ) : (
              <div>
                <Display text={`Score ${score}`} />
                <Display text={`Rows ${rows}`} />
                <Display text={`Level ${level} `} />
              </div>
            )}
            <StartButton start={startGame} />
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>
    </>
  );
};

export default Tetris;

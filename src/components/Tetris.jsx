import React, { useState } from "react";

//helpers
import { createStage } from "../helpers/gameHelpers";

//components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

//styled components
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";

//custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log("re-render");

  //specific player functions

  const moverPlayer = (dir) => {
    updatePlayerPos({ x: dir, y: 0});
  };

  const startGame = () => {
    //reset everything
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided:false });
  };

  const dropPLayer = () => {
    drop()
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        moverPlayer(-1);
      } else if (keyCode === 39) {
        moverPlayer(1);
      }else if(keyCode === 40){
        dropPLayer()
      }
    }
    console.log(keyCode)
  };

  return (
    <StyledTetrisWrapper
      role={"button"}
      tabIndex="0"
      onKeyDown={(e) => move(e)}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={"Score"} />
              <Display text={"Rows"} />
              <Display text={"Level"} />
            </div>
          )}
          <StartButton start={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

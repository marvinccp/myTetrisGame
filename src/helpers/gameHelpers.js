export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
  return Array.from(Array(STAGE_HEIGHT), () => {
    return Array(STAGE_WIDTH).fill([0, "clear"]);
  });
};

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      //.1.verificamos si estamos en una celda del tetramino

      if (player.tetromino[y][x] !== 0) {
        if (
          //2.  verificar que el mov este dentro de las areas (y)
          !stage[y + player.pos.y + moveY] ||
          //3.  verificar que el mov este dentro de las areas (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          //4.verificar si la celda wue esta coliconnado no esta preparada para ser borrada
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
};

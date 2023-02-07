import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETRAMINOS } from "../helpers/tetrominos";

const Cell = ({ type }) => {
  return <StyledCell type={type} color={TETRAMINOS[type].color}/>;
};

export default React.memo(Cell);

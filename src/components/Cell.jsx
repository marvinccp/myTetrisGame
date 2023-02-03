import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETRAMINOS } from "../helpers/tetrominos";

const Cell = ({ type }) => {
  return <StyledCell type={'L'} color={TETRAMINOS['L'].color}/>;
};

export default Cell;

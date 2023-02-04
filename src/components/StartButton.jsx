import React from 'react'
import { StyledStartButton } from './styles/StyledStartButton'

const StartButton = ({ start}) => {
  
  return <StyledStartButton onClick={start}>StartGame</StyledStartButton>;
}

export default StartButton
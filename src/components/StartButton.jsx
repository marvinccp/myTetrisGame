import React from 'react'
import { StyledStartButton } from './styles/StyledStartButton'

const StartButton = () => {
  return (
    <StyledStartButton onClick={callback}>StartGame</StyledStartButton>
  )
}

export default StartButton
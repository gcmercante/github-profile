import styled, { keyframes } from 'styled-components'

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const StyledSVG = styled.svg``

export const CircleBackground = styled.circle`
  fill: transparent;
  stroke-width: 3;
  stroke: #c9d1d9;
`

interface CircleProgressProps {
  speed: number
}

export const CircleProgress = styled.circle<CircleProgressProps>`
  animation: ${spinner} 0.75s linear infinite;
  transform-origin: center;
  animation-duration: ${({ speed }) => `${speed} * 1000`};

  stroke-linecap: round;
`

export const Label = styled.span`
  display: block;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`

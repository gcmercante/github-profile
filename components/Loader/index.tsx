import { defaultTheme } from '../../styles/themes/default'
import { CircleProgress, Label, StyledSVG } from './loader.styles'

interface LoaderProps {
  size: number
  hideLabel?: boolean
  progress: number
  label?: string
}

export default function Loader({
  size,
  progress,
  label = 'Loading...',
  hideLabel,
}: LoaderProps) {
  const trackWidth = 8
  const indicatorWidth = 8

  const center = size / 2
  const radius =
    center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth)
  const dashArray = 2 * Math.PI * radius
  const dashOffset = dashArray * ((100 - progress) / 100)

  return (
    <>
      <StyledSVG width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke="transparent"
          strokeWidth={trackWidth}
        />
        <CircleProgress
          speed={1}
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={defaultTheme.base}
          strokeWidth={indicatorWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </StyledSVG>
      {!hideLabel && (
        <div>
          <Label>{label}</Label>
        </div>
      )}
    </>
  )
}

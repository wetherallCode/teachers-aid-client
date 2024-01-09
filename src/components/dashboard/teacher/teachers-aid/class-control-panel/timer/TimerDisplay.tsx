import React, { FC, Dispatch, SetStateAction } from 'react'

import Timer from 'react-compound-timer'
import {
  TimerControlsContainer,
  TimeDisplayFormat,
  TimerControlsDisplay,
  TimerControl,
  ResetStyle,
} from '../../styles/timerStyles'

export type TimerDisplayProps = {
  presetTime: number
  setStartTimer: Dispatch<SetStateAction<boolean>>
}
type TimerProps = {
  start?: any
  resume: any
  pause: any
  stop: any
  reset: any
  timerState?: any
  initialTime?: any
}

export const TimerDisplay: FC<TimerDisplayProps> = ({
  presetTime,
  setStartTimer,
}) => {
  const doubleDigitSeconds = (time: number) =>
    time.toString().split('').length === 1
      ? '0' + time.toString()
      : time.toString()

  return (
    <Timer
      initialTime={presetTime}
      direction="backward"
      startImmediately={true}
    >
      {({ resume, pause, stop, reset, timerState }: TimerProps) => {
        return (
          <TimerControlsContainer>
            <TimeDisplayFormat>
              <div style={{}}>
                <Timer.Minutes />:
                <Timer.Seconds formatValue={doubleDigitSeconds} />
              </div>
            </TimeDisplayFormat>

            <TimerControlsDisplay>
              {/* <button onClick={start}>Start</button> */}
              <TimerControl>
                <div onClick={pause}>Pause</div>
              </TimerControl>
              <TimerControl>
                <div onClick={resume}>Resume</div>
              </TimerControl>
              <TimerControl onClick={reset}>
                <div> Reset</div>
              </TimerControl>
              <ResetStyle>
                <div
                  onClick={() => {
                    stop()
                    setStartTimer(false)
                  }}
                >
                  New Timer
                </div>
              </ResetStyle>
            </TimerControlsDisplay>
          </TimerControlsContainer>
        )
      }}
    </Timer>
  )
}

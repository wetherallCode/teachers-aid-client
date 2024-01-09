import React, { FC, Dispatch, SetStateAction } from 'react'

import Timer from 'react-compound-timer'
import {
  TaskTimerControlsContainer,
  TaskTimeDisplayFormat,
  TaskTimerControlsDisplay,
  TaskTimerControl,
  TaskTimerResetStyle,
} from './state-n-styles/temporaryTaskStyles'

export type TaskTimerDisplayProps = {
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

export const TaskTimerDisplay: FC<TaskTimerDisplayProps> = ({
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
          <TaskTimerControlsContainer>
            <TaskTimeDisplayFormat>
              <div style={{}}>
                <Timer.Minutes />:
                <Timer.Seconds formatValue={doubleDigitSeconds} />
              </div>
            </TaskTimeDisplayFormat>

            <TaskTimerControlsDisplay>
              {/* <button onClick={start}>Start</button> */}
              <TaskTimerControl>
                <div onClick={pause}>Pause</div>
              </TaskTimerControl>
              <TaskTimerControl>
                <div onClick={resume}>Resume</div>
              </TaskTimerControl>
              <TaskTimerControl onClick={reset}>
                <div> Reset</div>
              </TaskTimerControl>
              <TaskTimerResetStyle>
                <div
                  onClick={() => {
                    stop()
                    setStartTimer(false)
                  }}
                >
                  New Timer
                </div>
              </TaskTimerResetStyle>
            </TaskTimerControlsDisplay>
          </TaskTimerControlsContainer>
        )
      }}
    </Timer>
  )
}

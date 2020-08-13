import React, { FC, useState } from 'react'
import { TimerDisplay } from './TimerDisplay'
import {
  TimerContainer,
  TimerPresetContainer,
  ReduceTimer,
  IncreaseTimer,
  StartTimer,
  TimerPresetDisplay,
} from '../../styles/timerStyles'

export type TimerPresetsProps = {}

export const TimerPresets: FC<TimerPresetsProps> = () => {
  const [presetMinuteValue, setPresetMinuteValue] = useState(0)
  const [startTimer, setStartTimer] = useState(false)
  return (
    <TimerContainer>
      {!startTimer ? (
        <TimerPresetContainer>
          <ReduceTimer
            onClick={() => {
              if (presetMinuteValue > 0) setPresetMinuteValue((c) => c - 1)
            }}
          >
            <div>-</div>
          </ReduceTimer>
          <TimerPresetDisplay>
            <div>{presetMinuteValue}</div>
          </TimerPresetDisplay>
          <IncreaseTimer onClick={() => setPresetMinuteValue((c) => c + 1)}>
            <div>+</div>
          </IncreaseTimer>

          <StartTimer onClick={() => setStartTimer(true)}>
            <div>Start </div>
          </StartTimer>
        </TimerPresetContainer>
      ) : (
        <TimerDisplay
          presetTime={presetMinuteValue * 1000 * 60}
          setStartTimer={setStartTimer}
        />
      )}
    </TimerContainer>
  )
}

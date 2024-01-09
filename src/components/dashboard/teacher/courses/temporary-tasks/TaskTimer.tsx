import React, { FC, useEffect, useState } from 'react'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import {
  IncreaseTaskTimer,
  ReduceTaskTimer,
  StartTaskTimer,
  TaskTimerContainer,
  TaskTimerPresetContainer,
  TaskTimerPresetDisplay,
} from './state-n-styles/temporaryTaskStyles'
import { TaskTimerDisplay } from './TaskTimerDisplay'

export type TaskTimerProps = {}

export const TaskTimer: FC<TaskTimerProps> = () => {
  const [state] = useTemporaryTasksContextProvider()
  const [presetMinuteValue, setPresetMinuteValue] = useState(
    state.context.taskNumber === 0 ? 10 : 5,
  )
  const [startTimer, setStartTimer] = useState(false)

  useEffect(() => {
    if (startTimer) {
      setPresetMinuteValue(state.context.taskNumber === 0 ? 10 : 5)
      setStartTimer(false)
    }
  }, [state.context.taskNumber])

  return (
    <>
      {!startTimer ? (
        <TaskTimerPresetContainer>
          <ReduceTaskTimer
            onClick={() => {
              if (presetMinuteValue > 0) setPresetMinuteValue((c) => c - 1)
            }}
          >
            <div>-</div>
          </ReduceTaskTimer>
          <TaskTimerPresetDisplay>
            <div>{presetMinuteValue}</div>
          </TaskTimerPresetDisplay>
          <IncreaseTaskTimer onClick={() => setPresetMinuteValue((c) => c + 1)}>
            <div>+</div>
          </IncreaseTaskTimer>

          <StartTaskTimer onClick={() => setStartTimer(true)}>
            <div>Start </div>
          </StartTaskTimer>
        </TaskTimerPresetContainer>
      ) : (
        <TaskTimerDisplay
          presetTime={presetMinuteValue * 1000 * 60}
          setStartTimer={setStartTimer}
        />
      )}
    </>
  )
}

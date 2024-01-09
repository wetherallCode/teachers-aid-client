import React, { FC, useState, Dispatch, SetStateAction, useEffect } from 'react'

export type TimeSelectorProps = {
  setTimeSelect: Dispatch<SetStateAction<string>>
}

export enum AM_PM {
  'AM' = 'AM',
  'PM' = 'PM',
}

export const useTimeSelector = () => {
  const [time, setTime] = useState({
    hours: '',
    minutes: '',
    seconds: '',
    mortem: AM_PM.AM,
  })
  const hours = Object.keys(Array.apply(0, Array(12)))
  const minutes = Object.keys(Array.apply(0, Array(60)))
  const seconds = Object.keys(Array.apply(0, Array(60)))
  const mortem = [AM_PM.AM, AM_PM.PM]
  const returnTime = `${time.hours}:${time.minutes}:${time.seconds} ${time.mortem}`
  return { time, setTime, hours, minutes, seconds, mortem, returnTime }
}

export const TimeSelector: FC<TimeSelectorProps> = ({ setTimeSelect }) => {
  const { time, setTime, hours, minutes, seconds, mortem, returnTime } =
    useTimeSelector()

  useEffect(() => {
    setTimeSelect(returnTime)
  }, [returnTime])

  return (
    <>
      <span>
        <select
          title="hours"
          onChange={(e: any) => setTime({ ...time, hours: e.target.value })}
        >
          {hours.map((hour: string) => (
            <option key={hour}>{hour}</option>
          ))}
        </select>
        :
      </span>
      <span>
        <select
          title="minutes"
          onChange={(e: any) => setTime({ ...time, minutes: e.target.value })}
        >
          {minutes.map((min) => (
            <option key={min}>{min}</option>
          ))}
        </select>
        :
      </span>
      <span>
        <select
          title="seconds"
          onChange={(e: any) => setTime({ ...time, minutes: e.target.value })}
        >
          {seconds.map((sec) => (
            <option key={sec}>{sec}</option>
          ))}
        </select>
      </span>{' '}
      <span>
        <select
          onChange={(e: any) => setTime({ ...time, mortem: e.target.value })}
        >
          {mortem.map((mort) => (
            <option key={mort}>{mort}</option>
          ))}
        </select>
      </span>
    </>
  )
}

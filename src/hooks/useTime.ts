import React, { useEffect, useState } from 'react'

export const useTime = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [dateTime, setDateTime] = useState(new Date())

  // setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
  // setInterval(() => setDateTime(new Date()), 1000)

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return { time, dateTime }
}

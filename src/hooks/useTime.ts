import React, { useState } from 'react'

export const useTime = () => {
	const [time, setTime] = useState(new Date().toLocaleTimeString())
	const [dateTime, setDateTime] = useState(new Date().toLocaleString())

	setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
	setInterval(() => setDateTime(new Date().toLocaleString()), 1000)

	return { time, dateTime }
}

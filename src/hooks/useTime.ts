import React, { useState } from 'react'

export const useTime = () => {
	const [time, setTime] = useState(new Date().toLocaleTimeString())
	setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)

	return [time]
}

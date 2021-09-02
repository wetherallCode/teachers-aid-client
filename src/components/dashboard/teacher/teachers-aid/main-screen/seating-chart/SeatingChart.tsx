import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { TwentyFourSeatChart } from './TwentyFourSeatChart'
import { TwelveSeatChart } from './TwelveSeatChart'
import { ThirtySeatChart } from './ThirtySeatChart'
import { ThirtySixSeatChart } from './ThirtySixSeatChart'
import { TwentySixIndividualSeatChart } from './TwentySixIndividualSeatChart'

export type SeatingChartProps = {}

export const SeatingChart: FC<SeatingChartProps> = () => {
	const [state] = useTeachersAidContextProvider()
	const courseMaxSize = state.context.courseInfo!.assignedSeats.length
	console.log(courseMaxSize === 27)
	return (
		<>
			{courseMaxSize === 12 ? (
				<TwelveSeatChart />
			) : courseMaxSize === 24 ? (
				<TwentyFourSeatChart />
			) : courseMaxSize === 30 ? (
				<ThirtySeatChart />
			) : courseMaxSize === 36 ? (
				<ThirtySixSeatChart />
			) : courseMaxSize === 26 ? (
				<TwentySixIndividualSeatChart />
			) : null}
		</>
	)
}

import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { TwentyFourSeatChart } from './TwentyFourSeatChart'
import { TwelveSeatChart } from './TwelveSeatChart'
import { ThirtySeatChart } from './ThirtySeatChart'
import { ThirtySixSeatChart } from './ThirtySixSeatChart'

export type SeatingChartProps = {}

export const SeatingChart: FC<SeatingChartProps> = () => {
  const [state] = useTeachersAidContextProvider()
  const courseMaxSize = state.context.courseInfo!.assignedSeats.length

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
      ) : null}
    </>
  )
}

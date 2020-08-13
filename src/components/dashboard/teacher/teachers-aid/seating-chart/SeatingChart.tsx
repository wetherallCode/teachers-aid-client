import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { TwentyFourSeatChart } from './TwentyFourSeatChart'

export type SeatingChartProps = {}

export const SeatingChart: FC<SeatingChartProps> = () => {
  const [state] = useTeachersAidContextProvider()
  const courseMaxSize = state.context.courseInfo.assignedSeats.length

  return (
    <>
      {courseMaxSize === 12 ? (
        <div>Twelve Students</div>
      ) : courseMaxSize === 24 ? (
        <TwentyFourSeatChart />
      ) : courseMaxSize === 30 ? (
        <div>Thirty Students</div>
      ) : courseMaxSize === 36 ? (
        <div>ThirtySix Students</div>
      ) : null}
    </>
  )
}

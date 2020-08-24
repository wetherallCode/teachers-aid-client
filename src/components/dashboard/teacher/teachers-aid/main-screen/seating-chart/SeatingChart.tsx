import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { TwentyFourSeatChart } from './TwentyFourSeatChart'
import { TwelveSeatChart } from './TwelveSeatChart'

export type SeatingChartProps = {}

export const SeatingChart: FC<SeatingChartProps> = () => {
  const [state] = useTeachersAidContextProvider()
  const courseMaxSize = state.context.courseInfo.assignedSeats.length

  return (
    <>
      {courseMaxSize === 12 ? (
        <TwelveSeatChart />
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

import React, { FC } from 'react'
import { SeatingChart } from './seating-chart/SeatingChart'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { VirtualProtocolResponse } from './protocol-response/VirtualProtocolResponse'
import { useSchoolDayContextProvider } from '../../../school-day/state/SchoolDayContext'
import { Attendance } from './seating-chart/Attendance'

export type MainScreenDisplayProps = {}

export const MainScreenDisplay: FC<MainScreenDisplayProps> = () => {
  const [state] = useTeachersAidContextProvider()

  return (
    <>
      {state.context.mainScreenSeatingChart && <SeatingChart />}
      {state.context.mainScreenVirtualAttendance && <Attendance />}
      {state.context.mainScreenVirtualProtocolResponses && (
        <>{<VirtualProtocolResponse />}</>
      )}
    </>
  )
}

import React, { FC } from 'react'
import { SeatingChart } from './seating-chart/SeatingChart'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { Attendance } from './attendance/Attendance'
import { StudentQuestionViewer } from './student-questions/StudentQuestionViewer'
import { ProtocolResponseClassList } from './protocol-response-classlist/ProtocolResponseClassList'
import { HomeworkAssigner } from './homework-assigner/HomeworkAssigner'

export type MainScreenDisplayProps = {}

export const MainScreenDisplay: FC<MainScreenDisplayProps> = () => {
  const [state] = useTeachersAidContextProvider()

  return (
    <>
      {state.context.mainScreenSeatingChart && <SeatingChart />}
      {state.context.mainScreenVirtualAttendance && <Attendance />}
      {state.context.mainScreenVirtualProtocolResponses && (
        <>
          {/* {<VirtualProtocolResponse />} */}
          {<ProtocolResponseClassList />}
        </>
      )}
      {state.context.mainScreenVirtualQuestionViewer && (
        <StudentQuestionViewer />
      )}
      {state.context.mainScreenHomeworkAssigner && <HomeworkAssigner />}
    </>
  )
}

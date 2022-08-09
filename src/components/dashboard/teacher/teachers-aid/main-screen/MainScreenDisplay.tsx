import React from 'react'
import { SeatingChart } from './seating-chart/SeatingChart'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { StudentQuestionViewer } from './student-questions/StudentQuestionViewer'
import { ProtocolResponseClassList } from './protocol-response-classlist/ProtocolResponseClassList'
import { HomeworkAssigner } from './homework-assigner/HomeworkAssigner'
import { findCourseByIdForTeachersAid_findCourseById_course_hasCourseInfo_assignedSeats_student } from '../../../../../schemaTypes'
import { Status } from './status/Status'

export type MainScreenDisplayProps = {
  presentStudentList: string[]
  students: (findCourseByIdForTeachersAid_findCourseById_course_hasCourseInfo_assignedSeats_student | null)[]
}

export const MainScreenDisplay = ({
  presentStudentList,
  students,
}: MainScreenDisplayProps) => {
  const [state] = useTeachersAidContextProvider()

  return (
    <>
      {state.context.mainScreenSeatingChart && <SeatingChart />}
      {state.context.mainScreenStudentStatus && (
        // <StudentStatusDisplay
        //   courseId={state.context.courseInfo?.course._id!}
        //   students={students}
        // />
        <Status
          courseId={state.context.courseInfo?.course._id!}
          students={students}
        />
      )}

      {state.context.mainScreenVirtualProtocolResponses && (
        <>
          {/* {<VirtualProtocolResponse />} */}
          {<ProtocolResponseClassList />}
        </>
      )}
      {state.context.mainScreenVirtualQuestionViewer && (
        <StudentQuestionViewer />
      )}
      {state.context.mainScreenHomeworkAssigner && (
        <HomeworkAssigner presentStudentList={presentStudentList} />
      )}
    </>
  )
}

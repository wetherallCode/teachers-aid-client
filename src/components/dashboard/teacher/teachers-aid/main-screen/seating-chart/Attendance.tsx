import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { useSchoolDayContextProvider } from '../../../../school-day/state/SchoolDayContext'

export type AttendanceProps = {}

export const Attendance: FC<AttendanceProps> = () => {
  const [state] = useTeachersAidContextProvider()
  const [schoolDayInfo] = useSchoolDayContextProvider()

  const course = schoolDayInfo.context.currentSchoolDay.signInSheets?.filter(
    (signIn) => signIn.course._id === state.context.courseInfo.course._id!
  )

  return (
    <>
      <div>Virtual Attendance</div>
      <div>
        {course?.map((sheet) =>
          sheet.studentsSignInlog?.map((signIn) => (
            <div key={signIn._id!}>
              {signIn.lastName}, {signIn.firstName}
            </div>
          ))
        )}
      </div>
    </>
  )
}

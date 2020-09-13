import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { useSchoolDayContextProvider } from '../../../../school-day/state/SchoolDayContext'
import { findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course_hasStudents } from '../../../../../../schemaTypes'

export type AttendanceProps = {}

export const Attendance: FC<AttendanceProps> = () => {
  const [state] = useTeachersAidContextProvider()
  const [schoolDayInfo] = useSchoolDayContextProvider()

  const course = schoolDayInfo.context.currentSchoolDay.signInSheets?.filter(
    (signIn) => signIn.course._id === state.context.courseInfo.course._id!
  )

  const studentList = state.context.courseInfo.course.hasStudents.map(
    (student) => student._id
  )

  // let absentStudents: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course_hasStudents[] = []
  for (const studentId of studentList) {
    const student = course?.map((course) =>
      course.studentsSignInlog?.filter((student) => student._id !== studentId)
    )
    // absentStudents.push(student!)
  }

  // }
  // console.log(
  //   course?.map((course) =>
  //     course.studentsSignInlog?.filter((student) => student._id)
  //   )
  // )
  return (
    <>
      <div>Virtual Attendance</div>
      <div>Present Students</div>
      <div>
        {course?.map((sheet) =>
          sheet.studentsSignInlog?.map((signIn) => (
            <div key={signIn._id!}>
              {signIn.lastName}, {signIn.firstName}
            </div>
          ))
        )}
      </div>
      <div>Absent Students</div>
      <div></div>
    </>
  )
}

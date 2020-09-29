import React, { FC, useState } from 'react'
import { me_me_Teacher } from '../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { EssaysToGrade } from './essays/essay-grader/EssaysToGrade'
import { FindAssignmentByStudent } from './paper-based/FindAssignmentByStudent'

export type AssignmentsToGradeProps = {}

export const AssignmentsToGrade: FC<AssignmentsToGradeProps> = () => {
  const [courseId, setCourseId] = useState('')
  const me: me_me_Teacher = useUserContextProvider()
  const { teachesCourses } = me

  return (
    <>
      <div>Grade Assignments</div>
      <select onChange={(e: any) => setCourseId(e.target.value)}>
        <option value={'none'}>Pick a Course</option>
        {teachesCourses.map((course) => (
          <option key={course._id!} value={course._id!}>
            {course.name}
          </option>
        ))}
      </select>
      {courseId && (
        <>
          <EssaysToGrade courseId={courseId} />
          <>
            <div>PaperBased Assignments</div>
            {/* {courseId && <FindAssignmentByStudent courseId={courseId} />} */}
          </>
        </>
      )}
    </>
  )
}

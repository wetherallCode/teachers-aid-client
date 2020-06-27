import React, { FC, useState } from 'react'
import { me_me_Teacher } from '../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { EssaysToGrade } from './EssaysToGrade'

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
      <EssaysToGrade courseId={courseId} />

      <div>Reading Guide List</div>
    </>
  )
}

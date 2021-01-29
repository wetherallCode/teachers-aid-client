import React, { FC, useState } from 'react'
import { me_me_Teacher } from '../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { EssaysToGrade } from './essays/essay-grader/EssaysToGrade'
import { FindAssignmentByStudent } from './paper-based/FindAssignmentByStudent'
import {
  CourseSelect,
  CourseSelectContainer,
  EssaysToGradeContainer,
} from './state-n-styles/GradeEssayContainerStyles'
import { useGradeEssayContainerContextProvider } from './state-n-styles/GradeEssayContainerContext'

export type AssignmentsToGradeProps = {}

export const AssignmentsToGrade: FC<AssignmentsToGradeProps> = () => {
  const [courseId, setCourseId] = useState('')
  const me: me_me_Teacher = useUserContextProvider()
  const { teachesCourses } = me

  return (
    <EssaysToGradeContainer>
      <CourseSelectContainer>
        <CourseSelect>
          <div>Select Course</div>
          {teachesCourses.slice(1).map((course) => (
            <span
              key={course._id}
              onClick={() => setCourseId(course._id!)}
              style={
                course._id === courseId
                  ? { textDecoration: 'underline' }
                  : { textDecoration: 'none' }
              }
            >
              {course.name}
            </span>
          ))}
        </CourseSelect>
      </CourseSelectContainer>
      <div>
        {courseId && (
          <>
            <EssaysToGrade courseId={courseId} />
            <>
              <div>PaperBased Assignments</div>
              {courseId && <FindAssignmentByStudent courseId={courseId} />}
            </>
          </>
        )}
      </div>
    </EssaysToGradeContainer>
  )
}

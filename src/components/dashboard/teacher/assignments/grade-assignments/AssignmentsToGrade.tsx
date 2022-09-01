import React, { FC, useState } from 'react'
import { me_me_Teacher } from '../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { EssaysToGrade } from './essays/essay-grader/EssaysToGrade'
import { FindAssignmentByStudent } from './paper-based/FindAssignmentByStudent'
import {
  CourseSelect,
  CourseSelectContainer,
  CourseToSelect,
  EssaysToGradeContainer,
  PaperBasedToggleContainer,
} from './state-n-styles/GradeEssayContainerStyles'
import { useToggle } from '../../../../../hooks'
import { sortByLetter } from '../../../../../utils'

export type AssignmentsToGradeProps = {}

export const AssignmentsToGrade: FC<AssignmentsToGradeProps> = () => {
  const [courseId, setCourseId] = useState('')
  const me: me_me_Teacher = useUserContextProvider()
  const { teachesCourses } = me
  const [paperBasedToggle, togglePaperBased] = useToggle(false)

  return (
    <EssaysToGradeContainer>
      <CourseSelectContainer>
        <CourseSelect>
          <div>Select Course</div>
          {teachesCourses
            .slice(0)
            .sort(sortByLetter)
            .filter((c) => !c.hasCourseInfo.isHidden)
            .map((course) => (
              <CourseToSelect
                key={course._id}
                onClick={() => setCourseId(course._id!)}
                selected={course._id === courseId}
              >
                {course.name}
              </CourseToSelect>
            ))}
        </CourseSelect>
        <div>
          {courseId && (
            <PaperBasedToggleContainer>
              {!paperBasedToggle ? (
                <div onClick={() => togglePaperBased()}>Paper Based</div>
              ) : (
                <div onClick={() => togglePaperBased()}>Submitted </div>
              )}
            </PaperBasedToggleContainer>
          )}
        </div>
      </CourseSelectContainer>
      {courseId && !paperBasedToggle && <EssaysToGrade courseId={courseId} />}
      {courseId && paperBasedToggle && (
        <FindAssignmentByStudent courseId={courseId} />
      )}
    </EssaysToGradeContainer>
  )
}

import React, { FC, useState } from 'react'
import { useCreateAssignmentContextPovider } from './state-and-styles/CreateAssignmentContext'
import { EssayUnitSelect } from './create-essay/EssayUnitSelect'

import { EssayLessonInfo } from './create-essay/EssayLessonInfo'

import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { me_me_Teacher } from '../../../../../schemaTypes'
import { EssayLessonSelect } from './create-essay/EssayLessonSelect'

import { ReadingGuideUnitSelect } from './create-readingGuide/ReadingGuideUnitSelect'
import { ReadingGuideLessonSelect } from './create-readingGuide/ReadingGuideLessonSelect'
import { ReadingGuideLessonInfo } from './create-readingGuide/ReadingGuideLessonInfo'
import { sortByLetter } from '../../../../../utils'
import {
  CourseSelect,
  CourseToSelect,
} from '../grade-assignments/state-n-styles/GradeEssayContainerStyles'
import {
  CourseSelectContainer,
  CreateAssignmentTitle,
  CreateAssignmentsContainer,
  AssignmentTypeSelectorContainer,
  AssignmentCreatorContainer,
  AssignmentType,
} from './state-and-styles/createAssignmentsStyles'

export type CreateAssignmentProps = {}

export const CreateAssignment = ({}: CreateAssignmentProps) => {
  const [courseId, setCourseId] = useState('')
  const [state, event] = useCreateAssignmentContextPovider()
  const me: me_me_Teacher = useUserContextProvider()
  const { teachesCourses } = me

  return (
    <CreateAssignmentsContainer>
      <CourseSelectContainer>
        <CourseSelect>
          <div>Select Course</div>
          {teachesCourses
            .slice(0)
            .sort(sortByLetter)
            .filter((c) => !c.hasCourseInfo.isHidden)
            .map((course) => (
              <CourseToSelect
                key={course._id!}
                onClick={() => {
                  event({ type: 'SET_COURSE_ID', payload: course._id! })
                  setCourseId(course._id!)
                  event({ type: 'ESSAY' })
                }}
                selected={course._id === courseId}
              >
                {course.name}
              </CourseToSelect>
            ))}
        </CourseSelect>
      </CourseSelectContainer>
      <AssignmentCreatorContainer>
        <CreateAssignmentTitle>
          <div>Create Assignments</div>
        </CreateAssignmentTitle>
        <div>
          {courseId && (
            <div>
              <AssignmentTypeSelectorContainer>
                <AssignmentType selected={state.matches('essay')}>
                  <div
                    onClick={() => {
                      event({ type: 'ESSAY' })
                    }}
                  >
                    Essay
                  </div>
                </AssignmentType>
                <AssignmentType selected={state.matches('readingGuide')}>
                  <div onClick={() => event({ type: 'READING_GUIDE' })}>
                    Reading Guide
                  </div>
                </AssignmentType>
              </AssignmentTypeSelectorContainer>
            </div>
          )}
          {courseId && (
            <>
              {state.matches('essay') && (
                <>
                  {state.matches('essay.unit') && <EssayUnitSelect />}
                  {state.matches('essay.lesson') && (
                    <EssayLessonSelect courseId={courseId} />
                  )}
                  {state.matches('essay.essayInfo') && (
                    <EssayLessonInfo me={me} courseId={courseId} />
                  )}
                </>
              )}
              {state.matches('readingGuide') && (
                <>
                  {state.matches('readingGuide.unit') && (
                    <ReadingGuideUnitSelect />
                  )}
                  {state.matches('readingGuide.lesson') && (
                    <ReadingGuideLessonSelect courseId={courseId} />
                  )}
                  {state.matches('readingGuide.readingGuideInfo') && (
                    <ReadingGuideLessonInfo
                      me={me}
                      courseId={courseId}
                      setCourseId={setCourseId}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </AssignmentCreatorContainer>
    </CreateAssignmentsContainer>
  )
}

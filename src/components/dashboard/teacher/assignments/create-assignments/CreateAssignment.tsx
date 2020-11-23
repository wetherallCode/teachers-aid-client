import React, { FC } from 'react'
import { useCreateAssignmentContextPovider } from './CreateAssignmentContext'
import { EssayUnitSelect } from './create-essay/EssayUnitSelect'

import { EssayLessonInfo } from './create-essay/EssayLessonInfo'

import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { me_me_Teacher } from '../../../../../schemaTypes'
import { EssayLessonSelect } from './create-essay/EssayLessonSelect'

import { ReadingGuideUnitSelect } from './create-readingGuide/ReadingGuideUnitSelect'
import { ReadingGuideLessonSelect } from './create-readingGuide/ReadingGuideLessonSelect'
import { ReadingGuideLessonInfo } from './create-readingGuide/ReadingGuideLessonInfo'

export type CreateAssignmentProps = {}

export const CreateAssignment: FC<CreateAssignmentProps> = () => {
  const [state, event] = useCreateAssignmentContextPovider()
  const me: me_me_Teacher = useUserContextProvider()

  return (
    <div>
      <div>Create Assignments</div>
      <div>Select Course</div>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            event({ type: 'SET_COURSE_ID', payload: e.target.value })
          }
        }}
      >
        <option value={'none'}>Pick a Course</option>
        {me.teachesCourses.map((course) => (
          <option key={course._id!} value={course._id!}>
            {course.name}
          </option>
        ))}
      </select>
      {state.context.courseId && (
        <>
          <>
            {/* {!state.matches('idle') && ( */}
            <>
              <div>Essay</div>
              {state.matches('essay.unit') && <EssayUnitSelect />}
              {state.matches('essay.lesson') && <EssayLessonSelect />}
              {state.matches('essay.essayInfo') && <EssayLessonInfo me={me} />}
              <div>Reading Guide</div>
              {state.matches('readingGuide.unit') && <ReadingGuideUnitSelect />}
              {state.matches('readingGuide.lesson') && (
                <ReadingGuideLessonSelect />
              )}
              {state.matches('readingGuide.readingGuideInfo') && (
                <ReadingGuideLessonInfo me={me} />
              )}
            </>
            {/* )} */}
          </>
          {/* {!state.matches('idle') && ( */}
          <div>
            <button
              onClick={() => {
                event({ type: 'BACK' })
              }}
            >
              Go Back
            </button>
          </div>
          {/* )} */}
        </>
      )}
    </div>
  )
}

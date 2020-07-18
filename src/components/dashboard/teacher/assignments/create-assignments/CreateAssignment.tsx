import React, { FC } from 'react'
import { useCreateAssignmentContextPovider } from './CreateAssignmentContext'
import { UnitSelect } from './create-essay/UnitSelect'
import { LessonInfo } from './create-essay/LessonInfo'

import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { me_me_Teacher } from '../../../../../schemaTypes'
import { LessonSelect } from './create-essay/LessonSelect'
import { CreateEssay } from './create-essay/CreateEssay'

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
      {state.matches('essay.unit') && <UnitSelect />}
      {state.matches('essay.lesson') && <LessonSelect />}
      {state.matches('essay.essayInfo') && <LessonInfo me={me} />}
      {state.matches('essay.essayInfo') && <CreateEssay me={me} />}
    </div>
  )
}

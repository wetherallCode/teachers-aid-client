import React, { FC } from 'react'
import { useCreateAssignmentContextPovider } from './CreateAssignmentContext'
import { UnitSelect } from './UnitSelect'
import { LessonInfo } from './LessonInfo'

export type CreateAssignmentProps = {}

export const CreateAssignment: FC<CreateAssignmentProps> = () => {
  const [state] = useCreateAssignmentContextPovider()
  console.log(state.context)

  return (
    <div>
      <div>Create Assignment</div>
      <UnitSelect />
      {state.matches('assignmentType.idle') && <LessonInfo />}

      <div>Create</div>
    </div>
  )
}

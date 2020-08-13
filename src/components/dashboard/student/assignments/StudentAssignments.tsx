import React, { FC } from 'react'
import { AssignedEssaySelect } from './essays/assigned-essays/AssignedEssaySelect'
import { CompletedEssaySelect } from './essays/completed-essays/CompletedEssaySelect'
import { AssignedReadingGuideSelect } from './readingGuides/AssignedReadingGuideSelect'

export type StudentAssignmentsProps = {}

export const StudentAssignments: FC<StudentAssignmentsProps> = () => {
  return (
    <>
      <div>Assignments to Complete</div>
      <AssignedEssaySelect />
      <CompletedEssaySelect />
      <AssignedReadingGuideSelect />
    </>
  )
}

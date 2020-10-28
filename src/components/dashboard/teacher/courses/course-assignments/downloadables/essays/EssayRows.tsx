import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays } from '../../../../../../../schemaTypes'

export type EssayRowsProps = {
  essay: findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays
  setAssignmentList: Dispatch<SetStateAction<any[]>>
  createCSVToggle: boolean
}

export const EssayRows: FC<EssayRowsProps> = ({
  essay,
  setAssignmentList,
  createCSVToggle,
}) => {
  const [assignmentValues, setAssignmentValues] = useState({
    NAME: essay.hasOwner.lastName + ', ' + essay.hasOwner.firstName,
    STUDENTID: essay.hasOwner.schoolId,
    GRADE: essay.score.earnedPoints,
    ABSENT: '',
    EXEMPT: essay.exempt ? 'Y' : '',
    INCOMPLETE: '',
    MISSING: !essay.finalDraft?.returned ? 'Y' : '',
  })
  //   useEffect(() => {
  //     if (!essay.finalDraft?.returned) {
  //       setAssignmentValues({ ...assignmentValues, MISSING: 'Y' })
  //     }
  //     if (essay.exempt) {
  //       setAssignmentValues({ ...assignmentValues, EXEMPT: 'Y' })
  //     }
  //   }, [assignmentValues, essay])
  useEffect(() => {
    // if (createCSVToggle) {
    if (essay.hasOwner.schoolId !== null) {
      setAssignmentList((list) => [...list, assignmentValues])
    }
    // }
  }, [essay])
  return (
    <>
      <div>
        <span>{essay.hasOwner.lastName}, </span>
        <span>{essay.hasOwner.firstName}: </span>
        {essay.finalDraft?.submitted && !essay.finalDraft.returned ? (
          <span>Pending</span>
        ) : essay.finalDraft?.returned ? (
          <span>{essay.score.earnedPoints}</span>
        ) : (
          <span>Missing</span>
        )}
      </div>
    </>
  )
}

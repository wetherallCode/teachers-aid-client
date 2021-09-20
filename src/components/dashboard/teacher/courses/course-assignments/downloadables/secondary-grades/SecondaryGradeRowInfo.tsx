import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { findStudentsByCourseForSecondaryGradeFinder_findStudentsByCourse_students } from '../../../../../../../schemaTypes'

export type SecondaryGradeRowInfoProps = {
  student: findStudentsByCourseForSecondaryGradeFinder_findStudentsByCourse_students
  secondaryGradeScore: number
  setAssignmentList: Dispatch<SetStateAction<any[]>>
  createCSVToggle: boolean
}

export const SecondaryGradeRowInfo = ({
  student,
  secondaryGradeScore,
  setAssignmentList,
  createCSVToggle,
}: SecondaryGradeRowInfoProps) => {
  const [assignmentValues, setAssignmentValues] = useState({
    NAME: student.lastName + ', ' + student.firstName,
    STUDENTID: student.schoolId,
    GRADE: isNaN(secondaryGradeScore) ? '' : secondaryGradeScore,
    ABSENT: '',
    EXEMPT: secondaryGradeScore === 0 ? '' : secondaryGradeScore ? '' : 'Y',
    INCOMPLETE: '',
    MISSING: '',
  })
  useEffect(() => {
    if (student.schoolId !== null) {
      setAssignmentList((list) => [...list, assignmentValues])
    }
    // }
  }, [secondaryGradeScore])
  return (
    <>
      <div>
        {student.lastName}, {student.firstName}:{' '}
        {isNaN(secondaryGradeScore) ? 'No Grade Yet' : secondaryGradeScore}
      </div>
    </>
  )
}

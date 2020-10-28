import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { findResponsibilityPointsByCourse_findResponsibilityPointsByCourse_responsibilityPointList } from '../../../../../../../schemaTypes'

export type ResponsibilityPointRowsProps = {
  student: findResponsibilityPointsByCourse_findResponsibilityPointsByCourse_responsibilityPointList
  setRosterList: Dispatch<SetStateAction<any[]>>
}

export const ResponsibilityPointRows: FC<ResponsibilityPointRowsProps> = ({
  student,
  setRosterList,
}) => {
  const [
    studentResponsibilityPoints,
    setStudentResponsibilityPoints,
  ] = useState({
    NAME: student.student.lastName + ', ' + student.student.firstName,
    STUDENTID: student.student.schoolId,
    GRADE: student.responsibilityPoints,
    ABSENT: '',
    EXEMPT: '',
    INCOMPLETE: '',
    MISSING: '',
  })
  useEffect(() => {
    setRosterList((list) => [...list, studentResponsibilityPoints])
  }, [studentResponsibilityPoints])
  return (
    <>
      <div>
        <span>{student.student.lastName}, </span>
        <span>{student.student.firstName}: </span>
        <span>{student.responsibilityPoints}</span>
      </div>
    </>
  )
}

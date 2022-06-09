import { useQuery } from '@apollo/client'
import React from 'react'
import {
  findBehaviorsByStudentIdAndDate,
  findBehaviorsByStudentIdAndDateVariables,
  me_me,
  me_me_Student,
} from '../../../../schemaTypes'
import { FIND_BEHAVIORS_BY_STUDENT_ID_AND_DATE_QUERY } from '../../teacher/teachers-aid/student-info/behavior/BehaviorRemover'

export type StudentBehaviorProps = { me: me_me }

export const StudentBehavior = ({ me }: StudentBehaviorProps) => {
  const { loading, data } = useQuery<
    findBehaviorsByStudentIdAndDate,
    findBehaviorsByStudentIdAndDateVariables
  >(FIND_BEHAVIORS_BY_STUDENT_ID_AND_DATE_QUERY, {
    variables: {
      // input: { date: new Date().toLocaleDateString(), studentId: me._id! },
      input: { date: '5/17/2022', studentId: me._id! },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  return (
    <>
      <div>How did I do today?</div>
    </>
  )
}

import { MutationFunctionOptions, useMutation } from '@apollo/client'
import React from 'react'
import {
  createAbsenceVariables,
  createAbsence,
  MarkingPeriodEnum,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student,
} from '../../../../../../schemaTypes'
import { AttendanceButton } from '../../styles/studentInfoStyles'
import {
  CREATE_STUDENT_ABSENCE_MUTATION,
  RemoveAbsenceType,
} from './DailyAttendance'
import { RemoveAbsence } from './RemoveAbsence'

export type AbsenceProps = {
  currentMarkingPeriod: MarkingPeriodEnum
  student: findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student
  removeAbsence: RemoveAbsenceType
  todaysAbsenceId: string
  unexcusedLatenessId: string
  excusedLatenessId: string
  removeAbsenceCalled: boolean
  absenceCheck: boolean
}

export const Absence = ({
  currentMarkingPeriod,
  student,
  removeAbsence,
  todaysAbsenceId,
  unexcusedLatenessId,
  excusedLatenessId,
  removeAbsenceCalled,
  absenceCheck,
}: AbsenceProps) => {
  const [createAbsence, { data, called }] = useMutation<
    createAbsence,
    createAbsenceVariables
  >(CREATE_STUDENT_ABSENCE_MUTATION, {
    variables: {
      input: {
        dayAbsent: new Date().toLocaleDateString(),
        markingPeriod: currentMarkingPeriod,
        studentId: student._id!,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [
      'findStudentInfoByStudentIdForDesk',
      'findStudentByIdForTeachersAid',
      'findCourseByIdForTeachersAid',
    ],
  })

  return (
    <>
      {!absenceCheck ? (
        <AttendanceButton
          lateButton={false}
          created={false}
          onClick={() => {
            !unexcusedLatenessId && !excusedLatenessId && createAbsence()
          }}
        >
          Create Absence
        </AttendanceButton>
      ) : (
        <RemoveAbsence
          absenceId={todaysAbsenceId}
          removeAbsence={removeAbsence}
          called={removeAbsenceCalled}
        />
      )}
    </>
  )
}

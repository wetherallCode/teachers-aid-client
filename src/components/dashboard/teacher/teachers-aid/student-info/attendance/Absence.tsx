import { MutationFunctionOptions, useMutation } from '@apollo/client'
import React from 'react'
import {
  createAbsenceVariables,
  createAbsence,
  MarkingPeriodEnum,
  findStudentInfoByStudentId_findStudentById_student,
  removeAbsence,
  removeAbsenceVariables,
} from '../../../../../../schemaTypes'
import { todaysLocaleDate } from '../../../../../../utils'
import { AttendanceButton } from '../../styles/studentInfoStyles'
import {
  CREATE_STUDENT_ABSENCE_MUTATION,
  RemoveAbsenceType,
} from './DailyAttendance'
import { RemoveAbsence } from './RemoveAbsence'

export type AbsenceProps = {
  currentMarkingPeriod: MarkingPeriodEnum
  student: findStudentInfoByStudentId_findStudentById_student
  removeAbsence: RemoveAbsenceType
  todaysAbsenceId: string
  unexcusedLatenessId: string
  excusedLatenessId: string
  removeAbsenceCalled: boolean
}

export const Absence = ({
  currentMarkingPeriod,
  student,
  removeAbsence,
  todaysAbsenceId,
  unexcusedLatenessId,
  excusedLatenessId,
  removeAbsenceCalled,
}: AbsenceProps) => {
  const [createAbsence, { data, called }] = useMutation<
    createAbsence,
    createAbsenceVariables
  >(CREATE_STUDENT_ABSENCE_MUTATION, {
    variables: {
      input: {
        dayAbsent: todaysLocaleDate,
        markingPeriod: currentMarkingPeriod,
        studentId: student._id!,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [
      'findStudentInfoByStudentIdForDesk',
      'findStudentInfoByStudentId',
      'findCourseByIdForTeachersAid',
    ],
  })
  console.log()
  return (
    <>
      {student.hasAbsences.length === 0 ||
      student.hasAbsences.some(
        (absence) => absence.dayAbsent !== todaysLocaleDate
      ) ? (
        <AttendanceButton
          lateButton={false}
          created={false}
          onClick={() => {
            !unexcusedLatenessId && !excusedLatenessId && createAbsence()
          }}
        >
          {/* {called ? '...' : 'Create Absence'} */}
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

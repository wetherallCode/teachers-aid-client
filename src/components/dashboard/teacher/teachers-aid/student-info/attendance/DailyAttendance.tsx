import { gql, MutationFunctionOptions, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  removeAbsence,
  removeAbsenceVariables,
  removeLateness,
  removeLatenessVariables,
  updateResponsibilityPointsVariables,
  updateResponsibilityPoints,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student,
} from '../../../../../../schemaTypes'
import { todaysLocaleDate } from '../../../../../../utils'
import { AttendanceContainer } from '../../styles/studentInfoStyles'
import { Absence } from './Absence'
import { ExcusedLateness } from './ExcusedLateness'
import { UnexcusedLatness } from './UnexcusedLatness'

export type DailyAttendanceProps = {
  student: findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student
  absenceCheck: boolean
}
export const CREATE_STUDENT_ABSENCE_MUTATION = gql`
  mutation createAbsence($input: CreateAbsenceInput!) {
    createAbsence(input: $input) {
      studentAbsence {
        _id
      }
    }
  }
`

export const REMOVE_ABSENCE_MUTATION = gql`
  mutation removeAbsence($input: RemoveAbsenceInput!) {
    removeAbsence(input: $input) {
      removed
    }
  }
`
export const REMOVE_LATENESS_MUTATION = gql`
  mutation removeLateness($input: RemoveLatenessInput!) {
    removeLateness(input: $input) {
      removed
    }
  }
`

export const UPDATE_RESPONSIBILITY_POINTS_MUTATION = gql`
  mutation updateResponsibilityPoints(
    $input: UpdateResponsibilityPointsInput!
  ) {
    updateResponsibilityPoints(input: $input) {
      responsibilityPoints {
        _id
        responsibilityPoints
      }
    }
  }
`

export type RemoveAbsenceType = (
  options?:
    | MutationFunctionOptions<removeAbsence, removeAbsenceVariables>
    | undefined
) => void

export type RemoveLatenessType = (
  options?:
    | MutationFunctionOptions<removeLateness, removeLatenessVariables>
    | undefined
) => void

export type UpdateResponsibilityPointsType = (
  options?:
    | MutationFunctionOptions<
        updateResponsibilityPoints,
        updateResponsibilityPointsVariables
      >
    | undefined
) => void

export const DailyAttendance = ({
  student,
  absenceCheck,
}: DailyAttendanceProps) => {
  // const [absenceId, setAbsenceId] = useState<string | null>(null)
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context

  const [removeAbsence, { called, data }] = useMutation<
    removeAbsence,
    removeAbsenceVariables
  >(REMOVE_ABSENCE_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: [
      'findStudentInfoByStudentIdForDesk',
      'findStudentByIdForTeachersAid',
      'findCourseByIdForTeachersAid',
    ],
  })

  const [removeLateness] = useMutation<removeLateness, removeLatenessVariables>(
    REMOVE_LATENESS_MUTATION,
    {
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findStudentByIdForTeachersAid'],
    }
  )
  const [updateResponsibilityPoints] = useMutation<
    updateResponsibilityPoints,
    updateResponsibilityPointsVariables
  >(UPDATE_RESPONSIBILITY_POINTS_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findStudentByIdForTeachersAid'],
  })

  const todaysAbsence = student.hasAbsences.filter(
    (a) => a.dayAbsent === new Date().toLocaleDateString()
  )

  const absenceId = todaysAbsence.length !== 0 ? todaysAbsence[0]._id! : ''

  const todaysExcusedLateness = student.hasExcusedLatenesses.filter(
    (l) => l.dayLate === new Date().toLocaleDateString()
  )
  const excusedLatenessId =
    todaysExcusedLateness.length !== 0 ? todaysExcusedLateness[0]._id! : ''

  const todaysUnexcusedLateness = student.hasUnExcusedLatenesses.filter(
    (l) => l.dayLate === new Date().toLocaleDateString()
  )
  const unexcusedLatenessId =
    todaysUnexcusedLateness.length !== 0 ? todaysUnexcusedLateness[0]._id! : ''

  return (
    <AttendanceContainer>
      <Absence
        currentMarkingPeriod={currentMarkingPeriod}
        student={student}
        removeAbsence={removeAbsence}
        todaysAbsenceId={absenceId}
        unexcusedLatenessId={unexcusedLatenessId}
        excusedLatenessId={excusedLatenessId}
        removeAbsenceCalled={called}
        absenceCheck={absenceCheck}
      />
      <ExcusedLateness
        currentMarkingPeriod={currentMarkingPeriod}
        student={student}
        absent={absenceCheck}
        removeAbsence={removeAbsence}
        todaysAbsenceId={absenceId}
        removeLateness={removeLateness}
        unexcusedLatenessId={unexcusedLatenessId}
        updateResponsibilityPoints={updateResponsibilityPoints}
      />
      <UnexcusedLatness
        currentMarkingPeriod={currentMarkingPeriod}
        student={student}
        absent={absenceCheck}
        removeAbsence={removeAbsence}
        todaysAbsenceId={absenceId}
        removeLateness={removeLateness}
        excusedLatenessId={excusedLatenessId}
        updateResponsibilityPoints={updateResponsibilityPoints}
      />
    </AttendanceContainer>
  )
}

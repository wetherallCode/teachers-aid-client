import { gql, useMutation } from '@apollo/client'
import React from 'react'
import {
	MarkingPeriodEnum,
	findStudentInfoByStudentId_findStudentById_student,
	createUnexcusedLatenessVariables,
	createUnexcusedLateness,
} from '../../../../../../schemaTypes'
import { AttendanceButton } from '../../styles/studentInfoStyles'
import {
	RemoveAbsenceType,
	RemoveLatenessType,
	UpdateResponsibilityPointsType,
} from './DailyAttendance'

export type UnexcusedLatnessProps = {
	currentMarkingPeriod: MarkingPeriodEnum
	student: findStudentInfoByStudentId_findStudentById_student
	absent?: boolean
	removeAbsence: RemoveAbsenceType
	todaysAbsenceId: string
	removeLateness: RemoveLatenessType
	excusedLatenessId: string
	updateResponsibilityPoints: UpdateResponsibilityPointsType
}

export const CREATE_UNEXCUSED_LATENESS_QUERY = gql`
	mutation createUnexcusedLateness($input: CreateUnexcusedLatenessInput!) {
		createUnexcusedLateness(input: $input) {
			unexcusedLateness {
				_id
			}
		}
	}
`

export const UnexcusedLatness = ({
	currentMarkingPeriod,
	student,
	absent,
	removeAbsence,
	removeLateness,
	todaysAbsenceId,
	excusedLatenessId,
	updateResponsibilityPoints,
}: UnexcusedLatnessProps) => {
	const [createUnexcusedLateness] = useMutation<
		createUnexcusedLateness,
		createUnexcusedLatenessVariables
	>(CREATE_UNEXCUSED_LATENESS_QUERY, {
		variables: {
			input: {
				studentId: student._id!,
				markingPeriod: currentMarkingPeriod,
				dayLate: new Date().toLocaleDateString(),
			},
		},
		onCompleted: (data) => console.log(data),
		refetchQueries: ['findStudentInfoByStudentId'],
	})

	const unexcusedLatenessCheck =
		student.hasUnExcusedLatenesses.length === 0 ||
		student.hasUnExcusedLatenesses.some((late) => late.dayLate !== new Date().toLocaleDateString())

	const todaysUnexcusedLateness = student.hasUnExcusedLatenesses.filter(
		(late) => late.dayLate === new Date().toLocaleDateString()
	)

	return (
		<>
			{unexcusedLatenessCheck ? (
				<AttendanceButton
					lateButton={true}
					created={false}
					onClick={() => {
						if (absent) {
							removeAbsence({ variables: { input: { _id: todaysAbsenceId } } })
						}
						if (
							student.hasExcusedLatenesses.some(
								(l) => l.dayLateExcused === new Date().toLocaleDateString()
							)
						) {
							removeLateness({
								variables: { input: { _id: excusedLatenessId } },
							})
						}
						createUnexcusedLateness()
						updateResponsibilityPoints({
							variables: {
								input: {
									studentId: student._id!,
									markingPeriod: currentMarkingPeriod,
									points: -10,
								},
							},
						})
					}}>
					Create Unexcused Lateness
				</AttendanceButton>
			) : (
				<AttendanceButton
					lateButton={true}
					created={true}
					onClick={() => {
						removeLateness({
							variables: { input: { _id: todaysUnexcusedLateness[0]._id! } },
						})
						updateResponsibilityPoints({
							variables: {
								input: {
									studentId: student._id!,
									markingPeriod: currentMarkingPeriod,
									points: 10,
								},
							},
						})
					}}>
					Remove Unexecused Lateness
				</AttendanceButton>
			)}
		</>
	)
}

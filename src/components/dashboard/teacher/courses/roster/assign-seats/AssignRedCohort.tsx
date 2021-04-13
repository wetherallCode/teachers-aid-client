import React, { FC, Fragment } from 'react'
import {
	findCourseByIdForStudentRegistration_findCourseById_course,
	StudentCohortEnum,
	assignCohortBasedSeatsVariables,
	assignCohortBasedSeats,
	findCourseByIdForStudentRegistration_findCourseById_course_hasStudents,
} from '../../../../../../schemaTypes'
import { MutationFunctionOptions } from '@apollo/client'
import { AssignSeatType, RemoveAssignedSeatType } from './AssignCohortBasedSeating'

export type AssignRedCohortProps = {
	course: findCourseByIdForStudentRegistration_findCourseById_course
	assignSeats: AssignSeatType
	removeAssignedSeat: RemoveAssignedSeatType
}

export const AssignRedCohort: FC<AssignRedCohortProps> = ({
	course,
	assignSeats,
	removeAssignedSeat,
}) => {
	const assignedSeats = course.hasCourseInfo?.assignedSeats.filter(
		(seat) => seat.redCohortStudent?._id
	)
	console.log(assignedSeats)

	const assign = (deskNumber: number, studentId: string) =>
		assignSeats({
			variables: {
				input: {
					cohortBasedSeating: true,
					courseId: course._id!,
					seat: {
						redCohortStudentId: studentId,
						deskNumber,
					},
				},
			},
		})

	const unAssignSeat = (deskNumber: number) =>
		removeAssignedSeat({
			variables: {
				input: {
					cohortBased: true,
					courseId: course._id!,
					deskNumber,
					cohortType: StudentCohortEnum.RED,
				},
			},
		})

	const deskNumber = (
		student: findCourseByIdForStudentRegistration_findCourseById_course_hasStudents
	) => {
		const [deskNumber] = course.hasCourseInfo?.assignedSeats
			.filter((seat) => seat.redCohortStudent?._id === student._id && seat.redCohortStudent?._id)
			.map((seat) => seat.deskNumber)!
		console.log(deskNumber)
		return deskNumber
	}

	return (
		<>
			<div>Assign Cohort One Seats</div>
			{course.hasStudents
				.filter((student) => student.cohort === StudentCohortEnum.RED)
				.map((student) => {
					return (
						<div key={student._id!}>
							<span
								style={
									assignedSeats?.map((seat) => seat.redCohortStudent?._id).includes(student._id)
										? { color: 'var(--blue)' }
										: { color: 'var(--grey)' }
								}
								onClick={() => {
									if (deskNumber(student)) {
										unAssignSeat(deskNumber(student))
									}
								}}>
								{student.lastName}, {student.firstName} {deskNumber(student)}
							</span>
						</div>
					)
				})}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(6, 1fr)',
					gridTemplateRows: 'repeat(5, 1fr)',
				}}>
				{course.hasCourseInfo?.assignedSeats.map((desk) => (
					<Fragment key={desk.deskNumber}>
						{desk.redCohortStudent ? (
							<div
								style={{
									width: '100px',
									height: '100px',
									border: '1px solid var(--blue)',
								}}>
								{desk.deskNumber}
								{desk.redCohortStudent?.firstName}
								{desk.redCohortStudent && (
									<div onClick={() => unAssignSeat(desk.deskNumber)}>Delete</div>
								)}
							</div>
						) : (
							<div
								style={{
									width: '100px',
									height: '100px',
									border: '1px solid var(--blue)',
								}}>
								{desk.deskNumber}
								<select
									style={{ width: '60%' }}
									onChange={(e: any) => {
										if (e.target.value !== 'none') {
											assign(desk.deskNumber, e.target.value)
										}
									}}>
									<option value={'none'}>Select</option>
									{course.hasStudents
										.filter((student) => {
											return (
												!course.hasCourseInfo?.assignedSeats
													.map((assignedStudent) => assignedStudent.redCohortStudent?._id)
													.includes(student._id) && student.cohort === StudentCohortEnum.RED
											)
										})
										.map((student) => (
											<option key={student._id!} value={student._id!}>
												{student.lastName}, {student.firstName}
											</option>
										))}
								</select>
							</div>
						)}
					</Fragment>
				))}
			</div>
		</>
	)
}

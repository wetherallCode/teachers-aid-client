import React, { FC, Fragment } from 'react'
import { useParams } from 'react-router'
import { useMutation, useQuery, gql } from '@apollo/client'
import {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars

	findCourseByIdForStudentRegistration,
	findCourseByIdForStudentRegistrationVariables,
	StudentSeatInput,
	findCourseByIdForStudentRegistration_findCourseById_course_hasStudents,
	assignRegularSeats,
	assignRegularSeatsVariables,
} from '../../../../../../schemaTypes'

import { FIND_COURSE_BY_ID_QUERY } from '../add-students/AddStudents'
import { ThirtySixSeatingChart } from './ThirtySixSeatingChart'
import { TwentySixIndividualSeatingChart } from './TwentySixIndividualSeatingChart'

export type RegularSeatingProps = {}

export const ASSIGN_REGULAR_SEATS_MUTATION = gql`
	mutation assignRegularSeats($input: AssignSeatsInput!) {
		assignSeats(input: $input) {
			courseInfo {
				_id
				assignedSeats {
					deskNumber
					student {
						_id
						firstName
					}
				}
			}
		}
	}
`

export const RegularSeating: FC<RegularSeatingProps> = () => {
	const { course } = useParams()

	const [assignSeats] = useMutation<assignRegularSeats, assignRegularSeatsVariables>(
		ASSIGN_REGULAR_SEATS_MUTATION,
		{
			onCompleted: (data) => console.log(data),
			refetchQueries: ['findCourseByIdForStudentRegistration'],
		}
	)

	const { loading, data } = useQuery<
		findCourseByIdForStudentRegistration,
		findCourseByIdForStudentRegistrationVariables
	>(FIND_COURSE_BY_ID_QUERY, {
		variables: {
			input: { courseId: course },
		},
		onCompleted: (data) => {
			const assignedSeats: StudentSeatInput[] = []

			for (const seat of data?.findCourseById.course.hasCourseInfo?.assignedSeats!) {
				const formattedSeat: StudentSeatInput = {
					deskNumber: seat.deskNumber,
					studentId: seat.student ? seat.student?._id : null,
				}
				assignedSeats.push(formattedSeat)
			}
		},

		onError: (error) => console.error(error),
	})

	if (loading) return <div>Loading </div>

	const assignedSeats = data?.findCourseById.course.hasCourseInfo?.assignedSeats.filter(
		(seat) => seat.student
	)

	const unAssignSeat = (deskNumber: number) =>
		assignSeats({
			variables: {
				input: {
					cohortBasedSeating: false,
					courseId: course,
					seat: {
						studentId: null,
						deskNumber: deskNumber,
					},
				},
			},
		})

	const assign = (deskNumber: number, studentId: string) =>
		assignSeats({
			variables: {
				input: {
					cohortBasedSeating: false,
					courseId: course,
					seat: {
						studentId,
						deskNumber,
					},
				},
			},
		})

	const deskNumber = (
		student: findCourseByIdForStudentRegistration_findCourseById_course_hasStudents
	) => {
		const [deskNumber] = data?.findCourseById.course.hasCourseInfo?.assignedSeats
			.filter((seat) => seat.student?._id === student._id)
			.map((seat) => seat.deskNumber)!
		return deskNumber
	}
	const courseSize = data?.findCourseById.course.hasCourseInfo?.assignedSeats.length

	return (
		<>
			<div>Assign Seats</div>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '2fr 10fr',
					height: '100%',
				}}>
				<div>
					{data?.findCourseById.course.hasStudents.map((student) => {
						return (
							<div key={student._id!}>
								<span
									style={
										assignedSeats?.map((seat) => seat.student?._id).includes(student._id)
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
				</div>
				{courseSize === 36 ? (
					<ThirtySixSeatingChart
						assignedSeats={data?.findCourseById.course.hasCourseInfo?.assignedSeats!}
						course={course}
						assignSeats={assignSeats}
						studentsInCourse={data?.findCourseById.course.hasStudents!}
					/>
				) : courseSize! > 26 && courseSize! < 30 ? (
					<TwentySixIndividualSeatingChart
						assignedSeats={data?.findCourseById.course.hasCourseInfo?.assignedSeats!}
						course={course}
						assignSeats={assignSeats}
						studentsInCourse={data?.findCourseById.course.hasStudents!}
					/>
				) : (
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(6, 1fr)',
							gridTemplateRows: 'repeat(5, 1fr)',
						}}>
						{data?.findCourseById.course.hasCourseInfo?.assignedSeats!.map((desk) => (
							<Fragment key={desk.deskNumber}>
								{desk.student ? (
									<div
										style={{
											width: '100px',
											height: '100px',
											border: '1px solid var(--blue)',
										}}>
										{desk.deskNumber}
										{desk.student?.firstName}
										{desk.student && (
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
											{data.findCourseById.course.hasStudents
												.filter((student) => {
													return !data.findCourseById.course.hasCourseInfo?.assignedSeats
														.map((assignedStudent) => assignedStudent.student?._id)
														.includes(student._id)
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
				)}
			</div>
		</>
	)
}

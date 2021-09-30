import React, { FC, useEffect } from 'react'
import { capitalizer, date, todaysLocaleDate } from '../../../../utils'
import { TeachersAidContainer } from './styles/teachersAidContainerStyles'
import {
	StudentControlPanelContainer,
	StudentInfoContainer,
	StudentInfoDisplay,
	StudentNameContainer,
} from './styles/studentInfoStyles'
import { ClassControlPanelContainer } from './styles/classControlPanelStyles'
import { SeatingChartContainer, StartingDisplay } from './styles/seatingChartStyles'
import { gql, useQuery } from '@apollo/client'
import { StudentInfo } from './student-info/StudentInfo'
import { ClassControlPanel } from './class-control-panel/center-console/ClassControlPanel'
import { RandomStudentGenerator } from './class-control-panel/random-student-generator/RandomStudentGenerator'
import { useTeachersAidContextProvider } from './state/TeachersAidContext'
import {
	findCourseByIdForTeachersAid,
	findCourseByIdForTeachersAidVariables,
	me_me_Teacher,
} from '../../../../schemaTypes'
import { useUserContextProvider } from '../../../../contexts/UserContext'
import { TimerPresets } from './class-control-panel/timer/TimerPresets'
import { Greetings } from '../../../home/Greetings'
import { MainScreenDisplay } from './main-screen/MainScreenDisplay'

export type TeachersAidProps = {}

export const COURSE_QUERY = gql`
	query findCourseByIdForTeachersAid($input: FindCourseByIdInput!) {
		findCourseById(input: $input) {
			course {
				name
				hasStudents {
					_id
					firstName
					hasAbsences {
						dayAbsent
					}
				}
				hasCourseInfo {
					assignedSeats {
						student {
							_id
							firstName
							hasAbsences {
								dayAbsent
							}
						}
					}
				}
			}
		}
	}
`

export const TeachersAid = ({}: TeachersAidProps) => {
	const [state, event] = useTeachersAidContextProvider()

	const me: me_me_Teacher = useUserContextProvider()
	const title = capitalizer(me.title)

	const { loading, data } = useQuery<
		findCourseByIdForTeachersAid,
		findCourseByIdForTeachersAidVariables
	>(COURSE_QUERY, {
		variables: {
			input: { courseId: state.context.courseInfo?.course._id! },
		},
		onCompleted: (data) => {
			const presentStudentList = data
				.findCourseById!.course!.hasStudents!.filter(
					(student) =>
						(student._id && student.hasAbsences.length === 0) ||
						student.hasAbsences.some((absence) => absence.dayAbsent !== todaysLocaleDate)
				)
				.map((student) => student._id) as string[]
			event({
				type: 'SET_PRESENT_STUDENTS',
				payload: presentStudentList,
			})
		},
		onError: (error) => console.error(error),
	})

	// const presentStudentList =
	//   data?.findCourseById.course.hasCourseInfo?.assignedSeats
	//     .map((student) => student.student)
	//     .filter(
	//       (student) =>
	//         // (student && student.hasAbsences.length === 0) ||
	//         student &&
	//         !student?.hasAbsences.some(
	//           (absence) => absence.dayAbsent === new Date().toLocaleDateString()
	//         )
	//     )
	//     .map((student) => student?._id)! as string[]

	// console.log(presentStudentList)
	// console.log(
	//   data?.findCourseById.course.hasCourseInfo?.assignedSeats
	//     .map((student) => student.student)
	//     .filter((student) => student).length
	// )
	const assignedPresentStudents = data?.findCourseById.course.hasCourseInfo?.assignedSeats
		.map((student) => student.student)
		.filter(
			(student) =>
				// (student && student.hasAbsences.length === 0) ||
				student &&
				!student.hasAbsences.some(
					(absence) => absence.dayAbsent === new Date().toLocaleDateString()
				)
		)
		.map((student) => student?._id)! as string[]
	// console.log(assignedPresentStudents)
	// useEffect(() => {
	//   console.log('change')
	//   if (state.context.courseInfo) {
	//     const presentStudents = state.context
	//       .courseInfo!.course.hasStudents // .filter((desk) => desk.student !== null)
	//       .filter((student) => {
	//         return !student?.hasAbsences.some((day) => day.dayAbsent === date)
	//       })
	//       .map((student) => student?._id) as string[]

	//     event({
	//       type: 'SET_PRESENT_STUDENTS',
	//       payload: presentStudents,
	//     })
	//   }
	// }, [
	//   event,
	//   state.context.courseInfo,
	//   state.context.courseInfo!.course.hasStudents,
	// ])

	// useEffect(() => {
	//   event({
	//     type: 'SET_PRESENT_STUDENTS',
	//     payload: presentStudentList,
	//   })
	// }, [event, presentStudentList])
	console.log(assignedPresentStudents)
	if (loading) return <div>Loading </div>
	return (
		<>
			<TeachersAidContainer>
				<SeatingChartContainer>
					{!state.context.courseInfo!._id ? (
						<StartingDisplay>
							<Greetings phrase={`${title}. ${me.lastName}!`} />
						</StartingDisplay>
					) : (
						<MainScreenDisplay />
					)}
				</SeatingChartContainer>
				<StudentInfoContainer>
					{state.context.studentId ? (
						<StudentInfo />
					) : (
						<>
							<StudentInfoDisplay>
								<StudentNameContainer />
							</StudentInfoDisplay>
							<StudentControlPanelContainer></StudentControlPanelContainer>
						</>
					)}
				</StudentInfoContainer>
				<ClassControlPanelContainer>
					<RandomStudentGenerator />
					<ClassControlPanel presentStudentList={assignedPresentStudents!} />
					<TimerPresets />
				</ClassControlPanelContainer>
			</TeachersAidContainer>
		</>
	)
}

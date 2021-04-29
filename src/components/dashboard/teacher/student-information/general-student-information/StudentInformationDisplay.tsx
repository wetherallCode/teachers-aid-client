import { useQuery } from '@apollo/client'
import React, { Dispatch, SetStateAction } from 'react'
import {
	findAllStudentsForStudentInformation_findAllStudents_students,
	findResponsibilityPointsByStudentId,
	findResponsibilityPointsByStudentIdVariables,
	MarkingPeriodEnum,
} from '../../../../../schemaTypes'

import { StudentInformationDisplayContainer } from '../state-n-styles/studentInformationStyles'
import {
	ResponsibilityPointsDisplay,
	RESPONSIBILITY_POINTS_QUERY,
} from './ResponsibilityPointsDisplay'
import { StudentGradeInformation } from './StudentGradeInformation'
import { WritingMetrics } from './WritingMetrics'

export type StudentInformationDisplayProps = {
	student: findAllStudentsForStudentInformation_findAllStudents_students
	selectedMarkingPeriod: MarkingPeriodEnum
	setSelectedMarkingPeriod: Dispatch<SetStateAction<MarkingPeriodEnum>>
}

export const StudentInformationDisplay = ({
	student,
	selectedMarkingPeriod,
}: StudentInformationDisplayProps) => {
	const { loading, data } = useQuery<
		findResponsibilityPointsByStudentId,
		findResponsibilityPointsByStudentIdVariables
	>(RESPONSIBILITY_POINTS_QUERY, {
		variables: {
			input: { studentId: student._id! },
		},
		// onCompleted: (data) => console.log(data),
		onError: (error) => console.error(error),
	})
	if (loading) return <div>Loading </div>

	const responsibilityPointsCheck = data?.findResponsibilityPointsByStudentId.responsibilityPoints.some(
		(points) => points.markingPeriod === selectedMarkingPeriod
	)!

	// const [
	// 	currentMarkingPeriodResponsiblityPoints,
	// ] = data?.findResponsibilityPointsByStudentId.responsibilityPoints.filter(
	// 	(points) => points.markingPeriod === selectedMarkingPeriod
	// )!
	return (
		<StudentInformationDisplayContainer>
			{student && (
				<>
					<ResponsibilityPointsDisplay
						currentMarkingPeriodResponsiblityPoints={
							responsibilityPointsCheck
								? data?.findResponsibilityPointsByStudentId.responsibilityPoints!.filter(
										(points) => points.markingPeriod === selectedMarkingPeriod
								  )[0].responsibilityPoints!
								: 0
						}
						available={responsibilityPointsCheck}
					/>
					<WritingMetrics studentId={student._id!} />
					<StudentGradeInformation
						student={student}
						selectedMarkingPeriod={selectedMarkingPeriod}
					/>
				</>
			)}
		</StudentInformationDisplayContainer>
	)
}

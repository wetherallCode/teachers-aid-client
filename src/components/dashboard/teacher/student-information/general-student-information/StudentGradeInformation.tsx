import { useQuery } from '@apollo/client'
import React from 'react'
import { useGradeCalculator } from '../../../../../hooks/useGradeCalculator'
import {
	findAllStudentsForStudentInformation_findAllStudents_students,
	findAssignmentByStudentId,
	findAssignmentByStudentIdVariables,
	findResponsibilityPointsByStudentId_findResponsibilityPointsByStudentId_responsibilityPoints,
	MarkingPeriodEnum,
} from '../../../../../schemaTypes'
import {
	letterGrade,
	primaryGradeCalculator,
	responsibilityPointConverter,
	secondaryGradeCalculator,
	supportiveGradeCalculator,
	totalGrade,
} from '../../../../../utils'
import { FIND_ASSINGMENT_INFORMATION_QUERY } from '../AssignmentInformation'

export type StudentGradeInformationProps = {
	student: findAllStudentsForStudentInformation_findAllStudents_students
	selectedMarkingPeriod: MarkingPeriodEnum
	currentMarkingPeriodResponsiblityPoints: findResponsibilityPointsByStudentId_findResponsibilityPointsByStudentId_responsibilityPoints
}

export const StudentGradeInformation = ({
	student,
	selectedMarkingPeriod,
	currentMarkingPeriodResponsiblityPoints,
}: StudentGradeInformationProps) => {
	const { grade: calculatedGrade, loading } = useGradeCalculator(
		student._id!,
		selectedMarkingPeriod
	)

	const pointConversion = responsibilityPointConverter(calculatedGrade, 2)
	console.log(pointConversion)
	return (
		<>
			<div>
				Grade: {loading ? 'loading' : calculatedGrade + '%'}{' '}
				{!loading && letterGrade(calculatedGrade)}
			</div>
		</>
	)
}

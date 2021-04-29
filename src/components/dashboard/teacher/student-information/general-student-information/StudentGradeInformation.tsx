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
}

export const StudentGradeInformation = ({
	student,
	selectedMarkingPeriod,
}: StudentGradeInformationProps) => {
	const { grade: calculatedGrade, loading } = useGradeCalculator(
		student._id!,
		selectedMarkingPeriod
	)

	return (
		<>
			<div>
				Grade: {loading ? 'loading' : calculatedGrade + '%'}{' '}
				{!loading && letterGrade(calculatedGrade)}
			</div>
		</>
	)
}

import React from 'react'
import { useGradeCalculator } from '../../../../../hooks/useGradeCalculator'
import {
	findAllStudentsForStudentInformation_findAllStudents_students,
	MarkingPeriodEnum,
} from '../../../../../schemaTypes'
import { letterGrade } from '../../../../../utils'

export type StudentGradeInformationProps = {
	student: findAllStudentsForStudentInformation_findAllStudents_students
	selectedMarkingPeriod: MarkingPeriodEnum
}

export const StudentGradeInformation = ({
	student,
	selectedMarkingPeriod,
}: StudentGradeInformationProps) => {
	const { grade: calculatedGrade, loading, noGrade } = useGradeCalculator(
		student._id!,
		selectedMarkingPeriod
	)

	return (
		<>
			{!noGrade ? (
				<div>
					Grade: {loading ? 'loading' : calculatedGrade + '%'}{' '}
					{!loading && letterGrade(calculatedGrade)}
				</div>
			) : (
				<div>Grade: No Grades Yet</div>
			)}
		</>
	)
}

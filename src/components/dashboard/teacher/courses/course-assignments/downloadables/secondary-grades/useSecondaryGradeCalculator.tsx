import React from 'react'
import { findAssignmentByStudentIdForSecondary_findAssignmentByStudentId_assignments } from '../../../../../../../schemaTypes'

export type SecondaryGradeCalculatorProps = {
  secondaryGrades: findAssignmentByStudentIdForSecondary_findAssignmentByStudentId_assignments[]
}

export const useSecondaryGradeCalculator = ({
  secondaryGrades,
}: SecondaryGradeCalculatorProps) => {}

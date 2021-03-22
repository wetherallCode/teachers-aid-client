import React, { Dispatch, SetStateAction } from 'react'
import {
  findAllStudentsForStudentInformation_findAllStudents_students,
  MarkingPeriodEnum,
} from '../../../../../schemaTypes'

import { StudentInformationDisplayContainer } from '../state-n-styles/studentInformationStyles'
import { ResponsibilityPointsDisplay } from './ResponsibilityPointsDisplay'
import { WritingMetrics } from './WritingMetrics'

export type StudentInformationDisplayProps = {
  student: findAllStudentsForStudentInformation_findAllStudents_students
  selectedMarkingPeriod: MarkingPeriodEnum
  setSelectedMarkingPeriod: Dispatch<SetStateAction<MarkingPeriodEnum>>
}

export const StudentInformationDisplay = ({
  student,
  selectedMarkingPeriod,
  setSelectedMarkingPeriod,
}: StudentInformationDisplayProps) => {
  return (
    <StudentInformationDisplayContainer>
      {student && (
        <>
          <ResponsibilityPointsDisplay
            studentId={student._id!}
            selectedMarkingPeriod={selectedMarkingPeriod}
            setSelectedMarkingPeriod={setSelectedMarkingPeriod}
          />
          <WritingMetrics studentId={student._id!} />
        </>
      )}
    </StudentInformationDisplayContainer>
  )
}

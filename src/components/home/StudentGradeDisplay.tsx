import React from 'react'
import { useMarkingPeriodContextProvider } from '../../contexts/markingPeriod/MarkingPeriodContext'
import { useCalculateGrades } from '../../hooks/useCalculateGrades'
import { useGradeCalculator } from '../../hooks/useGradeCalculator'
import { GradeDisplay, StudentGradeContainer } from './homeStyles'

export type StudentGradeDisplayProps = { studentId: string }

export const StudentGradeDisplay = ({
  studentId,
}: StudentGradeDisplayProps) => {
  const [currentMarkingPeriod] = useMarkingPeriodContextProvider()
  // const { grade, loading } = useCalculateGrades({
  //   studentId,
  //   polling: true,
  //   pollInterval: 5000,
  //   markingPeriod: currentMarkingPeriod.context.currentMarkingPeriod,
  // })
  const { grade, loading } = useCalculateGrades({
    studentId,
    polling: false,
    pollInterval: 5000,
    markingPeriod: currentMarkingPeriod.context.currentMarkingPeriod,
  })

  return (
    <>
      <GradeDisplay>Current Grade</GradeDisplay>
      <GradeDisplay>{!loading ? grade + '%' : 'Calculating'}</GradeDisplay>

      {/* <div>
            This grade may not be what is in Genesis and will change constantly.
            If you have just completed an essay, your grade will change when
            you've completed the essay and change again when it is graded.
          </div> */}
    </>
  )
}

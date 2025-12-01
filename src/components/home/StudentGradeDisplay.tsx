import React from 'react'
import { useMarkingPeriodContextProvider } from '../../contexts/markingPeriod/MarkingPeriodContext'
import { useCalculateGrades } from '../../hooks/useCalculateGrades'
import { useGradeCalculator } from '../../hooks/useGradeCalculator'
import { GradeDisplay, StudentGradeContainer } from './homeStyles'
import { useQuery } from '@apollo/client'
import {
  findResponsibilityPointsByStudentId,
  findResponsibilityPointsByStudentIdVariables,
} from '../../schemaTypes'
import { RESPONSIBILITY_POINTS_QUERY } from '../dashboard/teacher/student-information/general-student-information/ResponsibilityPointsDisplay'

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
  const { grade, loading } = useGradeCalculator({
    studentId,
    polling: false,
    pollInterval: 5000,
    markingPeriod: currentMarkingPeriod.context.currentMarkingPeriod,
  })
  const {
    loading: responsibilityPointsLoading,
    data: responsibilityPointsData,
  } = useQuery<
    findResponsibilityPointsByStudentId,
    findResponsibilityPointsByStudentIdVariables
  >(RESPONSIBILITY_POINTS_QUERY, {
    variables: {
      input: { studentId },
    },
    // onCompleted: (data) => console.log('polling'),
    onError: (error) => console.error(error),
  })
  let responsibilityPoint: any = 0
  if (!responsibilityPointsLoading && responsibilityPointsData) {
    responsibilityPoint =
      responsibilityPointsData.findResponsibilityPointsByStudentId.responsibilityPoints.find(
        (rp) =>
          rp.markingPeriod ===
          currentMarkingPeriod.context.currentMarkingPeriod,
      )
  }
  const responsibilityPoints = responsibilityPoint.responsibilityPoints
  let extracredit =
    responsibilityPoints >= 100 ? (responsibilityPoints - 100) / 10 : 0
  console.log(extracredit)
  return (
    <>
      <div
        style={{
          display: 'grid',
          justifyItems: 'center',
          alignContent: 'center',
        }}
      >
        <GradeDisplay>Current Grade</GradeDisplay>
        <GradeDisplay>{!loading ? grade + '%' : 'Calculating'}</GradeDisplay>
      </div>
      <div
        style={{
          display: 'grid',
          justifyItems: 'center',
          alignContent: 'center',
        }}
      >
        <GradeDisplay>Extra Credit</GradeDisplay>
        <GradeDisplay>
          {!loading ? extracredit.toFixed(2) + ' Points' : 'Calculating'}
        </GradeDisplay>
      </div>
      {/* <div>
            This grade may not be what is in Genesis and will change constantly.
            If you have just completed an essay, your grade will change when
            you've completed the essay and change again when it is graded.
          </div> */}
    </>
  )
}

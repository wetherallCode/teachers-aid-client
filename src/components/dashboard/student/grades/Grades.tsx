import React from 'react'
import { useMarkingPeriodContextProvider } from '../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useCalculateGrades } from '../../../../hooks/useCalculateGrades'
import { useGradeCalculator } from '../../../../hooks/useGradeCalculator'
import { me_me_Student } from '../../../../schemaTypes'

export type GradesProps = { me: me_me_Student }

export const Grades = ({ me }: GradesProps) => {
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context

  const { grade, loading } = useCalculateGrades({
    studentId: me._id!,
    markingPeriod: currentMarkingPeriod,
    polling: true,
    pollInterval: 1000,
  })

  if (loading) return <div>loading</div>
  return (
    <>
      <div>Grades</div>
    </>
  )
}

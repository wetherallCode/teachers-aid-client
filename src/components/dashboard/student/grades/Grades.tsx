import React from 'react'
import { useMarkingPeriodContextProvider } from '../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useCalculateGrades } from '../../../../hooks/useCalculateGrades'
import { useGradeCalculator } from '../../../../hooks/useGradeCalculator'
import { me_me_Student } from '../../../../schemaTypes'
import {
  GradeSectionContainer,
  SectionContainer,
  StudentGradeBreakdownContainer,
  StudentGradeBreakdownContainerTitle,
} from './studentGradeBreakdownStyles'

export type GradesProps = { me: me_me_Student }

export const Grades = ({ me }: GradesProps) => {
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context

  const { grade, loading, primaryGrade, rp, secondaryGrade } =
    useCalculateGrades({
      studentId: me._id!,
      markingPeriod: currentMarkingPeriod,
      polling: true,
      pollInterval: 1000,
    })

  if (loading) return <div>loading</div>
  return (
    <StudentGradeBreakdownContainer>
      <StudentGradeBreakdownContainerTitle>
        Grade Breakdown
      </StudentGradeBreakdownContainerTitle>
      <GradeSectionContainer>
        <SectionContainer>
          <div>Essay Grade</div>
          <div>{primaryGrade ? primaryGrade.toFixed(2) + '%' : 'No grade'}</div>
        </SectionContainer>
        <SectionContainer>
          <div>Quiz and Responsibility Grade</div>
          <div>
            {secondaryGrade ? secondaryGrade.toFixed(2) + '%' : 'No grade'}
          </div>
        </SectionContainer>
        <SectionContainer>
          <div>Responsibility Point Grade</div>
          <div>{rp?.toFixed(2)}%</div>
        </SectionContainer>
      </GradeSectionContainer>
      <StudentGradeBreakdownContainerTitle>
        Overall Grade: {grade}%
      </StudentGradeBreakdownContainerTitle>
    </StudentGradeBreakdownContainer>
  )
}

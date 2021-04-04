import { useQuery } from '@apollo/client'
import React from 'react'
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
  const { loading, data } = useQuery<
    findAssignmentByStudentId,
    findAssignmentByStudentIdVariables
  >(FIND_ASSINGMENT_INFORMATION_QUERY, {
    variables: {
      input: { studentId: student._id! },
    },
    onCompleted: (data) => {},
    onError: (error) => console.error(error),
  })

  const essays = data?.findAssignmentByStudentId.assignments.filter(
    (assignment) =>
      !assignment.exempt &&
      assignment.markingPeriod === selectedMarkingPeriod &&
      assignment.__typename === 'Essay'
  )

  const essayEarnedPoints = essays
    ?.map((essay) => essay.score.earnedPoints)
    .reduce((acc: number, i: number) => acc + i)!

  const essayMaxPoints = essays
    ?.map((essay) => essay.score.maxPoints)
    .reduce((acc: number, i: number) => acc + i)!

  const essayGrade = primaryGradeCalculator(essayEarnedPoints, essayMaxPoints)

  const articleReviews = data?.findAssignmentByStudentId.articleReviews.filter(
    (assignment) => assignment.markingPeriod === selectedMarkingPeriod
  )

  const articleReviewEarnedPoints = articleReviews
    ?.map((review) => review.score.earnedPoints)
    .reduce((acc: number, i: number) => acc + i)!

  const articleReviewMaxPoints = articleReviews
    ?.map((review) => review.score.maxPoints)
    .reduce((acc: number, i: number) => acc + i)!
  const articleReviewGrade = secondaryGradeCalculator(
    articleReviewEarnedPoints,
    articleReviewMaxPoints
  )
  const responsibilityPointGrade = supportiveGradeCalculator(
    currentMarkingPeriodResponsiblityPoints.responsibilityPoints
  )
  const grade = totalGrade(
    essayGrade,
    articleReviewGrade,
    responsibilityPointGrade
  )

  return (
    <>
      <div>
        Grade: {!loading && grade}% {letterGrade(grade)}
      </div>
    </>
  )
}

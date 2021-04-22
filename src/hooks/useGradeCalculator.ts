import { useQuery } from '@apollo/client'
import React from 'react'
import { FIND_ASSINGMENT_INFORMATION_QUERY } from '../components/dashboard/teacher/student-information/AssignmentInformation'
import { RESPONSIBILITY_POINTS_QUERY } from '../components/dashboard/teacher/student-information/general-student-information/ResponsibilityPointsDisplay'
import {
  findAssignmentByStudentId,
  findAssignmentByStudentIdVariables,
  findResponsibilityPointsByStudentId,
  findResponsibilityPointsByStudentIdVariables,
  MarkingPeriodEnum,
} from '../schemaTypes'
import {
  primaryGradeCalculator,
  secondaryGradeCalculator,
  supportiveGradeCalculator,
  totalGrade,
} from '../utils'

export const useGradeCalculator = (
  studentId: string,
  mp: MarkingPeriodEnum
) => {
  const { loading: assignmentLoading, data } = useQuery<
    findAssignmentByStudentId,
    findAssignmentByStudentIdVariables
  >(FIND_ASSINGMENT_INFORMATION_QUERY, {
    variables: {
      input: { studentId },
    },
    onCompleted: (data) => {},
    onError: (error) => console.error(error),
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
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  //   function handleLateness() {
  //     const submittedDateTime: string = submitTime
  //     const dueDateTime: string = `${readingGuideValidation.dueDate}, ${readingGuideValidation.dueTime}`

  //     if (Date.parse(submittedDateTime) > Date.parse(dueDateTime)) {
  //       return true
  //     } else return false
  //   }
  const essays = data?.findAssignmentByStudentId.assignments.filter(
    (assignment) =>
    (assignment.__typename === 'Essay' &&
       assignment.finalDraft?.returned &&
       assignment.markingPeriod === mp ) ||
      (assignment.__typename === 'Essay' &&
      !assignment.exempt &&
      !assignment.finalDraft &&
      assignment.markingPeriod === mp &&
      Date.parse(new Date().toLocaleString()) >
        Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`))
  )
  const essayEarnedPoints = essays
  ?.map((essay) => essay.score.earnedPoints)
  .reduce((acc: number, i: number) => acc + i)!
  
  const essayMaxPoints = essays
    ?.map((essay) => essay.score.maxPoints)
    .reduce((acc: number, i: number) => acc + i)!
    
    const essayGrade = primaryGradeCalculator(essayEarnedPoints, essayMaxPoints)

    const articleReviews =
    data?.findAssignmentByStudentId.articleReviews &&
    data?.findAssignmentByStudentId.articleReviews.filter(
      (assignment) =>
      assignment.markingPeriod === mp &&
      Date.parse(new Date().toLocaleString())> 
           Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`) 
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

  const currentMarkingPeriodResponsiblityPoints = responsibilityPointsData?.findResponsibilityPointsByStudentId.responsibilityPoints.filter(
    (points) => points.markingPeriod === mp
  )!

  const responsibilityPointGrade =
    currentMarkingPeriodResponsiblityPoints &&
    supportiveGradeCalculator(
      currentMarkingPeriodResponsiblityPoints[0].responsibilityPoints
    )
    
  const grade = totalGrade(
    essayGrade,
    articleReviewGrade,
    responsibilityPointGrade
  )

  return {
    grade: grade,
    loading: assignmentLoading || responsibilityPointsLoading,
  }
}

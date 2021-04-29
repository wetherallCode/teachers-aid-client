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

  const essays = data?.findAssignmentByStudentId.assignments.some(
    (assignment) =>
      (assignment.__typename === 'Essay'&& assignment.markingPeriod === mp))!
 
  const applicableArticleReviews = 
    data?.findAssignmentByStudentId.articleReviews &&
    data?.findAssignmentByStudentId.articleReviews.some(
      (assignment) =>
        assignment.markingPeriod === mp)
   
  const applicableCurrentMarkingPeriodResponsiblityPoints = responsibilityPointsData?.findResponsibilityPointsByStudentId.responsibilityPoints.some(
    (points) => points.markingPeriod === mp)!

    if(!applicableCurrentMarkingPeriodResponsiblityPoints&&!essays&& !applicableArticleReviews) {
      return {grade: 0, loading: false}
    }
  if(!applicableCurrentMarkingPeriodResponsiblityPoints) {
    // Grade Category Weights:// Grade Category Weights: Primary = .588 Secondary = .412
    console.log("Only Primary and Secondary")
    const applicableEssays = data?.findAssignmentByStudentId.assignments.filter(
      (assignment) =>
        (assignment.__typename === 'Essay' &&
          assignment.finalDraft?.returned &&
          assignment.markingPeriod === mp) ||
        (assignment.__typename === 'Essay' &&
          !assignment.exempt &&
          !assignment.finalDraft &&
          assignment.markingPeriod === mp &&
          Date.parse(new Date().toLocaleString()) >
            Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`))
    )

    const essayEarnedPoints = applicableEssays
      ?.map((essay) => essay.score.earnedPoints)
      .reduce((acc: number, i: number) => acc + i)!
  
    const essayMaxPoints = applicableEssays
      ?.map((essay) => essay.score.maxPoints)
      .reduce((acc: number, i: number) => acc + i)!
  
    const articleReviews =
    data?.findAssignmentByStudentId.articleReviews &&
    data?.findAssignmentByStudentId.articleReviews.filter(
      (assignment) =>
        assignment.markingPeriod === mp &&
        Date.parse(new Date().toLocaleString()) >
          Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
    )

  const articleReviewEarnedPoints = articleReviews
    ?.map((review) => review.score.earnedPoints)
    .reduce((acc: number, i: number) => acc + i)!

  const articleReviewMaxPoints = articleReviews
    ?.map((review) => review.score.maxPoints)
    .reduce((acc: number, i: number) => acc + i)!

  const primaryGrade =  (
    earnedPoints: number,
    maxPoints: number
  ) => {
    return (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) * 58.8
  }
  const primary = primaryGrade(essayEarnedPoints, essayMaxPoints)
  const secondaryGrade = (
    earnedPoints: number,
    maxPoints: number
  ) => {
    return (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) * 41.2
  }

  const secondary=secondaryGrade(articleReviewEarnedPoints, articleReviewMaxPoints)

  const gradeTotal = (
    primaryGrade: number,
    secondaryGrade: number ) => {
    const number = Number(
      Number(primaryGrade) + Number(secondaryGrade) 
    ).toFixed(2)

    return Math.round(Number(number) * 10) / 10
    }

    return {grade:gradeTotal(primary,secondary), loading: assignmentLoading || responsibilityPointsLoading,}
  }

  if(!essays && !applicableArticleReviews) {
    // Grade Category Weights: Supportive = 1
    console.log("Only ResponsibilityPoints")
    const currentMarkingPeriodResponsiblityPoints = responsibilityPointsData?.findResponsibilityPointsByStudentId.responsibilityPoints.filter(
      (points) => points.markingPeriod === mp
    )!

    const points = currentMarkingPeriodResponsiblityPoints[0].responsibilityPoints
         
    return {grade:(Math.round(1000 *points ) / 1000) * 1, loading: assignmentLoading || responsibilityPointsLoading,}

  }

  if(!essays){
    // Grade Category Weights: Supportive = .3  Secondary = .7
    console.log("ResponsiblityPoints and Secondary Only")

    const currentMarkingPeriodResponsiblityPoints = responsibilityPointsData?.findResponsibilityPointsByStudentId.responsibilityPoints.filter(
      (points) => points.markingPeriod === mp
    )!

  const {responsibilityPoints} = currentMarkingPeriodResponsiblityPoints[0]

  const supportive = (Math.round(1000 *responsibilityPoints ) / 1000) * .30

  const articleReviews =
  data?.findAssignmentByStudentId.articleReviews &&
  data?.findAssignmentByStudentId.articleReviews.filter(
    (assignment) =>
      assignment.markingPeriod === mp &&
      Date.parse(new Date().toLocaleString()) >
        Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
  )

const articleReviewEarnedPoints = articleReviews
  ?.map((review) => review.score.earnedPoints)
  .reduce((acc: number, i: number) => acc + i)!

const articleReviewMaxPoints = articleReviews
  ?.map((review) => review.score.maxPoints)
  .reduce((acc: number, i: number) => acc + i)!
  const secondaryGrade = (
    earnedPoints: number,
    maxPoints: number
  ) => {
    return (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) * 70
  }

  const secondary=secondaryGrade(articleReviewEarnedPoints, articleReviewMaxPoints)

  const gradeTotal = (
    supportive: number,
    secondaryGrade: number ) => {
    const number = Number(
      Number(supportive) + Number(secondaryGrade) 
    ).toFixed(2)

    return Math.round(Number(number) * 10) / 10
    }
    return {grade:gradeTotal(supportive, secondary), loading: assignmentLoading || responsibilityPointsLoading,}
  }
  
  if (!applicableArticleReviews){
    // Grade Category Weights: Supportive = .23068182   Primary = .76931818
    console.log("Only Essays and ResponsibilityPoints")

    const applicableEssays = data?.findAssignmentByStudentId.assignments.filter(
      (assignment) =>
        (assignment.__typename === 'Essay' &&
          assignment.finalDraft?.returned &&
          assignment.markingPeriod === mp) ||
        (assignment.__typename === 'Essay' &&
          !assignment.exempt &&
          !assignment.finalDraft &&
          assignment.markingPeriod === mp &&
          Date.parse(new Date().toLocaleString()) >
            Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`))
    )

    const essayEarnedPoints = applicableEssays
      ?.map((essay) => essay.score.earnedPoints)
      .reduce((acc: number, i: number) => acc + i)!
  
    const essayMaxPoints = applicableEssays
      ?.map((essay) => essay.score.maxPoints)
      .reduce((acc: number, i: number) => acc + i)!
    
      const primaryGrade =  (
        earnedPoints: number,
        maxPoints: number
      ) => {
        return (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) * 76.931818
      }     
    
    const primary = primaryGrade(essayEarnedPoints, essayMaxPoints)

    const currentMarkingPeriodResponsiblityPoints = responsibilityPointsData?.findResponsibilityPointsByStudentId.responsibilityPoints.filter(
        (points) => points.markingPeriod === mp
      )!
  
    const {responsibilityPoints} = currentMarkingPeriodResponsiblityPoints[0]

    const supportive = (Math.round(1000 *responsibilityPoints ) / 1000) * .23068182


    const gradeTotal = (
      primaryGrade: number,
      supportiveGrade: number ) => {
      const number = Number(
        Number(primaryGrade) + Number(supportiveGrade) 
      ).toFixed(2)
  
      return Math.round(Number(number) * 10) / 10
      }

    return {grade:gradeTotal(primary, supportive), loading: assignmentLoading || responsibilityPointsLoading,}
  }

  const applicableEssays = data?.findAssignmentByStudentId.assignments.filter(
    (assignment) =>
      (assignment.__typename === 'Essay' &&
        assignment.finalDraft?.returned &&
        assignment.markingPeriod === mp) ||
      (assignment.__typename === 'Essay' &&
        !assignment.exempt &&
        !assignment.finalDraft &&
        assignment.markingPeriod === mp &&
        Date.parse(new Date().toLocaleString()) >
          Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`))
  )
  const essayEarnedPoints = applicableEssays
    ?.map((essay) => essay.score.earnedPoints)
    .reduce((acc: number, i: number) => acc + i)!

  const essayMaxPoints = applicableEssays
    ?.map((essay) => essay.score.maxPoints)
    .reduce((acc: number, i: number) => acc + i)!

  const essayGrade = primaryGradeCalculator(essayEarnedPoints, essayMaxPoints)

  const articleReviews =
    data?.findAssignmentByStudentId.articleReviews &&
    data?.findAssignmentByStudentId.articleReviews.filter(
      (assignment) =>
        assignment.markingPeriod === mp &&
        Date.parse(new Date().toLocaleString()) >
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

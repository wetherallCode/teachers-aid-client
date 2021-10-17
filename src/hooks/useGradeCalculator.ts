import { useQuery } from '@apollo/client'
import React from 'react'
import { FIND_ASSINGMENT_INFORMATION_QUERY } from '../components/dashboard/teacher/student-information/AssignmentInformation'
import { RESPONSIBILITY_POINTS_QUERY } from '../components/dashboard/teacher/student-information/general-student-information/ResponsibilityPointsDisplay'
import {
  findAssignmentByStudentId,
  findAssignmentByStudentIdVariables,
  findAssignmentByStudentId_findAssignmentByStudentId_assignments,
  findResponsibilityPointsByStudentId,
  findResponsibilityPointsByStudentIdVariables,
  GradeTypeEnum,
  MarkingPeriodEnum,
} from '../schemaTypes'
import {
  primaryGradeCalculator,
  secondaryGradeCalculator,
  supportiveGradeCalculator,
  totalGrade,
} from '../utils'

type GradeCalculatorProps = {
  studentId: string
  markingPeriod: MarkingPeriodEnum
  polling: boolean
  pollInterval?: number
}

export const useGradeCalculator = ({
  studentId,
  markingPeriod,
  polling,
  pollInterval,
}: GradeCalculatorProps) => {
  const { loading: assignmentLoading, data } = useQuery<
    findAssignmentByStudentId,
    findAssignmentByStudentIdVariables
  >(FIND_ASSINGMENT_INFORMATION_QUERY, {
    variables: {
      input: { studentId },
    },
    onCompleted: (data) => {},
    pollInterval: polling ? pollInterval : 0,
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
    pollInterval: 1000,
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  const essays = data?.findAssignmentByStudentId.assignments.some(
    (assignment) =>
      assignment.__typename === 'Essay' &&
      assignment.markingPeriod === markingPeriod &&
      Date.parse(new Date().toLocaleString()) >
        Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
  )!

  // const applicableArticleReviews =
  //   data?.findAssignmentByStudentId.articleReviews &&
  //   data?.findAssignmentByStudentId.articleReviews.some(
  //     (assignment) => assignment.markingPeriod === markingPeriod
  //   )

  const secondaryGrades = data?.findAssignmentByStudentId.assignments.some(
    (assignment) =>
      assignment.gradeType === GradeTypeEnum.SECONDARY &&
      assignment.markingPeriod === markingPeriod &&
      Date.parse(new Date().toLocaleString()) >
        Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
  )

  const applicableCurrentMarkingPeriodResponsiblityPoints =
    responsibilityPointsData?.findResponsibilityPointsByStudentId.responsibilityPoints.some(
      (points) => points.markingPeriod === markingPeriod
    )!
  if (!assignmentLoading && !responsibilityPointsLoading) {
    console.log(
      essays,
      secondaryGrades,
      applicableCurrentMarkingPeriodResponsiblityPoints
    )
    if (
      !applicableCurrentMarkingPeriodResponsiblityPoints &&
      essays &&
      secondaryGrades
    ) {
      // Grade Category Weights:// Grade Category Weights: Primary = .588 Secondary = .412
      console.log('Only Primary and Secondary')
      const applicableEssays =
        data?.findAssignmentByStudentId.assignments.filter(
          (assignment) =>
            (assignment.__typename === 'Essay' &&
              assignment.finalDraft?.returned &&
              assignment.markingPeriod === markingPeriod) ||
            (assignment.__typename === 'Essay' &&
              !assignment.exempt &&
              !assignment.finalDraft &&
              assignment.markingPeriod === markingPeriod &&
              Date.parse(new Date().toLocaleString()) >
                Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`))
        )

      const essayEarnedPoints = applicableEssays
        ?.map((essay) => essay.score.earnedPoints)
        .reduce((acc: number, i: number) => acc + i)!

      const essayMaxPoints = applicableEssays
        ?.map((essay) => essay.score.maxPoints)
        .reduce((acc: number, i: number) => acc + i)!

      const secondaryGradeAssignments =
        secondaryGrades &&
        data?.findAssignmentByStudentId.assignments.filter(
          (assignment) =>
            assignment.gradeType === GradeTypeEnum.SECONDARY &&
            assignment.markingPeriod === markingPeriod &&
            Date.parse(new Date().toLocaleString()) >
              Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
        )

      const secondaryGradesEarnedPoints = secondaryGradeAssignments
        ?.map((review) => review.score.earnedPoints)
        .reduce((acc: number, i: number) => acc + i)!

      const secondaryGradesMaxPoints = secondaryGradeAssignments
        ?.map((review) => review.score.maxPoints)
        .reduce((acc: number, i: number) => acc + i)!

      const primaryGrade = (earnedPoints: number, maxPoints: number) => {
        return (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) * 60
      }
      const primary = primaryGrade(essayEarnedPoints, essayMaxPoints)

      const secondaryGrade = (earnedPoints: number, maxPoints: number) => {
        return (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) * 40
      }

      const secondary = secondaryGrade(
        secondaryGradesEarnedPoints,
        secondaryGradesMaxPoints
      )

      const gradeTotal = (primaryGrade: number, secondaryGrade: number) => {
        const number = Number(
          Number(primaryGrade) + Number(secondaryGrade)
        ).toFixed(2)

        return Math.round(Number(number) * 10) / 10
      }

      return {
        grade: gradeTotal(primary, secondary),
        loading: assignmentLoading || responsibilityPointsLoading,
        noGrade: false,
      }
    }

    if (
      !essays &&
      !secondaryGrades &&
      applicableCurrentMarkingPeriodResponsiblityPoints
    ) {
      // Grade Category Weights: Supportive = 1
      console.log('Only ResponsibilityPoints')
      const currentMarkingPeriodResponsiblityPoints =
        responsibilityPointsData?.findResponsibilityPointsByStudentId.responsibilityPoints.filter(
          (points) => points.markingPeriod === markingPeriod
        )!

      const points =
        currentMarkingPeriodResponsiblityPoints[0].responsibilityPoints

      return {
        grade: (Math.round(1000 * points) / 1000) * 1,
        loading: assignmentLoading || responsibilityPointsLoading,
        noGrade: false,
      }
    }

    if (
      !applicableCurrentMarkingPeriodResponsiblityPoints &&
      !essays &&
      secondaryGrades
    ) {
      console.log('Only Secondary')
      const secondaryGradeAssignments =
        secondaryGrades &&
        data?.findAssignmentByStudentId.assignments.filter(
          (assignment) =>
            assignment.gradeType === GradeTypeEnum.SECONDARY &&
            assignment.markingPeriod === markingPeriod &&
            Date.parse(new Date().toLocaleString()) >
              Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
        )
      console.log(secondaryGradeAssignments)
      const secondaryGradesEarnedPoints = secondaryGradeAssignments
        ?.map((review) => review.score.earnedPoints)
        .reduce((acc: number, i: number) => acc + i, 0)!

      const secondaryGradesMaxPoints = secondaryGradeAssignments
        ?.map((review) => review.score.maxPoints)
        .reduce((acc: number, i: number) => acc + i, 0)!
      // const articleReviews =
      //   data?.findAssignmentByStudentId.articleReviews &&
      //   data?.findAssignmentByStudentId.articleReviews.filter(
      //     (assignment) =>
      //       assignment.markingPeriod === markingPeriod &&
      //       Date.parse(new Date().toLocaleString()) >
      //         Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
      //   )

      // const articleReviewEarnedPoints = articleReviews
      //   ?.map((review) => review.score.earnedPoints)
      //   .reduce((acc: number, i: number) => acc + i)!

      // const articleReviewMaxPoints = articleReviews
      //   ?.map((review) => review.score.maxPoints)
      //   .reduce((acc: number, i: number) => acc + i)!

      const secondaryGrade = (earnedPoints: number, maxPoints: number) => {
        return (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) * 100
      }

      return {
        grade: +secondaryGrade(
          secondaryGradesEarnedPoints,
          secondaryGradesMaxPoints
        ).toFixed(2),
        loading: assignmentLoading || responsibilityPointsLoading,
        noGrade: false,
      }
    }

    if (
      !essays &&
      secondaryGrades &&
      applicableCurrentMarkingPeriodResponsiblityPoints
    ) {
      // Grade Category Weights: Supportive = .3  Secondary = .7
      console.log('ResponsiblityPoints and Secondary Only')

      const currentMarkingPeriodResponsiblityPoints =
        responsibilityPointsData?.findResponsibilityPointsByStudentId.responsibilityPoints.filter(
          (points) => points.markingPeriod === markingPeriod
        )!

      const { responsibilityPoints } =
        currentMarkingPeriodResponsiblityPoints[0]

      const supportive = (Math.round(1000 * responsibilityPoints) / 1000) * 0.3

      // const articleReviews =
      //   data?.findAssignmentByStudentId.articleReviews &&
      //   data?.findAssignmentByStudentId.articleReviews.filter(
      //     (assignment) =>
      //       assignment.markingPeriod === markingPeriod &&
      //       Date.parse(new Date().toLocaleString()) >
      //         Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
      //   )

      // const articleReviewEarnedPoints = articleReviews
      //   ?.map((review) => review.score.earnedPoints)
      //   .reduce((acc: number, i: number) => acc + i)!

      // const articleReviewMaxPoints = articleReviews
      //   ?.map((review) => review.score.maxPoints)
      //   .reduce((acc: number, i: number) => acc + i)!
      const secondaryGradeAssignments =
        secondaryGrades &&
        data?.findAssignmentByStudentId.assignments.filter(
          (assignment) =>
            assignment.gradeType === GradeTypeEnum.SECONDARY &&
            assignment.markingPeriod === markingPeriod &&
            Date.parse(new Date().toLocaleString()) >
              Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
        )

      const secondaryGradesEarnedPoints = secondaryGradeAssignments
        ?.map((review) => review.score.earnedPoints)
        .reduce((acc: number, i: number) => acc + i, 0)!

      const secondaryGradesMaxPoints = secondaryGradeAssignments
        ?.map((review) => review.score.maxPoints)
        .reduce((acc: number, i: number) => acc + i, 0)!

      const secondaryGrade = (earnedPoints: number, maxPoints: number) => {
        return (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) * 70
      }

      const secondary = secondaryGrade(
        secondaryGradesEarnedPoints,
        secondaryGradesMaxPoints
      )
      console.log(secondaryGradesMaxPoints)
      const gradeTotal = (supportive: number, secondaryGrade: number) => {
        const number = Number(
          Number(supportive) + Number(secondaryGrade)
        ).toFixed(2)

        return Math.round(Number(number) * 10) / 10
      }
      return {
        grade: gradeTotal(supportive, secondary),
        loading: assignmentLoading || responsibilityPointsLoading,
        noGrade: false,
      }
    }

    if (
      !secondaryGrades &&
      essays &&
      applicableCurrentMarkingPeriodResponsiblityPoints
    ) {
      // Grade Category Weights: Supportive = .23068182   Primary = .76931818
      console.log('Only Essays and ResponsibilityPoints')
      // console.log(data?.findAssignmentByStudentId.assignments)
      const applicableEssays =
        data?.findAssignmentByStudentId.assignments.filter(
          (assignment) =>
            (assignment.__typename === 'Essay' &&
              assignment.finalDraft?.returned &&
              assignment.markingPeriod === markingPeriod) ||
            (assignment.__typename === 'Essay' &&
              !assignment.exempt &&
              !assignment.finalDraft &&
              assignment.markingPeriod === markingPeriod &&
              Date.parse(new Date().toLocaleString()) >
                Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`))
        )

      const essayEarnedPoints = applicableEssays
        ?.map((essay) => essay.score.earnedPoints)
        .reduce((acc: number, i: number) => acc + i)!

      const essayMaxPoints = applicableEssays
        ?.map((essay) => essay.score.maxPoints)
        .reduce((acc: number, i: number) => acc + i)!

      const primaryGrade = (earnedPoints: number, maxPoints: number) => {
        return (
          (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) * 76.931818
        )
      }

      const primary = primaryGrade(essayEarnedPoints, essayMaxPoints)

      const currentMarkingPeriodResponsiblityPoints =
        responsibilityPointsData?.findResponsibilityPointsByStudentId.responsibilityPoints.filter(
          (points) => points.markingPeriod === markingPeriod
        )!

      const { responsibilityPoints } =
        currentMarkingPeriodResponsiblityPoints[0]

      const supportive =
        (Math.round(1000 * responsibilityPoints) / 1000) * 0.23068182

      const gradeTotal = (primaryGrade: number, supportiveGrade: number) => {
        const number = Number(
          Number(primaryGrade) + Number(supportiveGrade)
        ).toFixed(2)

        return Math.round(Number(number) * 10) / 10
      }

      return {
        grade: gradeTotal(primary, supportive),
        loading: assignmentLoading || responsibilityPointsLoading,
        noGrade: false,
      }
    }
    if (
      !applicableCurrentMarkingPeriodResponsiblityPoints &&
      !essays &&
      !secondaryGrades
    ) {
      console.log('Nothing')
      return { grade: 0, loading: false, noGrade: true }
    }
    const applicableEssays = data?.findAssignmentByStudentId.assignments.filter(
      (assignment) =>
        (assignment.__typename === 'Essay' &&
          assignment.finalDraft?.returned &&
          assignment.markingPeriod === markingPeriod) ||
        (assignment.__typename === 'Essay' &&
          !assignment.exempt &&
          !assignment.finalDraft &&
          assignment.markingPeriod === markingPeriod &&
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

    // const articleReviews =
    //   data?.findAssignmentByStudentId.articleReviews &&
    //   data?.findAssignmentByStudentId.articleReviews.filter(
    //     (assignment) =>
    //       assignment.markingPeriod === markingPeriod &&
    //       Date.parse(new Date().toLocaleString()) >
    //         Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
    //   )

    // const articleReviewEarnedPoints = articleReviews
    //   ?.map((review) => review.score.earnedPoints)
    //   .reduce((acc: number, i: number) => acc + i)!

    // const articleReviewMaxPoints = articleReviews
    //   ?.map((review) => review.score.maxPoints)
    //   .reduce((acc: number, i: number) => acc + i)!
    const secondaryGradeAssignments =
      // secondaryGrades &&
      data?.findAssignmentByStudentId.assignments.filter(
        (assignment) =>
          assignment.gradeType === GradeTypeEnum.SECONDARY &&
          assignment.markingPeriod === markingPeriod &&
          Date.parse(new Date().toLocaleString()) >
            Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
      )

    const secondaryGradesEarnedPoints = secondaryGradeAssignments
      ?.map((review) => review.score.earnedPoints)
      .reduce((acc: number, i: number) => acc + i)!

    const secondaryGradesMaxPoints = secondaryGradeAssignments
      ?.map((review) => review.score.maxPoints)
      .reduce((acc: number, i: number) => acc + i)!

    const secondary = secondaryGradeCalculator(
      secondaryGradesEarnedPoints,
      secondaryGradesMaxPoints
    )

    const currentMarkingPeriodResponsiblityPoints =
      responsibilityPointsData?.findResponsibilityPointsByStudentId.responsibilityPoints.filter(
        (points) => points.markingPeriod === markingPeriod
      )!

    const responsibilityPointGrade =
      currentMarkingPeriodResponsiblityPoints &&
      supportiveGradeCalculator(
        currentMarkingPeriodResponsiblityPoints[0].responsibilityPoints
      )
    // console.log(essayGrade, articleReviewGrade, responsibilityPointGrade)
    const grade = totalGrade(essayGrade, secondary, responsibilityPointGrade)

    return {
      grade: grade,
      loading: assignmentLoading || responsibilityPointsLoading,
      noGrade: false,
    }
  }
  return {
    grade: 0,
    loading: assignmentLoading || responsibilityPointsLoading,
    noGrade: false,
  }
}

import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findAllMarkingPeriodGrades,
  findAllMarkingPeriodGradesVariables,
  findAllMarkingPeriodGrades_findAllMarkingPeriodGrades_assignments,
  GradeTypeEnum,
  MarkingPeriodEnum,
} from '../schemaTypes'

export type useCalculateGradesProps = {
  studentId: string
  markingPeriod: MarkingPeriodEnum
  polling: boolean
  pollInterval?: number
}

export const FIND_STUDENT_GRADES_QUERY = gql`
  query findAllMarkingPeriodGrades($input: FindAllMarkingPeriodGradesInput!) {
    findAllMarkingPeriodGrades(input: $input) {
      assignments {
        markingPeriod
        dueDate
        dueTime
        exempt
        ... on Quiz {
          score {
            earnedPoints
            maxPoints
          }
          gradeType
        }
        ... on Essay {
          topic {
            essayQuestionId
            question
          }
          gradeType
          score {
            earnedPoints
            maxPoints
          }
          finalDraft {
            returned
          }
        }
        ... on ReadingGuide {
          readings {
            readingSections
          }
          gradeType
          score {
            earnedPoints
            maxPoints
          }
        }
        ... on SpecialAssignment {
          gradeType
          score {
            earnedPoints
            maxPoints
          }
        }
      }
      responsibilityPoints {
        responsibilityPoints
      }
    }
  }
`

export const useCalculateGrades = ({
  studentId,
  markingPeriod,
  polling,
  pollInterval,
}: useCalculateGradesProps) => {
  const { loading, data } = useQuery<
    findAllMarkingPeriodGrades,
    findAllMarkingPeriodGradesVariables
  >(FIND_STUDENT_GRADES_QUERY, {
    variables: {
      input: { markingPeriod, studentId },
    },
    pollInterval: polling ? pollInterval : 0,
    // onCompleted: (data) =>
    //   console.log(data.findAllMarkingPeriodGrades.responsibilityPoints),
    onError: (error) => console.error(error),
  })

  const allEssays = data?.findAllMarkingPeriodGrades.assignments.filter(
    (assignment) =>
      (assignment.__typename === 'Essay' &&
        !assignment.exempt &&
        assignment.finalDraft?.returned &&
        Date.parse(new Date().toLocaleString()) >
          Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)) ||
      (assignment.__typename === 'Essay' &&
        !assignment.exempt &&
        !assignment.finalDraft &&
        assignment.markingPeriod === markingPeriod &&
        Date.parse(new Date().toLocaleString()) >
          Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`))
  )!

  const allSecondaryGrades =
    data?.findAllMarkingPeriodGrades.assignments.filter(
      (assignment) =>
        assignment.gradeType === GradeTypeEnum.SECONDARY &&
        assignment.markingPeriod === markingPeriod &&
        !assignment.exempt &&
        Date.parse(new Date().toLocaleString()) >
          Date.parse(`${assignment.dueDate}, ${assignment.dueTime}`)
    )!

  const responsibilityPoints =
    data?.findAllMarkingPeriodGrades.responsibilityPoints!.responsibilityPoints!

  const handleScoring = (
    assignments: findAllMarkingPeriodGrades_findAllMarkingPeriodGrades_assignments[],
    gradeWeightPercentage: number
  ) => {
    const earnedPoints = assignments
      .map((essay) => essay.score.earnedPoints)
      .reduce((acc: number, i: number) => acc + i)!
    const maxPoints = assignments
      .map((essay) => essay.score.maxPoints)
      .reduce((acc: number, i: number) => acc + i)!

    return (
      (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) *
      gradeWeightPercentage
    )
  }
  const handeResponsiblityPointScore = (
    responsibilityPointsGrade: number,
    gradeWeightPercentage: number
  ) => {
    return (
      (Math.round(1000 * responsibilityPointsGrade) / 1000) *
      (1 / gradeWeightPercentage)
    )
  }

  if (!loading) {
    const onlyPrimaryAndSecondary =
      allEssays.length > 0 &&
      allSecondaryGrades.length > 0 &&
      !data?.findAllMarkingPeriodGrades.responsibilityPoints

    const onlyResponsibilityPoints =
      allEssays.length === 0 &&
      allSecondaryGrades.length < 0 &&
      !!data?.findAllMarkingPeriodGrades.responsibilityPoints

    const onlySecondary =
      allEssays.length === 0 &&
      allSecondaryGrades.length > 0 &&
      !data?.findAllMarkingPeriodGrades.responsibilityPoints

    const onlyPrimary =
      allEssays.length > 0 &&
      allSecondaryGrades.length === 0 &&
      !data?.findAllMarkingPeriodGrades.responsibilityPoints

    const onlySecondaryAndResponsiblityPoints =
      allEssays.length === 0 &&
      allSecondaryGrades.length > 0 &&
      !!data?.findAllMarkingPeriodGrades.responsibilityPoints

    const onlyPrimaryAndResponsibilityPoints =
      allEssays.length > 0 &&
      allSecondaryGrades.length === 0 &&
      !!data?.findAllMarkingPeriodGrades.responsibilityPoints

    const allGrades =
      allEssays.length > 0 &&
      allSecondaryGrades.length > 0 &&
      !!data?.findAllMarkingPeriodGrades.responsibilityPoints

    if (onlyPrimaryAndSecondary) {
      const primaryGrade = handleScoring(allEssays, 60)
      const secondaryGrade = handleScoring(allSecondaryGrades, 40)

      const gradeTotal = (primary: number, secondary: number) => {
        const number = Number(Number(primary) + Number(secondary))
        return Math.round(Number(number) * 10) / 10
      }

      return {
        grade: gradeTotal(primaryGrade, secondaryGrade),
        loading,
        noGrade: false,
        primaryGrade,
        secondaryGrade,
        rp: null,
      }
    }

    if (onlyResponsibilityPoints) {
      return {
        grade: handeResponsiblityPointScore(responsibilityPoints, 1),
        loading,
        noGrade: false,
        primaryGrade: null,
        secondaryGrade: null,
        rp: handeResponsiblityPointScore(responsibilityPoints, 1),
      }
    }
    if (onlySecondary) {
      return {
        grade: +handleScoring(allSecondaryGrades, 100).toFixed(2),
        loading,
        noGrade: false,
        primaryGrade: null,
        secondaryGrade: +handleScoring(allSecondaryGrades, 100).toFixed(2),
        rp: null,
      }
    }
    if (onlyPrimary) {
      return {
        grade: +handleScoring(allEssays, 100).toFixed(2),
        loading,
        noGrade: false,
        primaryGrade: +handleScoring(allEssays, 100).toFixed(2),
        secondaryGrade: null,
        rp: null,
      }
    }

    if (onlyPrimaryAndResponsibilityPoints) {
      const primaryGrade = handleScoring(allEssays, 76.931818)
      const rp = handeResponsiblityPointScore(responsibilityPoints, 23.068182)

      const gradeTotal = (primaryGrade: number, supportiveGrade: number) => {
        const number = Number(
          Number(primaryGrade) + Number(supportiveGrade)
        ).toFixed(2)

        return Math.round(Number(number) * 10) / 10
      }

      return {
        grade: gradeTotal(primaryGrade, rp),
        loading,
        noGrade: false,
        primaryGrade,
        secondaryGrade: null,
        rp,
      }
    }
    if (onlySecondaryAndResponsiblityPoints) {
      const secondaryGrade = handleScoring(allSecondaryGrades, 70)
      const rp = handeResponsiblityPointScore(responsibilityPoints, 30)

      const gradeTotal = (secondary: number, supportiveGrade: number) => {
        const number = Number(
          Number(secondary) + Number(supportiveGrade)
        ).toFixed(2)

        return Math.round(Number(number) * 10) / 10
      }

      return {
        grade: gradeTotal(secondaryGrade, rp),
        loading,
        noGrade: false,
        primaryGrade: null,
        secondaryGrade,
        rp,
      }
    }
    if (allGrades) {
      const primaryGrade = handleScoring(allEssays, 50)
      const secondaryGrade = handleScoring(allSecondaryGrades, 40)
      const rp = handeResponsiblityPointScore(responsibilityPoints, 10)

      const totalGrade = Number(
        Number(primaryGrade) + Number(secondaryGrade) + Number(rp)
      ).toFixed(3)

      return {
        grade: Math.round(Number(totalGrade) * 10) / 10,
        loading,
        noGrade: false,
        primaryGrade,
        secondaryGrade,
        rp,
      }
    }
  }
  return {
    grade: 0,
    loading,
    noGrade: false,
  }
}

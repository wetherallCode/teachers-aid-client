import { useQuery } from '@apollo/client'
import React from 'react'
import { FIND_STUDENT_GRADES_QUERY } from '../../../../../hooks/useCalculateGrades'
import {
  GradeTypeEnum,
  MarkingPeriodEnum,
  findAllMarkingPeriodGrades,
  findAllMarkingPeriodGradesVariables,
  me_me_Student,
} from '../../../../../schemaTypes'
import { EssayAverage } from './EssayAverage'
import { QuizAverage } from './QuizAverage'
import { ReadingGuideAverage } from './ReadingGuideAverage'
import { MyGradesResponsibilityPoints } from './MyGradesResponsibilityPoints'

export type AssignmentFinderProps = {
  me: me_me_Student
  currentMarkingPeriod: MarkingPeriodEnum
}

export const AssignmentFinder = ({
  me,
  currentMarkingPeriod,
}: AssignmentFinderProps) => {
  const { loading, data } = useQuery<
    findAllMarkingPeriodGrades,
    findAllMarkingPeriodGradesVariables
  >(FIND_STUDENT_GRADES_QUERY, {
    variables: {
      input: { markingPeriod: currentMarkingPeriod, studentId: me._id! },
    },
    // onCompleted: (data) =>
    //   console.log(data.findAllMarkingPeriodGrades.assignments),
    onError: (error) => console.error(error),
  })

  const quizzes = data?.findAllMarkingPeriodGrades.assignments.filter(
    (a) => a.gradeType === GradeTypeEnum.SECONDARY && a.__typename === 'Quiz'
  )!

  const readingGuides = data?.findAllMarkingPeriodGrades.assignments.filter(
    (a) =>
      a.gradeType === GradeTypeEnum.SECONDARY && a.__typename === 'ReadingGuide'
  )!

  const essays = data?.findAllMarkingPeriodGrades.assignments.filter(
    (a) => a.gradeType === GradeTypeEnum.PRIMARY && a.__typename === 'Essay'
  )!

  if (loading) return <div>Loading...</div>
  return (
    <div
      style={{
        display: 'grid',
        gridAutoFlow: 'column',
        justifyItems: 'center',
        alignItems: 'center',
        fontSize: '3vh',
        textAlign: 'center',
      }}
    >
      <MyGradesResponsibilityPoints
        me={me}
        currentMarkingPeriod={currentMarkingPeriod}
      />
      {essays.length > 0 && <EssayAverage essays={essays} />}
      {readingGuides.length > 0 && (
        <ReadingGuideAverage readingGuides={readingGuides} />
      )}
      {quizzes.length > 0 && <QuizAverage quizzes={quizzes} />}
    </div>
  )
}

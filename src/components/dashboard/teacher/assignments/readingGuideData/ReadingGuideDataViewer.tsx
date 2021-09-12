import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findReadingGuideDataForCourseAndLessonVariables,
  findReadingGuideDataForCourseAndLesson,
  // InformationStructureEnum,
} from '../../../../../schemaTypes'

export type DataViewerProps = { lessonId: string; course: string }

export const FIND_READING_GUIDE_DATA_FOR_COURSE_AND_LESSON_QUERY = gql`
  query findReadingGuideDataForCourseAndLesson(
    $input: FindReadingGuidesByAssociatedLessonAndCourseIdInput!
  ) {
    findReadingGuidesByAssociatedLessonAndCourseId(input: $input) {
      readingGuides {
        assigned
        hasOwner {
          _id
          firstName
          lastName
        }
        readings {
          readingSections
        }
        completed
        graded
        readingGuideFinal {
          # clarifyingQuestions
          submitted
          # howIsSectionOrganized
          # whyWasSectionOrganized
          # majorIssue
          # majorSolution
          # majorIssueSolved
        }
      }
    }
  }
`
export const ReadingGuideDataViewer: FC<DataViewerProps> = ({
  lessonId,
  course,
}) => {
  const { loading, data } = useQuery<
    findReadingGuideDataForCourseAndLesson,
    findReadingGuideDataForCourseAndLessonVariables
  >(FIND_READING_GUIDE_DATA_FOR_COURSE_AND_LESSON_QUERY, {
    variables: {
      input: { courseId: course, lessonId: lessonId },
    },
    // onCompleted: (data) => data,
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const readingGuides =
    data?.findReadingGuidesByAssociatedLessonAndCourseId.readingGuides

  let clarifyingQuestionsList: { student: string; questions: string[] }[] = []

  let completedReadingGuidesNumber: number = 0

  let problemSolutionTypes = 0
  let problemSolutionReasons: string[] = []
  let causeEffectTypes = 0
  let causeEffectReasons: string[] = []
  let compareContrastTypes = 0
  let compareContrastReasons: string[] = []
  let sequenceTypes = 0
  let sequenceReasons: string[] = []

  let majorIssuesList: string[] = []
  let majorUnsolvedIssueList: string[] = []
  let majorSolutionsList: string[] = []

  let majorIssueSolved: number = 0
  let majorIssueUnsolved: number = 0

  // readingGuides?.forEach((guide) => {
  //   if (guide.readingGuideFinal) {
  //     const clarifyingQuestions: string[] =
  //       guide.readingGuideFinal.clarifyingQuestions

  //     const obj = {
  //       student: guide.hasOwner.firstName,
  //       questions: [...clarifyingQuestions],
  //     }
  //     completedReadingGuidesNumber = completedReadingGuidesNumber + 1
  //     clarifyingQuestionsList = [...clarifyingQuestionsList, obj]
  //     majorIssuesList = [...majorIssuesList, guide.readingGuideFinal.majorIssue]

  //     if (guide.readingGuideFinal.majorIssueSolved) {
  //       majorIssueSolved = majorIssueSolved + 1
  //       majorSolutionsList = [
  //         ...majorSolutionsList,
  //         guide.readingGuideFinal.majorSolution,
  //       ]
  //     }
  //     if (!guide.readingGuideFinal.majorIssueSolved) {
  //       majorIssueUnsolved = majorIssueUnsolved + 1
  //       majorUnsolvedIssueList = [
  //         ...majorUnsolvedIssueList,
  //         guide.readingGuideFinal.majorSolution,
  //       ]
  //     }
  //     if (
  //       guide.readingGuideFinal.howIsSectionOrganized!.includes(
  //         InformationStructureEnum.PROBLEM_SOLUTION
  //       )
  //     ) {
  //       problemSolutionTypes = problemSolutionTypes + 1
  //       problemSolutionReasons = [
  //         ...problemSolutionReasons,
  //         guide.readingGuideFinal.whyWasSectionOrganized!,
  //       ]
  //     }
  //     if (
  //       guide.readingGuideFinal.howIsSectionOrganized!.includes(
  //         InformationStructureEnum.CAUSE_EFFECT
  //       )
  //     ) {
  //       causeEffectTypes = causeEffectTypes + 1
  //       causeEffectReasons = [
  //         ...causeEffectReasons,
  //         guide.readingGuideFinal.whyWasSectionOrganized!,
  //       ]
  //     }
  //     if (
  //       guide.readingGuideFinal.howIsSectionOrganized!.includes(
  //         InformationStructureEnum.COMPARE_CONTRAST
  //       )
  //     ) {
  //       compareContrastTypes = compareContrastTypes + 1
  //       compareContrastReasons = [
  //         ...compareContrastReasons,
  //         guide.readingGuideFinal.whyWasSectionOrganized!,
  //       ]
  //     }
  //     if (
  //       guide.readingGuideFinal.howIsSectionOrganized!.includes(
  //         InformationStructureEnum.SEQUENCE
  //       )
  //     ) {
  //       sequenceTypes = sequenceTypes + 1
  //       sequenceReasons = [
  //         ...sequenceReasons,
  //         guide.readingGuideFinal.whyWasSectionOrganized!,
  //       ]
  //     }
  //   }
  // })

  let completionFraction =
    completedReadingGuidesNumber + '/' + readingGuides?.length

  return (
    <>
      <div>How many were completed online: {completionFraction}</div>
      <div>
        <div>Section Structure</div>
        {problemSolutionTypes > 0 && (
          <>
            <div>Problem and Solution: {problemSolutionTypes}</div>
            {problemSolutionReasons.map((reason, i: number) => (
              <div key={i}>
                {i + 1}: {reason}
              </div>
            ))}
          </>
        )}
        {causeEffectTypes > 0 && (
          <>
            <div>Cause and Effect: {causeEffectTypes}</div>
            {causeEffectReasons.map((reason, i: number) => (
              <div key={i}>
                {i + 1}: {reason}
              </div>
            ))}
          </>
        )}
        {compareContrastTypes > 0 && (
          <>
            <div>Compare and Contrast: {compareContrastTypes}</div>
            {compareContrastReasons.map((reason, i: number) => (
              <div key={i}>
                {i + 1}: {reason}
              </div>
            ))}
          </>
        )}
        {sequenceTypes > 0 && (
          <>
            <div>Sequence:{sequenceTypes}</div>
            {sequenceReasons.map((reason, i: number) => (
              <div key={i}>
                {i + 1}: {reason}
              </div>
            ))}
          </>
        )}
      </div>
      <div>Major Issues</div>
      {majorIssuesList.map((issue, i: number) => (
        <div key={i}>
          {i + 1}: {issue}
        </div>
      ))}
      {majorIssueSolved > 0 && (
        <>
          <div>How was it solved?</div>
          {majorSolutionsList.map((solution, i: number) => (
            <div key={i}>
              {i + 1}: {solution}
            </div>
          ))}
        </>
      )}
      {majorIssueUnsolved > 0 && (
        <>
          <div>Why wasn't it solved?</div>
          {majorUnsolvedIssueList.map((reason, i: number) => (
            <div key={i}>
              {i + 1}: {reason}
            </div>
          ))}
        </>
      )}
      <div>Clarifying Questions</div>
      {clarifyingQuestionsList.map((question, i: number) => {
        return (
          <div key={i}>
            {question.student}: {question.questions}
          </div>
        )
      })}
    </>
  )
}

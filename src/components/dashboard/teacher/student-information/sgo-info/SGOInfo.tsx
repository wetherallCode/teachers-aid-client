import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findEssayQuestionByIdForSGO,
  findEssayQuestionByIdForSGOVariables,
  findEssaysByStudentId,
  findEssaysByStudentIdVariables,
  findEssaysByStudentId_findEssaysByStudentId_essays_finalDraft_submittedFinalDraft_rubricEntries,
  findSGOEssaysByStudentId,
  findSGOEssaysByStudentIdVariables,
  findSGOEssaysByStudentId_findSGOEssaysByStudentId_essays_finalDraft_submittedFinalDraft_rubricEntries,
  RubricSectionEnum,
} from '../../../../../schemaTypes'

export type SGOInfoProps = {
  studentId: string
}

export const FIND_ESSAYS_BY_STUDENT_QUERY = gql`
  query findEssaysByStudentId($input: FindEssaysByStudentIdInput!) {
    findEssaysByStudentId(input: $input) {
      essays {
        markingPeriod
        score {
          earnedPoints
        }
        topic {
          essayQuestionId
        }
        readings {
          readingSections
        }
        finalDraft {
          submittedFinalDraft {
            score
            rubricEntries {
              rubricSection
              score
              entry
            }
          }
        }
      }
    }
  }
`
export const FIND_ESSAY_QUESTION_INFO_FOR_SGO_QUERY = gql`
  query findEssayQuestionByIdForSGO($input: FindEssayQuestionByIdInput!) {
    findEssayQuestionById(input: $input) {
      essayQuestion {
        sgoQuestion
      }
    }
  }
`

export const FIND_SGO_ESSAYS_QUERY = gql`
  query findSGOEssaysByStudentId($input: FindSGOEssaysByStudentIdInput!) {
    findSGOEssaysByStudentId(input: $input) {
      essays {
        markingPeriod
        score {
          earnedPoints
        }
        topic {
          essayQuestionId
        }
        readings {
          readingSections
        }
        finalDraft {
          submittedFinalDraft {
            score
            rubricEntries {
              rubricSection
              score
              entry
            }
          }
        }
      }
    }
  }
`

export type RubricEntries =
  | findSGOEssaysByStudentId_findSGOEssaysByStudentId_essays_finalDraft_submittedFinalDraft_rubricEntries[]
  | null
export const SGOInfo = ({ studentId }: SGOInfoProps) => {
  const { loading, data } = useQuery<
    findSGOEssaysByStudentId,
    findSGOEssaysByStudentIdVariables
  >(FIND_SGO_ESSAYS_QUERY, {
    variables: {
      input: { studentId },
    },
    onCompleted: (data) => console.log(data.findSGOEssaysByStudentId.essays),
    onError: (error) => console.error(error),
  })

  const essaysToReview = data?.findSGOEssaysByStudentId.essays.filter(
    (essay) =>
      essay.finalDraft &&
      essay.markingPeriod !== 'FIRST' &&
      essay.score.earnedPoints !== 0
  )!

  const answerEntries: RubricEntries = []
  const conclusionEntries: RubricEntries = []

  if (!loading) {
    for (const essay of data?.findSGOEssaysByStudentId.essays!) {
      if (essay.finalDraft) {
        const essayToSort = [...essay.finalDraft?.submittedFinalDraft!]
        const bestEssay = essayToSort.sort((a, b) => {
          if (a.score < b.score) {
            return 1
          }
          if (a.score > b.score) {
            return -1
          }
          return 0
        })[0]

        // for (const finalDraft of essay.finalDraft?.submittedFinalDraft!) {
        for (const entry of bestEssay.rubricEntries) {
          if (entry.rubricSection === 'ANSWER') {
            answerEntries.push({
              __typename: entry.__typename,
              rubricSection: entry.rubricSection,
              score: entry.score > 4 ? 4 : entry.score,
              entry: entry.entry,
            })
          }
          if (entry.rubricSection === 'CONCLUSION') {
            conclusionEntries.push({
              __typename: entry.__typename,
              rubricSection: entry.rubricSection,
              score: entry.score > 4 ? 4 : entry.score,
              entry: entry.entry,
            })
          }
        }
      } else {
        answerEntries.push({
          __typename: 'RubricEntry',
          rubricSection: RubricSectionEnum.ANSWER,
          score: 0,
          entry: '',
        })
        conclusionEntries.push({
          __typename: 'RubricEntry',
          rubricSection: RubricSectionEnum.CONCLUSION,
          score: 0,
          entry: '',
        })
      }
    }

    const totalAnswerScore = answerEntries
      .map((a) => (a.score > 4 ? 4 : a.score))
      .reduce((acc, i) => acc + i, 0)

    const answerScoreAverage = totalAnswerScore / answerEntries.length

    const totalConclusionScore = conclusionEntries
      .map((a) => (a.score > 4 ? 4 : a.score))
      .reduce((acc, i) => acc + i, 0)

    const conclusionScoreAverage =
      totalConclusionScore / conclusionEntries.length

    console.log(conclusionEntries)
    return (
      <>
        <div>SGO</div>
        <div>
          {answerEntries.map((entry, i: number) => (
            <div key={i}>{entry.score}</div>
          ))}
        </div>
        <div>{+answerScoreAverage.toFixed(2)}</div>
      </>
      // <div>
      //   <div>Answer Score: {+answerScoreAverage.toFixed(2) - 1}</div>
      //   <div>Conclusion Score: {+conclusionScoreAverage.toFixed(2) - 1}</div>
      // </div>
    )
  } else return <div>Loading </div>
}

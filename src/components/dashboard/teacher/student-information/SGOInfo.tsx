import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findEssaysByStudentId,
  findEssaysByStudentIdVariables,
  findEssaysByStudentId_findEssaysByStudentId_essays_finalDraft_submittedFinalDraft_rubricEntries,
} from '../../../../schemaTypes'

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

export const SGOInfo = ({ studentId }: SGOInfoProps) => {
  const { loading, data } = useQuery<
    findEssaysByStudentId,
    findEssaysByStudentIdVariables
  >(FIND_ESSAYS_BY_STUDENT_QUERY, {
    variables: {
      input: { studentId },
    },
    // onCompleted: (data) =>
    //   console.log(
    //     data.findEssaysByStudentId.essays.filter((essay) => essay.finalDraft)
    //   ),
    onError: (error) => console.error(error),
  })

  const essaysToReview = data?.findEssaysByStudentId.essays.filter(
    (essay) =>
      essay.finalDraft &&
      essay.markingPeriod !== 'FIRST' &&
      essay.score.earnedPoints !== 0
  )!
  const answerEntries: findEssaysByStudentId_findEssaysByStudentId_essays_finalDraft_submittedFinalDraft_rubricEntries[] =
    []
  const conclusionEntries: findEssaysByStudentId_findEssaysByStudentId_essays_finalDraft_submittedFinalDraft_rubricEntries[] =
    []

  if (!loading && essaysToReview) {
    for (const essay of essaysToReview) {
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
      console.log(bestEssay)
      // for (const finalDraft of essay.finalDraft?.submittedFinalDraft!) {
      for (const entry of bestEssay.rubricEntries) {
        if (entry.rubricSection === 'ANSWER') {
          answerEntries.push(entry)
        }
        if (entry.rubricSection === 'CONCLUSION') {
          conclusionEntries.push(entry)
        }
      }
      // }
    }
    const totalAnswerScore = answerEntries
      .map((a) => a.score)
      .reduce((acc, i) => acc + i, 0)

    const answerScoreAverage = totalAnswerScore / answerEntries.length
    console.log(answerEntries.length)
    const totalConclusionScore = conclusionEntries
      .map((a) => a.score)
      .reduce((acc, i) => acc + i, 0)

    const conclusionScoreAverage =
      totalConclusionScore / conclusionEntries.length
    return (
      <div>
        <div>Answer Score: {+answerScoreAverage.toFixed(2) - 1}</div>
        <div>Conclusion Score: {+conclusionScoreAverage.toFixed(2) - 1}</div>
      </div>
    )
  } else return <div>Loading </div>
}

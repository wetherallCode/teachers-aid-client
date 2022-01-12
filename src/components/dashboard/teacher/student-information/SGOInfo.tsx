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
        finalDraft {
          submittedFinalDraft {
            rubricEntries {
              rubricSection
              score
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
    (essay) => essay.finalDraft && essay.markingPeriod !== 'FIRST'
  )!
  const answerEntries: findEssaysByStudentId_findEssaysByStudentId_essays_finalDraft_submittedFinalDraft_rubricEntries[] =
    []
  if (essaysToReview) {
    for (const essay of essaysToReview) {
      for (const finalDraft of essay.finalDraft?.submittedFinalDraft!) {
        for (const entry of finalDraft.rubricEntries) {
          if (entry.rubricSection === 'ANSWER') {
            answerEntries.push(entry)
          }
        }
      }
    }
  }
  const totalAnswerScore = answerEntries
    .map((a) => a.score)
    .reduce((acc, i) => acc + i, 0)
  console.log(totalAnswerScore / answerEntries.length - 1)
  if (loading) return <div>Loading </div>
  return (
    <>
      <div></div>
    </>
  )
}

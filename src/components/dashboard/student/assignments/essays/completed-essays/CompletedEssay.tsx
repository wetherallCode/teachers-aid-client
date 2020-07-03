import React, { FC } from 'react'
import { useParams, useNavigate } from 'react-router'

import { useQuery, gql } from '@apollo/client'
import {
  findCompletedEssayByIdVariables,
  findCompletedEssayById,
} from '../../../../../../schemaTypes'
import { CompletedEssayViewer } from './CompletedEssayViewer'

export const FIND_COMPLETED_ESSSAY_BY_ID_QUERY = gql`
  query findCompletedEssayById($input: FindEssayByIdInput!) {
    findEssayById(input: $input) {
      essay {
        finalDraft {
          submittedFinalDraft {
            draft
            score
            rubricEntries {
              entry
              rubricSection
              score
            }
          }
        }
      }
    }
  }
`

export type CompletedEssayProps = {}

export const CompletedEssay: FC<CompletedEssayProps> = () => {
  const { completedEssay } = useParams()
  const navigate = useNavigate()

  const { loading, data } = useQuery<
    findCompletedEssayById,
    findCompletedEssayByIdVariables
  >(FIND_COMPLETED_ESSSAY_BY_ID_QUERY, {
    variables: {
      input: { _id: completedEssay },
    },
    onCompleted: (data) =>
      console.log(
        data.findEssayById.essay.finalDraft?.submittedFinalDraft.rubricEntries
      ),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      <button onClick={() => navigate('/dashboard/assignments')}>Back</button>
      <div>Completed Essay Page</div>
      <CompletedEssayViewer essay={data?.findEssayById.essay!} />
      <>
        <span>Score: </span>
        <span>
          {data?.findEssayById.essay.finalDraft?.submittedFinalDraft.score}
        </span>
      </>
      <>
        {data?.findEssayById.essay.finalDraft?.submittedFinalDraft.rubricEntries.map(
          (entry, i: number) => (
            <div key={i}>{entry.entry}</div>
          )
        )}
      </>
    </>
  )
}

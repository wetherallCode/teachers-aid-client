import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {
  findEssaysByTopic,
  findEssaysByTopicVariables,
} from '../../../../../../schemaTypes'

export type CheckEssaysProps = {}

export const FIND_ESSAYS_BY_TOPIC_QUERY = gql`
  query findEssaysByTopic($input: FindEssaysByTopicInput!) {
    findEssaysByTopic(input: $input) {
      essays {
        _id

        hasOwner {
          firstName
          lastName
        }
        finalDraft {
          submittedFinalDraft {
            gradingDraft
          }
        }
      }
    }
  }
`
export const CheckEssays = ({}: CheckEssaysProps) => {
  const [question, setQuestion] = useState('')
  const { loading, data } = useQuery<
    findEssaysByTopic,
    findEssaysByTopicVariables
  >(FIND_ESSAYS_BY_TOPIC_QUERY, {
    variables: {
      input: { question },
    },
    onCompleted: (data) => console.log(data.findEssaysByTopic.essays),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  return (
    <>
      <div>Check Essays</div>
      Input Question: <input onChange={(e) => setQuestion(e.target.value)} />
      <br />
      {data?.findEssaysByTopic.essays && (
        <div>
          {data?.findEssaysByTopic.essays
            .filter((essay) => essay.finalDraft)
            .map((essay) => (
              <div key={essay._id}>
                <div>
                  {essay.hasOwner.firstName}, {essay.hasOwner.lastName}
                </div>
                <div>
                  {essay.finalDraft?.submittedFinalDraft.map((draft) => (
                    <div key={draft.gradingDraft}>{draft.gradingDraft}</div>
                  ))}
                </div>
                <br />
              </div>
            ))}
        </div>
      )}
    </>
  )
}

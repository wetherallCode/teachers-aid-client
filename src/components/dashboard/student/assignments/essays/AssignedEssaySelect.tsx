import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findEssaysToComplete,
  findEssaysToCompleteVariables,
  me_me_Student,
} from '../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../contexts/UserContext'

export type AssignedEssaySelectProps = {}

export const ESSAYS_TO_COMPLETE_QUERY = gql`
  query findEssaysToComplete($input: FindEssaysToCompleteByStudentIdInput!) {
    findEssaysToCompleteByStudentId(input: $input) {
      essays {
        _id
        readings {
          readingSections
        }
      }
    }
  }
`

export const AssignedEssaySelect: FC<AssignedEssaySelectProps> = () => {
  const me: me_me_Student = useUserContextProvider()
  const { loading, error, data } = useQuery<
    findEssaysToComplete,
    findEssaysToCompleteVariables
  >(ESSAYS_TO_COMPLETE_QUERY, {
    variables: {
      input: { studentId: me._id! },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  if (loading) return <div>Loading </div>
  return (
    <>
      <div>Essays to complete</div>
      {data?.findEssaysToCompleteByStudentId.essays.map((essay) => (
        <div key={essay._id!}>{essay.readings.readingSections}</div>
      ))}
    </>
  )
}

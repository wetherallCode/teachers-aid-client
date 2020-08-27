import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findEssaysToComplete,
  findEssaysToCompleteVariables,
  me_me_Student,
} from '../../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { Link } from 'react-router-dom'
import {
  AssignmentTypeTitle,
  AssignmentTypeContentContainer,
  AssignmentLink,
} from '../../assignmentsStyles'

export type AssignedEssaySelectProps = {}

export const ESSAYS_TO_COMPLETE_QUERY = gql`
  query findEssaysToComplete($input: FindEssaysToCompleteByStudentIdInput!) {
    findEssaysToCompleteByStudentId(input: $input) {
      essays {
        _id
        paperBased
        readings {
          readingSections
        }
        topic {
          writingLevel
        }
      }
    }
  }
`

export const AssignedEssaySelect: FC<AssignedEssaySelectProps> = () => {
  const me: me_me_Student = useUserContextProvider()
  const { loading, data } = useQuery<
    findEssaysToComplete,
    findEssaysToCompleteVariables
  >(ESSAYS_TO_COMPLETE_QUERY, {
    variables: {
      input: { studentId: me._id! },
    },
    pollInterval: 10000,
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  console.log(data?.findEssaysToCompleteByStudentId.essays)
  // if (loading)
  //   return (
  //     <AssignmentTypeTitle>
  //       <div>Essays to complete</div>
  //     </AssignmentTypeTitle>
  //   )

  return (
    <>
      <AssignmentTypeTitle>
        <div>Essays to complete</div>
      </AssignmentTypeTitle>
      {loading ? null : (
        <AssignmentTypeContentContainer>
          {data?.findEssaysToCompleteByStudentId.essays
            .filter((essay) => !essay.paperBased)
            .map((essay) => (
              <AssignmentLink
                to={`essay/toComplete/${essay._id!}`}
                key={essay._id!}
              >
                {essay.readings.readingSections}
              </AssignmentLink>
            ))}
        </AssignmentTypeContentContainer>
      )}
    </>
  )
}

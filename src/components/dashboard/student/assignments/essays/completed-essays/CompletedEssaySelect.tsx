import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findCompletedEssaysByStudentIdVariables,
  findCompletedEssaysByStudentId,
  me_me_Student,
} from '../../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { Link } from 'react-router-dom'

export type CompletedEssaySelectProps = {}
export const FIND_COMPLETED_ESSAYS_QUERY = gql`
  query findCompletedEssaysByStudentId(
    $input: FindCompletedEssaysByStudentIdInput!
  ) {
    findCompletedEssaysByStudentId(input: $input) {
      essays {
        _id
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

export const CompletedEssaySelect: FC<CompletedEssaySelectProps> = () => {
  const me: me_me_Student = useUserContextProvider()

  const { loading, data } = useQuery<
    findCompletedEssaysByStudentId,
    findCompletedEssaysByStudentIdVariables
  >(FIND_COMPLETED_ESSAYS_QUERY, {
    variables: {
      input: { studentId: me._id! },
    },
    onCompleted: (data) => console.log(data.findCompletedEssaysByStudentId),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  return (
    <>
      <div>Completed Essays</div>
      {data?.findCompletedEssaysByStudentId.essays.map((essay) => (
        <Link to={`essay/completed/${essay._id!}`} key={essay._id!}>
          {essay.readings.readingSections}
        </Link>
      ))}
    </>
  )
}

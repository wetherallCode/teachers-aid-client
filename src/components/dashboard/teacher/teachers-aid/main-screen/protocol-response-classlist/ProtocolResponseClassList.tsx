import { gql, useQuery } from '@apollo/client'
import React, { FC } from 'react'
import {
  findActiveProtocolsByCourse,
  findActiveProtocolsByCourseVariables,
} from '../../../../../../schemaTypes'

import { todaysLocaleDate } from '../../../../../../utils'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import {
  ResponseContainer,
  ResponseTitle,
} from '../../styles/responseAssessorStyle'
import { ResponseAssessor } from './ResponseAssessor'

export type ProtocolResponseClassListProps = {}

export const FIND_ACTIVE_PROTOCOL_BY_COURSE_QUERY = gql`
  query findActiveProtocolsByCourse($input: FindActiveProtocolsByCourseInput!) {
    findActiveProtocolsByCourse(input: $input) {
      protocols {
        _id
        student {
          _id
          schoolId
          firstName
          lastName
        }
        assessment
      }
    }
  }
`

export const ProtocolResponseClassList: FC<ProtocolResponseClassListProps> =
  () => {
    const [state, event] = useTeachersAidContextProvider()

    const { loading, data } = useQuery<
      findActiveProtocolsByCourse,
      findActiveProtocolsByCourseVariables
    >(FIND_ACTIVE_PROTOCOL_BY_COURSE_QUERY, {
      variables: {
        input: { courseId: state.context.courseInfo!.course._id! },
      },
      onCompleted: (data) => console.log(data),
      onError: (error) => console.error(error),
    })
    if (loading) return <div>Loading </div>

    return (
      <>
        <ResponseTitle>Responses</ResponseTitle>

        <ResponseContainer>
          {data?.findActiveProtocolsByCourse.protocols!.map((protocol) => (
            <ResponseAssessor key={protocol._id} protocol={protocol} />
          ))}
        </ResponseContainer>
      </>
    )
  }

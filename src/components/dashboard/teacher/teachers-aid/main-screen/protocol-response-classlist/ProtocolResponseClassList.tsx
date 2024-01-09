import { gql, useQuery } from '@apollo/client'
import {
  ActivityTimeEnum,
  findActiveProtocolsByCourse,
  findActiveProtocolsByCourseVariables,
  findProtocolsByDate,
  findProtocolsByDateVariables,
} from '../../../../../../schemaTypes'

import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import {
  ResponseAssessorCategoriesContainer,
  ResponseContainer,
  ResponseTitle,
} from '../../styles/responseAssessorStyle'
import { ResponseAssessor } from './ResponseAssessor'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useState } from 'react'

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
        response
        assessment
        activityTime
      }
    }
  }
`

export const FIND_PROTOCOLS_BY_DATE_QUERY = gql`
  query findProtocolsByDate($input: FindProtocolResponsesInput!) {
    findProtocolsByDate(input: $input) {
      protocols {
        _id
        student {
          _id
          schoolId
          firstName
          lastName
        }
        response
        assessment
        activityTime
        task
        lessonId
        markingPeriod
        protocolActivityType
        assignedDate
        academicOutcomeType
      }
    }
  }
`

export const ProtocolResponseClassList =
  ({}: ProtocolResponseClassListProps) => {
    const [state] = useTeachersAidContextProvider()

    const { loading, data } = useQuery<
      findActiveProtocolsByCourse,
      findActiveProtocolsByCourseVariables
    >(FIND_ACTIVE_PROTOCOL_BY_COURSE_QUERY, {
      variables: {
        input: {
          courseId: state.context.courseInfo!.course._id!,
        },
      },
      onCompleted: (data) => console.log(data),
      pollInterval: 2000,
      onError: (error) => console.error(error),
    })
    if (loading) return <div>Loading </div>

    const { protocols } = data?.findActiveProtocolsByCourse!

    return (
      <>
        <ResponseTitle>Responses</ResponseTitle>
        <ResponseContainer>
          {protocols!.map(
            (protocol) =>
              protocol.response && (
                <ResponseAssessor key={protocol._id} protocol={protocol} />
              ),
          )}
        </ResponseContainer>
      </>
    )
  }

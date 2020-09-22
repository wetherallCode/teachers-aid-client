import React, { FC, useState } from 'react'
import {
  me_me,
  findStudentProtocol,
  findStudentProtocolVariables,
  respondToProtocol,
  respondToProtocolVariables,
  findStudentProtocol_findStudentById_student_hasProtocols,
  AcademicOutcomeTypes,
} from '../../../schemaTypes'
import { gql, useQuery, useMutation } from '@apollo/client'
import {
  ProtocolResponseContainer,
  ProtocolResponseButtonContainer,
  ProtocolResponseButton,
  ProtocolResponseArea,
  ProtocolResponseHeader,
  ProtocolResponse,
} from '../state/lessonStyles'

export type StudentProtocolResponseProps = {
  me: me_me
}
export const FIND_STUDENT_PROTOCOL_QUERY = gql`
  query findStudentProtocol($input: FindStudentByIdInput!) {
    findStudentById(input: $input) {
      student {
        hasProtocols {
          _id
          completed
          assignedDate
          academicOutcomeType
          task
          isActive
          response
        }
      }
    }
  }
`

export const RESPOND_TO_PROTOCOL_MUTATION = gql`
  mutation respondToProtocol($input: RespondToProtocolInput!) {
    respondToProtocol(input: $input) {
      protocol {
        _id
      }
    }
  }
`
export const StudentProtocolResponse: FC<StudentProtocolResponseProps> = ({
  me,
}) => {
  const [response, setResponse] = useState('')
  const [protocol, setProtocol] = useState<
    findStudentProtocol_findStudentById_student_hasProtocols
  >({
    __typename: 'Protocol',
    _id: '',
    academicOutcomeType: AcademicOutcomeTypes.LOGIC_BUILDING,
    assignedDate: '',
    completed: false,
    isActive: false,
    task: '',
    response: null,
  })
  const { loading, data } = useQuery<
    findStudentProtocol,
    findStudentProtocolVariables
  >(FIND_STUDENT_PROTOCOL_QUERY, {
    variables: {
      input: { studentId: me._id! },
    },
    onCompleted: (data) => {
      const [protocol] = data.findStudentById.student.hasProtocols.filter(
        (protocol) => protocol.isActive
      )
      setProtocol(protocol)
    },
    pollInterval: 1000,
    onError: (error) => console.error(error),
  })

  const [respond] = useMutation<respondToProtocol, respondToProtocolVariables>(
    RESPOND_TO_PROTOCOL_MUTATION,
    {
      variables: { input: { protocolId: protocol._id!, response } },
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findStudentProtocol', 'findVirtualResponses'],
    }
  )
  const isProtocolRespondedTo = data?.findStudentById.student.hasProtocols
    .filter((protocol) => protocol.isActive)
    .some((protocol) => protocol.response)

  const protocolResponse = data?.findStudentById.student.hasProtocols
    .filter((protocol) => protocol.isActive)
    .map((protocol) => protocol.response)

  return (
    <>
      {isProtocolRespondedTo ? (
        <ProtocolResponseContainer>
          <ProtocolResponse>{protocolResponse}</ProtocolResponse>
        </ProtocolResponseContainer>
      ) : (
        <>
          <ProtocolResponseContainer>
            <ProtocolResponseHeader>
              Respond to this Task
            </ProtocolResponseHeader>
            <ProtocolResponseArea
              onChange={(e: any) => setResponse(e.target.value)}
            />
          </ProtocolResponseContainer>
          <ProtocolResponseButtonContainer>
            <ProtocolResponseButton onClick={() => respond()}>
              Respond
            </ProtocolResponseButton>
          </ProtocolResponseButtonContainer>
        </>
      )}
    </>
  )
}

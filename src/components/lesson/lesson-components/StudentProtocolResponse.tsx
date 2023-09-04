import { useState } from 'react'
import {
  me_me,
  respondToProtocol,
  respondToProtocolVariables,
  AcademicOutcomeTypes,
  findActiveProtocolByStudent,
  findActiveProtocolByStudentVariables,
  findActiveProtocolByStudent_findActiveProtocolByStudent_protocol,
} from '../../../schemaTypes'
import { gql, useQuery, useMutation } from '@apollo/client'
import {
  ProtocolResponseContainer,
  ProtocolResponseButtonContainer,
  ProtocolResponseButton,
  ProtocolResponseArea,
  ProtocolResponseHeader,
  ProtocolResponse,
  ProtocolResponseTaskContainer,
} from '../state-n-styles/lessonStyles'

export type StudentProtocolResponseProps = {
  me: me_me
  setPolling: React.Dispatch<React.SetStateAction<number>>
}

export const FIND_ACTIVE_STUDENT_PROTOCOL_QUERY = gql`
  query findActiveProtocolByStudent($input: FindActiveProtocolByStudentInput!) {
    findActiveProtocolByStudent(input: $input) {
      protocol {
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
`

export const RESPOND_TO_PROTOCOL_MUTATION = gql`
  mutation respondToProtocol($input: RespondToProtocolInput!) {
    respondToProtocol(input: $input) {
      protocol {
        _id
        response
      }
    }
  }
`
export const StudentProtocolResponse = ({
  me,
  setPolling,
}: StudentProtocolResponseProps) => {
  const [response, setResponse] = useState('')

  const [protocol, setProtocol] =
    useState<findActiveProtocolByStudent_findActiveProtocolByStudent_protocol>({
      __typename: 'Protocol',
      _id: '',
      academicOutcomeType: AcademicOutcomeTypes.LOGIC_BUILDING,
      assignedDate: '',
      completed: false,
      isActive: false,
      task: '',
      response: null,
    })

  useQuery<findActiveProtocolByStudent, findActiveProtocolByStudentVariables>(
    FIND_ACTIVE_STUDENT_PROTOCOL_QUERY,
    {
      variables: {
        input: { studentId: me._id! },
      },
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        console.log(data)
        setProtocol(data.findActiveProtocolByStudent.protocol)
        setPolling(5000)
      },
      onError: (error) => console.error(error),
    }
  )

  const [respond] = useMutation<respondToProtocol, respondToProtocolVariables>(
    RESPOND_TO_PROTOCOL_MUTATION,
    {
      variables: { input: { protocolId: protocol._id!, response } },
      onCompleted: (data) => {
        setProtocol({
          ...protocol,
          response: data.respondToProtocol.protocol.response,
        })
      },
      refetchQueries: ['findActiveProtocolByStudent'],
    }
  )

  return (
    <>
      {protocol.response ? (
        <ProtocolResponseContainer>
          <ProtocolResponse>{protocol.response}</ProtocolResponse>
        </ProtocolResponseContainer>
      ) : (
        <>
          <ProtocolResponseContainer>
            <ProtocolResponseTaskContainer>
              {protocol.task}
            </ProtocolResponseTaskContainer>
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

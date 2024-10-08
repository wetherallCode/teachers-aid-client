import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import {
  AcademicOutcomeTypes,
  findActiveProtocolByStudent,
  findActiveProtocolByStudentVariables,
  findActiveProtocolByStudent_findActiveProtocolByStudent_protocol,
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  me_me,
  respondToProtocol,
  respondToProtocolVariables,
} from '../../../schemaTypes'
import {
  FIND_ACTIVE_STUDENT_PROTOCOL_QUERY,
  RESPOND_TO_PROTOCOL_MUTATION,
} from './StudentProtocolResponse'
import {
  ProtocolResponseTaskContainer,
  ProtocolResponseArea,
  ProtocolResponseButton,
  ProtocolResponseButtonContainer,
} from '../state-n-styles/lessonStyles'

export type WarmUpResponseProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  me: me_me
  setPolling: React.Dispatch<React.SetStateAction<number>>
}

export const WarmUpResponse = ({
  lesson,
  me,
  setPolling,
}: WarmUpResponseProps) => {
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

  const { loading, data } = useQuery<
    findActiveProtocolByStudent,
    findActiveProtocolByStudentVariables
  >(FIND_ACTIVE_STUDENT_PROTOCOL_QUERY, {
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
  })

  const [respond] = useMutation<respondToProtocol, respondToProtocolVariables>(
    RESPOND_TO_PROTOCOL_MUTATION,
    {
      variables: { input: { protocolId: protocol._id!, response } },
      onCompleted: (data) => {
        setProtocol({
          ...protocol,
          response: data.respondToProtocol.protocol.response,
        })
        // setPolling(2000)
      },
      refetchQueries: ['findActiveProtocolByStudent'],
    },
  )

  loading && <div>Loading</div>

  return (
    <>
      {data?.findActiveProtocolByStudent.protocol && (
        <>
          {protocol.response ? (
            <div>{protocol.response}</div>
          ) : (
            <ProtocolResponseArea
              style={{ width: '80%' }}
              spellCheck={true}
              onChange={(e: any) => setResponse(e.target.value)}
            />
          )}

          {!protocol.response && (
            <div
              style={{
                display: 'grid',
                width: '80%',
                height: '60%',
                alignItems: 'center',
                justifyItems: 'center',
              }}
            >
              <ProtocolResponseButton
                style={{ height: '100%' }}
                onClick={() => respond()}
              >
                Respond
              </ProtocolResponseButton>
            </div>
          )}
        </>
      )}
    </>
  )
}

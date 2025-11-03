import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  ActivityTimeEnum,
  findProtocolsByDate,
  findProtocolsByDateVariables,
} from '../../../../../../schemaTypes'
import { FIND_PROTOCOLS_BY_DATE_QUERY } from '../protocol-response-classlist/ProtocolResponseClassList'
import { ResponseAssessor } from '../protocol-response-classlist/ResponseAssessor'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import {
  ResponseTitle,
  ResponseAssessorCategoriesContainer,
  ResponseContainer,
} from '../../styles/responseAssessorStyle'
import { ProtocolResponseAssessment } from './ProtocolResponseAssessment'

export type ProtocolResponseManagerProps = {}

export const ProtocolResponseManager = ({}: ProtocolResponseManagerProps) => {
  const [state] = useTeachersAidContextProvider()
  const { activityTimeEnum } = useEnumContextProvider()
  const [activityTimeState, setActivityTimeState] = useState<ActivityTimeEnum>(
    ActivityTimeEnum.BEFORE,
  )

  const { loading, data } = useQuery<
    findProtocolsByDate,
    findProtocolsByDateVariables
  >(FIND_PROTOCOLS_BY_DATE_QUERY, {
    variables: {
      input: {
        courseId: state.context.courseInfo!.course._id!,
        date: new Date().toLocaleDateString(),
      },
    },
    onCompleted: (data) => console.log(data.findProtocolsByDate.protocols),
    pollInterval: 1000,
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const protocols = data?.findProtocolsByDate.protocols.filter(
    (p) => p.activityTime === activityTimeState,
  )

  return (
    <>
      <ResponseTitle>Responses</ResponseTitle>
      <ResponseAssessorCategoriesContainer>
        <div
          style={
            activityTimeState === ActivityTimeEnum.BEFORE
              ? { textDecoration: 'underline' }
              : {}
          }
          onClick={() => setActivityTimeState(ActivityTimeEnum.BEFORE)}
        >
          WarmUps
        </div>
        <div
          style={
            activityTimeState === ActivityTimeEnum.DURING
              ? { textDecoration: 'underline' }
              : {}
          }
          onClick={() => setActivityTimeState(ActivityTimeEnum.DURING)}
        >
          Protocols
        </div>
        <div
          style={
            activityTimeState === ActivityTimeEnum.AFTER
              ? { textDecoration: 'underline' }
              : {}
          }
          onClick={() => setActivityTimeState(ActivityTimeEnum.AFTER)}
        >
          ExitTickets
        </div>
      </ResponseAssessorCategoriesContainer>

      <ResponseContainer>
        {protocols!.map(
          (protocol) =>
            protocol.response && (
              <ProtocolResponseAssessment
                key={protocol._id}
                protocol={protocol}
              />
            ),
        )}
      </ResponseContainer>
    </>
  )
}

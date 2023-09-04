import { gql } from '@apollo/client'
import {
  findActiveProtocolsByCourse_findActiveProtocolsByCourse_protocols,
  ProtocolAssessmentEnum,
} from '../../../../../../schemaTypes'
import {
  NameOfResponder,
  ResponseButtonContainer,
  ResponseRowContainer,
} from '../../styles/responseAssessorStyle'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'

export type ResponseAssessorProps = {
  protocol: findActiveProtocolsByCourse_findActiveProtocolsByCourse_protocols
}
export const ASSESS_INDIVIDITUAL_PROTOCOLS_MUTATION = gql`
  mutation assessIndividualProtocols($input: AssessIndividualProtocolsInput!) {
    assessIndividualProtocols(input: $input) {
      protocol {
        _id
        response
      }
    }
  }
`

export const ResponseAssessor = ({ protocol }: ResponseAssessorProps) => {
  const [state, event] = useTeachersAidContextProvider()

  // const [assessProtocol] = useMutation<
  //   assessIndividualProtocols,
  //   assessIndividualProtocolsVariables
  // >(ASSESS_INDIVIDITUAL_PROTOCOLS_MUTATION, {
  //   onCompleted: (data) => console.log(data),
  //   refetchQueries: ['findActiveProtocolsByCourse'],
  // })
  console.log(protocol)
  return (
    <ResponseRowContainer
      onClick={() =>
        event({ type: 'SET_STUDENT_ID', payload: protocol.student._id! })
      }
      style={
        protocol.assessment !== ProtocolAssessmentEnum.REFUSED_TO_WORK
          ? { color: 'var(--blue)' }
          : { color: 'var(--red)' }
      }
    >
      <NameOfResponder>
        <div>
          {protocol.student.lastName}, {protocol.student.firstName}
        </div>
      </NameOfResponder>
      <ResponseButtonContainer>
        {<div>{protocol.response}</div>}
      </ResponseButtonContainer>
    </ResponseRowContainer>
  )
}

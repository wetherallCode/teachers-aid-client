import { useMutation } from '@apollo/client'
import {
  ProtocolAssessmentEnum,
  assessStudentProtocolVariables,
  findActiveProtocolsByCourse_findActiveProtocolsByCourse_protocols,
  assessStudentProtocol,
  findProtocolsByDate_findProtocolsByDate_protocols,
} from '../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { ASSESS_PROTOCOL_MUTATION } from '../../student-info/protocols/AssessProtocol'
import {
  AssessmentManagerButton,
  NameOfResponder,
  ResponseButtonContainer,
  ResponseRowContainer,
} from '../../styles/responseAssessorStyle'
import { AssessorButton } from '../../styles/studentInfoStyles'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../../utils'

export type ProtocolResponseAssessmentProps = {
  protocol: findProtocolsByDate_findProtocolsByDate_protocols
}

export const ProtocolResponseAssessment = ({
  protocol,
}: ProtocolResponseAssessmentProps) => {
  const [state, event] = useTeachersAidContextProvider()
  const { protocolAssessmentEnum } = useEnumContextProvider()
  const [assessStudentProtocol] = useMutation<
    assessStudentProtocol,
    assessStudentProtocolVariables
  >(ASSESS_PROTOCOL_MUTATION, {
    // variables: { input: state.context.studentProtocolAssessment },
    onCompleted: (data) => {
      console.log('assessed')
    },
    refetchQueries: ['findStudentByIdForTeachersAid'],
  })

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
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          justifyItems: 'center',
          alignItems: 'center',
        }}
      >
        {protocolAssessmentEnum.map((assessment: ProtocolAssessmentEnum) => {
          // const protocol = protocol.student.hasProtocols.find((p) => p.isActive)
          const selected = protocol?.assessment === assessment

          return (
            <AssessmentManagerButton
              key={assessment}
              value={assessment}
              // selected={selected}
              style={
                selected
                  ? { background: 'var(--blue)', color: 'var(--white)' }
                  : { background: 'var(--grey)', color: 'var(--blue)' }
              }
              onClick={(e: any) => {
                assessStudentProtocol({
                  variables: {
                    input: {
                      // ...state.context.studentProtocolAssessment,
                      markingPeriod: protocol.markingPeriod,
                      protocolActivityType: protocol.protocolActivityType,
                      responsibilityPoints: 2,
                      studentId: protocol.student._id!,
                      task: protocol.task,
                      assignedDate: protocol.assignedDate,
                      partnerIds: [],
                      assessment: e.target.value,
                    },
                  },
                })
              }}
            >
              {phraseCapitalizer(underscoreEliminator(assessment))}
            </AssessmentManagerButton>
          )
        })}
      </div>
    </ResponseRowContainer>
  )
}

import { gql, useMutation } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  assessIndividualProtocols,
  assessIndividualProtocolsVariables,
  assessStudentProtocol,
  assessStudentProtocolVariables,
  findActiveProtocolsByCourse_findActiveProtocolsByCourse_protocols,
  MarkingPeriodEnum,
  ProtocolActivityTypes,
  ProtocolAssessmentEnum,
} from '../../../../../../schemaTypes'
import { todaysLocaleDate } from '../../../../../../utils'
import { ASSESS_PROTOCOL_MUTATION } from '../../student-info/protocols/AssessProtocol'
import {
  AssessmentButton,
  CancelAssessmentButton,
  NameOfResponder,
  ResponseButtonContainer,
  ResponseContainer,
  ResponseRowContainer,
} from '../../styles/responseAssessorStyle'

export type ResponseAssessorProps = {
  protocol: findActiveProtocolsByCourse_findActiveProtocolsByCourse_protocols
}
export const ASSESS_INDIVIDITUAL_PROTOCOLS_MUTATION = gql`
  mutation assessIndividualProtocols($input: AssessIndividualProtocolsInput!) {
    assessIndividualProtocols(input: $input) {
      protocol {
        _id
      }
    }
  }
`

export const ResponseAssessor = ({ protocol }: ResponseAssessorProps) => {
  const [MarkingPeriodState] = useMarkingPeriodContextProvider()
  const { protocolAssessmentEnum } = useEnumContextProvider()
  // const [assessment, setAssessment] = useState<ProtocolAssessmentEnum | null>(
  //   null
  // )

  const [assessProtocol] = useMutation<
    assessIndividualProtocols,
    assessIndividualProtocolsVariables
  >(ASSESS_INDIVIDITUAL_PROTOCOLS_MUTATION, {
    // variables: {
    //   input: {
    //     protocolId: protocol._id!,
    //     assessment: assessment,
    //     markingPeriod: MarkingPeriodState.context.currentMarkingPeriod,
    //   },
    // },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findActiveProtocolsByCourse'],
  })
  // useEffect(() => {
  //   if (protocol._id) {
  //     assessProtocol()
  //   }
  // }, [assessment])

  return (
    <ResponseRowContainer>
      <NameOfResponder>
        <div>
          {protocol.student.lastName}, {protocol.student.firstName}
        </div>
      </NameOfResponder>
      <ResponseButtonContainer>
        {protocolAssessmentEnum
          .slice(2)
          .map((assessment: ProtocolAssessmentEnum) => {
            return (
              <AssessmentButton
                key={assessment}
                assessed={protocol.assessment === assessment}
                onClick={() => {
                  assessProtocol({
                    variables: {
                      input: {
                        protocolId: protocol._id!,
                        assessment: assessment,
                        markingPeriod:
                          MarkingPeriodState.context.currentMarkingPeriod,
                        responsibilityPoints: 2,
                      },
                    },
                  })
                }}
              >
                {assessment}
              </AssessmentButton>
            )
          })}
        <CancelAssessmentButton
          onClick={() => {
            assessProtocol({
              variables: {
                input: {
                  protocolId: protocol._id!,
                  assessment: null,
                  markingPeriod:
                    MarkingPeriodState.context.currentMarkingPeriod,
                  responsibilityPoints: 2,
                },
              },
            })
          }}
        >
          Cancel
        </CancelAssessmentButton>
      </ResponseButtonContainer>
    </ResponseRowContainer>
  )
}

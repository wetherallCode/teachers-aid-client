import React, { FC, useState } from 'react'
import {
  assessStudentProtocol,
  assessStudentProtocolVariables,
  ProtocolActivityTypes,
  ProtocolAssessmentEnum,
} from '../../../../../../schemaTypes'
import { useMutation } from '@apollo/client'
import { ASSESS_PROTOCOL_MUTATION } from '../../student-info/protocols/AssessProtocol'

export type ProtocolResponseAssessorProps = {
  response: {
    studentName: string
    response: string
    studentId: string
    assignedDate: string
    task: string
    protocolActivityType: ProtocolActivityTypes
  }
  i: number
}

export const ProtocolResponseAssessor: FC<ProtocolResponseAssessorProps> = ({
  response,
  i,
}) => {
  const [protocolAssessment, setProtocolAssessment] = useState<
    ProtocolAssessmentEnum
  >(ProtocolAssessmentEnum.REFUSED_TO_WORK)

  const [assessProtocol] = useMutation<
    assessStudentProtocol,
    assessStudentProtocolVariables
  >(ASSESS_PROTOCOL_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return (
    <>
      <div key={i}>
        <button
          style={{ backgroundColor: 'var(--red)', color: 'var(--blue)' }}
          onClick={() =>
            assessProtocol({
              variables: {
                input: {
                  studentId: response.studentId,
                  assignedDate: response.assignedDate,
                  protocolActivityType: response.protocolActivityType,
                  task: response.task,
                  assessment: ProtocolAssessmentEnum.WORKED_POORLY,
                },
              },
            })
          }
        >
          Good Job
        </button>
        <button
          style={{ backgroundColor: 'var(--red)', color: 'var(--blue)' }}
          onClick={() =>
            assessProtocol({
              variables: {
                input: {
                  studentId: response.studentId,
                  assignedDate: response.assignedDate,
                  protocolActivityType: response.protocolActivityType,
                  task: response.task,
                  assessment: ProtocolAssessmentEnum.WORKED_WELL,
                },
              },
            })
          }
        >
          Great Job
        </button>
        <div>
          {i + 1}: {response.studentName}: {response.response}
        </div>
      </div>
    </>
  )
}

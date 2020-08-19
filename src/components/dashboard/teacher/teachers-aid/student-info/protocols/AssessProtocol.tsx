import React, { FC, useEffect } from 'react'
import {
  findStudentInfoByStudentId_findStudentById_student_hasProtocols,
  assessStudentProtocol,
  assessStudentProtocolVariables,
  findStudentInfoByStudentId_findStudentById_student,
  DiscussionTypesEnum,
  findStudentInfoByStudentIdVariables,
  ProtocolAssessmentEnum,
} from '../../../../../../schemaTypes'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { gql, useMutation, QueryLazyOptions } from '@apollo/client'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'

export type AssessProtocolProps = {
  protocols: findStudentInfoByStudentId_findStudentById_student_hasProtocols[]
  loadStudentInfo: (
    options?: QueryLazyOptions<findStudentInfoByStudentIdVariables> | undefined
  ) => void
  student: findStudentInfoByStudentId_findStudentById_student
}

export const ASSESS_PROTOCOL_MUTATION = gql`
  mutation assessStudentProtocol($input: AssessStudentProtocolInput!) {
    assessStudentProtocol(input: $input) {
      protocols {
        _id
        student {
          _id
        }
        partners {
          _id
        }
      }
    }
  }
`
export const AssessProtocol: FC<AssessProtocolProps> = ({
  protocols,
  student,
  loadStudentInfo,
}) => {
  const {
    discussionTypesEnum,
    protocolAssessmentEnum,
  } = useEnumContextProvider()
  const [state, event] = useTeachersAidContextProvider()

  const [currentActiveProtocol] = protocols.filter(
    (protocol) => protocol.isActive
  )

  const [assessStudentProtocol] = useMutation<
    assessStudentProtocol,
    assessStudentProtocolVariables
  >(ASSESS_PROTOCOL_MUTATION, {
    variables: { input: state.context.studentProtocolAssessment },
    onCompleted: (data) => {
      console.log('assessed')
    },
    refetchQueries: ['findStudentInfoByStudentId'],
  })
  useEffect(() => {
    if (state.context.studentProtocolAssessment.partnerIds)
      assessStudentProtocol()
  }, [state.context.studentProtocolAssessment])
  const partnerList: string[] = []

  if (state.context.studentProtocolAssessment.partnerIds)
    for (const _id of state.context.studentProtocolAssessment.partnerIds!) {
      const [student] = state.context.courseInfo.assignedSeats.filter(
        (student) => student.student?._id === _id
      )

      partnerList.push(student.student?.firstName!)
    }

  const partnerDiscussionTypes = discussionTypesEnum.slice(1)

  console.log(state.context.studentProtocolAssessment)
  return (
    <>
      <div>Protocol</div>
      <div>
        <>
          {currentActiveProtocol.protocolActivityType !== 'INDIVIDUAL' && (
            <>
              <div>Partners</div>
              <select
                onChange={(e: any) => {
                  event({ type: 'ADD_PARTNERS', payload: e.target.value })
                }}
              >
                <option value='none'>Select Partners</option>
                {state.context.courseInfo.assignedSeats
                  .filter(
                    (seat) => seat.student?._id !== student._id && seat.student
                  )
                  .map((student) => (
                    <option
                      key={student.student?._id!}
                      value={student.student?._id!}
                    >
                      {student.student?.firstName}
                    </option>
                  ))}
              </select>
            </>
          )}
          <div>
            {partnerList.map((partner, i: number) => (
              <div key={i}>
                <div>{partner}</div>{' '}
                <div
                  onClick={() => {
                    event({ type: 'REMOVE_PARTNERS', payload: i })
                  }}
                >
                  -
                </div>
              </div>
            ))}
          </div>
          {currentActiveProtocol.protocolActivityType !== 'INDIVIDUAL' && (
            <>
              <div>Discussion</div>
              {partnerDiscussionTypes.map(
                (discussionType: DiscussionTypesEnum) => (
                  <button
                    key={discussionType}
                    style={
                      state.context.studentProtocolAssessment
                        .discussionLevel === discussionType
                        ? { background: 'var(--red)', color: 'var(--white)' }
                        : { background: 'var(--white)', color: 'var(--blue)' }
                    }
                    value={discussionType}
                    onClick={(e: any) => {
                      event({
                        type: 'DISCUSSION_ASSESSMENT',
                        payload: e.target.value,
                      })
                    }}
                  >
                    {discussionType === DiscussionTypesEnum.NOT_REQUIRED
                      ? 'Not Required'
                      : discussionType === DiscussionTypesEnum.SOME_DISCUSSION
                      ? 'Some Discussion'
                      : 'Thoroughly Discussed'}
                  </button>
                )
              )}
            </>
          )}
          <div>Assessment</div>
          {protocolAssessmentEnum.map((assessment: ProtocolAssessmentEnum) => {
            console.log(
              assessment === ProtocolAssessmentEnum.REFUSED_TO_WORK
                ? 'Refused To Work'
                : assessment === ProtocolAssessmentEnum.SLOW_TO_GET_STARTED
                ? 'Slow to Get Started'
                : assessment === ProtocolAssessmentEnum.WORKED_POORLY
                ? 'Worked Poorly'
                : 'Worked Well'
            )
            return (
              <button
                key={assessment}
                value={assessment}
                style={
                  state.context.studentProtocolAssessment.assessment ===
                  assessment
                    ? { background: 'var(--red)', color: 'var(--white)' }
                    : { background: 'var(--white)', color: 'var(--blue)' }
                }
                onClick={(e: any) => {
                  event({
                    type: 'PROTOCOL_ASSESSMENT',
                    payload: e.target.value,
                  })
                }}
              >
                {assessment === ProtocolAssessmentEnum.REFUSED_TO_WORK
                  ? 'Refused To Work'
                  : assessment === ProtocolAssessmentEnum.SLOW_TO_GET_STARTED
                  ? 'Slow to Get Started'
                  : assessment === ProtocolAssessmentEnum.WORKED_POORLY
                  ? 'Worked Poorly'
                  : 'Worked Well'}
              </button>
            )
          })}
        </>
      </div>
    </>
  )
}

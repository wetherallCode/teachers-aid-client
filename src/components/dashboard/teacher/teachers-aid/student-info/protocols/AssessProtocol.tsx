import React, { FC, useEffect, useState } from 'react'
import {
  findStudentInfoByStudentId_findStudentById_student_hasProtocols,
  assessStudentProtocol,
  assessStudentProtocolVariables,
  findStudentInfoByStudentId_findStudentById_student,
  DiscussionTypesEnum,
  findStudentInfoByStudentIdVariables,
  ProtocolAssessmentEnum,
  findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats,
} from '../../../../../../schemaTypes'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { gql, useMutation, QueryLazyOptions } from '@apollo/client'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { useSchoolDayContextProvider } from '../../../../school-day/state/SchoolDayContext'
import {
  DiscussionContainer,
  GroupProtocolAssessorContainer,
  PartnerContainer,
  PartnerListContainer,
  PartnerListItem,
  PartnerRemoveContainer,
  CenteredTitle,
  ProtocolDisplayContainer,
  ProtocolTitle,
  AssessorButton,
  AssessmentContainer,
} from '../../styles/studentInfoStyles'
import {
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../../utils'

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
  const [selectedStudents, setSelectedStudents] = useState<
    findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats[]
  >([])
  const { discussionTypesEnum, protocolAssessmentEnum } =
    useEnumContextProvider()
  const [state, event] = useTeachersAidContextProvider()
  const [schoolDayInfo] = useSchoolDayContextProvider()

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
    if (state.context.studentProtocolAssessment.partnerIds) {
      assessStudentProtocol()
    }
  }, [state.context.studentProtocolAssessment])

  const partnerList: string[] = []

  if (state.context.studentProtocolAssessment.partnerIds)
    for (const _id of state.context.studentProtocolAssessment.partnerIds!) {
      if (!state.context.courseInfo!.cohortBasedSeating) {
        const [student] = state.context.courseInfo!.assignedSeats.filter(
          (student) => student.student?._id === _id
        )
        partnerList.push(student.student?.firstName!)
      } else if (schoolDayInfo.context.currentSchoolDay.cohortWeek === 'RED') {
        const [student] = state.context.courseInfo!.assignedSeats.filter(
          (student) => student.redCohortStudent?._id === _id
        )
        partnerList.push(student.redCohortStudent?.firstName!)
      } else {
        const [student] = state.context.courseInfo!.assignedSeats.filter(
          (student) => student.whiteCohortStudent?._id === _id
        )
        partnerList.push(student.whiteCohortStudent?.firstName!)
      }
    }

  const partnerDiscussionTypes = discussionTypesEnum.slice(1)

  const selectedStudent = state.context.courseInfo!.assignedSeats!.filter(
    (seat) => seat.student?._id! === student._id!
  )[0]!

  return (
    <ProtocolDisplayContainer>
      <ProtocolTitle>Protocol Grader</ProtocolTitle>
      <GroupProtocolAssessorContainer>
        {currentActiveProtocol.protocolActivityType !== 'INDIVIDUAL' && (
          <PartnerContainer>
            <CenteredTitle>Partners</CenteredTitle>
            <select
              style={{ color: 'var(--blue)' }}
              onChange={(e: any) => {
                event({ type: 'ADD_PARTNERS', payload: e.target.value })
              }}
            >
              <option value='none'>Select Partners</option>
              {!state.context.courseInfo!.cohortBasedSeating
                ? state.context
                    .courseInfo!.assignedSeats.filter(
                      (seat) =>
                        seat.student?._id !== student._id && seat.student
                    )
                    .filter(
                      (seat) =>
                        !state.context.studentProtocolAssessment.partnerIds?.includes(
                          seat.student?._id!
                        )
                    )
                    .sort((seat, selectedStudent) => {
                      if (seat.deskNumber > selectedStudent.deskNumber) {
                        return seat.deskNumber
                      }
                      if (seat.deskNumber < selectedStudent.deskNumber) {
                        return -1
                      }
                      return 0
                    })
                    .map((student) => {
                      return (
                        <option
                          key={student.student?._id!}
                          value={student.student?._id!}
                        >
                          {student.student?.firstName}
                        </option>
                      )
                    })
                : schoolDayInfo.context.currentSchoolDay.cohortWeek === 'RED'
                ? state.context
                    .courseInfo!.assignedSeats.filter(
                      (seat) =>
                        seat.redCohortStudent?._id !== student._id &&
                        seat.redCohortStudent
                    )
                    .map((student) => (
                      <option
                        key={student.redCohortStudent?._id!}
                        value={student.redCohortStudent?._id!}
                      >
                        {student.redCohortStudent?.firstName}
                      </option>
                    ))
                : state.context
                    .courseInfo!.assignedSeats.filter(
                      (seat) =>
                        seat.whiteCohortStudent?._id !== student._id &&
                        seat.whiteCohortStudent
                    )
                    .map((student) => (
                      <option
                        key={student.whiteCohortStudent?._id!}
                        value={student.whiteCohortStudent?._id!}
                      >
                        {student.whiteCohortStudent?.firstName}
                      </option>
                    ))}
            </select>
            <PartnerListContainer>
              {partnerList.map((partner, i: number) => (
                <PartnerListItem key={i}>
                  <div>{partner}</div>
                  <PartnerRemoveContainer
                    onClick={() => {
                      event({ type: 'REMOVE_PARTNERS', payload: i })
                    }}
                  >
                    <div>Delete</div>
                  </PartnerRemoveContainer>
                </PartnerListItem>
              ))}
            </PartnerListContainer>
          </PartnerContainer>
        )}
        {currentActiveProtocol.protocolActivityType !== 'INDIVIDUAL' && (
          <DiscussionContainer>
            <CenteredTitle>Discussion</CenteredTitle>
            {partnerDiscussionTypes.map(
              (discussionType: DiscussionTypesEnum) => {
                const selected =
                  state.context.studentProtocolAssessment.discussionLevel ===
                  discussionType
                return (
                  <AssessorButton
                    key={discussionType}
                    selected={selected}
                    value={discussionType}
                    onClick={(e: any) => {
                      event({
                        type: 'DISCUSSION_ASSESSMENT',
                        payload: e.target.value,
                      })
                    }}
                  >
                    {phraseCapitalizer(underscoreEliminator(discussionType))}
                  </AssessorButton>
                )
              }
            )}
          </DiscussionContainer>
        )}
        <AssessmentContainer>
          <CenteredTitle>Assessment</CenteredTitle>
          {protocolAssessmentEnum.map((assessment: ProtocolAssessmentEnum) => {
            const selected =
              state.context.studentProtocolAssessment.assessment === assessment

            return (
              <AssessorButton
                key={assessment}
                value={assessment}
                selected={selected}
                onClick={(e: any) => {
                  event({
                    type: 'PROTOCOL_ASSESSMENT',
                    payload: e.target.value,
                  })
                }}
              >
                {phraseCapitalizer(underscoreEliminator(assessment))}
              </AssessorButton>
            )
          })}
        </AssessmentContainer>
      </GroupProtocolAssessorContainer>
    </ProtocolDisplayContainer>
  )
}

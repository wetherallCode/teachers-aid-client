import React, { FC, useEffect } from 'react'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { gql, useLazyQuery } from '@apollo/client'
import {
  findStudentInfoByStudentId,
  findStudentInfoByStudentIdVariables,
  DiscussionTypesEnum,
} from '../../../../../schemaTypes'
import {
  StudentInfoDisplay,
  StudentControlPanel,
  StudentNameContainer,
} from '../styles/studentInfoStyles'
import { StudentControlPanelDisplay } from './StudentControlPanelDisplay'
import { useMarkingPeriodContextProvider } from '../../../../../contexts/markingPeriod/MarkingPeriodContext'

export type StudentInfoProps = {}
export const FIND_STUDENT_INFORMATION_QUERY = gql`
  query findStudentInfoByStudentId($input: FindStudentByIdInput!) {
    findStudentById(input: $input) {
      student {
        _id
        firstName
        lastName
        hasAbsences {
          dayAbsent
        }
        hasResponsibilityPoints {
          _id
          markingPeriod
        }
        hasAssignments {
          ... on ReadingGuide {
            _id
            dueDate
            readingGuideFinal {
              clarifyingQuestions
              howIsSectionOrganized
              majorIssue
              majorIssueSolved
              majorSolution
            }
          }
        }
        hasResponsibilityPoints {
          markingPeriod
          responsibilityPoints
        }
        hasProtocols {
          _id
          completed
          assignedDate
          academicOutcomeType
          student {
            _id
            firstName
          }
          isActive
          task
          partners {
            _id
          }
          discussionLevel
          completed
          assessment
          protocolActivityType
          markingPeriod
        }
      }
    }
  }
`

export const StudentInfo: FC<StudentInfoProps> = () => {
  const [state, event] = useTeachersAidContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()

  const [loadStudentInfo, { loading, data }] = useLazyQuery<
    findStudentInfoByStudentId,
    findStudentInfoByStudentIdVariables
  >(FIND_STUDENT_INFORMATION_QUERY, {
    variables: {
      input: { studentId: state.context.studentId },
    },
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      console.log('loaded')
      if (
        data?.findStudentById.student.hasProtocols.some(
          (protocol) => protocol.isActive
        )
      ) {
        const [protocol] = data?.findStudentById.student.hasProtocols.filter(
          (protocol) => protocol.isActive
        )
        const partnerList = protocol.partners?.map(
          (partner) => partner._id
        ) as string[]
        event({
          type: 'UPDATE_STUDENT_PROTOCOL',
          payload: {
            assessment: protocol!.assessment!,
            protocolActivityType: protocol.protocolActivityType,
            task: protocol.task,
            assignedDate: protocol.assignedDate,
            discussionLevel:
              protocol.protocolActivityType === 'INDIVIDUAL'
                ? DiscussionTypesEnum.NOT_REQUIRED
                : protocol.discussionLevel,
            studentId: data.findStudentById.student._id!,
            partnerIds: protocol.partners ? partnerList! : [],
            markingPeriod: protocol.markingPeriod,
          },
        })
      }
    },
    onError: (error) => console.error(error),
  })

  useEffect(() => {
    if (state.context.studentId) {
      loadStudentInfo()
    }
  }, [loadStudentInfo, state.context.studentId])

  const currentResponsibilityPoints = data?.findStudentById.student.hasResponsibilityPoints.filter(
    (rp) => rp.markingPeriod === markingPeriodState.context.currentMarkingPeriod
  )

  if (loading)
    return (
      <>
        <StudentInfoDisplay>
          <StudentNameContainer></StudentNameContainer>
        </StudentInfoDisplay>
        <StudentControlPanel></StudentControlPanel>
      </>
    )

  return (
    <>
      <StudentInfoDisplay>
        <StudentNameContainer>
          {data?.findStudentById.student.firstName}{' '}
          {data?.findStudentById.student.lastName}
        </StudentNameContainer>
        {/* <div>{responsibilityPoints.responsibilityPoints}</div> */}
      </StudentInfoDisplay>
      <StudentControlPanel>
        <StudentControlPanelDisplay
          loadStudentInfo={loadStudentInfo}
          student={data?.findStudentById.student!}
        />
      </StudentControlPanel>
    </>
  )
}

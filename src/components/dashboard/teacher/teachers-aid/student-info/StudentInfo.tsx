import React, { FC, useEffect } from 'react'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { gql, useLazyQuery } from '@apollo/client'
import {
  findStudentInfoByStudentId,
  findStudentInfoByStudentIdVariables,
  DiscussionTypesEnum,
} from '../../../../../schemaTypes'
import {
  StudentControlPanelContainer,
  StudentInfoDisplay,
  StudentNameContainer,
} from '../styles/studentInfoStyles'
import { StudentControlPanelDisplay } from './StudentControlPanelDisplay'
import { useMarkingPeriodContextProvider } from '../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useGradeCalculator } from '../../../../../hooks/useGradeCalculator'

export type StudentInfoProps = {}

export const FIND_STUDENT_INFORMATION_QUERY = gql`
  query findStudentInfoByStudentId($input: FindStudentByIdInput!) {
    findStudentById(input: $input) {
      student {
        _id
        firstName
        lastName
        hasAbsences {
          _id
          dayAbsent
        }
        hasUnExcusedLatenesses {
          _id
          dayLate
        }
        hasExcusedLatenesses {
          _id
          dayLateExcused
        }
        hasResponsibilityPoints {
          _id
          markingPeriod
        }
        # hasAssignments {
        #   ... on ReadingGuide {
        #     _id
        #     dueDate
        #     readingGuideFinal {
        #       clarifyingQuestions
        #       howIsSectionOrganized
        #       majorIssue
        #       majorIssueSolved
        #       majorSolution
        #     }
        #   }
        # }
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
        hasBehaviors {
          _id
          behavior
        }
      }
    }
  }
`

export const StudentInfo = ({}: StudentInfoProps) => {
  const [state, event] = useTeachersAidContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()

  const { grade, loading: gradeLoading } = useGradeCalculator({
    studentId: state.context.studentId!,
    markingPeriod: markingPeriodState.context.currentMarkingPeriod,
    polling: true,
  })

  const [loadStudentInfo, { loading: studentInfoLoading, data }] = useLazyQuery<
    findStudentInfoByStudentId,
    findStudentInfoByStudentIdVariables
  >(FIND_STUDENT_INFORMATION_QUERY, {
    variables: {
      input: { studentId: state.context.studentId },
    },
    // pollInterval: 1000,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
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

  const currentResponsibilityPoints =
    data?.findStudentById.student.hasResponsibilityPoints.filter(
      (rp) =>
        rp.markingPeriod === markingPeriodState.context.currentMarkingPeriod
    )!

  const absenceCheck = data?.findStudentById.student.hasAbsences.some(
    (absence) => absence.dayAbsent === new Date().toLocaleDateString()
  )!
  const rp =
    currentResponsibilityPoints &&
    currentResponsibilityPoints[0].responsibilityPoints

  if (studentInfoLoading)
    return (
      <>
        <StudentInfoDisplay>
          <StudentNameContainer></StudentNameContainer>
        </StudentInfoDisplay>
        <StudentControlPanelContainer></StudentControlPanelContainer>
      </>
    )

  return (
    <>
      <StudentInfoDisplay absent={absenceCheck}>
        <StudentNameContainer>
          <div> {data?.findStudentById.student.firstName}</div>
          <div>{data?.findStudentById.student.lastName}</div>
          <div>{rp}</div>
        </StudentNameContainer>
        {/* <div>{responsibilityPoints.responsibilityPoints}</div> */}
      </StudentInfoDisplay>

      <StudentControlPanelDisplay
        loadStudentInfo={loadStudentInfo}
        student={data?.findStudentById.student!}
        absenceCheck={absenceCheck}
        grade={grade}
        gradeLoading={gradeLoading}
      />
    </>
  )
}

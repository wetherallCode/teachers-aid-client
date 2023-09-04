import React, { FC, useEffect } from 'react'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { gql, useLazyQuery } from '@apollo/client'
import {
  DiscussionTypesEnum,
  OutOfClassDestinationEnum,
  findStudentByIdForTeachersAid,
  findStudentByIdForTeachersAidVariables,
} from '../../../../../schemaTypes'
import {
  StudentControlPanelContainer,
  StudentInfoDisplay,
  StudentNameContainer,
} from '../styles/studentInfoStyles'
import { StudentControlPanelDisplay } from './StudentControlPanelDisplay'
import { useMarkingPeriodContextProvider } from '../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useGradeCalculator } from '../../../../../hooks/useGradeCalculator'
import { responsibilityPointConverter } from '../../../../../utils'
import { useCalculateGrades } from '../../../../../hooks/useCalculateGrades'

export type StudentInfoProps = {}

export const FIND_STUDENT_INFORMATION_QUERY = gql`
  query findStudentByIdForTeachersAid(
    $input: FindStudentByIdForTeachersAidInput!
  ) {
    findStudentByIdForTeachersAid(input: $input) {
      student {
        _id
        firstName
        lastName
        hasAssignments {
          ... on TextAnalysis {
            _id
            textAnalysisCompletion
            exempt
          }
        }
        hasAbsences {
          _id
          dayAbsent
        }
        hasLatnesses {
          _id
          dayLate
          latenessType
        }
        hasUnExcusedLatenesses {
          _id
          dayLate
          latenessType
        }
        hasExcusedLatenesses {
          _id
          dayLate
          latenessType
        }
        hasResponsibilityPoints {
          _id
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
          behavior {
            _id
            behaviorCategory
            behaviorName
            points
            behaviorQuality
            forTeachersAid
          }
          date
        }
        hasStatus {
          _id
          date
          departTime
          hasReturned
          markingPeriod
          outOfClassDestination
          returnTime
        }
      }
    }
  }
`

export const StudentInfo = ({}: StudentInfoProps) => {
  const [state, event] = useTeachersAidContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()

  // const { grade } = useCalculateGrades({
  //   studentId: state.context.studentId!,
  //   markingPeriod: markingPeriodState.context.currentMarkingPeriod,
  //   polling: false,
  //   pollInterval: 1000,
  // })
  // console.log(oldGrade)
  const { grade, loading: gradeLoading } = useGradeCalculator({
    studentId: state.context.studentId!,
    markingPeriod: markingPeriodState.context.currentMarkingPeriod,
    polling: false,
    pollInterval: 1000,
  })

  const [loadStudentInfo, { loading: studentInfoLoading, data }] = useLazyQuery<
    findStudentByIdForTeachersAid,
    findStudentByIdForTeachersAidVariables
  >(FIND_STUDENT_INFORMATION_QUERY, {
    variables: {
      input: { studentId: state.context.studentId },
    },
    // pollInterval: 1000,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (
        data?.findStudentByIdForTeachersAid.student.hasProtocols.some(
          (protocol) => protocol.isActive
        )
      ) {
        const [protocol] =
          data?.findStudentByIdForTeachersAid.student.hasProtocols.filter(
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
            studentId: data.findStudentByIdForTeachersAid.student._id!,
            partnerIds: protocol.partners ? partnerList! : [],
            markingPeriod: protocol.markingPeriod,
            responsibilityPoints: responsibilityPointConverter(grade, 2),
          },
        })
      }
    },
    onError: (error) => console.error('loadStudentInfo: ' + error),
  })

  const studentBehaviors =
    data?.findStudentByIdForTeachersAid.student.hasBehaviors.filter(
      (b) => b.date === new Date().toLocaleDateString()
    )!

  useEffect(() => {
    if (state.context.studentId) {
      loadStudentInfo()
    }
  }, [loadStudentInfo, state.context.studentId])

  const currentResponsibilityPoints =
    data?.findStudentByIdForTeachersAid.student.hasResponsibilityPoints

  const absenceCheck =
    data?.findStudentByIdForTeachersAid.student.hasAbsences.some(
      (absence) => absence.dayAbsent === new Date().toLocaleDateString()
    )!
  const rp = currentResponsibilityPoints?.responsibilityPoints

  if (studentInfoLoading)
    return (
      <>
        <StudentInfoDisplay>
          <StudentNameContainer></StudentNameContainer>
        </StudentInfoDisplay>
        <StudentControlPanelContainer></StudentControlPanelContainer>
      </>
    )
  const textAnalysisToFind =
    data?.findStudentByIdForTeachersAid.student.hasAssignments.find(
      (a) => a.__typename === 'TextAnalysis'
    )!

  const textAnalysis =
    textAnalysisToFind && textAnalysisToFind.__typename === 'TextAnalysis'
      ? textAnalysisToFind
      : undefined

  return (
    <>
      <StudentInfoDisplay absent={absenceCheck}>
        <StudentNameContainer>
          <div> {data?.findStudentByIdForTeachersAid.student.firstName}</div>
          <div>{data?.findStudentByIdForTeachersAid.student.lastName}</div>
          <div>{rp && rp.toFixed(2)}</div>
          {!gradeLoading ? <div>{grade}%</div> : <div>Loading </div>}
          <div style={{ fontSize: '2vh' }}>
            Bathroom Use:{' '}
            {
              data?.findStudentByIdForTeachersAid.student.hasStatus.filter(
                (s) =>
                  s.outOfClassDestination ===
                    OutOfClassDestinationEnum.BATHROOM &&
                  s.markingPeriod ===
                    markingPeriodState.context.currentMarkingPeriod
              ).length
            }
          </div>
        </StudentNameContainer>
      </StudentInfoDisplay>

      <StudentControlPanelDisplay
        loadStudentInfo={loadStudentInfo}
        student={data?.findStudentByIdForTeachersAid.student!}
        absenceCheck={absenceCheck}
        grade={grade}
        gradeLoading={gradeLoading}
        studentBehaviors={studentBehaviors}
        markingPeriod={markingPeriodState.context.currentMarkingPeriod}
        textAnalysis={textAnalysis}
      />
    </>
  )
}

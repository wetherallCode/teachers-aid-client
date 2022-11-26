import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  createStudentBehaviorVariables,
  createStudentBehavior,
  MarkingPeriodEnum,
  findAllBehaviorTypes,
  BehaviorCategoryEnum,
  findAllBehaviorTypes_findAllBehaviorTypes_behaviorTypes,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasBehaviors,
} from '../../../../../../schemaTypes'
import {
  phraseCapitalizer,
  responsibilityPointConverter,
  underscoreEliminator,
} from '../../../../../../utils'
import { FIND_ALL_BEHAVIOR_TYPES_QUERY } from '../../../behaviors/BehaviorTypeList'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import {
  ControlButtons,
  StudentBehaviorButton,
  StudentBehaviorButtonContainer,
  StudentControlButtonContainer,
} from '../../styles/studentInfoStyles'
import { BehaviorRemover } from './BehaviorRemover'

export type DailyBehaviorProps = {
  studentId: string
  grade: number
  gradeLoading: boolean
  studentBehaviors: findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasBehaviors[]
}

export const CREATE_BEHAVIOR_MUTATION = gql`
  mutation createStudentBehavior($input: CreateStudentBehaviorInput!) {
    createStudentBehavior(input: $input) {
      studentBehavior {
        _id
        student {
          firstName
        }
      }
    }
  }
`

export const DailyBehavior = ({
  studentId,
  grade,
  gradeLoading,
  studentBehaviors,
}: DailyBehaviorProps) => {
  const [state] = useTeachersAidContextProvider()
  const { behaviorCategoryEnum, BehaviorQualityEnum } = useEnumContextProvider()
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context

  // const markingPeriodNumber = markingPeriodEnum.findIndex(
  //   (element: MarkingPeriodEnum) => element === currentMarkingPeriod
  // )
  const { loading, data } = useQuery<findAllBehaviorTypes>(
    FIND_ALL_BEHAVIOR_TYPES_QUERY,
    {
      // onCompleted: (data) => console.log(data),
      onError: (error) => console.error(error),
    }
  )

  const [createStudentBehavior] = useMutation<
    createStudentBehavior,
    createStudentBehaviorVariables
  >(CREATE_BEHAVIOR_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: [
      'findStudentByIdForTeachersAid',
      'findBehaviorsByStudentIdAndDate',
      'findResponsibilityPointsByStudentId',
    ],
  })
  const questionAndAnswerBehaviorList =
    data?.findAllBehaviorTypes.behaviorTypes.filter(
      (b) => b.behaviorCategory === BehaviorCategoryEnum.QUESTION_AND_ANSWER
    )!
  const negativeBehaviorList = data?.findAllBehaviorTypes.behaviorTypes.filter(
    (b) => b.behaviorCategory === BehaviorCategoryEnum.NEGATIVE_BEHAVIOR
  )!

  const preparedAndReady = data?.findAllBehaviorTypes.behaviorTypes.find(
    (b) => b._id === '62a33f0c2c8c161570b3c258'
  )!

  const preparednessBehaviorList = studentBehaviors.find(
    (b) => b.behavior._id === preparedAndReady._id
  )
    ? data?.findAllBehaviorTypes.behaviorTypes.filter(
        (b) =>
          b.behaviorCategory === BehaviorCategoryEnum.PREPAREDNESS &&
          b.behaviorName !== 'Prepared and Ready'
      )!
    : data?.findAllBehaviorTypes.behaviorTypes.filter(
        (b) =>
          b.behaviorCategory === BehaviorCategoryEnum.PREPAREDNESS &&
          b.behaviorName === 'Prepared and Ready'
      )!

  const independentBehaviorList =
    data?.findAllBehaviorTypes.behaviorTypes.filter(
      (b) => b.behaviorCategory === BehaviorCategoryEnum.INDEPENDENT_WORK
    )!

  // const behaviorPoints = (behavior: BehaviorEnum) => {
  //   if (behavior === BehaviorEnum.ANSWERED_QUESTION)
  //     return responsibilityPointConverter(grade, 2)
  //   else if (behavior === BehaviorEnum.DID_NOT_ANSWER_QUESTION) return 0
  //   else if (behavior === BehaviorEnum.ON_TASK)
  //     return responsibilityPointConverter(grade, 2)
  //   else if (behavior === BehaviorEnum.OFF_TASK) return -2
  //   else if (behavior === BehaviorEnum.COMPLETED_ASSIGNMENT) return 10
  //   else if (behavior === BehaviorEnum.REFUSED_TO_WORK) return -10
  //   else if (behavior === BehaviorEnum.DISRUPTIVE) return -10
  //   else if (behavior === BehaviorEnum.EXCESSIVE_TALKING) return -2
  //   else if (behavior === BehaviorEnum.UNPREPARED) return -10
  //   else if (behavior === BehaviorEnum.DISRESPECTFUL) return -10
  //   else if (behavior === BehaviorEnum.INNAPROPRIATE_LANGUAGE) return -10
  //   else return 0
  // }
  // const questionAndAnswerBehaviors = behaviorEnum.slice(0, 2)
  // const negativeBehaviors = behaviorEnum.slice(6)
  // const taskBehaviors = behaviorEnum.slice(2, 6)

  const negativeNumberDeterminer = (
    behavior: findAllBehaviorTypes_findAllBehaviorTypes_behaviorTypes
  ) => {}

  if (loading) return <div>Loading </div>
  return (
    <>
      {state.context.studentInfoSelector === 'QUESTION_AND_ANSWER' && (
        <StudentBehaviorButtonContainer>
          {questionAndAnswerBehaviorList.map((behavior, i: number) => (
            <StudentBehaviorButton
              key={i}
              goodBehavior={behavior.behaviorQuality === 'POSITIVE'}
              onClick={() =>
                createStudentBehavior({
                  variables: {
                    input: {
                      behaviorTypeId: behavior._id!,
                      studentId,
                      markingPeriod: currentMarkingPeriod,
                      responsibilityPoints:
                        behavior.points > 0
                          ? responsibilityPointConverter(grade, behavior.points)
                          : behavior.points,
                      date: new Date().toLocaleDateString(),
                    },
                  },
                })
              }
            >
              {behavior.points > 0 && gradeLoading
                ? 'loading'
                : behavior.behaviorName}
            </StudentBehaviorButton>
          ))}
        </StudentBehaviorButtonContainer>
      )}
      {state.context.studentInfoSelector === 'PREPAREDNESS' && (
        <StudentBehaviorButtonContainer>
          {preparednessBehaviorList.map((behavior, i: number) => (
            <StudentBehaviorButton
              key={i}
              goodBehavior={behavior.behaviorQuality === 'POSITIVE'}
              onClick={() =>
                createStudentBehavior({
                  variables: {
                    input: {
                      behaviorTypeId: behavior._id!,
                      studentId,
                      markingPeriod: currentMarkingPeriod,
                      responsibilityPoints:
                        behavior.points > 0
                          ? responsibilityPointConverter(grade, behavior.points)
                          : behavior.points,
                      date: new Date().toLocaleDateString(),
                    },
                  },
                })
              }
            >
              {behavior.points > 0 && gradeLoading
                ? 'loading'
                : behavior.behaviorName}
            </StudentBehaviorButton>
          ))}
        </StudentBehaviorButtonContainer>
      )}
      {state.context.studentInfoSelector === 'NEGATIVE_BEHAVIOR' && (
        <StudentBehaviorButtonContainer>
          {negativeBehaviorList.map((behavior, i: number) => (
            <StudentBehaviorButton
              key={i}
              goodBehavior={behavior.behaviorQuality === 'POSITIVE'}
              onClick={() =>
                createStudentBehavior({
                  variables: {
                    input: {
                      behaviorTypeId: behavior._id!,
                      studentId,
                      markingPeriod: currentMarkingPeriod,
                      responsibilityPoints:
                        behavior.points > 0
                          ? responsibilityPointConverter(grade, behavior.points)
                          : behavior.points,
                      date: new Date().toLocaleDateString(),
                    },
                  },
                })
              }
            >
              {behavior.points > 0 && gradeLoading
                ? 'loading'
                : behavior.behaviorName}
            </StudentBehaviorButton>
          ))}
        </StudentBehaviorButtonContainer>
      )}
      {state.context.studentInfoSelector === 'TASK_CHECK' && (
        <StudentBehaviorButtonContainer>
          {independentBehaviorList.map((behavior, i: number) => (
            <StudentBehaviorButton
              key={i}
              goodBehavior={behavior.behaviorQuality === 'POSITIVE'}
              onClick={() =>
                createStudentBehavior({
                  variables: {
                    input: {
                      behaviorTypeId: behavior._id!,
                      studentId,
                      markingPeriod: currentMarkingPeriod,
                      responsibilityPoints:
                        behavior.points > 0
                          ? responsibilityPointConverter(grade, behavior.points)
                          : behavior.points,
                      date: new Date().toLocaleDateString(),
                    },
                  },
                })
              }
            >
              {behavior.points > 0 && gradeLoading
                ? 'loading'
                : behavior.behaviorName}
            </StudentBehaviorButton>
          ))}
        </StudentBehaviorButtonContainer>
      )}
      {state.context.studentInfoSelector === 'INFO' && (
        <BehaviorRemover
          studentId={studentId}
          currentMarkingPeriod={currentMarkingPeriod}
          studentBehaviors={studentBehaviors}
        />
      )}
    </>
  )
}

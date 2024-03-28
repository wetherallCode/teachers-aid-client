import React, { useState } from 'react'
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
  TextAnalysisCompletionEnum,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasAssignments,
  CheckTextAnalysisInput,
  checkTextAnalysisVariables,
  checkTextAnalysis,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasAssignments_TextAnalysis,
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
import { TextAnalysisCheck } from '../TextAnalysis/TextAnalysisCheck'

export type DailyBehaviorProps = {
  studentId: string
  grade: number
  gradeLoading: boolean
  studentBehaviors: findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasBehaviors[]
  textAnalysis:
    | findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasAssignments_TextAnalysis
    | undefined
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
  textAnalysis,
}: DailyBehaviorProps) => {
  const [state] = useTeachersAidContextProvider()
  const {
    behaviorCategoryEnum,
    BehaviorQualityEnum,
    textAnalysisCompletionEnum,
  } = useEnumContextProvider()
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
    },
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

  if (loading) return <div>Loading </div>
  const behaviorsForTeachersAid =
    data?.findAllBehaviorTypes.behaviorTypes.filter((b) => b.forTeachersAid)

  const questionAndAnswerBehaviorList = [
    ...behaviorsForTeachersAid!.filter(
      (b) => b.behaviorCategory === BehaviorCategoryEnum.QUESTION_AND_ANSWER,
    )!,
  ]
  const negativeBehaviorList = behaviorsForTeachersAid!.filter(
    (b) => b.behaviorCategory === BehaviorCategoryEnum.NEGATIVE_BEHAVIOR,
  )!

  const preparedAndReady = data?.findAllBehaviorTypes.behaviorTypes.find(
    (b) => b._id === '62a33f0c2c8c161570b3c258',
  )!

  const preparednessBehaviorList =
    preparedAndReady &&
    studentBehaviors.find((b) => b.behavior._id === preparedAndReady._id)
      ? data?.findAllBehaviorTypes.behaviorTypes.filter(
          (b) =>
            b.behaviorCategory === BehaviorCategoryEnum.PREPAREDNESS &&
            b.behaviorName !== 'Prepared and Ready',
        )!
      : data?.findAllBehaviorTypes.behaviorTypes.filter(
          (b) =>
            b.behaviorCategory === BehaviorCategoryEnum.PREPAREDNESS &&
            b.behaviorName === 'Prepared and Ready',
        )!

  const independentBehaviorList = behaviorsForTeachersAid!.filter(
    (b) => b.behaviorCategory === BehaviorCategoryEnum.INDEPENDENT_WORK,
  )!

  const negativeNumberDeterminer = (
    behavior: findAllBehaviorTypes_findAllBehaviorTypes_behaviorTypes,
  ) => {}

  const testing = true
  return (
    <>
      {state.context.studentInfoSelector === 'QUESTION_AND_ANSWER' && (
        <StudentBehaviorButtonContainer>
          {questionAndAnswerBehaviorList
            .sort((a, b) => b.points - a.points)
            .map((behavior, i: number) => {
              return (
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
                              ? responsibilityPointConverter(
                                  grade,
                                  behavior.points,
                                )
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
              )
            })}
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
        <>
          {testing ? (
            <TextAnalysisCheck
              textAnalysis={
                textAnalysis as findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasAssignments_TextAnalysis
              }
            />
          ) : (
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
                              ? responsibilityPointConverter(
                                  grade,
                                  behavior.points,
                                )
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
        </>
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

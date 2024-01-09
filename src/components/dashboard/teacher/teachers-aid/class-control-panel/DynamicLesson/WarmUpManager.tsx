import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  updateDynamicLesson,
  updateDynamicLessonVariables,
  DynamicLessonEnums,
  ActivityTimeEnum,
  controlWarmUp,
  controlWarmUpVariables,
} from '../../../../../../schemaTypes'
import { DynamicLessonButton } from '../../styles/classControlPanelStyles'
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  gql,
  useMutation,
} from '@apollo/client'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'

export type WarmUpManagerProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  presentStudentList: string[]
  updateDynamicLesson: (
    options?:
      | MutationFunctionOptions<
          updateDynamicLesson,
          updateDynamicLessonVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined,
  ) => void
}

export const CONTROL_WARM_UP_MUTATION = gql`
  mutation controlWarmUp($input: ControlWarmUpInput!) {
    controlWarmUp(input: $input) {
      protocols {
        _id
      }
    }
  }
`

export const WarmUpManager = ({
  lesson,
  presentStudentList,
  updateDynamicLesson,
}: WarmUpManagerProps) => {
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const [controlWarmUp] = useMutation<controlWarmUp, controlWarmUpVariables>(
    CONTROL_WARM_UP_MUTATION,
    {
      onCompleted: (data) => console.log(data),
      refetchQueries: [
        'findLessonByCourseAndDate',
        'findStudentByIdForTeachersAid',
      ],
    },
  )

  const { isActive, academicOutcomeTypes, activityType, task } =
    lesson.beforeActivity

  return (
    <>
      {lesson.lessonType === 'INTRODUCTORY' ? (
        <DynamicLessonButton
          currentLessonSetting={lesson.dynamicLesson === 'WARM_UP'}
        >
          Quiz
        </DynamicLessonButton>
      ) : (
        <>
          <DynamicLessonButton
            currentLessonSetting={isActive}
            onClick={() => {
              if (!isActive) {
                controlWarmUp({
                  variables: {
                    input: {
                      lessonId: lesson._id!,
                      isActive: true,
                      academicOutcomeType: academicOutcomeTypes,
                      markingPeriod:
                        markingPeriodState.context.currentMarkingPeriod,
                      protocolActivityType: activityType,
                      studentIds: presentStudentList,
                      task: task,
                      activityTime: ActivityTimeEnum.BEFORE,
                    },
                  },
                })
              }
            }}
          >
            Start
          </DynamicLessonButton>
          <DynamicLessonButton
            currentLessonSetting={!isActive}
            onClick={() => {
              controlWarmUp({
                variables: {
                  input: {
                    lessonId: lesson._id!,
                    isActive: false,
                    academicOutcomeType: academicOutcomeTypes,
                    markingPeriod:
                      markingPeriodState.context.currentMarkingPeriod,
                    protocolActivityType: activityType,
                    studentIds: presentStudentList,
                    task: task,
                    activityTime: ActivityTimeEnum.BEFORE,
                  },
                },
              })
              updateDynamicLesson({
                variables: {
                  input: {
                    lessonId: lesson._id!,
                    dynamicLessonUpdate: DynamicLessonEnums.LESSON_DETAILS,
                  },
                },
              })
            }}
          >
            Complete
          </DynamicLessonButton>
        </>
      )}
    </>
  )
}

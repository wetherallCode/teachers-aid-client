import { gql, useMutation } from '@apollo/client'
import {
  updateDynamicLesson,
  updateDynamicLessonVariables,
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  DynamicLessonEnums,
  createBatchStudentBehavior,
  createBatchStudentBehaviorVariables,
} from '../../../../../../schemaTypes'
import {
  DynamicLessonHeader,
  DynamicLessonButton,
  DynamicLessonContainer,
  DynamicLessonOnButton,
  DynamicLessonOffButtonContainer,
  DynamicLessonOffButton,
  DynamicLessonButtonContainer,
} from '../../styles/classControlPanelStyles'
import { WarmUp } from '../../../../../lesson/lesson-components/WarmUp'

import { CoolDownManager } from '../coolDown-manager/CoolDownManager'
import { StudentInfoSelector } from '../center-console/StudentInfoSelector'
import { CREATE_BEHAVIOR_MUTATION } from '../../student-info/behavior/DailyBehavior'
import { WarmUpManager } from '../warmUp-Manager/WarmUpManager'

export type DynamicLessonManagerProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  presentStudentList: string[]
}

export type DynamicLessonButtonProps = {
  currentLessonSetting?: boolean
}

export const UPDATE_DYNAMIC_LESSON_MUTATION = gql`
  mutation updateDynamicLesson($input: UpdateDynamicLessonInput!) {
    UpdateDynamicLesson(input: $input) {
      lesson {
        _id
        dynamicLesson
      }
    }
  }
`
export const CREATE_BATCH_STUDENT_BEHAVIOR_MUTATION = gql`
  mutation createBatchStudentBehavior(
    $input: CreateBatchStudentBehaviorInput!
  ) {
    createBatchStudentBehavior(input: $input) {
      studentBehaviors {
        _id
      }
    }
  }
`
export const DynamicLessonManager = ({
  lesson,
  presentStudentList,
}: DynamicLessonManagerProps) => {
  const [updateDynamicLesson] = useMutation<
    updateDynamicLesson,
    updateDynamicLessonVariables
  >(UPDATE_DYNAMIC_LESSON_MUTATION, {
    onCompleted: (data) => console.log(data.UpdateDynamicLesson),
    refetchQueries: ['findLessonByCourseAndDate'],
  })

  const [createBatchStudentBehavior] = useMutation<
    createBatchStudentBehavior,
    createBatchStudentBehaviorVariables
  >(CREATE_BATCH_STUDENT_BEHAVIOR_MUTATION, {
    variables: {
      input: {
        behaviorTypeId: '62a33f0c2c8c161570b3c258'!,
        markingPeriod: lesson.assignedMarkingPeriod,
        responsibilityPoints: 1,
        studentIds: presentStudentList,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findStudentByIdForTeachersAid'],
  })

  const handleClick = (dynamicLessonSetting: DynamicLessonEnums) => {
    updateDynamicLesson({
      variables: {
        input: {
          lessonId: lesson._id!,
          dynamicLessonUpdate: dynamicLessonSetting,
        },
      },
    })
    // lesson.lessonType === 'REINFORCEMENT' &&
    !lesson.lessonStarted && createBatchStudentBehavior()
  }

  return (
    <DynamicLessonContainer>
      <DynamicLessonHeader>Dynamic Lesson</DynamicLessonHeader>
      <div
        style={{ gridColumn: '1/-1', display: 'grid', justifyItems: 'center' }}
      >
        <StudentInfoSelector />
      </div>
      {lesson.dynamicLesson === 'OFF' ? (
        <DynamicLessonOnButton
          // currentLessonSetting={}
          onClick={() => handleClick(DynamicLessonEnums.LESSON_DETAILS)}
        >
          Start Lesson
        </DynamicLessonOnButton>
      ) : (
        <>
          <DynamicLessonButtonContainer>
            {lesson.dynamicLesson === 'WARM_UP' ? (
              <WarmUpManager
                lesson={lesson}
                presentStudentList={presentStudentList}
                updateDynamicLesson={updateDynamicLesson}
              />
            ) : (
              <>
                {!lesson.beforeActivity.completed ? (
                  <DynamicLessonButton
                    // currentLessonSetting={lesson.dynamicLesson === 'WARM_UP'}
                    onClick={() => handleClick(DynamicLessonEnums.WARM_UP)}
                  >
                    Warm Up
                  </DynamicLessonButton>
                ) : (
                  <div>Completed</div>
                )}
              </>
            )}
          </DynamicLessonButtonContainer>
          <DynamicLessonButton
            currentLessonSetting={lesson.dynamicLesson === 'LESSON_DETAILS'}
            onClick={() => handleClick(DynamicLessonEnums.LESSON_DETAILS)}
          >
            Lesson Details
          </DynamicLessonButton>
          <DynamicLessonButton
            currentLessonSetting={lesson.dynamicLesson === 'VOCAB'}
            onClick={() => handleClick(DynamicLessonEnums.VOCAB)}
          >
            Vocab
          </DynamicLessonButton>
          <DynamicLessonButtonContainer>
            {lesson.dynamicLesson === 'EXIT_ACTIVITY' ? (
              <CoolDownManager
                lesson={lesson}
                presentStudentList={presentStudentList}
                updateDynamicLesson={updateDynamicLesson}
              />
            ) : (
              <>
                {!lesson.afterActivity.completed ? (
                  <DynamicLessonButton
                    // currentLessonSetting={lesson.dynamicLesson === 'EXIT_ACTIVITY'}
                    onClick={() =>
                      handleClick(DynamicLessonEnums.EXIT_ACTIVITY)
                    }
                  >
                    Cool Down
                  </DynamicLessonButton>
                ) : (
                  <div>Completed</div>
                )}
              </>
            )}
          </DynamicLessonButtonContainer>
          <DynamicLessonOffButtonContainer>
            <DynamicLessonOffButton
              // currentLessonSetting={}
              onClick={() => {
                handleClick(DynamicLessonEnums.OFF)
                console.log('click')
              }}
            >
              End Lesson
            </DynamicLessonOffButton>
          </DynamicLessonOffButtonContainer>
        </>
      )}
    </DynamicLessonContainer>
  )
}

import { Machine, assign } from 'xstate'
import {
  TextSectionQuestionsInput,
  QuestionTypeEnum,
  ReadingsInput,
  TopicInput,
  MarkingPeriodEnum,
} from '../../../../../schemaTypes'

export type createAssignmentMachineSchema = {
  states: {
    findLesson: {
      states: {
        unit: {}
        lesson: {}
      }
    }
    assignmentType: {
      states: {
        idle: {}
        essay: {
          states: {
            idle: {}
            createEssay: {}
          }
        }
        readingGuide: {
          states: {
            idle: {}
            createReadingGuide: {}
          }
        }
      }
    }
    assignmentCreate: {}
  }
}
export type createAssignmentMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'ESSAY' }
  | { type: 'READING_GUIDE' }
  | { type: 'SET_COURSE_ID'; payload: string }
  | { type: 'SET_UNIT'; payload: string }
  | { type: 'SET_LESSON'; payload: string }
  | {
      type: 'SET_QUESTION_LIST'
      payload: TextSectionQuestionsInput[]
    }

export type createAssignmentMachineContext = {
  courseId: string
  unit: string
  fromLesson: string
  questionList: TextSectionQuestionsInput[]
  assignedCourseId: string[]
  associatedLessonId: string
  dueDate: any
  hasAssignerId: string
  markingPeriod: MarkingPeriodEnum
  maxPoints: number
  readings: ReadingsInput
  topic: TopicInput
}

export const createAssignmentMachine = Machine<
  createAssignmentMachineContext,
  createAssignmentMachineSchema,
  createAssignmentMachineEvent
>({
  id: 'createAssignment',
  initial: 'findLesson',
  context: {
    courseId: '5ec579f241294ae56fa850a8',
    unit: '',
    fromLesson: '',
    questionList: [],
    topic: {
      question: '',
      questionType: QuestionTypeEnum.HOW_PROBLEM_SOLUTION,
    },
    readings: {
      readingPages: '',
      readingSections: '',
    },
    assignedCourseId: [],
    dueDate: '',
    associatedLessonId: '',
    hasAssignerId: '',
    markingPeriod: MarkingPeriodEnum.FIRST,
    maxPoints: 0,
  },
  states: {
    findLesson: {
      initial: 'unit',
      states: {
        unit: {
          on: {
            NEXT: 'lesson',
            SET_COURSE_ID: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  courseId: evt.payload,
                }
              }),
            },
            SET_UNIT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  unit: evt.payload,
                }
              }),
            },
          },
        },
        lesson: {
          on: {
            PREVIOUS: 'unit',
            NEXT: '#createAssignment.assignmentType',
            SET_LESSON: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  fromLesson: evt.payload,
                }
              }),
            },
          },
        },
      },
    },
    assignmentType: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            PREVIOUS: '#createAssignment.findLesson.lesson',
            ESSAY: 'essay',
            READING_GUIDE: 'readingGuide',
            SET_QUESTION_LIST: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  questionList: evt.payload,
                }
              }),
            },
          },
        },
        essay: {
          initial: 'idle',
          states: {
            idle: {},
            createEssay: {},
          },
        },
        readingGuide: {
          initial: 'idle',
          states: {
            idle: {},
            createReadingGuide: {},
          },
        },
      },
    },
    assignmentCreate: {},
  },
})

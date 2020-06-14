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
    idle: {}
    essay: {
      states: {
        unit: {}
        lesson: {}
        essayInfo: {}
        createEssay: {}
      }
    }
    readingGuide: {
      states: {
        unit: {}
        lesson: {}
        readingGuideInfo: {}
        createReadingGuide: {}
      }
    }
  }
}

export type createAssignmentMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'ESSAY' }
  | { type: 'READING_GUIDE' }
  | { type: 'SET_COURSE_ID'; payload: string }
  | { type: 'SET_LINKED_COURSES_IDS'; payload: string[] }
  | { type: 'SET_UNIT'; payload: string }
  | { type: 'SET_LESSON'; payload: string }
  | {
      type: 'SET_QUESTION_LIST'
      payload: TextSectionQuestionsInput[]
    }
  | { type: 'SET_DUE_DATE'; payload: any }
  | { type: 'SET_DUE_TIME'; payload: any }
  | { type: 'SET_ASSIGNED_DATE'; payload: any }
  | { type: 'SET_ASSIGNER_ID'; payload: string }
  | { type: 'SET_MARKING_PERIOD'; payload: MarkingPeriodEnum }
  | { type: 'SET_MAX_POINTS'; payload: number }
  | { type: 'SET_READINGS_READING_PAGES'; payload: string }
  | { type: 'SET_READINGS_READING_SECTIONS'; payload: string }
  | { type: 'SET_TOPIC_QUESTION_LIST'; payload: TopicInput }
  | { type: 'SET_MAX_POINTS'; payload: number }

// | { type: 'SET_TOPIC_QUESTION'; payload: string }
// | { type: 'SET_TOPIC_QUESTION_TYPE'; payload: QuestionTypeEnum }

export type createAssignmentMachineContext = {
  courseId: string
  assignedCourseId: string[]
  hasAssignerId: string
  essay: {
    unit: string
    lesson: string
    questionList: TextSectionQuestionsInput[]
    dueDate: any
    dueTime: any
    assignedDate: any
    readings: ReadingsInput
    maxPoints: number
    markingPeriod: MarkingPeriodEnum
    topicList: TopicInput[]
  }
  readingGuide: {
    unit: string
    lesson: string
    dueDate: any
    assignedDate: any
    markingPeriod: MarkingPeriodEnum
    maxPoints: number
    readings: ReadingsInput
  }
}

export const createAssignmentMachine = Machine<
  createAssignmentMachineContext,
  createAssignmentMachineSchema,
  createAssignmentMachineEvent
>({
  id: 'createAssignment',
  initial: 'idle',
  type: 'parallel',
  context: {
    courseId: '',
    assignedCourseId: [],
    hasAssignerId: '',
    essay: {
      unit: '',
      lesson: '',
      questionList: [],
      dueDate: '',
      dueTime: '',
      assignedDate: '',
      maxPoints: 0,
      markingPeriod: MarkingPeriodEnum.FIRST,
      readings: {
        readingPages: '',
        readingSections: '',
      },
      topicList: [],
    },
    readingGuide: {
      unit: '',
      lesson: '',
      readings: {
        readingPages: '',
        readingSections: '',
      },
      markingPeriod: MarkingPeriodEnum.FIRST,
      maxPoints: 0,
      assignedDate: '',
      dueDate: '',
    },
  },
  states: {
    idle: {
      on: {
        ESSAY: 'essay',
        SET_COURSE_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseId: evt.payload,
            }
          }),
        },
      },
    },
    essay: {
      initial: 'unit',
      states: {
        unit: {
          on: {
            PREVIOUS: '#createAssignment.idle',
            NEXT: 'lesson',
            SET_UNIT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: { ...ctx.essay, unit: evt.payload },
                }
              }),
            },
          },
        },
        lesson: {
          on: {
            PREVIOUS: 'unit',
            NEXT: 'essayInfo',
            SET_LESSON: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: { ...ctx.essay, lesson: evt.payload },
                }
              }),
            },
          },
        },
        essayInfo: {
          on: {
            PREVIOUS: 'lesson',
            NEXT: 'createEssay',
            SET_LINKED_COURSES_IDS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  assignedCourseId: evt.payload,
                }
              }),
            },
            SET_QUESTION_LIST: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: { ...ctx.essay, questionList: evt.payload },
                }
              }),
            },
            SET_ASSIGNED_DATE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: { ...ctx.essay, assignedDate: evt.payload },
                }
              }),
            },
            SET_DUE_DATE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: { ...ctx.essay, dueDate: evt.payload },
                }
              }),
            },
            SET_DUE_TIME: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: { ...ctx.essay, dueTime: evt.payload },
                }
              }),
            },
            SET_ASSIGNER_ID: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  hasAssignerId: evt.payload,
                }
              }),
            },
            SET_MARKING_PERIOD: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: { ...ctx.essay, markingPeriod: evt.payload },
                }
              }),
            },
            SET_MAX_POINTS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: { ...ctx.essay, maxPoints: evt.payload },
                }
              }),
            },
            SET_READINGS_READING_PAGES: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: {
                    ...ctx.essay,
                    readings: {
                      ...ctx.essay.readings,
                      readingPages: evt.payload,
                    },
                  },
                }
              }),
            },
            SET_READINGS_READING_SECTIONS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: {
                    ...ctx.essay,
                    readings: {
                      ...ctx.essay.readings,
                      readingSections: evt.payload,
                    },
                  },
                }
              }),
            },
            SET_TOPIC_QUESTION_LIST: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: {
                    ...ctx.essay,
                    topicList: [...ctx.essay.topicList, evt.payload],
                  },
                }
              }),
            },
          },
        },
        createEssay: {},
      },
    },

    readingGuide: {
      initial: 'unit',
      states: {
        unit: {},
        lesson: {},
        readingGuideInfo: {},
        createReadingGuide: {},
      },
    },
  },
})

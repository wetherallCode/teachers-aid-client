import { Machine, assign } from 'xstate'
import {
  TextSectionQuestionsInput,
  ReadingsInput,
  TopicInput,
  MarkingPeriodEnum,
  findLessonById_findLessonById_lesson_assignedCourses_hasCourseInfo,
  SchoolDayType,
  TimeOfDay,
} from '../../../../../schemaTypes'
import { dateConverter } from '../../../../../utils'

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
  | { type: 'ESSAY' }
  | { type: 'ESSAY_UNIT' }
  | { type: 'ESSAY_LESSON' }
  | { type: 'ESSAY_INFO' }
  | { type: 'CREATE_ESSAY' }
  | { type: 'PREVIOUS' }
  | { type: 'READING_GUIDE' }
  | { type: 'READING_GUIDE_UNIT' }
  | { type: 'READING_GUIDE_LESSON' }
  | { type: 'READING_GUIDE_INFO' }
  | { type: 'CREATE_READING_GUIDE' }
  | { type: 'SET_COURSE_ID'; payload: string }
  | {
      type: 'SET_COURSE_INFO'
      payload: findLessonById_findLessonById_lesson_assignedCourses_hasCourseInfo
    }
  | { type: 'SET_LINKED_COURSES_IDS'; payload: string[] }
  | { type: 'SET_UNIT'; payload: string }
  | { type: 'SET_LESSON'; payload: string }
  | {
      type: 'SET_QUESTION_LIST'
      payload: TextSectionQuestionsInput[]
    }
  | { type: 'SET_DUE_DATE'; payload: any }
  | { type: 'SET_READING_GUIDE_DUE_DATE'; payload: any }
  | { type: 'SET_DUE_TIME'; payload: any }
  | { type: 'SET_READING_GUIDE_DUE_TIME'; payload: any }
  | { type: 'SET_ASSIGNED_DATE'; payload: any }
  | { type: 'SET_READING_GUIDE_ASSIGNED_DATE'; payload: any }
  | { type: 'SET_ASSIGNER_ID'; payload: string }
  | { type: 'SET_MARKING_PERIOD'; payload: MarkingPeriodEnum }
  | { type: 'SET_READING_GUIDE_MARKING_PERIOD'; payload: MarkingPeriodEnum }
  | { type: 'SET_MAX_POINTS'; payload: number }
  | { type: 'SET_READING_GUIDE_MAX_POINTS'; payload: number }
  | { type: 'SET_READINGS_READING_PAGES'; payload: string }
  | { type: 'SET_READING_GUIDE_READINGS_READING_PAGES'; payload: string }
  | { type: 'SET_READINGS_READING_SECTIONS'; payload: string }
  | { type: 'SET_READING_GUIDE_READINGS_READING_SECTIONS'; payload: string }
  | { type: 'SET_TOPIC_QUESTION_LIST'; payload: TopicInput }
  | { type: 'SET_MAX_POINTS'; payload: number }
  | { type: 'SET_READING_GUIDE_MAX_POINTS'; payload: number }

export type createAssignmentMachineContext = {
  courseId: string
  courseInfo: findLessonById_findLessonById_lesson_assignedCourses_hasCourseInfo
  hasAssignerId: string
  essay: {
    unit: string
    lesson: string
    assignedCourseId: string[]
    questionList: TextSectionQuestionsInput[]
    dueDate: any
    dueTime: TimeOfDay
    assignedDate: any
    readings: ReadingsInput
    maxPoints: number
    markingPeriod: MarkingPeriodEnum
    topicList: TopicInput[]
  }
  readingGuide: {
    unit: string
    lesson: string
    assignedCourseId: string[]
    dueDate: any
    dueTime: TimeOfDay
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
    courseInfo: {
      __typename: 'CourseInfo',
      endsAt: '',
      schoolDayType: SchoolDayType.A,
      startsAt: '',
    },
    hasAssignerId: '',
    essay: {
      unit: '',
      lesson: '',
      assignedCourseId: [],
      questionList: [],
      dueDate: '',
      dueTime: TimeOfDay.BEFORE_SCHOOL,
      assignedDate: dateConverter(new Date().toISOString().substring(0, 10)),
      maxPoints: 5,
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
      assignedCourseId: [],
      readings: {
        readingPages: '',
        readingSections: '',
      },
      markingPeriod: MarkingPeriodEnum.FIRST,
      maxPoints: 2,
      assignedDate: dateConverter(new Date().toISOString().substring(0, 10)),
      dueDate: '',
      dueTime: TimeOfDay.BEFORE_SCHOOL,
    },
  },
  states: {
    idle: {
      on: {
        ESSAY: 'essay',
        READING_GUIDE: 'readingGuide',
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
            ESSAY_LESSON: 'lesson',
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
            ESSAY_UNIT: 'unit',
            ESSAY_INFO: 'essayInfo',
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
            ESSAY_LESSON: 'lesson',
            CREATE_ESSAY: 'createEssay',
            SET_COURSE_INFO: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  courseInfo: evt.payload,
                }
              }),
            },
            SET_LINKED_COURSES_IDS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: { ...ctx.essay, assignedCourseId: evt.payload },
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
                console.log(evt.payload)
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
        unit: {
          on: {
            PREVIOUS: '#createAssignment.idle',
            READING_GUIDE_LESSON: 'lesson',
            SET_UNIT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  readingGuide: { ...ctx.readingGuide, unit: evt.payload },
                }
              }),
            },
          },
        },
        lesson: {
          on: {
            READING_GUIDE_UNIT: 'unit',
            READING_GUIDE_INFO: 'readingGuideInfo',
            SET_LESSON: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  readingGuide: { ...ctx.readingGuide, lesson: evt.payload },
                }
              }),
            },
          },
        },
        readingGuideInfo: {
          on: {
            PREVIOUS: 'lesson',
            CREATE_READING_GUIDE: 'createReadingGuide',
            SET_COURSE_INFO: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  courseInfo: evt.payload,
                }
              }),
            },

            SET_READING_GUIDE_ASSIGNED_DATE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  readingGuide: {
                    ...ctx.readingGuide,
                    assignedDate: evt.payload,
                  },
                }
              }),
            },
            SET_READING_GUIDE_DUE_DATE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  readingGuide: { ...ctx.readingGuide, dueDate: evt.payload },
                }
              }),
            },
            SET_READING_GUIDE_DUE_TIME: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  readingGuide: { ...ctx.readingGuide, dueTime: evt.payload },
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
            SET_READING_GUIDE_MARKING_PERIOD: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  readingGuide: {
                    ...ctx.readingGuide,
                    markingPeriod: evt.payload,
                  },
                }
              }),
            },
            SET_READING_GUIDE_MAX_POINTS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  readingGuide: { ...ctx.readingGuide, maxPoints: evt.payload },
                }
              }),
            },
            SET_READING_GUIDE_READINGS_READING_PAGES: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  readingGuide: {
                    ...ctx.readingGuide,
                    readings: {
                      ...ctx.readingGuide.readings,
                      readingPages: evt.payload,
                    },
                  },
                }
              }),
            },
            SET_READING_GUIDE_READINGS_READING_SECTIONS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  readingGuide: {
                    ...ctx.readingGuide,
                    readings: {
                      ...ctx.readingGuide.readings,
                      readingSections: evt.payload,
                    },
                  },
                }
              }),
            },
          },
        },
        createReadingGuide: {},
      },
    },
  },
})

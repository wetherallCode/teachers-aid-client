import { Machine, assign } from 'xstate'
import {
  CreateCourseInput,
  CreateCourseInfoInput,
  CourseMaxSizeEnum,
  CourseTypeEnum,
  SchoolDayType,
} from '../../../../../../schemaTypes'

export type createCourseMachineSchema = {
  states: {
    createCourseTitle: {}
    createCourseInfo: {}
  }
}
export type createCourseMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'ADD_ANOTHER_COURSE' }
  | { type: 'NEXT_STEP' }
  | { type: 'NEXT_STEP_MODAL'; payload: boolean }
  | { type: 'CREATE_TITLE'; payload: string }
  | { type: 'ADD_COURSE_ID'; payload: string }
  | { type: 'ADD_STARTING_TIME'; payload: string }
  | { type: 'ADD_ENDING_TIME'; payload: string }
  | { type: 'ADD_STARTING_HALFDAY_TIME'; payload: string }
  | { type: 'ADD_ENDING_HALFDAY_TIME'; payload: string }
  | { type: 'ADD_COURSE_MAX_SIZE'; payload: CourseMaxSizeEnum }
  | { type: 'ADD_COURSE_TYPE'; payload: CourseTypeEnum }
  | { type: 'ADD_SCHOOL_DAY_TYPE'; payload: SchoolDayType }
  | { type: 'COHORT_BASED'; payload: boolean }

export type createCourseMachineContext = {
  courseTitle: CreateCourseInput
  courseId: string
  courseInfo: CreateCourseInfoInput
}

export const createCourseMachine = Machine<
  createCourseMachineContext,
  createCourseMachineSchema,
  createCourseMachineEvent
>({
  id: 'createCourse',
  initial: 'createCourseTitle',
  context: {
    courseTitle: {
      name: '',
    },
    courseId: '',
    courseInfo: {
      courseId: '',
      courseMaxSize: CourseMaxSizeEnum.TWENTY_FOUR,
      courseType: CourseTypeEnum.SOCIAL_STUDIES,
      startsAt: '',
      endsAt: '',
      halfDayStartsAt: '',
      cohortBasedSeating: false,
      halfDayEndsAt: '',
      schoolDayType: SchoolDayType.A,
    },
  },
  states: {
    createCourseTitle: {
      on: {
        NEXT: 'createCourseInfo',
        CREATE_TITLE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseTitle: { ...ctx.courseTitle, name: evt.payload },
            }
          }),
        },
      },
    },
    createCourseInfo: {
      on: {
        ADD_ANOTHER_COURSE: 'createCourseTitle',
        ADD_COURSE_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseInfo: { ...ctx.courseInfo, courseId: evt.payload },
            }
          }),
        },
        ADD_STARTING_TIME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseInfo: {
                ...ctx.courseInfo,
                startsAt: evt.payload,
              },
            }
          }),
        },
        ADD_ENDING_TIME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseInfo: {
                ...ctx.courseInfo,
                endsAt: evt.payload,
              },
            }
          }),
        },
        ADD_STARTING_HALFDAY_TIME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseInfo: {
                ...ctx.courseInfo,
                halfDayStartsAt: evt.payload,
              },
            }
          }),
        },
        COHORT_BASED: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseInfo: {
                ...ctx.courseInfo,
                cohortBasedSeating: evt.payload,
                courseMaxSize: CourseMaxSizeEnum.TWELVE,
              },
            }
          }),
        },
        ADD_ENDING_HALFDAY_TIME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseInfo: {
                ...ctx.courseInfo,
                halfDayEndsAt: evt.payload,
              },
            }
          }),
        },
        ADD_SCHOOL_DAY_TYPE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseInfo: {
                ...ctx.courseInfo,
                schoolDayType: evt.payload,
              },
            }
          }),
        },
        ADD_COURSE_MAX_SIZE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseInfo: {
                ...ctx.courseInfo,
                courseMaxSize: evt.payload,
              },
            }
          }),
        },
        ADD_COURSE_TYPE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseInfo: {
                ...ctx.courseInfo,
                courseType: evt.payload,
              },
            }
          }),
        },
      },
    },
  },
})

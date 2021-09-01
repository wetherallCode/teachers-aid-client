import { Machine, assign } from 'xstate'
import {
  CourseMaxSizeEnum,
  CourseTypeEnum,
  SchoolDayType,
  updateCourseInfo,
  UpdateCourseInfoInput,
  updateCourseInfoVariables,
} from '../../../../../../schemaTypes'

export type editCourseMachineSchema = {
  states: {
    editCourse: {}
  }
}
export type editCourseMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'LOAD_COURSE_DATA'; payload: UpdateCourseInfoInput }
  | { type: 'UPDATE_COURSE_NAME'; payload: string }
  | { type: 'UPDATE_COURSE_TYPE'; payload: CourseTypeEnum }
  | { type: 'UPDATE_END_TIME'; payload: string }
  | { type: 'UPDATE_START_TIME'; payload: string }
  | { type: 'UPDATE_HALF_DAY_END_TIME'; payload: string }
  | { type: 'UPDATE_HALF_DAY_START_TIME'; payload: string }
  | { type: 'UPDATE_SCHOOL_DAY_TYPE'; payload: SchoolDayType }
  | { type: 'UPDATE_COURSE_BASED_SEATING'; payload: boolean }
  | { type: 'UPDATE_COURSE_SIZE'; payload: CourseMaxSizeEnum }

export type editCourseMachineContext = {
  updateCourseInfo: UpdateCourseInfoInput
}

export const editCourseMachine = Machine<
  editCourseMachineContext,
  editCourseMachineSchema,
  editCourseMachineEvent
>({
  id: 'editCourse',
  initial: 'editCourse',
  context: {
    updateCourseInfo: {
      courseId: '',
      name: '',
      courseType: CourseTypeEnum.SOCIAL_STUDIES,
      endsAt: '',
      halfDayEndsAt: '',
      halfDayStartsAt: '',
      schoolDayType: SchoolDayType.A,
      startsAt: '',
      cohortBasedSeating: true,
      courseMaxSize: CourseMaxSizeEnum.TWENTY_FOUR,
    },
  },
  states: {
    editCourse: {
      on: {
        LOAD_COURSE_DATA: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateCourseInfo: evt.payload,
            }
          }),
        },
        UPDATE_COURSE_NAME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateCourseInfo: { ...ctx.updateCourseInfo, name: evt.payload },
            }
          }),
        },
        UPDATE_COURSE_TYPE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateCourseInfo: {
                ...ctx.updateCourseInfo,
                courseType: evt.payload,
              },
            }
          }),
        },
        UPDATE_END_TIME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateCourseInfo: {
                ...ctx.updateCourseInfo,
                endsAt: evt.payload,
              },
            }
          }),
        },
        UPDATE_START_TIME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateCourseInfo: {
                ...ctx.updateCourseInfo,
                startsAt: evt.payload,
              },
            }
          }),
        },
        UPDATE_HALF_DAY_END_TIME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateCourseInfo: {
                ...ctx.updateCourseInfo,
                halfDayEndsAt: evt.payload,
              },
            }
          }),
        },
        UPDATE_HALF_DAY_START_TIME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateCourseInfo: {
                ...ctx.updateCourseInfo,
                halfDayStartsAt: evt.payload,
              },
            }
          }),
        },
        UPDATE_SCHOOL_DAY_TYPE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateCourseInfo: {
                ...ctx.updateCourseInfo,
                schoolDayType: evt.payload,
              },
            }
          }),
        },
        UPDATE_COURSE_BASED_SEATING: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateCourseInfo: {
                ...ctx.updateCourseInfo,
                cohortBasedSeating: evt.payload,
              },
            }
          }),
        },
        UPDATE_COURSE_SIZE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateCourseInfo: {
                ...ctx.updateCourseInfo,
                courseMaxSize: evt.payload,
              },
            }
          }),
        },
      },
    },
  },
})

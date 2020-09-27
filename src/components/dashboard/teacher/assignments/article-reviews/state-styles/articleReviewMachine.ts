import { Machine, assign } from 'xstate'
import {
  CreateArticleReviewsInput,
  MarkingPeriodEnum,
  me_me_Teacher_teachesCourses,
  TimeOfDay,
} from '../../../../../../schemaTypes'

export type articleReviewMachineSchema = {
  states: {
    idle: {}
    create: {}
    review: {}
  }
}
export type articleReviewMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'CREATE' }
  | { type: 'REVIEW' }
  | { type: 'SET_ASSIGNED_DATE'; payload: string }
  | { type: 'SET_DUE_DATE'; payload: string }
  | { type: 'SET_DUE_TIME'; payload: TimeOfDay }
  | { type: 'SET_ASSIGNED_COURSE_ID'; payload: string[] }
  | { type: 'SET_ASSIGNER_ID'; payload: string }
  | { type: 'SET_MARKING_PERIOD'; payload: MarkingPeriodEnum }
  | { type: 'SET_COURSE_TO_REVIEW'; payload: string }
  | { type: 'SET_SELECTED_DATE'; payload: string }

export type articleReviewMachineContext = {
  articleReviewToCreate: CreateArticleReviewsInput
  courseToReview: string
  selectedDate: string
}

export const articleReviewMachine = Machine<
  articleReviewMachineContext,
  articleReviewMachineSchema,
  articleReviewMachineEvent
>({
  id: 'articleReview',
  initial: 'idle',
  context: {
    articleReviewToCreate: {
      assignedCourseId: [],
      assignedDate: new Date().toLocaleDateString(),
      dueDate: '',
      dueTime: TimeOfDay.BEFORE_CLASS,
      hasAssignerId: '',
      markingPeriod: MarkingPeriodEnum.FIRST,
    },
    courseToReview: '',
    selectedDate: '',
  },
  states: {
    idle: { on: { CREATE: 'create', REVIEW: 'review' } },
    create: {
      on: {
        REVIEW: 'review',
        SET_ASSIGNED_DATE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToCreate: {
                ...ctx.articleReviewToCreate,
                assignedDate: evt.payload,
              },
            }
          }),
        },
        SET_DUE_DATE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToCreate: {
                ...ctx.articleReviewToCreate,
                dueDate: evt.payload,
              },
            }
          }),
        },
        SET_DUE_TIME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToCreate: {
                ...ctx.articleReviewToCreate,
                dueTime: evt.payload,
              },
            }
          }),
        },
        SET_ASSIGNED_COURSE_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToCreate: {
                ...ctx.articleReviewToCreate,
                assignedCourseId: evt.payload,
              },
            }
          }),
        },
        SET_ASSIGNER_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToCreate: {
                ...ctx.articleReviewToCreate,
                hasAssignerId: evt.payload,
              },
            }
          }),
        },
        SET_MARKING_PERIOD: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToCreate: {
                ...ctx.articleReviewToCreate,
                markingPeriod: evt.payload,
              },
            }
          }),
        },
      },
    },
    review: {
      on: {
        CREATE: 'create',
        SET_COURSE_TO_REVIEW: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseToReview: evt.payload,
            }
          }),
        },
        SET_SELECTED_DATE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              selectedDate: evt.payload,
            }
          }),
        },
      },
    },
  },
})

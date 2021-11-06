import { Machine, assign } from 'xstate'
import { MarkingPeriodEnum } from '../../../../../schemaTypes'

export type studentAssignmentMachineSchema = {
  states: {
    essaysToComplete: {}
    completedEssays: {}
    readingGuidesToComplete: {}
    articleReviewsToComplete: {}
    quizzes: {}
  }
}
export type studentAssignmentMachineEvent =
  | { type: 'PREVIOUS' }
  | { type: 'ESSAYS_TO_COMPLETE' }
  | { type: 'COMPLETED_ESSAYS' }
  | { type: 'READING_GUIDES' }
  | { type: 'ARTICLE_REVIEWS' }
  | { type: 'QUIZZES' }
  | { type: 'SET_MARKING_PERIOD'; payload: MarkingPeriodEnum }

export type studentAssignmentMachineContext = {
  selectedMarkingPeriod: MarkingPeriodEnum
}

export const studentAssignmentMachine = Machine<
  studentAssignmentMachineContext,
  studentAssignmentMachineSchema,
  studentAssignmentMachineEvent
>({
  id: 'studentAssignments',
  initial: 'essaysToComplete',
  context: {
    selectedMarkingPeriod: MarkingPeriodEnum.FIRST,
  },
  states: {
    essaysToComplete: {
      on: {
        COMPLETED_ESSAYS: 'completedEssays',
        READING_GUIDES: 'readingGuidesToComplete',
        ARTICLE_REVIEWS: 'articleReviewsToComplete',
        QUIZZES: 'quizzes',
        SET_MARKING_PERIOD: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              selectedMarkingPeriod: evt.payload,
            }
          }),
        },
      },
    },
    completedEssays: {
      on: {
        ESSAYS_TO_COMPLETE: 'essaysToComplete',
        READING_GUIDES: 'readingGuidesToComplete',
        ARTICLE_REVIEWS: 'articleReviewsToComplete',
        QUIZZES: 'quizzes',
        SET_MARKING_PERIOD: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              selectedMarkingPeriod: evt.payload,
            }
          }),
        },
      },
    },
    readingGuidesToComplete: {
      on: {
        COMPLETED_ESSAYS: 'completedEssays',
        ESSAYS_TO_COMPLETE: 'essaysToComplete',
        ARTICLE_REVIEWS: 'articleReviewsToComplete',
        QUIZZES: 'quizzes',
        SET_MARKING_PERIOD: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              selectedMarkingPeriod: evt.payload,
            }
          }),
        },
      },
    },
    articleReviewsToComplete: {
      on: {
        ESSAYS_TO_COMPLETE: 'essaysToComplete',
        COMPLETED_ESSAYS: 'completedEssays',
        READING_GUIDES: 'readingGuidesToComplete',
        QUIZZES: 'quizzes',
        SET_MARKING_PERIOD: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              selectedMarkingPeriod: evt.payload,
            }
          }),
        },
      },
    },
    quizzes: {
      on: {
        ESSAYS_TO_COMPLETE: 'essaysToComplete',
        COMPLETED_ESSAYS: 'completedEssays',
        READING_GUIDES: 'readingGuidesToComplete',
        ARTICLE_REVIEWS: 'articleReviewsToComplete',
        SET_MARKING_PERIOD: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              selectedMarkingPeriod: evt.payload,
            }
          }),
        },
      },
    },
  },
})

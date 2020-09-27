import { Machine, assign } from 'xstate'

export type studentAssignmentMachineSchema = {
  states: {
    essaysToComplete: {}
    completedEssays: {}
    readingGuidesToComplete: {}
    articleReviewsToComplete: {}
  }
}
export type studentAssignmentMachineEvent =
  | { type: 'PREVIOUS' }
  | { type: 'ESSAYS_TO_COMPLETE' }
  | { type: 'COMPLETED_ESSAYS' }
  | { type: 'READING_GUIDES' }
  | { type: 'ARTICLE_REVIEWS' }

export type studentAssignmentMachineContext = {}

export const studentAssignmentMachine = Machine<
  studentAssignmentMachineContext,
  studentAssignmentMachineSchema,
  studentAssignmentMachineEvent
>({
  id: 'studentAssignments',
  initial: 'essaysToComplete',
  context: {},
  states: {
    essaysToComplete: {
      on: {
        COMPLETED_ESSAYS: 'completedEssays',
        READING_GUIDES: 'readingGuidesToComplete',
        ARTICLE_REVIEWS: 'articleReviewsToComplete',
      },
    },
    completedEssays: {
      on: {
        ESSAYS_TO_COMPLETE: 'essaysToComplete',
        READING_GUIDES: 'readingGuidesToComplete',
        ARTICLE_REVIEWS: 'articleReviewsToComplete',
      },
    },
    readingGuidesToComplete: {
      on: {
        COMPLETED_ESSAYS: 'completedEssays',
        ESSAYS_TO_COMPLETE: 'essaysToComplete',
        ARTICLE_REVIEWS: 'articleReviewsToComplete',
      },
    },
    articleReviewsToComplete: {
      on: {
        ESSAYS_TO_COMPLETE: 'essaysToComplete',
        COMPLETED_ESSAYS: 'completedEssays',
        READING_GUIDES: 'readingGuidesToComplete',
      },
    },
  },
})

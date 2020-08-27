import { Machine, assign } from 'xstate'

export type studentAssignmentMachineSchema = {
  states: {
    essaysToComplete: {}
    completedEssays: {}
    readingGuidesToComplete: {}
  }
}
export type studentAssignmentMachineEvent =
  | { type: 'PREVIOUS' }
  | { type: 'ESSAYS_TO_COMPLETE' }
  | { type: 'COMPLETED_ESSAYS' }
  | { type: 'READING_GUIDES' }

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
      },
    },
    completedEssays: {
      on: {
        ESSAYS_TO_COMPLETE: 'essaysToComplete',
        READING_GUIDES: 'readingGuidesToComplete',
      },
    },
    readingGuidesToComplete: {
      on: {
        COMPLETED_ESSAYS: 'completedEssays',
        ESSAYS_TO_COMPLETE: 'essaysToComplete',
      },
    },
  },
})

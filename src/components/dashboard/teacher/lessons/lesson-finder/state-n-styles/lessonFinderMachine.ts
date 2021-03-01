import { Machine, assign } from 'xstate'
import { findLessonsByAssignedDate_findLessonsByAssignedDate_lessons } from '../../../../../../schemaTypes'

export type lessonFinderMachineSchema = {
  states: {
    idle: {}
    lessonDetails: {}
  }
}
export type lessonFinderMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | {
      type: 'GET_LESSON'
      payload: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons
    }

export type lessonFinderMachineContext = {
  lesson: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons | null
}

export const lessonFinderMachine = Machine<
  lessonFinderMachineContext,
  lessonFinderMachineSchema,
  lessonFinderMachineEvent
>({
  id: 'lessonFinder',
  initial: 'idle',
  context: { lesson: null },
  states: {
    idle: {
      on: {
        NEXT: 'lessonDetails',
        GET_LESSON: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              lesson: evt.payload,
            }
          }),
        },
      },
    },
    lessonDetails: {
      on: {
        PREVIOUS: 'idle',
      },
    },
  },
})

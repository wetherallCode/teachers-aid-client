import { Machine, assign } from 'xstate'

export type AssignmentManagerMachineSchema = {
  states: {
    idle: {}
    responsibilityPoints: {}
    essays: {}
    articleReviews: {}
  }
}
export type AssignmentManagerMachineEvent =
  | { type: 'IDLE' }
  | { type: 'RESPONSIBILITY_POINTS' }
  | { type: 'ESSAYS' }
  | { type: 'ARTICLE_REVIEW' }
  | { type: 'SET_UNIT_ID'; payload: string }
  | { type: 'SET_LESSON_ID'; payload: string }
  | { type: 'RESET_ESSAYS' }

export type AssignmentManagerMachineContext = {
  unitId: string
  lessonId: string
}

export const AssignmentManagerMachine = Machine<
  AssignmentManagerMachineContext,
  AssignmentManagerMachineSchema,
  AssignmentManagerMachineEvent
>({
  id: 'AssignmentManager',
  initial: 'responsibilityPoints',
  context: {
    unitId: '',
    lessonId: '',
  },
  //   type: 'parallel',
  states: {
    idle: {
      on: {
        RESPONSIBILITY_POINTS: 'responsibilityPoints',
        ESSAYS: 'essays',
        ARTICLE_REVIEW: 'articleReviews',
      },
    },
    responsibilityPoints: {
      on: {
        ESSAYS: 'essays',
        ARTICLE_REVIEW: 'articleReviews',
      },
    },
    essays: {
      on: {
        RESPONSIBILITY_POINTS: 'responsibilityPoints',
        IDLE: 'idle',
        ARTICLE_REVIEW: 'articleReviews',
        SET_UNIT_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              unitId: evt.payload,
            }
          }),
        },
        SET_LESSON_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              lessonId: evt.payload,
            }
          }),
        },
        RESET_ESSAYS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              unitId: '',
              lessonId: '',
            }
          }),
        },
      },
    },
    articleReviews: {
      on: {
        RESPONSIBILITY_POINTS: 'responsibilityPoints',
        ESSAYS: 'essays',
      },
    },
  },
})

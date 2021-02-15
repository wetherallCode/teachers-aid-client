import { Machine, assign } from 'xstate'

export type temporaryTasksMachineSchema = {
  states: {
    idle: {}
    create: {}
    review: {}
  }
}
export type temporaryTasksMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'IDLE' }
  | { type: 'CREATE' }
  | { type: 'REVIEW' }
  | { type: 'SET_TASK_NUMBER'; payload: number }
  | { type: 'SET_TASK_TO_GRADE_NUMBER'; payload: number }

export type temporaryTasksMachineContext = {
  taskNumber: number
  taskToGradeNumber: number
}

export const temporaryTasksMachine = Machine<
  temporaryTasksMachineContext,
  temporaryTasksMachineSchema,
  temporaryTasksMachineEvent
>({
  id: 'temporaryTasks',
  initial: 'idle',
  context: { taskNumber: 0, taskToGradeNumber: 0 },
  states: {
    idle: {
      on: {
        CREATE: 'create',
        REVIEW: 'review',
      },
    },
    create: {
      on: {
        IDLE: 'idle',
        REVIEW: 'review',
        SET_TASK_NUMBER: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              taskNumber: evt.payload,
            }
          }),
        },
        SET_TASK_TO_GRADE_NUMBER: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              taskToGradeNumber: evt.payload,
            }
          }),
        },
      },
    },
    review: {
      on: {
        IDLE: 'idle',
        CREATE: 'create',
      },
    },
  },
})

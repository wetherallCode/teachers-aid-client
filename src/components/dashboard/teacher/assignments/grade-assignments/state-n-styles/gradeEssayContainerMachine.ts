import { Machine, assign } from 'xstate'

export type gradeEssayContainerMachineSchema = {
  states: {
    gradeEssayContainer: {}
    essayTypes: {
      states: {
        onTime: {}
        late: {}
        resubmitted: {}
      }
    }
  }
}
export type gradeEssayContainerMachineEvent =
  | {
      type: 'SET_COURSE_ID'
      payload: string
    }
  | { type: 'ONTIME' }
  | { type: 'LATE' }
  | { type: 'RESUBMITTED' }

export type gradeEssayContainerMachineContext = {
  courseId: string
}

export const gradeEssayContainerMachine = Machine<
  gradeEssayContainerMachineContext,
  gradeEssayContainerMachineSchema,
  gradeEssayContainerMachineEvent
>({
  id: 'gradeEssayContainer',
  initial: 'gradeEssayContainer',
  context: {
    courseId: '',
  },
  type: 'parallel',
  states: {
    gradeEssayContainer: {
      on: {
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
    essayTypes: {
      initial: 'onTime',
      states: {
        onTime: { on: { LATE: 'late', RESUBMITTED: 'resubmitted' } },
        late: { on: { ONTIME: 'onTime', RESUBMITTED: 'resubmitted' } },
        resubmitted: { on: { LATE: 'late', ONTIME: 'onTime' } },
      },
    },
  },
})

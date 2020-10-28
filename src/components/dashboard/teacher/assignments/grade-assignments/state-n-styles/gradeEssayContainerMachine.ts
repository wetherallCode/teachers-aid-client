import { Machine, assign } from 'xstate'

export type gradeEssayContainerMachineSchema = {
  states: {
    gradeEssayContainer: {}
  }
}
export type gradeEssayContainerMachineEvent = {
  type: 'SET_COURSE_ID'
  payload: string
}

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
  },
})

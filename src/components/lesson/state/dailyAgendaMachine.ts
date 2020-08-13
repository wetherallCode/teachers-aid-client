import { Machine, assign } from 'xstate'

export type dailyAgendaMachineSchema = {
  states: {
    getLesson: {}
    todaysLesson: {}
  }
}
export type dailyAgendaMachineEvent =
  | { type: 'TODAYS_LESSON' }
  | { type: 'PREVIOUS' }
  | { type: 'POLLING' }

export type dailyAgendaMachineContext = {
  polling: boolean
}

export const dailyAgendaMachine = Machine<
  dailyAgendaMachineContext,
  dailyAgendaMachineSchema,
  dailyAgendaMachineEvent
>({
  id: 'dailyAgenda',
  initial: 'getLesson',
  context: {
    polling: false,
  },
  states: {
    getLesson: {
      on: {
        TODAYS_LESSON: 'todaysLesson',
      },
    },
    todaysLesson: {
      on: {
        POLLING: {
          actions: assign((ctx) => {
            return {
              ...ctx,
              polling: !ctx.polling,
            }
          }),
        },
      },
    },
  },
})

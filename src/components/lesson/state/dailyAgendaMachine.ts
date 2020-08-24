import { Machine, assign } from 'xstate'

export type dailyAgendaMachineSchema = {
  states: {
    getLesson: {}
    todaysLesson: {}
    oldLesson: {}
  }
}
export type dailyAgendaMachineEvent =
  | { type: 'TODAYS_LESSON' }
  | { type: 'GET_LESSON' }
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
        GET_LESSON: 'getLesson',
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
    oldLesson: {},
  },
})

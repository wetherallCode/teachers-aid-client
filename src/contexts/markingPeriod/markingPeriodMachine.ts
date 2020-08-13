import { Machine, assign } from 'xstate'
import { MarkingPeriodEnum } from '../../schemaTypes'

export type markingPeriodMachineSchema = {
  states: {
    markingPeriod: {}
  }
}

export type markingPeriodMachineEvent = {
  type: 'SET_MARKING_PERIOD'
  payload: MarkingPeriodEnum
}

export type markingPeriodMachineContext = {
  currentMarkingPeriod: MarkingPeriodEnum
}

export const markingPeriodMachine = Machine<
  markingPeriodMachineContext,
  markingPeriodMachineSchema,
  markingPeriodMachineEvent
>({
  id: 'markingPeriodMachine',
  initial: 'markingPeriod',
  context: {
    currentMarkingPeriod: MarkingPeriodEnum.FIRST,
  },
  states: {
    markingPeriod: {
      on: {
        SET_MARKING_PERIOD: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              currentMarkingPeriod: evt.payload,
            }
          }),
        },
      },
    },
  },
})

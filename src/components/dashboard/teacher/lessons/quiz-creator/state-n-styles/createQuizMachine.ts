import { Machine, assign } from 'xstate'
import {
  CreateQuizzesByCourseInput,
  createQuizzesByCourseVariables,
  MarkingPeriodEnum,
} from '../../../../../../schemaTypes'

export type createQuizMachineSchema = {
  states: {
    quizInputs: {}
  }
}
export type createQuizMachineEvent = {
  type: 'SET_QUIZ_INPUTS'
  keyName: string
  payload: string | string[]
}

export type createQuizMachineContext = {
  createQuizInputs: CreateQuizzesByCourseInput
}

export const createQuizMachine = Machine<
  createQuizMachineContext,
  createQuizMachineSchema,
  createQuizMachineEvent
>({
  id: 'createQuiz',
  initial: 'quizInputs',
  context: {
    createQuizInputs: {
      assignedDate: '',
      assignedSectionIds: [],
      courseIds: [],
      dueDate: '',
      dueTime: '',
      hasAssigner: '',
      markingPeriod: MarkingPeriodEnum.FIRST,
      readings: { readingPages: '', readingSections: '' },
    },
  },
  states: {
    quizInputs: {
      on: {
        SET_QUIZ_INPUTS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              createQuizInputs: {
                ...ctx.createQuizInputs,
                [evt.keyName]: evt.payload,
              },
            }
          }),
        },
      },
    },
  },
})

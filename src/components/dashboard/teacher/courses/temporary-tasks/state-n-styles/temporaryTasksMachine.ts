import { Machine, assign } from 'xstate'
import { findTemporaryTasks_findTemporaryTasks_temporaryTasks } from '../../../../../../schemaTypes'
import { CREATE_TEXT_SECTION_MUTATION } from '../../../lessons/section-builder/CreateTextSection'

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
  | { type: 'SET_DATE_TO_REVIEW'; payload: string }
  | {
      type: 'ADD_TO_ABSENT_LIST'
      payload: { taskNumber: number; studentIdToAdd: string }
    }
  | {
      type: 'DELETE_FROM_ABSENT_LIST'
      payload: { taskNumber: number; studentIdToDelete: string }
    }
  | { type: 'ADD_NEW_ABSENT_LIST'; payload: number }

export type temporaryTasksMachineContext = {
  taskNumber: number
  taskToGradeNumber: number
  dateToReview: string
  absentList: {
    taskNumber: number
    tasks: string[]
  }[]
}

export const temporaryTasksMachine = Machine<
  temporaryTasksMachineContext,
  temporaryTasksMachineSchema,
  temporaryTasksMachineEvent
>({
  id: 'temporaryTasks',
  initial: 'idle',
  context: {
    taskNumber: 0,
    taskToGradeNumber: 0,
    dateToReview: '',
    absentList: [{ taskNumber: 0, tasks: [] }],
  },
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
        ADD_NEW_ABSENT_LIST: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              absentList: [
                ...ctx.absentList,
                { taskNumber: evt.payload, tasks: [] },
              ],
            }
          }),
        },
        ADD_TO_ABSENT_LIST: {
          actions: assign((ctx, evt) => {
            const listToModify = ctx.absentList.findIndex(
              (i) => i.taskNumber === evt.payload.taskNumber
            )
            ctx.absentList[listToModify].tasks.push(evt.payload.studentIdToAdd)

            return { ...ctx }
          }),
        },
        DELETE_FROM_ABSENT_LIST: {
          actions: assign((ctx, evt) => {
            const listToModify = ctx.absentList.findIndex(
              (i) => i.taskNumber === evt.payload.taskNumber
            )

            const studentToDelete = ctx.absentList[
              listToModify
            ].tasks.findIndex(
              (index) => index === evt.payload.studentIdToDelete
            )

            ctx.absentList[listToModify] = {
              taskNumber: evt.payload.taskNumber,
              tasks: [
                ...ctx.absentList[listToModify].tasks.slice(0, studentToDelete),
                ...ctx.absentList[listToModify].tasks.slice(
                  studentToDelete + 1
                ),
              ],
            }

            return { ...ctx }
          }),
        },
      },
    },
    review: {
      on: {
        IDLE: 'idle',
        CREATE: 'create',
        SET_DATE_TO_REVIEW: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              dateToReview: evt.payload,
            }
          }),
        },
      },
    },
  },
})

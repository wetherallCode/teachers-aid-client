import { Machine, assign } from 'xstate'
import {
  ContactTypeEnum,
  CreateParentContactInput,
} from '../../../../../../schemaTypes'

export type createContactMachineSchema = {
  states: {
    create: {}
  }
}
export type createContactMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_CONTACT_TYPE'; payload: ContactTypeEnum }
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_STUDENT_ID'; payload: string }
  | { type: 'SET_TEACHER_ID'; payload: string }
  | { type: 'SET_COURSE_ID'; payload: string }
  | { type: 'SET_STUDENT_NAME'; payload: string }
  | { type: 'SET_STUDENT_NAME'; payload: string }
  | { type: 'RESET' }

export type createContactMachineContext = {
  contactToCreate: CreateParentContactInput
  courseId: string
  studentName: string
}

export const createContactMachine = Machine<
  createContactMachineContext,
  createContactMachineSchema,
  createContactMachineEvent
>({
  id: 'createContact',
  initial: 'create',
  context: {
    contactToCreate: {
      contactType: ContactTypeEnum.EMAIL,
      contentOfContact: '',
      date: new Date().toLocaleDateString(),
      studentId: '',
      teacherId: '',
    },
    courseId: '',
    studentName: '',
  },
  states: {
    create: {
      on: {
        RESET: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentName: '',
              contactToCreate: {
                contactType: ContactTypeEnum.EMAIL,
                contentOfContact: '',
                date: new Date().toLocaleDateString(),
                studentId: '',
                teacherId: ctx.contactToCreate.teacherId,
              },
            }
          }),
        },
        SET_COURSE_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseId: evt.payload,
            }
          }),
        },
        SET_STUDENT_NAME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentName: evt.payload,
            }
          }),
        },
        SET_DATE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              contactToCreate: { ...ctx.contactToCreate, date: evt.payload },
            }
          }),
        },
        SET_CONTACT_TYPE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              contactToCreate: {
                ...ctx.contactToCreate,
                contactType: evt.payload,
              },
            }
          }),
        },
        SET_CONTENT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              contactToCreate: {
                ...ctx.contactToCreate,
                contentOfContact: evt.payload,
              },
            }
          }),
        },
        SET_STUDENT_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              contactToCreate: {
                ...ctx.contactToCreate,
                studentId: evt.payload,
              },
            }
          }),
        },
        SET_TEACHER_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              contactToCreate: {
                ...ctx.contactToCreate,
                teacherId: evt.payload,
              },
            }
          }),
        },
      },
    },
  },
})

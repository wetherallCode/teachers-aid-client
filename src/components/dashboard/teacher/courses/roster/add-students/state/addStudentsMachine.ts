import { Machine, assign } from 'xstate'
import {
  RegisterStudentInput,
  AddStudentsToCourseInput,
  StudentCohortEnum,
} from '../../../../../../../schemaTypes'

export type addStudentsMachineSchema = {
  states: {
    idle: {}
    register: {}
    addToCourse: {}
  }
}
export type addStudentsMachineEvent =
  | { type: 'IDLE' }
  | { type: 'REGISTER' }
  | { type: 'ADD_TO_COURSE' }
  | { type: 'ADD_FIRST_NAME'; payload: string }
  | { type: 'ADD_LAST_NAME'; payload: string }
  | { type: 'ADD_EMAIL'; payload: string }
  | { type: 'ADD_PASSWORD'; payload: string }
  | { type: 'ADD_USERNAME'; payload: string }
  | { type: 'ADD_MIDDLE_NAME'; payload: string }
  | { type: 'ADD_SCHOOL_ID'; payload: string }
  | { type: 'ADD_COHORT'; payload: StudentCohortEnum }
  | { type: 'RESET_REGISTER_INPUTS'; payload: RegisterStudentInput }
  | { type: 'SET_COURSE_ID'; payload: string }
  | { type: 'ADD_STUDENT_IDS'; payload: string }
  | { type: 'REMOVE_STUDENT_IDS'; payload: number }

export type addStudentsMachineContext = {
  studentToRegister: RegisterStudentInput
  addStudentToCourse: AddStudentsToCourseInput
}

export const addStudentsMachine = Machine<
  addStudentsMachineContext,
  addStudentsMachineSchema,
  addStudentsMachineEvent
>({
  id: 'addStudents',
  initial: 'idle',
  context: {
    studentToRegister: {
      firstName: '',
      lastName: '',
      email: '',
      middleName: '',
      schoolId: '',
      cohort: StudentCohortEnum.RED,
      virtual: false,
      password: 'password',
      userName: '',
    },
    addStudentToCourse: {
      courseId: '',
      studentIds: [],
    },
  },
  states: {
    idle: {
      on: { REGISTER: 'register', ADD_TO_COURSE: 'addToCourse' },
    },
    register: {
      on: {
        IDLE: 'idle',
        ADD_TO_COURSE: 'addToCourse',
        ADD_FIRST_NAME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentToRegister: {
                ...ctx.studentToRegister,
                firstName: evt.payload,
              },
            }
          }),
        },
        ADD_MIDDLE_NAME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentToRegister: {
                ...ctx.studentToRegister,
                middleName: evt.payload,
              },
            }
          }),
        },
        ADD_LAST_NAME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentToRegister: {
                ...ctx.studentToRegister,
                lastName: evt.payload,
              },
            }
          }),
        },
        ADD_SCHOOL_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentToRegister: {
                ...ctx.studentToRegister,
                schoolId: evt.payload,
              },
            }
          }),
        },
        ADD_EMAIL: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentToRegister: {
                ...ctx.studentToRegister,
                email: evt.payload,
                userName: evt.payload,
              },
            }
          }),
        },
        ADD_COHORT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentToRegister: {
                ...ctx.studentToRegister,
                cohort: evt.payload,
              },
            }
          }),
        },
        ADD_PASSWORD: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentToRegister: {
                ...ctx.studentToRegister,
                password: evt.payload,
              },
            }
          }),
        },
        ADD_USERNAME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentToRegister: {
                ...ctx.studentToRegister,
                userName: evt.payload,
              },
            }
          }),
        },
        ADD_STUDENT_IDS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              addStudentToCourse: {
                ...ctx.addStudentToCourse,
                studentIds: [...ctx.addStudentToCourse.studentIds, evt.payload],
              },
            }
          }),
        },

        RESET_REGISTER_INPUTS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentToRegister: evt.payload,
            }
          }),
        },
      },
    },
    addToCourse: {
      on: {
        IDLE: 'idle',
        SET_COURSE_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              addStudentToCourse: {
                ...ctx.addStudentToCourse,
                courseId: evt.payload,
              },
            }
          }),
        },
        ADD_STUDENT_IDS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              addStudentToCourse: {
                ...ctx.addStudentToCourse,
                studentIds: [...ctx.addStudentToCourse.studentIds, evt.payload],
              },
            }
          }),
        },
        REMOVE_STUDENT_IDS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              addStudentToCourse: {
                ...ctx.addStudentToCourse,
                studentIds: [
                  ...ctx.addStudentToCourse.studentIds.slice(0, evt.payload),
                  ...ctx.addStudentToCourse.studentIds.slice(evt.payload + 1),
                ],
              },
            }
          }),
        },
      },
    },
  },
})

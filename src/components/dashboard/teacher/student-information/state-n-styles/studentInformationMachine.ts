import { Machine, assign } from 'xstate'
import { findAllStudentsForStudentInformation_findAllStudents_students } from '../../../../../schemaTypes'

export type studentInformationMachineSchema = {
  states: {
    nameSelect: {}
    information: {
      states: {
        studentInfo: {}
        assignments: {}
        protocols: {}
        contacts: {}
      }
    }
  }
}
export type studentInformationMachineEvent =
  | { type: 'STUDENT_INFO' }
  | { type: 'ASSIGNMENTS' }
  | { type: 'PROTOCOLS' }
  | { type: 'CONTACTS' }
  | {
      type: 'SET_STUDENT'
      payload: findAllStudentsForStudentInformation_findAllStudents_students
    }

export type studentInformationMachineContext = {
  student: findAllStudentsForStudentInformation_findAllStudents_students | null
}

export const studentInformationMachine = Machine<
  studentInformationMachineContext,
  studentInformationMachineSchema,
  studentInformationMachineEvent
>({
  id: 'studentInformation',
  initial: 'nameSelect',
  context: {
    student: null,
  },
  type: 'parallel',
  states: {
    nameSelect: {
      on: {
        SET_STUDENT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              student: evt.payload,
            }
          }),
        },
      },
    },
    information: {
      initial: 'studentInfo',
      states: {
        studentInfo: {
          on: {
            ASSIGNMENTS: 'assignments',
            CONTACTS: 'contacts',
            PROTOCOLS: 'protocols',
          },
        },
        assignments: {
          on: {
            STUDENT_INFO: 'studentInfo',
            CONTACTS: 'contacts',
            PROTOCOLS: 'protocols',
          },
        },
        protocols: {
          on: {
            ASSIGNMENTS: 'assignments',
            STUDENT_INFO: 'studentInfo',
            CONTACTS: 'contacts',
          },
        },
        contacts: {
          on: {
            ASSIGNMENTS: 'assignments',
            STUDENT_INFO: 'studentInfo',
            PROTOCOLS: 'protocols',
          },
        },
      },
    },
  },
})

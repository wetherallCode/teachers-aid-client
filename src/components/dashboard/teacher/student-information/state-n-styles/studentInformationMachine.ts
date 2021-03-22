import { Machine, assign } from 'xstate'
import { findAllStudentsForStudentInformation_findAllStudents_students } from '../../../../../schemaTypes'

export type studentInformationMachineSchema = {
  states: {
    nameSelect: {}
    information: {
      states: {
        studentInfo: {}
        assignments: {
          states: {
            essays: {}
            readingGuides: {}
            articleReviews: {}
          }
        }
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
  | { type: 'READING_GUIDES' }
  | { type: 'ESSAYS' }
  | { type: 'ARTICLE_REVIEWS' }
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
          initial: 'essays',
          states: {
            essays: {
              on: {
                STUDENT_INFO: '#studentInformation.information.studentInfo',
                CONTACTS: '#studentInformation.information.contacts',
                PROTOCOLS: '#studentInformation.information.protocols',
                READING_GUIDES: 'readingGuides',
                ARTICLE_REVIEWS: 'articleReviews',
              },
            },
            readingGuides: {
              on: {
                STUDENT_INFO: '#studentInformation.information.studentInfo',
                CONTACTS: '#studentInformation.information.contacts',
                PROTOCOLS: '#studentInformation.information.protocols',
                ESSAYS: 'essays',
                ARTICLE_REVIEWS: 'articleReviews',
              },
            },
            articleReviews: {
              on: {
                STUDENT_INFO: '#studentInformation.information.studentInfo',
                CONTACTS: '#studentInformation.information.contacts',
                PROTOCOLS: '#studentInformation.information.protocols',
                READING_GUIDES: 'readingGuides',
                ESSAYS: 'essays',
              },
            },
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

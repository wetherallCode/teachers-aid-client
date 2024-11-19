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
            quizzes: {}
            textAnalysis: {}
            sgo: {}
          }
        }
        protocols: {}
        conduct: {}
        contacts: {}
      }
    }
  }
}
export type studentInformationMachineEvent =
  | { type: 'STUDENT_INFO' }
  | { type: 'ASSIGNMENTS' }
  | { type: 'PROTOCOLS' }
  | { type: 'CONDUCT' }
  | { type: 'CONTACTS' }
  | { type: 'READING_GUIDES' }
  | { type: 'ESSAYS' }
  | { type: 'QUIZZES' }
  | { type: 'TEXT_ANALYSIS' }
  | { type: 'ARTICLE_REVIEWS' }
  | {
      type: 'UPDATE_STUDENT'
      payload: findAllStudentsForStudentInformation_findAllStudents_students
    }
  | { type: 'SGO' }
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
            CONDUCT: 'conduct',
            UPDATE_STUDENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  student: evt.payload,
                }
              }),
            },
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
                CONDUCT: '#studentInformation.information.conduct',
                READING_GUIDES: 'readingGuides',
                ARTICLE_REVIEWS: 'articleReviews',
                QUIZZES: 'quizzes',
                TEXT_ANALYSIS: 'textAnalysis',
                SGO: 'sgo',
              },
            },
            readingGuides: {
              on: {
                STUDENT_INFO: '#studentInformation.information.studentInfo',
                CONTACTS: '#studentInformation.information.contacts',
                PROTOCOLS: '#studentInformation.information.protocols',
                CONDUCT: '#studentInformation.information.conduct',
                ESSAYS: 'essays',
                ARTICLE_REVIEWS: 'articleReviews',
                TEXT_ANALYSIS: 'textAnalysis',
                QUIZZES: 'quizzes',
                SGO: 'sgo',
              },
            },
            articleReviews: {
              on: {
                STUDENT_INFO: '#studentInformation.information.studentInfo',
                CONTACTS: '#studentInformation.information.contacts',
                PROTOCOLS: '#studentInformation.information.protocols',
                CONDUCT: '#studentInformation.information.conduct',
                READING_GUIDES: 'readingGuides',
                ESSAYS: 'essays',
                QUIZZES: 'quizzes',
                TEXT_ANALYSIS: 'textAnalysis',
                SGO: 'sgo',
              },
            },
            quizzes: {
              on: {
                STUDENT_INFO: '#studentInformation.information.studentInfo',
                CONTACTS: '#studentInformation.information.contacts',
                PROTOCOLS: '#studentInformation.information.protocols',
                CONDUCT: '#studentInformation.information.conduct',
                READING_GUIDES: 'readingGuides',
                ARTICLE_REVIEWS: 'articleReviews',
                TEXT_ANALYSIS: 'textAnalysis',
                ESSAYS: 'essays',
                SGO: 'sgo',
              },
            },
            sgo: {
              on: {
                STUDENT_INFO: '#studentInformation.information.studentInfo',
                CONTACTS: '#studentInformation.information.contacts',
                PROTOCOLS: '#studentInformation.information.protocols',
                CONDUCT: '#studentInformation.information.conduct',
                READING_GUIDES: 'readingGuides',
                TEXT_ANALYSIS: 'textAnalysis',
                ARTICLE_REVIEWS: 'articleReviews',
                ESSAYS: 'essays',
                QUIZZES: 'quizzes',
              },
            },
            textAnalysis: {
              on: {
                STUDENT_INFO: '#studentInformation.information.studentInfo',
                CONTACTS: '#studentInformation.information.contacts',
                PROTOCOLS: '#studentInformation.information.protocols',
                CONDUCT: '#studentInformation.information.conduct',
                READING_GUIDES: 'readingGuides',
                ARTICLE_REVIEWS: 'articleReviews',
                ESSAYS: 'essays',
                QUIZZES: 'quizzes',
                SGO: 'sgo',
              },
            },
          },
        },
        protocols: {
          on: {
            ASSIGNMENTS: 'assignments',
            STUDENT_INFO: 'studentInfo',
            CONTACTS: 'contacts',
            CONDUCT: 'conduct',
          },
        },
        conduct: {
          on: {
            ASSIGNMENTS: 'assignments',
            STUDENT_INFO: 'studentInfo',
            CONTACTS: 'contacts',
            PROTOCOLS: 'protocols',
          },
        },
        contacts: {
          on: {
            ASSIGNMENTS: 'assignments',
            STUDENT_INFO: 'studentInfo',
            PROTOCOLS: 'protocols',
            CONDUCT: 'conduct',
          },
        },
      },
    },
  },
})

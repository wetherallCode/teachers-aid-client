import { Machine, assign } from 'xstate'
import {
  findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo,
  SchoolDayType,
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities,
  AcademicOutomeTypes,
  ProtocolActivityTypes,
  CreateProtocolInput,
  MarkingPeriodEnum,
  AssessStudentProtocolInput,
  ProtocolAssessmentEnum,
  DiscussionTypesEnum,
} from '../../../../../schemaTypes'

export type teachersAidMachineSchema = {
  states: {
    teachersAid: {}
    controlPanelActions: {
      states: {
        dynamicLesson: {}
        protocolManager: {}
      }
    }
    studentControlPanel: {
      states: {
        studentBehavior: {}
        studentAttendance: {}
        studentProtocol: {}
      }
    }
  }
}
export type teachersAidMachineEvent =
  | {
      type: 'SET_COURSE'
      payload: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo
    }
  | { type: 'SET_STUDENT_ID'; payload: string }
  | { type: 'NEXT' }
  | { type: 'COURSE_SELECT' }
  | { type: 'START_LIVE_PERIOD' }
  | {
      type: 'LOAD_PROTOCOLS'
      payload: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities[]
    }
  | { type: 'SELECT_PROTOCOL'; payload: number }
  | { type: 'SET_PRESENT_STUDENTS'; payload: string[] }
  | {
      type: 'UPDATE_LESSON_PROTOCOL'
      payload: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities
    }
  | { type: 'ASSESS_PROTOCOL_DISPLAY' }
  | { type: 'UPDATE_STUDENT_PROTOCOL'; payload: AssessStudentProtocolInput }
  | { type: 'ADD_PARTNERS'; payload: string }
  | { type: 'REMOVE_PARTNERS'; payload: number }
  | { type: 'DISCUSSION_ASSESSMENT'; payload: DiscussionTypesEnum }
  | { type: 'PROTOCOL_ASSESSMENT'; payload: ProtocolAssessmentEnum }

export type teachersAidMachineContext = {
  // courseSelectCurrentId: string
  courseInfo: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo
  studentId: string
  courseSelectVisible: boolean
  protocols: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities[]
  protocolSelect: number
  selectedProtocol: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities
  protocolToCreate: CreateProtocolInput
  presentStudentsIds: string[]
  studentProtocolAssessment: AssessStudentProtocolInput
}

export const teachersAidMachine = Machine<
  teachersAidMachineContext,
  teachersAidMachineSchema,
  teachersAidMachineEvent
>({
  id: 'teachersAid',
  initial: 'teachersAid',
  type: 'parallel',
  context: {
    // courseSelectCurrentId: '',
    courseSelectVisible: true,
    courseInfo: {
      __typename: 'CourseInfo',
      _id: '',
      assignedSeats: [],
      endsAt: '',
      course: {
        __typename: 'Course',
        _id: '',
        name: '',
      },
      schoolDayType: SchoolDayType.A,
      startsAt: '',
    },
    presentStudentsIds: [],
    studentId: '',
    protocols: [],
    protocolSelect: 0,
    selectedProtocol: {
      __typename: 'TextSectionProtocols',
      academicOutcomeTypes: AcademicOutomeTypes.LOGIC_BUILDING,
      activityType: ProtocolActivityTypes.INDIVIDUAL,
      task: '',
      isActive: false,
      completed: false,
    },
    protocolToCreate: {
      academicOutcomeType: AcademicOutomeTypes.LOGIC_BUILDING,
      markingPeriod: MarkingPeriodEnum.FIRST,
      protocolActivityType: ProtocolActivityTypes.INDIVIDUAL,
      studentIds: [],
      task: '',
    },
    studentProtocolAssessment: {
      studentId: '',
      assessment: ProtocolAssessmentEnum.REFUSED_TO_WORK,
      task: '',
      assignedDate: '',
      discussionLevel: DiscussionTypesEnum.NOT_REQUIRED,
      partnerIds: null,
      protocolActivityType: ProtocolActivityTypes.INDIVIDUAL,
    },
  },
  states: {
    teachersAid: {
      on: {
        SET_COURSE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseInfo: evt.payload,
              courseSelectVisible: false,
            }
          }),
        },
        SET_STUDENT_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentId: evt.payload,
            }
          }),
        },
        COURSE_SELECT: {
          actions: assign((ctx) => {
            return {
              ...ctx,
              courseSelectVisible: !ctx.courseSelectVisible,
            }
          }),
        },
        LOAD_PROTOCOLS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              protocols: evt.payload,
            }
          }),
        },
        SET_PRESENT_STUDENTS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              presentStudentsIds: evt.payload,
            }
          }),
        },
      },
    },
    controlPanelActions: {
      initial: 'dynamicLesson',
      states: {
        dynamicLesson: {
          on: {
            NEXT: 'protocolManager',
          },
        },
        protocolManager: {
          on: {
            NEXT: 'dynamicLesson',
            LOAD_PROTOCOLS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  protocols: evt.payload,
                }
              }),
            },
            SELECT_PROTOCOL: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  protocolSelect: evt.payload,
                  selectedProtocol: ctx.protocols[evt.payload],
                }
              }),
            },
            UPDATE_LESSON_PROTOCOL: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  selectedProtocol: evt.payload,
                }
              }),
            },
          },
        },
      },
    },
    studentControlPanel: {
      initial: 'studentBehavior',
      states: {
        studentBehavior: {
          on: {
            ASSESS_PROTOCOL_DISPLAY: 'studentProtocol',
            UPDATE_STUDENT_PROTOCOL: {
              actions: assign((ctx, evt) => {
                console.log(evt.payload)
                return {
                  ...ctx,
                  studentProtocolAssessment: evt.payload,
                }
              }),
            },
          },
        },
        studentAttendance: {
          on: {
            ASSESS_PROTOCOL_DISPLAY: 'studentProtocol',
          },
        },
        studentProtocol: {
          on: {
            ASSESS_PROTOCOL_DISPLAY: 'studentProtocol',
            UPDATE_STUDENT_PROTOCOL: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  studentProtocolAssessment: evt.payload,
                }
              }),
            },
            ADD_PARTNERS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  studentProtocolAssessment: {
                    ...ctx.studentProtocolAssessment,
                    partnerIds: [
                      ...ctx.studentProtocolAssessment.partnerIds,
                      evt.payload,
                    ],
                  },
                }
              }),
            },
            REMOVE_PARTNERS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  studentProtocolAssessment: {
                    ...ctx.studentProtocolAssessment,
                    partnerIds: [
                      ...ctx.studentProtocolAssessment.partnerIds?.slice(
                        0,
                        evt.payload
                      ),
                      ...ctx.studentProtocolAssessment.partnerIds?.slice(
                        evt.payload + 1
                      ),
                    ],
                  },
                }
              }),
            },
            DISCUSSION_ASSESSMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  studentProtocolAssessment: {
                    ...ctx.studentProtocolAssessment,
                    discussionLevel: evt.payload,
                  },
                }
              }),
            },
            PROTOCOL_ASSESSMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  studentProtocolAssessment: {
                    ...ctx.studentProtocolAssessment,
                    assessment: evt.payload,
                  },
                }
              }),
            },
          },
        },
      },
    },
  },
})

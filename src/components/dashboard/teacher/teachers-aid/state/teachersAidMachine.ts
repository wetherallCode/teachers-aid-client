import { Machine, assign } from 'xstate'
import {
  findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo,
  SchoolDayType,
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities,
  AcademicOutcomeTypes,
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
        mainScreenManager: {}
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
  | { type: 'SEATING_CHART' }
  | {
      type: 'SET_COURSE'
      payload: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo
    }
  | { type: 'SET_LESSON_ID'; payload: string }
  | { type: 'SET_STUDENT_ID'; payload: string }
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
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
  | { type: 'CHANGE_MAIN_SCREEN_SEATING_CHART' }
  | { type: 'CHANGE_MAIN_SCREEN_VIRTUAL_ATTENDANCE' }
  | { type: 'CHANGE_MAIN_SCREEN_VIRTUAL_PROTOCOL_RESPONSES' }
  | { type: 'CHANGE_MAIN_SCREEN_VIRTUAL_QUESTION_VIEWER' }
  | { type: 'CHANGE_MAIN_SCREEN_HOMEWORK_ASSIGNER' }

export type teachersAidMachineContext = {
  // courseSelectCurrentId: string
  courseInfo: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo
  associatedLessonId: string
  studentId: string
  courseSelectVisible: boolean
  protocols: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities[]
  protocolSelect: number
  selectedProtocol: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities
  protocolToCreate: CreateProtocolInput
  presentStudentsIds: string[]
  activeProtocol: boolean
  studentProtocolAssessment: AssessStudentProtocolInput
  mainScreenSeatingChart: boolean
  mainScreenVirtualAttendance: boolean
  mainScreenVirtualProtocolResponses: boolean
  mainScreenVirtualQuestionViewer: boolean
  mainScreenHomeworkAssigner: boolean
  currentMainScreenView:
    | 'SEATING_CHART'
    | 'QUESTIONS'
    | 'PROTOCOL_RESPONSES'
    | 'VIRTUAL_ATTENDANCE'
    | 'HOMEWORK'
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
    associatedLessonId: '',
    courseInfo: {
      __typename: 'CourseInfo',
      _id: '',
      assignedSeats: [],
      cohortBasedSeating: false,
      endsAt: '',
      course: {
        __typename: 'Course',
        _id: '',
        name: '',
        hasStudents: [],
      },
      schoolDayType: SchoolDayType.A,
      startsAt: '',
    },
    activeProtocol: false,
    presentStudentsIds: [],
    studentId: '',
    protocols: [],
    protocolSelect: 0,
    selectedProtocol: {
      __typename: 'TextSectionProtocols',
      academicOutcomeTypes: AcademicOutcomeTypes.LOGIC_BUILDING,
      activityType: ProtocolActivityTypes.INDIVIDUAL,
      task: '',
      isActive: false,
      completed: false,
    },
    protocolToCreate: {
      academicOutcomeType: AcademicOutcomeTypes.LOGIC_BUILDING,
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
      markingPeriod: MarkingPeriodEnum.FIRST,
    },
    mainScreenSeatingChart: true,
    mainScreenVirtualAttendance: false,
    mainScreenVirtualProtocolResponses: false,
    mainScreenVirtualQuestionViewer: false,
    mainScreenHomeworkAssigner: false,
    currentMainScreenView: 'SEATING_CHART',
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
        SET_LESSON_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              associatedLessonId: evt.payload,
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
        mainScreenManager: {
          on: {
            PREVIOUS: 'protocolManager',
            NEXT: 'dynamicLesson',
            SET_LESSON_ID: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  associatedLessonId: evt.payload,
                }
              }),
            },
            CHANGE_MAIN_SCREEN_SEATING_CHART: {
              actions: assign((ctx) => {
                return {
                  ...ctx,
                  mainScreenSeatingChart: true,
                  mainScreenVirtualAttendance: false,
                  mainScreenVirtualProtocolResponses: false,
                  mainScreenVirtualQuestionViewer: false,
                  mainScreenHomeworkAssigner: false,
                  currentMainScreenView: 'SEATING_CHART',
                }
              }),
            },
            CHANGE_MAIN_SCREEN_VIRTUAL_ATTENDANCE: {
              actions: assign((ctx) => {
                return {
                  ...ctx,
                  mainScreenSeatingChart: false,
                  mainScreenVirtualAttendance: true,
                  mainScreenVirtualProtocolResponses: false,
                  mainScreenVirtualQuestionViewer: false,
                  mainScreenHomeworkAssigner: false,
                  currentMainScreenView: 'VIRTUAL_ATTENDANCE',
                }
              }),
            },
            CHANGE_MAIN_SCREEN_VIRTUAL_PROTOCOL_RESPONSES: {
              actions: assign((ctx) => {
                return {
                  ...ctx,
                  mainScreenSeatingChart: false,
                  mainScreenVirtualAttendance: false,
                  mainScreenVirtualProtocolResponses: true,
                  mainScreenVirtualQuestionViewer: false,
                  mainScreenHomeworkAssigner: false,
                  currentMainScreenView: 'PROTOCOL_RESPONSES',
                }
              }),
            },
            CHANGE_MAIN_SCREEN_VIRTUAL_QUESTION_VIEWER: {
              actions: assign((ctx) => {
                return {
                  ...ctx,
                  mainScreenSeatingChart: false,
                  mainScreenVirtualAttendance: false,
                  mainScreenVirtualProtocolResponses: false,
                  mainScreenVirtualQuestionViewer: true,
                  mainScreenHomeworkAssigner: false,
                  currentMainScreenView: 'QUESTIONS',
                }
              }),
            },
            CHANGE_MAIN_SCREEN_HOMEWORK_ASSIGNER: {
              actions: assign((ctx) => {
                return {
                  ...ctx,
                  mainScreenSeatingChart: false,
                  mainScreenVirtualAttendance: false,
                  mainScreenVirtualProtocolResponses: false,
                  mainScreenVirtualQuestionViewer: false,
                  mainScreenHomeworkAssigner: true,
                  currentMainScreenView: 'HOMEWORK',
                }
              }),
            },
          },
        },
        dynamicLesson: {
          on: {
            PREVIOUS: 'mainScreenManager',
            NEXT: 'protocolManager',
          },
        },
        protocolManager: {
          on: {
            PREVIOUS: 'dynamicLesson',
            NEXT: 'mainScreenManager',
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
            CHANGE_MAIN_SCREEN_SEATING_CHART: {
              actions: assign((ctx, evt) => {
                console.log('change')
                return {
                  ...ctx,
                  mainScreenSeatingChart: true,
                  mainScreenVirtualAttendance: false,
                  mainScreenVirtualProtocolResponses: false,
                  mainScreenVirtualQuestionViewer: false,
                  currentMainScreenView: 'SEATING_CHART',
                }
              }),
            },
            CHANGE_MAIN_SCREEN_VIRTUAL_PROTOCOL_RESPONSES: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  mainScreenSeatingChart: false,
                  mainScreenVirtualAttendance: false,
                  mainScreenVirtualProtocolResponses: true,
                  mainScreenVirtualQuestionViewer: false,
                  currentMainScreenView: 'PROTOCOL_RESPONSES',
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
                      ...ctx.studentProtocolAssessment.partnerIds!,
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
                      )!,
                      ...ctx.studentProtocolAssessment.partnerIds?.slice(
                        evt.payload + 1
                      )!,
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

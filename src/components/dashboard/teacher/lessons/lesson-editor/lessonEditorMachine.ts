import { Machine, assign } from 'xstate'
import {
  MarkingPeriodEnum,
  TextSectionVocabInput,
  TextSectionProtocolsInput,
  AcademicOutcomeTypes,
  ProtocolActivityTypes,
  TextSectionQuestionsInput,
} from '../../../../../schemaTypes'
// import { LessonEditor } from './LessonEditor'

export type lessonEditorMachineSchema = {
  states: {
    lesson: {
      states: {
        unit: {}
        lessonSelect: {}
      }
    }
    editor: {
      states: {
        info: {}
        sectionSelect: {
          states: {
            setSections: {}
          }
        }
      }
    }
  }
}
export type lessonEditorMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SECTION_SELECT' }
  | { type: 'SET_COURSE_ID'; payload: string }
  | { type: 'SET_LESSON_ID'; payload: string }
  | { type: 'SET_UNIT'; payload: string }
  | { type: 'SET_ASSIGNED_DATE'; payload: string }
  | { type: 'SET_MARKING_PERIOD'; payload: MarkingPeriodEnum }
  | { type: 'SET_SECTION_ID_LIST'; payload: string[] }
  | { type: 'SET_TEMPORARY_SECTION_ID_LIST'; payload: string }
  | { type: 'SET_STARTING_SECTION'; payload: string }
  | { type: 'SET_ENDING_SECTION'; payload: string }
  | { type: 'SET_STARTING_PAGE'; payload: number }
  | { type: 'SET_ENDING_PAGE'; payload: number }
  | { type: 'ASSIGN_TO_COURSES'; payload: string[] }
  | { type: 'SET_VOCAB_LIST'; payload: TextSectionVocabInput[] }
  | { type: 'SET_PROTOCOL_LIST'; payload: TextSectionProtocolsInput[] }
  | { type: 'SET_BEFORE_ACTIVITY'; payload: TextSectionProtocolsInput }
  | { type: 'SET_DURING_ACTIVITY'; payload: TextSectionProtocolsInput[] }
  | { type: 'SET_AFTER_ACTIVITY'; payload: TextSectionProtocolsInput }
  | { type: 'SET_QUESTION_LIST'; payload: TextSectionQuestionsInput[] }
  | { type: 'SET_ESSENTIAL_QUESTION'; payload: string }
  | { type: 'SET_LESSON_NAME'; payload: string }
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'SET_CHAPTER'; payload: string }

export type lessonEditorMachineContext = {
  courseId: string
  lessonId: string
  assignedDate: string
  inUnit: string
  assignedMarkingPeriod: MarkingPeriodEnum
  assignedSectionIdList: string[]
  textSectionList: string[]
  texSectionListHeaders: string[]
  chapter: string
  text: string
  startingSection: string
  endingSection: string
  startingPage: number
  endingPage: number
  courses: string[]
  vocabList: TextSectionVocabInput[]
  protocolList: TextSectionProtocolsInput[]
  beforeActivity: TextSectionProtocolsInput
  duringActivity: TextSectionProtocolsInput[]
  afterActivity: TextSectionProtocolsInput
  questionList: TextSectionQuestionsInput[]
  essentialQuestion: string
  lessonName: string
}

export const lessonEditorMachine = Machine<
  lessonEditorMachineContext,
  lessonEditorMachineSchema,
  lessonEditorMachineEvent
>({
  id: 'lessonEditor',
  initial: 'lesson',
  context: {
    // this will change when you select a course from nav menu
    courseId: '',
    lessonName: '',
    lessonId: '',
    assignedDate: '',
    inUnit: '',
    assignedMarkingPeriod: MarkingPeriodEnum.FIRST,
    text: '',
    chapter: '',
    startingSection: '',
    endingSection: '',
    assignedSectionIdList: [],
    textSectionList: [],
    texSectionListHeaders: [],
    startingPage: 0,
    endingPage: 0,
    courses: [],
    vocabList: [],
    beforeActivity: {
      academicOutcomeTypes: AcademicOutcomeTypes.LOGIC_BUILDING,
      activityType: ProtocolActivityTypes.INDIVIDUAL,
      task: '',
      isActive: false,
      completed: false,
    },
    duringActivity: [],
    afterActivity: {
      academicOutcomeTypes: AcademicOutcomeTypes.LOGIC_BUILDING,
      activityType: ProtocolActivityTypes.INDIVIDUAL,
      task: '',
      isActive: false,
      completed: false,
    },
    protocolList: [],
    questionList: [],
    essentialQuestion: '',
  },
  states: {
    lesson: {
      initial: 'unit',
      states: {
        unit: {
          on: {
            SET_COURSE_ID: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  courseId: evt.payload,
                }
              }),
            },
            NEXT: 'lessonSelect',
          },
        },
        lessonSelect: {
          on: {
            NEXT: '#lessonEditor.editor',
            PREVIOUS: 'unit',
            SET_LESSON_ID: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  lessonId: evt.payload,
                }
              }),
            },
          },
        },
      },
    },
    editor: {
      initial: 'info',
      states: {
        info: {
          on: {
            PREVIOUS: '#lessonEditor.lesson.lessonSelect',
            SECTION_SELECT: 'sectionSelect',
            SET_LESSON_NAME: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  lessonName: evt.payload,
                }
              }),
            },
            SET_ASSIGNED_DATE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  assignedDate: evt.payload,
                }
              }),
            },
            SET_UNIT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  inUnit: evt.payload,
                }
              }),
            },
            SET_MARKING_PERIOD: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  assignedMarkingPeriod: evt.payload,
                }
              }),
            },
            SET_SECTION_ID_LIST: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  assignedSectionIdList: evt.payload,
                }
              }),
            },
            SET_STARTING_SECTION: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  startingSection: evt.payload,
                }
              }),
            },
            SET_ENDING_SECTION: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  endingSection: evt.payload,
                }
              }),
            },
            SET_STARTING_PAGE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  startingPage: evt.payload,
                }
              }),
            },
            SET_ENDING_PAGE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  endingPage: evt.payload,
                }
              }),
            },
            ASSIGN_TO_COURSES: {
              actions: assign((ctx, evt) => {
                console.log('assigned')
                return {
                  ...ctx,
                  courses: evt.payload,
                }
              }),
            },
            SET_VOCAB_LIST: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  vocabList: evt.payload,
                }
              }),
            },
            SET_BEFORE_ACTIVITY: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  beforeActivity: evt.payload,
                }
              }),
            },
            SET_DURING_ACTIVITY: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  duringActivity: evt.payload,
                }
              }),
            },
            SET_AFTER_ACTIVITY: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  afterActivity: evt.payload,
                }
              }),
            },
            SET_QUESTION_LIST: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  questionList: evt.payload,
                }
              }),
            },
            SET_ESSENTIAL_QUESTION: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essentialQuestion: evt.payload,
                }
              }),
            },
          },
        },
        sectionSelect: {
          initial: 'setSections',
          states: {
            setSections: {
              on: {
                PREVIOUS: '#lessonEditor.editor.info',
                SET_TEXT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      text: evt.payload,
                    }
                  }),
                },
                SET_CHAPTER: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      chapter: evt.payload,
                    }
                  }),
                },
                SET_TEMPORARY_SECTION_ID_LIST: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      textSectionList: [...ctx.textSectionList, evt.payload],
                    }
                  }),
                },
                SET_SECTION_ID_LIST: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      assignedSectionIdList: evt.payload,
                    }
                  }),
                },
                SET_STARTING_PAGE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      startingPage: evt.payload,
                    }
                  }),
                },
                SET_ENDING_PAGE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      endingPage: evt.payload,
                    }
                  }),
                },
                SET_VOCAB_LIST: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      vocabList: evt.payload,
                    }
                  }),
                },
                SET_QUESTION_LIST: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      questionList: evt.payload,
                    }
                  }),
                },
                SET_PROTOCOL_LIST: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      protocolList: evt.payload,
                    }
                  }),
                },
                SET_STARTING_SECTION: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      startingSection: evt.payload,
                    }
                  }),
                },
                SET_ENDING_SECTION: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      endingSection: evt.payload,
                    }
                  }),
                },
              },
            },
          },
        },
      },
    },
  },
})

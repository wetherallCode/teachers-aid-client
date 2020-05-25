import { Machine, assign } from 'xstate'
import {
  TextSectionVocabInput,
  TextSectionProtocolsInput,
  AcademicOutomeTypes,
  ProtocolActivityTypes,
  TextSectionQuestionsInput,
  QuestionTypeEnum,
} from '../../../../../schemaTypes'

export type lessonPlannerMachineSchema = {
  states: {
    date: {}
    sections: {
      states: {
        text: {}
        chapter: {}
        sectionList: {}
      }
    }
    lessonInfo: {}
    courses: {}
    createLesson: {}
  }
}
export type lessonPlannerMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_DATE'; payload: any }
  | { type: 'SET_TEXT_TITLE'; payload: string }
  | { type: 'SET_CHAPTER_ID'; payload: string }
  | { type: 'SET_CHAPTER_TITLE'; payload: string }
  | { type: 'SET_CURRENT_SECTION'; payload: string[] }
  | { type: 'ADD_SECTIONS'; payload: string[] }
  | { type: 'SET_STARTING_SECTION'; payload: string }
  | { type: 'SET_ENDING_SECTION'; payload: string }
  | { type: 'SET_VOCAB_LIST'; payload: TextSectionVocabInput }
  | { type: 'SET_BEFORE_ACTIVITY'; payload: TextSectionProtocolsInput }
  | { type: 'SET_DURING_ACTIVITY'; payload: TextSectionProtocolsInput[] }
  | { type: 'SET_AFTER_ACTIVITY'; payload: TextSectionProtocolsInput }
  | { type: 'SET_QUESTIONS_LIST'; payload: TextSectionQuestionsInput }
  | { type: 'SET_ESSENTIAL_QUESTION'; payload: TextSectionQuestionsInput }
  | { type: 'ASSIGN_TO_COURSES'; payload: string[] }

export type lessonPlannerMachineContext = {
  date: any
  fromText: string
  fromChapterTitle: string
  fromChapterId: string
  currentSection: string[]
  textSectionList: string[]
  texSectionListHeaders: string[]
  startingSection: string
  endingSection: string
  vocabList: TextSectionVocabInput[]
  beforeActivity: TextSectionProtocolsInput
  duringActivity: TextSectionProtocolsInput[]
  afterActivity: TextSectionProtocolsInput
  questionList: TextSectionQuestionsInput[]
  essentialQuestion: TextSectionQuestionsInput
  courses: string[]
}

export const lessonPlannerMachine = Machine<
  lessonPlannerMachineContext,
  lessonPlannerMachineSchema,
  lessonPlannerMachineEvent
>({
  id: 'lessonPlanner',
  initial: 'date',
  context: {
    date: '',
    fromText: '',
    fromChapterId: '',
    fromChapterTitle: '',
    currentSection: [],
    textSectionList: [],
    texSectionListHeaders: [],
    startingSection: '',
    endingSection: '',
    vocabList: [],
    beforeActivity: {
      academicOutcomeTypes: AcademicOutomeTypes.LOGIC_BUILDING,
      activityType: ProtocolActivityTypes.INDIVIDUAL,
      task: '',
    },
    duringActivity: [],
    afterActivity: {
      academicOutcomeTypes: AcademicOutomeTypes.LOGIC_BUILDING,
      activityType: ProtocolActivityTypes.INDIVIDUAL,
      task: '',
    },
    questionList: [],
    essentialQuestion: {
      question: '',
      questionType: QuestionTypeEnum.HOW_PROBLEM_SOLUTION,
    },
    courses: [],
  },

  states: {
    date: {
      on: {
        NEXT: 'sections',
        SET_DATE: {
          actions: assign((ctx, evt) => {
            return { ...ctx, date: evt.payload }
          }),
        },
      },
    },
    sections: {
      initial: 'text',
      states: {
        text: {
          on: {
            NEXT: 'chapter',
            SET_TEXT_TITLE: {
              actions: assign((ctx, evt) => {
                return { ...ctx, fromText: evt.payload }
              }),
            },
          },
        },
        chapter: {
          on: {
            PREVIOUS: 'text',
            NEXT: 'sectionList',
            SET_CHAPTER_ID: {
              actions: assign((ctx, evt) => {
                return { ...ctx, fromChapterId: evt.payload }
              }),
            },
            SET_CHAPTER_TITLE: {
              actions: assign((ctx, evt) => {
                return { ...ctx, fromChapterTitle: evt.payload }
              }),
            },
          },
        },
        sectionList: {
          on: {
            PREVIOUS: 'chapter',
            NEXT: '#lessonPlanner.lessonInfo',
            SET_CURRENT_SECTION: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  currentSection: [evt.payload[0], evt.payload[1]],
                }
              }),
            },
            ADD_SECTIONS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  textSectionList: [...ctx.textSectionList, evt.payload[0]],
                  texSectionListHeaders: [
                    ...ctx.texSectionListHeaders,
                    evt.payload[1],
                  ],
                }
              }),
            },
            SET_STARTING_SECTION: {
              actions: assign((ctx, evt) => {
                return { ...ctx, startingSection: evt.payload }
              }),
            },
            SET_ENDING_SECTION: {
              actions: assign((ctx, evt) => {
                return { ...ctx, endingSection: evt.payload }
              }),
            },
          },
        },
      },
    },
    lessonInfo: {
      on: {
        PREVIOUS: 'sections',
        NEXT: 'courses',
        SET_VOCAB_LIST: {
          actions: assign((ctx, evt) => {
            return { ...ctx, vocabList: [...ctx.vocabList, evt.payload] }
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
        SET_QUESTIONS_LIST: {
          actions: assign((ctx, evt) => {
            return { ...ctx, questionList: [...ctx.questionList, evt.payload] }
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
    courses: {
      on: {
        PREVIOUS: 'lessonInfo',
        NEXT: 'createLesson',
        ASSIGN_TO_COURSES: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courses: evt.payload,
            }
          }),
        },
      },
    },
    createLesson: {
      on: {
        PREVIOUS: 'courses',
      },
    },
  },
})

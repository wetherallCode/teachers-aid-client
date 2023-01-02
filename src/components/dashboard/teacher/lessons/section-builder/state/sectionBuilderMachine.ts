import { Machine, assign } from 'xstate'
import {
  TextSectionProtocolsInput,
  TextSectionQuestionsInput,
  TextSectionVocabInput,
  PageNumbersInput,
} from '../../../../../../schemaTypes'

export type sectionBuilderMachineSchema = {
  states: {
    text: {}
    chapter: {}
    header: {}
    pages: {}
    vocab: {}
    questions: {}
    protocols: {}
    create: {}
  }
}

export type sectionBuilderMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'COMPLETE' }
  | { type: 'SET_TEXT_TITLE'; textTitle: string }
  | { type: 'SET_CHAPTER_ID'; payload: string }
  | { type: 'SET_CHAPTER_TITLE'; payload: string }
  | { type: 'SET_HEADER'; header: string }
  | { type: 'SET_PAGE_NUMBERS'; payload: PageNumbersInput }
  | { type: 'SET_VOCAB_LIST'; payload: TextSectionVocabInput }
  | { type: 'SET_QUESTIONS_LIST'; payload: TextSectionQuestionsInput }
  | { type: 'SET_PROTOCOLS_LIST'; payload: TextSectionProtocolsInput }
  | { type: 'RESET_SECTION' }

export type sectionBuilderMachineContext = {
  fromText: string
  fromChapterTitle: string
  fromChapterId: string
  hasProtocols: TextSectionProtocolsInput[]
  hasQuestions: TextSectionQuestionsInput[]
  hasVocab: TextSectionVocabInput[]
  header: string
  pageNumbers: PageNumbersInput
  numberOfParagraphs: number
}

export const sectionBuilderMachine = Machine<
  sectionBuilderMachineContext,
  sectionBuilderMachineSchema,
  sectionBuilderMachineEvent
>({
  id: 'sectionBuilder',
  initial: 'text',
  context: {
    fromText: '',
    fromChapterId: '',
    fromChapterTitle: '',
    header: '',
    pageNumbers: {
      startingPage: 0,
      endingPage: 0,
    },
    hasProtocols: [],
    hasQuestions: [],
    hasVocab: [],
    numberOfParagraphs: 0,
  },
  states: {
    text: {
      on: {
        NEXT: {
          target: 'chapter',
          cond: (context) => context.fromText !== '',
        },
        SET_TEXT_TITLE: {
          actions: assign({
            fromText: (context, event) => (context.fromText = event.textTitle),
          }),
        },
      },
    },
    chapter: {
      on: {
        NEXT: {
          target: 'header',
          cond: (context) => context.fromChapterId !== '',
        },
        PREVIOUS: 'text',
        SET_CHAPTER_ID: {
          actions: assign({
            fromChapterId: (context, event) =>
              (context.fromChapterId = event.payload),
          }),
        },
        SET_CHAPTER_TITLE: {
          actions: assign({
            fromChapterTitle: (context, event) =>
              (context.fromChapterTitle = event.payload),
          }),
        },
      },
    },
    header: {
      on: {
        NEXT: 'pages',
        PREVIOUS: 'chapter',
        SET_HEADER: {
          actions: assign({
            header: (context, event) => (context.header = event.header),
          }),
        },
      },
    },
    pages: {
      on: {
        NEXT: 'vocab',
        PREVIOUS: 'header',
        SET_PAGE_NUMBERS: {
          actions: assign({
            pageNumbers: (context, event) => {
              return (context.pageNumbers = event.payload)
            },
          }),
        },
      },
    },
    vocab: {
      on: {
        NEXT: 'questions',
        PREVIOUS: 'pages',
        SET_VOCAB_LIST: {
          actions: assign({
            hasVocab: (context, event) => {
              console.log(event.payload)
              return [...context.hasVocab, event.payload]
            },
          }),
        },
      },
    },
    questions: {
      on: {
        NEXT: 'protocols',
        PREVIOUS: 'vocab',
        SET_QUESTIONS_LIST: {
          actions: assign({
            hasQuestions: (context, event) => [
              ...context.hasQuestions,
              event.payload,
            ],
          }),
        },
      },
    },
    protocols: {
      on: {
        PREVIOUS: 'questions',
        NEXT: 'create',
        SET_PROTOCOLS_LIST: {
          actions: assign({
            hasProtocols: (context, event) => [
              ...context.hasProtocols,
              event.payload,
            ],
          }),
        },
      },
    },
    create: {
      on: {
        PREVIOUS: 'protocols',
        COMPLETE: 'text',
        RESET_SECTION: {
          actions: assign((ctx) => {
            return {
              ...ctx,
              fromText: '',
              fromChapterId: '',
              fromChapterTitle: '',
              header: '',
              pageNumbers: {
                startingPage: 0,
                endingPage: 0,
              },
              hasProtocols: [],
              hasQuestions: [],
              hasVocab: [],
            }
          }),
        },
      },
    },
  },
})

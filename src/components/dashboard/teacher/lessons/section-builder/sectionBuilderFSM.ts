import { Machine } from 'xstate'

export const sectionBuilderFSM = Machine({
  id: 'sectionBuilder',
  initial: 'text',
  states: {
    text: {
      on: { NEXT: 'chapter' },
    },
    chapter: { on: { NEXT: 'header', PREVIOUS: 'text' } },
    header: { on: { NEXT: 'pages', PREVIOUS: 'chapter' } },
    pages: { on: { NEXT: 'vocab', PREVIOUS: 'header' } },
    vocab: { on: { NEXT: 'questions', PREVIOUS: 'pages' } },
    questions: { on: { NEXT: 'protocols', PREVIOUS: 'vocab' } },
    protocols: { on: { PREVIOUS: 'questions' } },
  },
})

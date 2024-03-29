import { Machine, assign } from 'xstate'
import {
  UpdateReadingGuideInput,
  // InformationStructureEnum,
  SubmitReadingGuideInput,
} from '../../../../../../schemaTypes'

export type readingGuideToCompleteMachineSchema = {
  states: {
    questions: {}
    // clarifyingQuestions: {}
  }
}
export type readingGuideToCompleteMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_READING_GUIDE_ID'; payload: string }
  | {
      type: 'SET_READING_GUIDE_PROPERTIES'
      keyName: string
      payload: string | string[]
    }

  // | { type: 'SET_HOW_IS_ORGANIZED'; payload: InformationStructureEnum[] }
  // | { type: 'SET_WHY_IS_ORGANIZED'; payload: string }
  // | { type: 'SET_MAJOR_ISSUE'; payload: string }
  // | { type: 'SET_MAJOR_ISSUE_SOLVED'; payload: boolean }
  // | { type: 'SET_MAJOR_SOLUTION'; payload: string }
  // | { type: 'SET_CLARIFYING_QUESTION'; payload: string[] }
  | {
      type: 'SET_HELP'
      payload:
        | 'general'
        | 'problems'
        | 'biggestProblem'
        | 'reasonForBiggestProblem'
        | 'importantPeople'
        | 'howArePeopleInvolvedInProblems'
        | 'sectionConsequences'
    }
  | { type: 'SET_HELP_DISPLAY' }
  | { type: 'SET_VOCAB_DISPLAY' }
  | { type: 'SET_READING_GUIDE_INPUTS'; payload: UpdateReadingGuideInput }
  | { type: 'SET_PROBLEM_LIST'; payload: string[] }
  | { type: 'REMOVE_PROBLEM'; payload: number }
  | { type: 'SET_IMPORTANT_PEOPLE_LIST'; payload: string[] }
  | { type: 'REMOVE_IMPORTANT_PEOPLE'; payload: number }

export type readingGuideToCompleteMachineContext = {
  updateReadingGuideInputs: UpdateReadingGuideInput
  submitReadingGuideInputs: SubmitReadingGuideInput
  help: // | 'howIsSectionOrganized'
  // | 'whyWasSectionOrganized'
  // | 'majorIssue'
  // | 'majorIssueSolved'
  // | 'majorSolution'
  // | 'clarifyingQuestions'
  | 'general'
    | 'problems'
    | 'biggestProblem'
    | 'reasonForBiggestProblem'
    | 'importantPeople'
    | 'howArePeopleInvolvedInProblems'
    | 'sectionConsequences'
  helpDisplay: boolean
  vocabDisplay: boolean
  problemList: string[]
  importantPeopleList: string[]
}

export const readingGuideToCompleteMachine = Machine<
  readingGuideToCompleteMachineContext,
  readingGuideToCompleteMachineSchema,
  readingGuideToCompleteMachineEvent
>({
  id: 'readingGuideToComplete',
  initial: 'questions',
  context: {
    updateReadingGuideInputs: {
      readingGuideId: '',
      // howIsSectionOrganized: [],
      // whyWasSectionOrganized: '',
      // majorIssue: '',
      // majorIssueSolved: true,
      // majorSolution: '',
      // clarifyingQuestions: [],
      // problems: [],
      // biggestProblem: '',
      // reasonForBiggestProblem: '',
      // importantPeople: [],
      // howArePeopleInvolvedInProblems: '',
      // sectionConsequences: '',
    },
    submitReadingGuideInputs: {
      readingGuideId: '',
      late: true,
      submitTime: new Date().toLocaleString(),
      paperBased: false,
      responsibilityPoints: 10,
    },
    help: 'general',
    helpDisplay: true,
    vocabDisplay: false,
    problemList: [],
    importantPeopleList: [],
  },
  states: {
    questions: {
      on: {
        // NEXT: 'clarifyingQuestions',
        SET_READING_GUIDE_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateReadingGuideInputs: {
                ...ctx.updateReadingGuideInputs,
                readingGuideId: evt.payload,
              },
              submitReadingGuideInputs: {
                ...ctx.submitReadingGuideInputs,
                readingGuideId: evt.payload,
              },
            }
          }),
        },
        SET_READING_GUIDE_INPUTS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateReadingGuideInputs: evt.payload,
            }
          }),
        },
        SET_READING_GUIDE_PROPERTIES: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateReadingGuideInputs: {
                ...ctx.updateReadingGuideInputs,
                [evt.keyName]: evt.payload,
              },
            }
          }),
        },
        SET_PROBLEM_LIST: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateReadingGuideInputs: {
                ...ctx.updateReadingGuideInputs,
                problems: evt.payload,
              },
            }
          }),
        },
        // REMOVE_PROBLEM: {
        //   actions: assign((ctx, evt) => {
        //     const problemList = [
        //       ...ctx.updateReadingGuideInputs.problems.slice(0, evt.payload),
        //       ...ctx.updateReadingGuideInputs.problems.slice(evt.payload + 1),
        //     ]
        //     return {
        //       ...ctx,
        //       updateReadingGuideInputs: {
        //         ...ctx.updateReadingGuideInputs,
        //         problems: problemList,
        //       },
        //     }
        //   }),
        // },
        SET_IMPORTANT_PEOPLE_LIST: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              updateReadingGuideInputs: {
                ...ctx.updateReadingGuideInputs,
                importantPeople: evt.payload,
              },
            }
          }),
        },
        // REMOVE_IMPORTANT_PEOPLE: {
        //   actions: assign((ctx, evt) => {
        //     const importantPersonList = [
        //       ...ctx.updateReadingGuideInputs.importantPeople.slice(
        //         0,
        //         evt.payload
        //       ),
        //       ...ctx.updateReadingGuideInputs.importantPeople.slice(
        //         evt.payload + 1
        //       ),
        //     ]
        //     return {
        //       ...ctx,
        //       updateReadingGuideInputs: {
        //         ...ctx.updateReadingGuideInputs,
        //         importantPeople: importantPersonList,
        //       },
        //     }
        //   }),
        // },
        // SET_HOW_IS_ORGANIZED: {
        //   actions: assign((ctx, evt) => {
        //     return {
        //       ...ctx,
        //       updateReadingGuideInputs: {
        //         ...ctx.updateReadingGuideInputs,
        //         howIsSectionOrganized: evt.payload,
        //       },
        //     }
        //   }),
        // },
        // SET_WHY_IS_ORGANIZED: {
        //   actions: assign((ctx, evt) => {
        //     return {
        //       ...ctx,
        //       updateReadingGuideInputs: {
        //         ...ctx.updateReadingGuideInputs,
        //         whyWasSectionOrganized: evt.payload,
        //       },
        //     }
        //   }),
        // },
        // SET_MAJOR_ISSUE: {
        //   actions: assign((ctx, evt) => {
        //     return {
        //       ...ctx,
        //       updateReadingGuideInputs: {
        //         ...ctx.updateReadingGuideInputs,
        //         majorIssue: evt.payload,
        //       },
        //     }
        //   }),
        // },
        // SET_MAJOR_ISSUE_SOLVED: {
        //   actions: assign((ctx, evt) => {
        //     return {
        //       ...ctx,
        //       updateReadingGuideInputs: {
        //         ...ctx.updateReadingGuideInputs,
        //         majorIssueSolved: evt.payload,
        //       },
        //     }
        //   }),
        // },
        // SET_MAJOR_SOLUTION: {
        //   actions: assign((ctx, evt) => {
        //     return {
        //       ...ctx,
        //       updateReadingGuideInputs: {
        //         ...ctx.updateReadingGuideInputs,
        //         majorSolution: evt.payload,
        //       },
        //     }
        //   }),
        // },

        SET_HELP: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              help: evt.payload,
            }
          }),
        },
        SET_HELP_DISPLAY: {
          actions: assign((ctx) => {
            return {
              ...ctx,
              helpDisplay: true,
              vocabDisplay: false,
            }
          }),
        },
        SET_VOCAB_DISPLAY: {
          actions: assign((ctx) => {
            return {
              ...ctx,
              helpDisplay: false,
              vocabDisplay: true,
            }
          }),
        },
      },
    },
    // clarifyingQuestions: {
    //   on: {
    //     PREVIOUS: 'questions',
    //     SET_CLARIFYING_QUESTION: {
    //       actions: assign((ctx, evt) => {
    //         return {
    //           ...ctx,
    //           updateReadingGuideInputs: {
    //             ...ctx.updateReadingGuideInputs,
    //             clarifyingQuestions: evt.payload,
    //           },
    //         }
    //       }),
    //     },
    //     SET_HELP: {
    //       actions: assign((ctx, evt) => {
    //         return {
    //           ...ctx,
    //           help: evt.payload,
    //         }
    //       }),
    //     },
    //     SET_HELP_DISPLAY: {
    //       actions: assign((ctx) => {
    //         return {
    //           ...ctx,
    //           helpDisplay: true,
    //           vocabDisplay: false,
    //         }
    //       }),
    //     },
    //     SET_VOCAB_DISPLAY: {
    //       actions: assign((ctx) => {
    //         return {
    //           ...ctx,
    //           helpDisplay: false,
    //           vocabDisplay: true,
    //         }
    //       }),
    //     },
    //   },
    // },
  },
})

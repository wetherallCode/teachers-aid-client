import { Machine, assign } from 'xstate'
import {
  WritingLevelEnum,
  BasicQuestionEnum,
  DevelopingSentenceStructureInput,
  AcademicSentenceStructureInput,
  QuestionTypeEnum,
  AdvancedSentenceStructureInput,
} from '../../../../../../../schemaTypes'

export type studentEssayMachineSchema = {
  states: {
    info: {}
    organizers: {
      states: {
        transition: {}
        developingOrganizer: {
          states: {
            loading: {}
            identifications: {}
            restatement: {}
            answer: {}
            conclusion: {}
          }
        }
        academicOrganizer: {
          states: {
            loading: {}
            identifications: {}
            restatement: {}
            answer: {
              states: {
                questionType: {}
                transition: {}
                problemSolution: {}
                whyCauseEffect: {}
                howCauseEffect: {}
              }
            }
            conclusion: {}
          }
        }
        advancedOrganizer: {
          states: {
            loading: {}
            restatement: {}
            answer: {
              states: {
                questionType: {}
                transition: {}
                problemSolution: {}
                whyCauseEffect: {}
                howCauseEffect: {}
              }
            }
            conclusion: {}
          }
        }
      }
    }
    workingDraft: {}
  }
}
export type studentEssayMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'ORGANIZER' }
  | { type: 'ANSWER' }
  | { type: 'RESTATEMENT' }
  | { type: 'SET_ESSAY_ID'; payload: string }
  | { type: 'SET_WRITING_LEVEL'; payload: WritingLevelEnum }
  | { type: 'SET_RESTATEMENT'; payload: string }
  | { type: 'SET_CONCLUSION'; payload: string }
  | { type: 'SET_BASIC_QUESTION_TYPE'; payload: BasicQuestionEnum }
  | { type: 'SET_FULL_QUESTION_TYPE'; payload: QuestionTypeEnum }
  | {
      type: 'SET_DEVELOPING_SENTENCE_STRUCTURE'
      payload: DevelopingSentenceStructureInput
    }
  | { type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_SUBJECT'; payload: string }
  | { type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_VERB'; payload: string }
  | {
      type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_OBJECT'
      payload: string | null | null
    }
  | {
      type: 'SET_DEVELOPING_SENTENCE_STRUCTURE_SUBJECT_COMPLIMENT'
      payload: string
    }
  | { type: 'SET_ANSWER'; payload: string }
  | {
      type: 'SET_ACADEMIC_SENTENCE_STRUCTURE'
      payload: AcademicSentenceStructureInput
    }
  | {
      type: 'SET_ADVANCED_SENTENCE_STRUCTURE'
      payload: AdvancedSentenceStructureInput
    }
  | { type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_SUBJECT'; payload: string }
  | { type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_VERB'; payload: string }
  | { type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_OBJECT'; payload: string | null }
  | {
      type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_SUBJECT_COMPLIMENT'
      payload: string | null
    }
  | { type: 'SET_ADVANCED_SENTENCE_STRUCTURE_SUBJECT'; payload: string }
  | { type: 'SET_ADVANCED_SENTENCE_STRUCTURE_VERB'; payload: string }
  | { type: 'SET_ADVANCED_SENTENCE_STRUCTURE_OBJECT'; payload: string | null }
  | {
      type: 'SET_ADVANCED_SENTENCE_STRUCTURE_SUBJECT_COMPLIMENT'
      payload: string | null
    }
  | {
      type: 'SET_PROBLEM_SOLUTION'
      payload: {
        problem: string
        reasonForProblem: string
        solvedBy: string
        whySolutionSolved: string
      }
    }
  | {
      type: 'SET_HOW_CAUSE_EFFECT'
      payload: {
        before: string
        cause: string
        after: string
      }
    }
  | {
      type: 'SET_WHY_CAUSE_EFFECT'
      payload: {
        proximateCause: string
        ultimateCause: string
      }
    }
  | {
      type: 'SET_WHY_CAUSE_EFFECT'
      payload: { proximateCause: string; ultimateCause: string }
    }
  | {
      type: 'SET_HOW_CAUSE_EFFECT'
      payload: { before: string; cause: string; after: string }
    }
  | { type: 'SET_QUESTION_TYPE'; payload: string }
  | { type: 'SET_DRAFT'; payload: string }
  | { type: 'SET_LATE'; payload: boolean }
  | { type: 'SET_PRE_LOADED'; payload: boolean }
  | { type: 'SET_HELP_DISPLAY' }
  | { type: 'SET_VOCAB_DISPLAY' }
  | { type: 'SET_RUBRIC_DISPLAY' }

export type studentEssayMachineContext = {
  essayId: string
  writingLevel: WritingLevelEnum
  developingOrganizer: {
    questionType: BasicQuestionEnum
    developingSentenceStructure: {
      subject: string
      verb: string
      object?: string | null
      subjectCompliment?: string | null
    }
    restatement: string
    answer: string
    conclusion: string
  }
  academicOrganizer: {
    questionType: QuestionTypeEnum | null
    academicSentenceStructure: {
      subject: string
      verb: string
      object?: string | null
      subjectCompliment?: string | null
    }
    restatement: string
    answer: {
      preLoaded: boolean
      problemSolution: {
        problem: string
        reasonForProblem: string
        solvedBy: string
        whySolutionSolved: string
      }
      howCauseEffect: {
        before: string
        cause: string
        after: string
      }
      whyCauseEffect: {
        ultimateCause: string
        proximateCause: string
      }
    }
    conclusion: string
  }
  advancedOrganizer: {
    questionType: QuestionTypeEnum
    advancedSentenceStructure: {
      subject: string
      verb: string
      object?: string | null
      subjectCompliment?: string | null
    }
    restatement: string
    answer: {
      preLoaded: boolean
      problemSolution: {
        problem: string
        reasonForProblem: string
        solvedBy: string
        whySolutionSolved: string
      }
      howCauseEffect: {
        before: string
        cause: string
        after: string
      }
      whyCauseEffect: {
        ultimateCause: string
        proximateCause: string
      }
    }
    conclusion: string
  }
  draftToUpdate: string
  isLate: boolean
  helpDisplay: boolean
  vocabDisplay: boolean
  rubricDisplay: boolean
}

export const studentEssayMachine = Machine<
  studentEssayMachineContext,
  studentEssayMachineSchema,
  studentEssayMachineEvent
>({
  id: 'studentEssay',
  initial: 'info',
  context: {
    essayId: '',
    writingLevel: WritingLevelEnum.DEVELOPING,
    developingOrganizer: {
      questionType: BasicQuestionEnum.HOW,
      developingSentenceStructure: {
        subject: '',
        verb: '',
        object: null,
        subjectCompliment: null,
      },
      restatement: '',
      answer: '',
      conclusion: '',
    },
    academicOrganizer: {
      questionType: null,
      academicSentenceStructure: {
        subject: '',
        verb: '',
        object: null,
        subjectCompliment: null,
      },
      restatement: '',
      answer: {
        preLoaded: false,
        problemSolution: {
          problem: '',
          reasonForProblem: '',
          solvedBy: '',
          whySolutionSolved: '',
        },
        howCauseEffect: {
          before: '',
          cause: '',
          after: '',
        },
        whyCauseEffect: {
          ultimateCause: '',
          proximateCause: '',
        },
      },
      conclusion: '',
    },
    advancedOrganizer: {
      questionType: QuestionTypeEnum.HOW_PROBLEM_SOLUTION,
      advancedSentenceStructure: {
        subject: '',
        verb: '',
        object: null,
        subjectCompliment: null,
      },
      restatement: '',
      answer: {
        preLoaded: false,
        problemSolution: {
          problem: '',
          reasonForProblem: '',
          solvedBy: '',
          whySolutionSolved: '',
        },
        howCauseEffect: {
          before: '',
          cause: '',
          after: '',
        },
        whyCauseEffect: {
          ultimateCause: '',
          proximateCause: '',
        },
      },
      conclusion: '',
    },
    draftToUpdate: '',
    isLate: false,
    helpDisplay: true,
    vocabDisplay: false,
    rubricDisplay: false,
  },
  states: {
    info: {
      on: {
        SET_ESSAY_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              essayId: evt.payload,
            }
          }),
        },
        SET_WRITING_LEVEL: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              writingLevel: evt.payload,
            }
          }),
        },
        SET_DRAFT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              draftToUpdate: evt.payload,
            }
          }),
        },
        ORGANIZER: 'organizers',
      },
    },
    organizers: {
      initial: 'transition',
      states: {
        transition: {
          always: [
            {
              target: 'developingOrganizer',
              cond: (ctx) => ctx.writingLevel === 'DEVELOPING',
            },
            {
              target: 'academicOrganizer',
              cond: (ctx) => ctx.writingLevel === 'ACADEMIC',
            },
            {
              target: 'advancedOrganizer',
              cond: (ctx) => ctx.writingLevel === 'ADVANCED',
            },
          ],
        },
        developingOrganizer: {
          initial: 'loading',
          states: {
            loading: {
              on: {
                NEXT: 'identifications',
                SET_BASIC_QUESTION_TYPE: {
                  actions: assign((ctx, evt) => {
                    console.log(evt.payload)
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        questionType: evt.payload,
                      },
                    }
                  }),
                },
                SET_DEVELOPING_SENTENCE_STRUCTURE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        developingSentenceStructure: evt.payload!,
                      },
                    }
                  }),
                },
                SET_RESTATEMENT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        restatement: evt.payload,
                      },
                    }
                  }),
                },
                SET_ANSWER: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        answer: evt.payload,
                      },
                    }
                  }),
                },
                SET_CONCLUSION: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        conclusion: evt.payload,
                      },
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
            identifications: {
              on: {
                RESTATEMENT: 'restatement',
                ANSWER: 'answer',
                SET_BASIC_QUESTION_TYPE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        questionType: evt.payload,
                      },
                    }
                  }),
                },
                SET_DEVELOPING_SENTENCE_STRUCTURE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        developingSentenceStructure: evt.payload,
                      },
                    }
                  }),
                },
                SET_DEVELOPING_SENTENCE_STRUCTURE_SUBJECT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        developingSentenceStructure: {
                          ...ctx.developingOrganizer
                            .developingSentenceStructure,
                          subject: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_DEVELOPING_SENTENCE_STRUCTURE_VERB: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        developingSentenceStructure: {
                          ...ctx.developingOrganizer
                            .developingSentenceStructure,
                          verb: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_DEVELOPING_SENTENCE_STRUCTURE_OBJECT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        developingSentenceStructure: {
                          ...ctx.developingOrganizer
                            .developingSentenceStructure,
                          object: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_DEVELOPING_SENTENCE_STRUCTURE_SUBJECT_COMPLIMENT: {
                  actions: assign((ctx, evt) => {
                    console.log(evt.payload)
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        developingSentenceStructure: {
                          ...ctx.developingOrganizer
                            .developingSentenceStructure,
                          subjectCompliment: evt.payload,
                        },
                      },
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
            restatement: {
              on: {
                PREVIOUS: 'identifications',
                NEXT: 'answer',
                SET_DEVELOPING_SENTENCE_STRUCTURE_SUBJECT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        developingSentenceStructure: {
                          ...ctx.developingOrganizer
                            .developingSentenceStructure,
                          subject: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_DEVELOPING_SENTENCE_STRUCTURE_VERB: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        developingSentenceStructure: {
                          ...ctx.developingOrganizer
                            .developingSentenceStructure,
                          verb: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_DEVELOPING_SENTENCE_STRUCTURE_OBJECT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        developingSentenceStructure: {
                          ...ctx.developingOrganizer
                            .developingSentenceStructure,
                          object: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_DEVELOPING_SENTENCE_STRUCTURE_SUBJECT_COMPLIMENT: {
                  actions: assign((ctx, evt) => {
                    console.log(evt.payload)
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        developingSentenceStructure: {
                          ...ctx.developingOrganizer
                            .developingSentenceStructure,
                          subjectCompliment: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_BASIC_QUESTION_TYPE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        questionType: evt.payload,
                      },
                    }
                  }),
                },
                SET_RESTATEMENT: {
                  actions: assign((ctx, evt) => {
                    console.log(evt.payload)
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        restatement: evt.payload,
                      },
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
            answer: {
              on: {
                PREVIOUS: 'restatement',
                NEXT: 'conclusion',
                SET_ANSWER: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        answer: evt.payload,
                      },
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
            conclusion: {
              on: {
                PREVIOUS: 'answer',
                NEXT: '#studentEssay.workingDraft',
                SET_CONCLUSION: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      developingOrganizer: {
                        ...ctx.developingOrganizer,
                        conclusion: evt.payload,
                      },
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
          },
        },
        academicOrganizer: {
          initial: 'loading',
          states: {
            loading: {
              on: {
                NEXT: 'identifications',
                // RESTATEMENT: 'restatement',
                // ANSWER: 'answer',
                SET_ACADEMIC_SENTENCE_STRUCTURE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        academicSentenceStructure: {
                          ...evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_RESTATEMENT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        restatement: evt.payload,
                      },
                    }
                  }),
                },
                SET_FULL_QUESTION_TYPE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        questionType: evt.payload,
                      },
                    }
                  }),
                },
                SET_PRE_LOADED: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        answer: {
                          ...ctx.academicOrganizer.answer,
                          preLoaded: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_PROBLEM_SOLUTION: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        answer: {
                          ...ctx.academicOrganizer.answer,
                          problemSolution: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_HOW_CAUSE_EFFECT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        answer: {
                          ...ctx.academicOrganizer.answer,
                          howCauseEffect: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_WHY_CAUSE_EFFECT: {
                  actions: assign((ctx, evt) => {
                    console.log('step 1')
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        answer: {
                          ...ctx.academicOrganizer.answer,
                          whyCauseEffect: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_CONCLUSION: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        conclusion: evt.payload,
                      },
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
            identifications: {
              on: {
                RESTATEMENT: 'restatement',
                ANSWER: 'answer',
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
            restatement: {
              on: {
                NEXT: 'answer',
                SET_ACADEMIC_SENTENCE_STRUCTURE_SUBJECT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        academicSentenceStructure: {
                          ...ctx.academicOrganizer.academicSentenceStructure,
                          subject: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_ACADEMIC_SENTENCE_STRUCTURE_VERB: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        academicSentenceStructure: {
                          ...ctx.academicOrganizer.academicSentenceStructure,
                          verb: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_ACADEMIC_SENTENCE_STRUCTURE_OBJECT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        academicSentenceStructure: {
                          ...ctx.academicOrganizer.academicSentenceStructure,
                          object: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_FULL_QUESTION_TYPE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        questionType: evt.payload,
                      },
                    }
                  }),
                },
                SET_RESTATEMENT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        restatement: evt.payload,
                      },
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
            answer: {
              initial: 'transition',
              states: {
                questionType: {
                  on: {
                    NEXT: 'transition',
                    PREVIOUS:
                      '#studentEssay.organizers.academicOrganizer.restatement',
                    SET_FULL_QUESTION_TYPE: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          academicOrganizer: {
                            ...ctx.academicOrganizer,
                            questionType: evt.payload,
                          },
                        }
                      }),
                    },
                    SET_RESTATEMENT: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          academicOrganizer: {
                            ...ctx.academicOrganizer,
                            restatement: evt.payload,
                          },
                        }
                      }),
                    },
                    SET_PRE_LOADED: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          academicOrganizer: {
                            ...ctx.academicOrganizer,
                            answer: {
                              ...ctx.academicOrganizer.answer,
                              preLoaded: evt.payload,
                            },
                          },
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
                transition: {
                  always: [
                    {
                      target: 'problemSolution',
                      cond: (ctx) =>
                        ctx.academicOrganizer.questionType ===
                        'HOW_PROBLEM_SOLUTION',
                    },
                    {
                      target: 'howCauseEffect',
                      cond: (ctx) =>
                        ctx.academicOrganizer.questionType ===
                        'HOW_CAUSE_EFFECT',
                    },
                    {
                      target: 'whyCauseEffect',
                      cond: (ctx) =>
                        ctx.academicOrganizer.questionType ===
                        'WHY_CAUSE_EFFECT',
                    },
                  ],
                },
                problemSolution: {
                  on: {
                    PREVIOUS:
                      '#studentEssay.organizers.academicOrganizer.answer.questionType',
                    NEXT: '#studentEssay.organizers.academicOrganizer.conclusion',
                    SET_PROBLEM_SOLUTION: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          academicOrganizer: {
                            ...ctx.academicOrganizer,
                            answer: {
                              ...ctx.academicOrganizer.answer,
                              problemSolution: evt.payload,
                            },
                          },
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
                whyCauseEffect: {
                  on: {
                    PREVIOUS:
                      '#studentEssay.organizers.academicOrganizer.answer.questionType',
                    NEXT: '#studentEssay.organizers.academicOrganizer.conclusion',
                    SET_WHY_CAUSE_EFFECT: {
                      actions: assign((ctx, evt) => {
                        console.log(ctx.academicOrganizer.answer.whyCauseEffect)
                        return {
                          ...ctx,
                          academicOrganizer: {
                            ...ctx.academicOrganizer,
                            answer: {
                              ...ctx.academicOrganizer.answer,
                              whyCauseEffect: evt.payload,
                            },
                          },
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
                howCauseEffect: {
                  on: {
                    PREVIOUS:
                      '#studentEssay.organizers.academicOrganizer.answer.questionType',
                    NEXT: '#studentEssay.organizers.academicOrganizer.conclusion',
                    SET_HOW_CAUSE_EFFECT: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          academicOrganizer: {
                            ...ctx.academicOrganizer,
                            answer: {
                              ...ctx.academicOrganizer.answer,
                              howCauseEffect: evt.payload,
                            },
                          },
                        }
                      }),
                    },
                    SET_PRE_LOADED: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          academicOrganizer: {
                            ...ctx.academicOrganizer,
                            answer: {
                              ...ctx.academicOrganizer.answer,
                              preLoaded: evt.payload,
                            },
                          },
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
              },
            },
            conclusion: {
              on: {
                PREVIOUS: 'answer',
                NEXT: '#studentEssay.workingDraft',
                SET_CONCLUSION: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      academicOrganizer: {
                        ...ctx.academicOrganizer,
                        conclusion: evt.payload,
                      },
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
          },
        },
        advancedOrganizer: {
          initial: 'loading',
          states: {
            loading: {
              on: {
                NEXT: 'restatement',
                SET_ADVANCED_SENTENCE_STRUCTURE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        advancedSentenceStructure: {
                          ...evt.payload,
                          object: evt.payload.object!,
                        },
                      },
                    }
                  }),
                },
                SET_RESTATEMENT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        restatement: evt.payload,
                      },
                    }
                  }),
                },
                SET_FULL_QUESTION_TYPE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        questionType: evt.payload,
                      },
                    }
                  }),
                },
                SET_PRE_LOADED: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        answer: {
                          ...ctx.advancedOrganizer.answer,
                          preLoaded: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_PROBLEM_SOLUTION: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        answer: {
                          ...ctx.advancedOrganizer.answer,
                          problemSolution: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_HOW_CAUSE_EFFECT: {
                  actions: assign((ctx, evt) => {
                    console.log(evt.payload)
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        answer: {
                          ...ctx.advancedOrganizer.answer,
                          howCauseEffect: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_WHY_CAUSE_EFFECT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        answer: {
                          ...ctx.advancedOrganizer.answer,
                          whyCauseEffect: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_CONCLUSION: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        conclusion: evt.payload,
                      },
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
            restatement: {
              on: {
                NEXT: 'answer',
                SET_ADVANCED_SENTENCE_STRUCTURE_SUBJECT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        advancedSentenceStructure: {
                          ...ctx.advancedOrganizer.advancedSentenceStructure,
                          subject: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_ADVANCED_SENTENCE_STRUCTURE_VERB: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        advancedSentenceStructure: {
                          ...ctx.advancedOrganizer.advancedSentenceStructure,
                          verb: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_ADVANCED_SENTENCE_STRUCTURE_OBJECT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        advancedSentenceStructure: {
                          ...ctx.advancedOrganizer.advancedSentenceStructure,
                          object: evt.payload,
                        },
                      },
                    }
                  }),
                },
                SET_RESTATEMENT: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        restatement: evt.payload,
                      },
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
            answer: {
              initial: 'questionType',
              states: {
                questionType: {
                  on: {
                    NEXT: 'transition',
                    SET_FULL_QUESTION_TYPE: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          advancedOrganizer: {
                            ...ctx.advancedOrganizer,
                            questionType: evt.payload,
                          },
                        }
                      }),
                    },
                    SET_RESTATEMENT: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          advancedOrganizer: {
                            ...ctx.advancedOrganizer,
                            restatement: evt.payload,
                          },
                        }
                      }),
                    },
                    SET_PRE_LOADED: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          advancedOrganizer: {
                            ...ctx.advancedOrganizer,
                            answer: {
                              ...ctx.advancedOrganizer.answer,
                              preLoaded: evt.payload,
                            },
                          },
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
                transition: {
                  always: [
                    {
                      target: 'problemSolution',
                      cond: (ctx) =>
                        ctx.advancedOrganizer.questionType ===
                        'HOW_PROBLEM_SOLUTION',
                    },
                    {
                      target: 'howCauseEffect',
                      cond: (ctx) =>
                        ctx.advancedOrganizer.questionType ===
                        'HOW_CAUSE_EFFECT',
                    },
                    {
                      target: 'whyCauseEffect',
                      cond: (ctx) =>
                        ctx.advancedOrganizer.questionType ===
                        'WHY_CAUSE_EFFECT',
                    },
                  ],
                },
                problemSolution: {
                  on: {
                    PREVIOUS:
                      '#studentEssay.organizers.advancedOrganizer.answer.questionType',
                    NEXT: '#studentEssay.organizers.advancedOrganizer.conclusion',
                    SET_PROBLEM_SOLUTION: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          advancedOrganizer: {
                            ...ctx.advancedOrganizer,
                            answer: {
                              ...ctx.advancedOrganizer.answer,
                              problemSolution: evt.payload,
                            },
                          },
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
                whyCauseEffect: {
                  on: {
                    PREVIOUS:
                      '#studentEssay.organizers.advancedOrganizer.answer.questionType',
                    NEXT: '#studentEssay.organizers.advancedOrganizer.conclusion',
                    SET_WHY_CAUSE_EFFECT: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          advancedOrganizer: {
                            ...ctx.advancedOrganizer,
                            answer: {
                              ...ctx.advancedOrganizer.answer,
                              whyCauseEffect: evt.payload,
                            },
                          },
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
                howCauseEffect: {
                  on: {
                    PREVIOUS:
                      '#studentEssay.organizers.advancedOrganizer.answer.questionType',
                    NEXT: '#studentEssay.organizers.advancedOrganizer.conclusion',
                    SET_HOW_CAUSE_EFFECT: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          advancedOrganizer: {
                            ...ctx.advancedOrganizer,
                            answer: {
                              ...ctx.advancedOrganizer.answer,
                              howCauseEffect: evt.payload,
                            },
                          },
                        }
                      }),
                    },
                    SET_PRE_LOADED: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          advancedOrganizer: {
                            ...ctx.advancedOrganizer,
                            answer: {
                              ...ctx.advancedOrganizer.answer,
                              preLoaded: evt.payload,
                            },
                          },
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
              },
            },
            conclusion: {
              on: {
                PREVIOUS: 'answer',
                NEXT: '#studentEssay.workingDraft',
                SET_CONCLUSION: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      advancedOrganizer: {
                        ...ctx.advancedOrganizer,
                        conclusion: evt.payload,
                      },
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
          },
        },
      },
    },
    workingDraft: {
      on: {
        PREVIOUS: '#studentEssay.organizers',
        SET_DRAFT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              draftToUpdate: evt.payload,
            }
          }),
        },
        SET_LATE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              isLate: evt.payload,
            }
          }),
        },
        SET_HELP_DISPLAY: {
          actions: assign((ctx) => {
            return {
              ...ctx,
              helpDisplay: true,
              vocabDisplay: false,
              rubricDisplay: false,
            }
          }),
        },
        SET_VOCAB_DISPLAY: {
          actions: assign((ctx) => {
            return {
              ...ctx,
              helpDisplay: false,
              vocabDisplay: true,
              rubricDisplay: false,
            }
          }),
        },
        SET_RUBRIC_DISPLAY: {
          actions: assign((ctx) => {
            return {
              ...ctx,
              helpDisplay: false,
              vocabDisplay: false,
              rubricDisplay: true,
            }
          }),
        },
      },
    },
  },
})

import { Machine, assign } from 'xstate'
import {
  QuestionTypeEnum,
  WritingLevelEnum,
  BasicQuestionEnum,
  DevelopingSentenceStructureInput,
  AcademicSentenceStructureInput,
  AdvancedSentenceStructureInput,
} from '../../../../../../../schemaTypes'

export type completedEssayMachineSchema = {
  states: {
    reviewEssay: {}
    reviewOrganizer: {
      states: {
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
      }
    }
    redoEssay: {}
  }
}
export type completedEssayMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'TRANSITION' }
  | { type: 'RESTATEMENT' }
  | { type: 'CONCLUSION' }
  | { type: 'ANSWER' }
  | { type: 'ESSAY' }
  | { type: 'IDENTIFICATIONS' }
  | { type: 'QUESTION_TYPE' }
  | { type: 'SET_DRAFT_NUMBER'; payload: number }
  | { type: 'ORGANIZER' }
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
  | { type: 'SET_ACADEMIC_SENTENCE_STRUCTURE_OBJECT'; payload: string }
  | { type: 'SET_ADVANCED_SENTENCE_STRUCTURE_SUBJECT'; payload: string }
  | { type: 'SET_ADVANCED_SENTENCE_STRUCTURE_VERB'; payload: string }
  | { type: 'SET_ADVANCED_SENTENCE_STRUCTURE_OBJECT'; payload: string }
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
  | { type: 'SET_TEXT_TO_SUBMIT'; payload: string }
  | { type: 'SET_ORGANIZER_VIEW'; payload: boolean }

export type completedEssayMachineContext = {
  draftNumber: number
  organizerView: boolean
  essayId: string
  writingLevel: WritingLevelEnum
  developingOrganizer: {
    questionType: BasicQuestionEnum
    developingSentenceStructure: { subject: string; verb: string }
    restatement: string
    answer: string
    conclusion: string
  }
  academicOrganizer: {
    questionType: QuestionTypeEnum
    academicSentenceStructure: {
      subject: string
      verb: string
      object: string | null
    }
    restatement: string
    answer: {
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
      object: string | null
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
  textToSubmit: string
}

export const completedEssayMachine = Machine<
  completedEssayMachineContext,
  completedEssayMachineSchema,
  completedEssayMachineEvent
>({
  id: 'completedEssay',
  initial: 'reviewEssay',
  context: {
    draftNumber: 0,
    organizerView: false,
    essayId: '',
    writingLevel: WritingLevelEnum.DEVELOPING,
    developingOrganizer: {
      questionType: BasicQuestionEnum.HOW,
      developingSentenceStructure: {
        subject: '',
        verb: '',
      },
      restatement: '',
      answer: '',
      conclusion: '',
    },
    academicOrganizer: {
      questionType: QuestionTypeEnum.HOW_PROBLEM_SOLUTION,
      academicSentenceStructure: {
        subject: '',
        verb: '',
        object: '',
      },
      restatement: '',
      answer: {
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
        object: '',
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
    textToSubmit: '',
  },
  states: {
    reviewEssay: {
      on: {
        NEXT: 'redoEssay',
        ORGANIZER: 'reviewOrganizer',
        SET_DRAFT_NUMBER: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              draftNumber: evt.payload,
            }
          }),
        },
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
      },
    },
    reviewOrganizer: {
      initial: 'organizers',
      states: {
        organizers: {
          initial: 'transition',
          states: {
            transition: {
              on: {
                '': [
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
            },
            developingOrganizer: {
              initial: 'loading',
              states: {
                loading: {
                  on: {
                    NEXT: 'identifications',
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
                  },
                },
                identifications: {
                  on: {
                    RESTATEMENT: 'restatement',
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
                  },
                },
                restatement: {
                  on: {
                    ANSWER: 'answer',
                    IDENTIFICATIONS: 'identifications',
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
                  },
                },
                answer: {
                  on: {
                    RESTATEMENT: 'restatement',
                    CONCLUSION: 'conclusion',
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
                  },
                },
                conclusion: {
                  on: {
                    ANSWER: 'answer',
                    ESSAY: '#completedEssay.redoEssay',
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
                  },
                },
              },
            },
            academicOrganizer: {
              initial: 'loading',
              // type: 'parallel',
              states: {
                loading: {
                  on: {
                    NEXT: 'restatement',
                    SET_ACADEMIC_SENTENCE_STRUCTURE: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          academicOrganizer: {
                            ...ctx.academicOrganizer,
                            academicSentenceStructure: {
                              ...evt.payload,
                              object: evt.payload.object!,
                            },
                          },
                        }
                      }),
                    },
                    SET_ACADEMIC_SENTENCE_STRUCTURE_SUBJECT: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          academicOrganizer: {
                            ...ctx.academicOrganizer,
                            academicSentenceStructure: {
                              ...ctx.academicOrganizer
                                .academicSentenceStructure,
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
                              ...ctx.academicOrganizer
                                .academicSentenceStructure,
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
                              ...ctx.academicOrganizer
                                .academicSentenceStructure,
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
                  },
                },
                restatement: {
                  on: {
                    ANSWER: 'answer',
                    SET_ACADEMIC_SENTENCE_STRUCTURE_SUBJECT: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          academicOrganizer: {
                            ...ctx.academicOrganizer,
                            academicSentenceStructure: {
                              ...ctx.academicOrganizer
                                .academicSentenceStructure,
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
                              ...ctx.academicOrganizer
                                .academicSentenceStructure,
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
                              ...ctx.academicOrganizer
                                .academicSentenceStructure,
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
                          academicOrganizer: {
                            ...ctx.academicOrganizer,
                            restatement: evt.payload,
                          },
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
                        TRANSITION: {
                          target: 'transition',
                          actions: assign((ctx, evt) => {
                            console.log(evt)
                            return {
                              ...ctx,
                            }
                          }),
                        },
                        RESTATEMENT:
                          '#completedEssay.reviewOrganizer.organizers.academicOrganizer.restatement',
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
                        // SET_PRE_LOADED: {
                        //   actions: assign((ctx, evt) => {
                        //     return {
                        //       ...ctx,
                        //       academicOrganizer: {
                        //         ...ctx.academicOrganizer,
                        //         answer: {
                        //           ...ctx.academicOrganizer.answer,
                        //           preLoaded: evt.payload,
                        //         },
                        //       },
                        //     }
                        //   }),
                        // },
                      },
                    },
                    transition: {
                      on: {
                        '': [
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
                    },
                    problemSolution: {
                      on: {
                        QUESTION_TYPE:
                          '#completedEssay.reviewOrganizer.organizers.academicOrganizer.answer.questionType',
                        CONCLUSION:
                          '#completedEssay.reviewOrganizer.organizers.academicOrganizer.conclusion',
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
                      },
                    },
                    whyCauseEffect: {
                      on: {
                        QUESTION_TYPE:
                          '#completedEssay.reviewOrganizer.organizers.academicOrganizer.answer.questionType',
                        CONCLUSION:
                          '#completedEssay.reviewOrganizer.organizers.academicOrganizer.conclusion',
                        SET_WHY_CAUSE_EFFECT: {
                          actions: assign((ctx, evt) => {
                            console.log(
                              ctx.academicOrganizer.answer.whyCauseEffect
                            )
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
                      },
                    },
                    howCauseEffect: {
                      on: {
                        QUESTION_TYPE:
                          '#completedEssay.reviewOrganizer.organizers.academicOrganizer.answer.questionType',
                        CONCLUSION:
                          '#completedEssay.reviewOrganizer.organizers.academicOrganizer.conclusion',
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
                        // SET_PRE_LOADED: {
                        //   actions: assign((ctx, evt) => {
                        //     return {
                        //       ...ctx,
                        //       academicOrganizer: {
                        //         ...ctx.academicOrganizer,
                        //         answer: {
                        //           ...ctx.academicOrganizer.answer,
                        //           preLoaded: evt.payload,
                        //         },
                        //       },
                        //     }
                        //   }),
                        // },
                      },
                    },
                  },
                },
                conclusion: {
                  on: {
                    ANSWER: 'answer',
                    ESSAY: '#completedEssay.redoEssay',
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
                    SET_ADVANCED_SENTENCE_STRUCTURE_SUBJECT: {
                      actions: assign((ctx, evt) => {
                        return {
                          ...ctx,
                          advancedOrganizer: {
                            ...ctx.advancedOrganizer,
                            advancedSentenceStructure: {
                              ...ctx.advancedOrganizer
                                .advancedSentenceStructure,
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
                              ...ctx.advancedOrganizer
                                .advancedSentenceStructure,
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
                              ...ctx.advancedOrganizer
                                .advancedSentenceStructure,
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
                              ...ctx.advancedOrganizer
                                .advancedSentenceStructure,
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
                              ...ctx.advancedOrganizer
                                .advancedSentenceStructure,
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
                              ...ctx.advancedOrganizer
                                .advancedSentenceStructure,
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
                        // SET_PRE_LOADED: {
                        //   actions: assign((ctx, evt) => {
                        //     return {
                        //       ...ctx,
                        //       advancedOrganizer: {
                        //         ...ctx.advancedOrganizer,
                        //         answer: {
                        //           ...ctx.advancedOrganizer.answer,
                        //           preLoaded: evt.payload,
                        //         },
                        //       },
                        //     }
                        //   }),
                        // },
                      },
                    },
                    transition: {
                      on: {
                        '': [
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
                    },
                    problemSolution: {
                      on: {
                        PREVIOUS:
                          '#completedEssay.reviewOrganizer.organizers.advancedOrganizer.answer.questionType',
                        NEXT:
                          '#completedEssay.reviewOrganizer.organizers.advancedOrganizer.conclusion',
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
                      },
                    },
                    whyCauseEffect: {
                      on: {
                        PREVIOUS:
                          '#completedEssay.reviewOrganizer.organizers.advancedOrganizer.answer.questionType',
                        NEXT:
                          '#completedEssay.reviewOrganizer.organizers.advancedOrganizer.conclusion',
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
                      },
                    },
                    howCauseEffect: {
                      on: {
                        PREVIOUS:
                          '#completedEssay.reviewOrganizer.organizers.advancedOrganizer.answer.questionType',
                        NEXT:
                          '#completedEssay.reviewOrganizer.organizers.advancedOrganizer.conclusion',
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
                        // SET_PRE_LOADED: {
                        //   actions: assign((ctx, evt) => {
                        //     return {
                        //       ...ctx,
                        //       advancedOrganizer: {
                        //         ...ctx.advancedOrganizer,
                        //         answer: {
                        //           ...ctx.advancedOrganizer.answer,
                        //           preLoaded: evt.payload,
                        //         },
                        //       },
                        //     }
                        //   }),
                        // },
                      },
                    },
                  },
                },
                conclusion: {
                  on: {
                    PREVIOUS: 'answer',
                    // NEXT: '#completedEssay.reviewOrganizer.workingDraft',
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
                  },
                },
              },
            },
          },
        },
      },
    },
    redoEssay: {
      on: {
        PREVIOUS: 'reviewEssay',
        ORGANIZER: 'reviewOrganizer',
        SET_DRAFT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              draftToUpdate: evt.payload,
            }
          }),
        },
        SET_TEXT_TO_SUBMIT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              textToSubmit: evt.payload,
            }
          }),
        },
      },
    },
  },
})

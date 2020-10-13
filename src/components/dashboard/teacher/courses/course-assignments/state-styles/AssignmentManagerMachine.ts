import { Machine, assign } from 'xstate'

export type AssignmentManagerMachineSchema = {
  states: {
    idle: {}
    responsibilityPoints: {}
    essays: {}
    articleReviews: {}
  }
}
export type AssignmentManagerMachineEvent =
  | { type: 'RESPONSIBILITY_POINTS' }
  | { type: 'ESSAYS' }
  | { type: 'ARTICLE_REVIEW' }

export type AssignmentManagerMachineContext = {}

export const AssignmentManagerMachine = Machine<
  AssignmentManagerMachineContext,
  AssignmentManagerMachineSchema,
  AssignmentManagerMachineEvent
>({
  id: 'AssignmentManager',
  initial: 'responsibilityPoints',
  context: {},
  //   type: 'parallel',
  states: {
    idle: {},
    responsibilityPoints: {},
    essays: {},
    articleReviews: {},
  },
})

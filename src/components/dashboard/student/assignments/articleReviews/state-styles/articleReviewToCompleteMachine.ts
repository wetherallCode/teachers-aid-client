import { Machine, assign } from 'xstate'
import { UpdateArticleReviewInput } from '../../../../../../schemaTypes'

export type articleReviewToCompleteMachineSchema = {
  states: {
    complete: {}
  }
}
export type articleReviewToCompleteMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_INPUTS'; payload: UpdateArticleReviewInput }
  | { type: 'SET_REVIEW_ID'; payload: string }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_AUTHOR'; payload: string }
  | { type: 'SET_LINK'; payload: string }
  | { type: 'SET_REVIEW_ID'; payload: string }
  | { type: 'SET_ISSUE'; payload: string }
  | { type: 'SET_PUBLISHED_DATE'; payload: string }
  | { type: 'SET_SOLUTIONS'; payload: string }
  | { type: 'SET_BIAS'; payload: boolean | null }
  | { type: 'SET_TOPICS_IMPORTANCE'; payload: string }

export type articleReviewToCompleteMachineContext = {
  articleReviewToComplete: UpdateArticleReviewInput
}

export const articleReviewToCompleteMachine = Machine<
  articleReviewToCompleteMachineContext,
  articleReviewToCompleteMachineSchema,
  articleReviewToCompleteMachineEvent
>({
  id: 'articleReviewToComplete',
  initial: 'complete',
  context: {
    articleReviewToComplete: {
      articleTitle: '',
      articleAuthor: '',
      articleLink: '',
      articleReviewId: '',
      issue: '',
      publishedDate: null,
      solutions: '',
      bias: null,
      topicsImportance: '',
    },
  },
  states: {
    complete: {
      on: {
        SET_INPUTS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToComplete: evt.payload,
            }
          }),
        },
        SET_REVIEW_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToComplete: {
                ...ctx.articleReviewToComplete,
                articleReviewId: evt.payload,
              },
            }
          }),
        },
        SET_TITLE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToComplete: {
                ...ctx.articleReviewToComplete,
                articleTitle: evt.payload,
              },
            }
          }),
        },
        SET_AUTHOR: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToComplete: {
                ...ctx.articleReviewToComplete,
                articleAuthor: evt.payload,
              },
            }
          }),
        },
        SET_LINK: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToComplete: {
                ...ctx.articleReviewToComplete,
                articleLink: evt.payload,
              },
            }
          }),
        },
        SET_ISSUE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToComplete: {
                ...ctx.articleReviewToComplete,
                issue: evt.payload,
              },
            }
          }),
        },
        SET_PUBLISHED_DATE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToComplete: {
                ...ctx.articleReviewToComplete,
                publishedDate: evt.payload,
              },
            }
          }),
        },
        SET_SOLUTIONS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToComplete: {
                ...ctx.articleReviewToComplete,
                solutions: evt.payload,
              },
            }
          }),
        },
        SET_BIAS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToComplete: {
                ...ctx.articleReviewToComplete,
                bias: evt.payload,
              },
            }
          }),
        },
        SET_TOPICS_IMPORTANCE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              articleReviewToComplete: {
                ...ctx.articleReviewToComplete,
                topicsImportance: evt.payload,
              },
            }
          }),
        },
      },
    },
  },
})

import React, { FC } from 'react'
import {
  AddCommentButton,
  AddCommentContainer,
  AddCommentInput,
  AdditionalCommentsContainer,
  AdditionalCommentTitle,
  Comments,
} from '../state-n-styles/EssaysToGradeStyles'
import { useGradeEssayContextProvider } from '../state-n-styles/GradeEssayContext'

export type AdditionalCommentsProps = {}

export const AdditionalComments: FC<AdditionalCommentsProps> = () => {
  const [state, event] = useGradeEssayContextProvider()
  return (
    <AdditionalCommentsContainer>
      <AdditionalCommentTitle>Additional Comments</AdditionalCommentTitle>
      <AddCommentContainer onSubmit={(e: any) => e.preventDefault()}>
        <AddCommentInput
          onChange={(e: any) =>
            event({ type: 'SET_COMMENT', payload: e.target.value })
          }
        />
        <AddCommentButton
          type="reset"
          onClick={() => {
            event({
              type: 'ADD_ADDITIONAL_COMMENT',
              payload: state.context.comment,
            })
            event({ type: 'RESET_COMMENT' })
          }}
        >
          Add Comment
        </AddCommentButton>
      </AddCommentContainer>
      <Comments>
        {state.context.draftToGrade.additionalComments!.map(
          (comment, i: number) => {
            return (
              <div key={i}>
                <span
                  onClick={() => event({ type: 'REMOVE_COMMENT', payload: i })}
                >
                  {comment}
                </span>
              </div>
            )
          },
        )}
      </Comments>
    </AdditionalCommentsContainer>
  )
}

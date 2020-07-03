import React, { FC } from 'react'
import { useGradeEssayContextProvider } from '../GradeEssayContext'

export type AdditionalCommentsProps = {}

export const AdditionalComments: FC<AdditionalCommentsProps> = () => {
  const [state, event] = useGradeEssayContextProvider()
  return (
    <>
      <form onSubmit={(e: any) => e.preventDefault()}>
        <div>Additional Comments</div>
        <input
          onChange={(e: any) =>
            event({ type: 'SET_COMMENT', payload: e.target.value })
          }
        />
        <button
          type='reset'
          onClick={() => {
            event({
              type: 'ADD_ADDITIONAL_COMMENT',
              payload: state.context.comment,
            })
            event({ type: 'RESET_COMMENT' })
          }}
        >
          Add Comment
        </button>
      </form>
      <div>
        {state.context.additionalComments.map((comment, i: number) => {
          return (
            <div key={i}>
              <span>{comment}</span>{' '}
              <span
                onClick={() => event({ type: 'REMOVE_COMMENT', payload: i })}
              >
                -
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}

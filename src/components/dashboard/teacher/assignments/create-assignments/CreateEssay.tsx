import React, { FC } from 'react'
import { gql } from '@apollo/client'

export type CreateEssayProps = {}

export const CREATE_ESSAY_MUTATION = gql`
  mutation createEssay($input: CreateEssayInput!) {
    createEssay(input: $input) {
      essays {
        _id
      }
    }
  }
`

export const CreateEssay: FC<CreateEssayProps> = () => {
  return (
    <>
      <div>Create Essay</div>
    </>
  )
}

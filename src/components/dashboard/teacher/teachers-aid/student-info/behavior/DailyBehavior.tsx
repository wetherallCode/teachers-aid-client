import { gql } from '@apollo/client'
import React from 'react'

export type DailyBehaviorProps = {}

export const CREATE_BEHAVIOR_MUTATION = gql`
  mutation createStudentBehavior($input: CreateStudentBehaviorInput!) {
    createStudentBehavior(input: $input) {
      studentBehavior {
        _id
      }
    }
  }
`

export const DailyBehavior = ({}: DailyBehaviorProps) => {
  return (
    <>
      <div></div>
    </>
  )
}

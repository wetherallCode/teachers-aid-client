import { gql, useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import {
  me_me,
  updateUserActive,
  updateUserActiveVariables,
} from '../../schemaTypes'

export type UpdateUserActivityProps = {
  userId: string
}

export const UPDATE_USER_ACTIVITY_MUTATION = gql`
  mutation updateUserActive($input: UpdateUserActiveInput!) {
    updateUserActive(input: $input) {
      updated
    }
  }
`

export const UpdateUserActivity = ({ userId }: UpdateUserActivityProps) => {
  const [updateUserActive] = useMutation<
    updateUserActive,
    updateUserActiveVariables
  >(UPDATE_USER_ACTIVITY_MUTATION, {
    // variables: { input: { userId, isActive: true } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['me'],
  })

  const onFocus = () => {
    updateUserActive({
      variables: { input: { userId, isActive: true } },
    })
  }
  const onBlur = () => {
    updateUserActive({
      variables: { input: { userId, isActive: false } },
    })
  }

  // const onResize = () => {
  //   activateQuiz({
  //     variables: {
  //       input: {
  //         activate: false,
  //         quizId: quizId,
  //       },
  //     },
  //   })
  // }
  const WindowFocusHandler = () => {
    // const width = window.innerWidth
    useEffect(() => {
      window.addEventListener('focus', onFocus)
      window.addEventListener('blur', onBlur)
      // window.addEventListener('resize', onResize)

      // Specify how to clean up after this effect:
      return () => {
        window.removeEventListener('focus', onFocus)
        window.removeEventListener('blur', onBlur)
        // window.removeEventListener('resize', onResize)
      }
    })

    return null
  }

  WindowFocusHandler()

  return null
}

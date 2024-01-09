import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useToggle } from '../../../../hooks'
import { resetPasswordVariables, resetPassword } from '../../../../schemaTypes'

export type ResetStudentPasswordProps = { userId: string }

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      user {
        _id
        firstName
      }
    }
  }
`

export const ResetStudentPassword = ({ userId }: ResetStudentPasswordProps) => {
  const [doubleCheckToggle, toggleDoubleCheck] = useToggle(false)
  const [resetPassword] = useMutation<resetPassword, resetPasswordVariables>(
    RESET_PASSWORD_MUTATION,
    {
      variables: { input: { userId } },
      onCompleted: (data) => console.log(data),
      refetchQueries: [],
    },
  )
  const handleReset = () => {
    resetPassword()
    toggleDoubleCheck()
  }

  return (
    <>
      <div>
        <div>Reset Student Id</div>
      </div>
      <div>
        {!doubleCheckToggle ? (
          <div>
            <button onClick={() => toggleDoubleCheck()}>Reset</button>
          </div>
        ) : (
          <div>
            <div>Are you sure?</div>
            <button onClick={() => toggleDoubleCheck()}>No</button>
            <button onClick={handleReset}>Yes</button>
          </div>
        )}
      </div>
    </>
  )
}

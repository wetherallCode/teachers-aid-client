import React, { FC, useState } from 'react'
import {
  me_me,
  changePassword,
  changePasswordVariables,
} from '../../schemaTypes'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router'

export type InitialPasswordChangeProps = { me: me_me }
export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      user {
        _id
      }
    }
  }
`
export const InitialPasswordChange: FC<InitialPasswordChangeProps> = ({
  me,
}) => {
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()
  const [changePassword] = useMutation<changePassword, changePasswordVariables>(
    CHANGE_PASSWORD_MUTATION,
    {
      variables: {
        input: { userName: me.userName, oldPassword: 'password', newPassword },
      },
      onCompleted: (data) => navigate('/'),
      refetchQueries: ['me'],
    }
  )
  return (
    <>
      <div>Change your password!</div>
      <input
        onChange={(e: any) => {
          if (e.target.value !== '') {
            setNewPassword(e.target.value)
          }
        }}
      />
      {newPassword && (
        <button
          onClick={() => {
            changePassword()
          }}
        >
          Accept New Password
        </button>
      )}
    </>
  )
}

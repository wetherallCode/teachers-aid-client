import React, { FC, useState } from 'react'
import {
  me_me,
  changePassword,
  changePasswordVariables,
} from '../../schemaTypes'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router'
import { AcceptNewPasswordButton, NewPasswordInpt } from './homeStyles'

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
  const [passwordDoubleCheck, setPasswordDoubleCheck] = useState('')
  const navigate = useNavigate()
  const [changePassword] = useMutation<changePassword, changePasswordVariables>(
    CHANGE_PASSWORD_MUTATION,
    {
      variables: {
        input: {
          userName: me.userName,
          oldPassword: 'password',
          newPassword: passwordDoubleCheck,
        },
      },
      onCompleted: (data) => navigate('/'),
      refetchQueries: ['me'],
    }
  )
  return (
    <>
      <div>Change your password!</div>
      <NewPasswordInpt
        type='password'
        onChange={(e: any) => {
          if (e.target.value !== '') {
            setNewPassword(e.target.value)
          }
        }}
      />
      <div>Type your password in again to double check!</div>
      <NewPasswordInpt
        type='password'
        onChange={(e: any) => {
          if (e.target.value !== '') {
            setPasswordDoubleCheck(e.target.value)
          }
        }}
      />
      {passwordDoubleCheck === newPassword && (
        <AcceptNewPasswordButton
          onClick={() => {
            changePassword()
          }}
        >
          Accept New Password
        </AcceptNewPasswordButton>
      )}
    </>
  )
}

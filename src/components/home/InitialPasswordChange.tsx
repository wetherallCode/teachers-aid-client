import React, { FC, useState } from 'react'
import {
  me_me,
  changePassword,
  changePasswordVariables,
} from '../../schemaTypes'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router'
import {
  AcceptNewPasswordButton,
  NewPasswordInput,
  PasswordChangeContainer,
  PasswordChangeItemContainers,
} from './homeStyles'

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
export const InitialPasswordChange = ({ me }: InitialPasswordChangeProps) => {
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
    <PasswordChangeContainer>
      <PasswordChangeItemContainers>
        <div>Change your password!</div>
        <NewPasswordInput
          type='password'
          autoFocus
          onChange={(e: any) => {
            if (e.target.value !== '') {
              setNewPassword(e.target.value)
            }
          }}
        />
      </PasswordChangeItemContainers>
      <PasswordChangeItemContainers>
        <div>Type your password in again to double check!</div>
        <NewPasswordInput
          type='password'
          onChange={(e: any) => {
            if (e.target.value !== '') {
              setPasswordDoubleCheck(e.target.value)
            }
          }}
        />
      </PasswordChangeItemContainers>
      {passwordDoubleCheck === newPassword ? (
        <PasswordChangeItemContainers>
          <AcceptNewPasswordButton
            onClick={() => {
              changePassword()
            }}
          >
            Accept New Password
          </AcceptNewPasswordButton>
        </PasswordChangeItemContainers>
      ) : (
        <PasswordChangeItemContainers>
          Passwords don't match
        </PasswordChangeItemContainers>
      )}
    </PasswordChangeContainer>
  )
}

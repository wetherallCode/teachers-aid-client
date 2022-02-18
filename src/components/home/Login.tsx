import React, { FC, useState, useEffect } from 'react'
import { useForm } from '../../hooks'

import { useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import {
  login,
  loginVariables,
  me_me,
  updateUserActiveVariables,
  updateUserActive,
} from '../../schemaTypes'

import {
  Button,
  LoginRow,
  LoginWrapper,
  LoginTitle,
  ButtonContainer,
} from './loginStyles'
import { useUserContextProvider } from '../../contexts/UserContext'
import { UPDATE_USER_ACTIVITY_MUTATION } from './UpdateUserActivity'

const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      user {
        _id
      }
    }
  }
`
export type LoginProps = {
  toggleLogin: () => void
}

export const Login = ({ toggleLogin }: LoginProps) => {
  const [values, handleChange] = useForm({ userName: '', password: '' })
  const [inValid, setInValid] = useState(false)
  const me: me_me = useUserContextProvider()

  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loginMutation, { error, data }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      variables: {
        input: { userName: values.userName, password: values.password },
      },
      refetchQueries: ['me'],

      onCompleted: (data) => {
        updateUserActive({
          variables: {
            input: { userId: data.login.user._id!, isActive: true },
          },
        })
        toggleLogin()
      },
      onError: () => {
        setInValid(true)
      },
    }
  )
  const [updateUserActive] = useMutation<
    updateUserActive,
    updateUserActiveVariables
  >(UPDATE_USER_ACTIVITY_MUTATION, {
    // variables: { input: { userId: me._id!, isActive: true } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['me'],
  })

  useEffect(() => {
    if (me && data) {
      toggleLogin()
      // navigate('dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, data])
  // useEffect(() => {
  //   if (me) {
  //     updateUserActive({
  //       variables: {
  //         input: { userId: me._id!, isActive: true },
  //       },
  //     })
  //   }
  // },[])

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <LoginWrapper>
      <form onSubmit={handleSubmit}>
        <LoginTitle>Login</LoginTitle>
        {inValid && (
          <div style={{ color: 'var(--red)' }}>Wrong UserName or Password</div>
        )}
        <LoginRow>
          <div>UserName: </div>
          <input
            type='text'
            name='userName'
            autoFocus
            value={values.userName}
            onChange={handleChange}
          />
        </LoginRow>
        <LoginRow>
          <div>Password: </div>
          <input
            name='password'
            type='password'
            value={values.password}
            onChange={handleChange}
          />
        </LoginRow>
        <ButtonContainer>
          <Button
            type='submit'
            onClick={() => {
              loginMutation()
            }}
          >
            Login
          </Button>
        </ButtonContainer>
      </form>
    </LoginWrapper>
  )
}

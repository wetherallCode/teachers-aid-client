import React, { FC, useState, useEffect } from 'react'
import { useForm } from '../../hooks'

import { useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { login, loginVariables, me_me } from '../../schemaTypes'

import {
  Button,
  LoginRow,
  LoginWrapper,
  LoginTitle,
  ButtonContainer,
} from './loginStyles'
import { useUserContextProvider } from '../../contexts/UserContext'

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

export const Login: FC<LoginProps> = ({ toggleLogin }) => {
  const [values, handleChange] = useForm({ userName: '', password: '' })
  const [inValid, setInValid] = useState(false)
  const me = useUserContextProvider() as me_me

  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loginMutation, { error, data }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      variables: {
        input: { userName: values.userName, password: values.password },
      },
      refetchQueries: ['me'],

      // onCompleted: () => {

      // },
      onError: () => {
        setInValid(true)
      },
    }
  )

  useEffect(() => {
    if (me && data) {
      toggleLogin()
      // navigate('dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, data])

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

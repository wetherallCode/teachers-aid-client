import React, { FC, Dispatch, SetStateAction } from 'react'
import { gql, useMutation } from '@apollo/client'
import { logout } from '../../schemaTypes'
import { LogoutLink } from './homeStyles'
import { useNavigate } from 'react-router-dom'

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`
export type LogoutProps = {
  toggleLogin: () => void
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
}

export const Logout: FC<LogoutProps> = ({ toggleLogin, setIsNavOpen }) => {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logoutMutation, { data }] = useMutation<logout>(LOGOUT_MUTATION, {
    onCompleted: () => toggleLogin,
    refetchQueries: ['me'],
  })
  return (
    <LogoutLink
      onClick={() => {
        logoutMutation()
        navigate('/')
        setIsNavOpen(false)
      }}
    >
      Logout
    </LogoutLink>
  )
}

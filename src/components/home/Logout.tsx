import React, { FC, Dispatch, SetStateAction } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  logout,
  me_me,
  updateUserActive,
  updateUserActiveVariables,
} from '../../schemaTypes'
import { LogoutLink } from './homeStyles'
import { useNavigate } from 'react-router-dom'
import { UPDATE_USER_ACTIVITY_MUTATION } from './UpdateUserActivity'
import { useUserContextProvider } from '../../contexts/UserContext'

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
  const me: me_me = useUserContextProvider()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logoutMutation, { data }] = useMutation<logout>(LOGOUT_MUTATION, {
    onCompleted: () => toggleLogin,
    refetchQueries: ['me'],
  })
  const [updateUserActive] = useMutation<
    updateUserActive,
    updateUserActiveVariables
  >(UPDATE_USER_ACTIVITY_MUTATION, {
    variables: { input: { userId: me._id!, isActive: false } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['me'],
  })
  return (
    <LogoutLink
      onClick={() => {
        updateUserActive()
        logoutMutation()
        navigate('/')
        setIsNavOpen(false)
      }}
    >
      Logout
    </LogoutLink>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react'
import { useAddStudentsContextProvider } from '../state-n-styles/AddStudentsContext'

export type RegisterUserNameAndPasswordProps = {
  userNamesInUse: string[]
}

export const RegisterUserNameAndPassword: FC<
  RegisterUserNameAndPasswordProps
> = ({ userNamesInUse }) => {
  const [state, event] = useAddStudentsContextProvider()

  const newUserName =
    state.context.studentToRegister.firstName.substring(0, 1).toLowerCase() +
    state.context.studentToRegister.lastName.toLowerCase()

  const usedUserName = state.context.studentToRegister.middleName
    ? state.context.studentToRegister.firstName.substring(0, 1).toLowerCase() +
      state.context.studentToRegister.middleName
        ?.substring(0, 1)
        .toLowerCase() +
      state.context.studentToRegister.lastName.toLowerCase()
    : state.context.studentToRegister.firstName.substring(0, 2).toLowerCase() +
      state.context.studentToRegister.lastName.toLowerCase()

  useEffect(() => {
    if (!userNamesInUse?.includes(newUserName)) {
      event({ type: 'ADD_USERNAME', payload: newUserName })
    } else if (!userNamesInUse?.includes(usedUserName)) {
      event({ type: 'ADD_USERNAME', payload: usedUserName })
    } else
      event({
        type: 'ADD_USERNAME',
        payload: usedUserName + Math.floor(Math.random() * 10 + 1).toString(),
      })
  }, [
    state.context.studentToRegister.firstName,
    state.context.studentToRegister.middleName,
    state.context.studentToRegister.lastName,
  ])

  return null
}

import React, { FC, useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { me_me, passwordCheck, passwordCheckVariables } from '../../schemaTypes'
import { useLazyQuery, gql } from '@apollo/client'

export type PasswordCheckProps = {
  me: me_me
  setPasswordCheck: React.Dispatch<React.SetStateAction<boolean>>
}

export const PASSWORD_CHECK_QUERY = gql`
  query passwordCheck($input: PasswordCheckInput!) {
    passwordCheck(input: $input) {
      firstTimeLoginIn
    }
  }
`
export const PasswordCheck = ({ me, setPasswordCheck }: PasswordCheckProps) => {
  const [passwordCheck] = useLazyQuery<passwordCheck, passwordCheckVariables>(
    PASSWORD_CHECK_QUERY,
    {
      variables: {
        input: { password: me.password },
      },
      onCompleted: (data) => {
        if (data.passwordCheck.firstTimeLoginIn) {
          setPasswordCheck(true)
        } else setPasswordCheck(false)
      },
      onError: (error) => console.error(error),
    },
  )
  useEffect(() => {
    if (me) {
      passwordCheck()
    }
  }, [me, passwordCheck])

  return null
}

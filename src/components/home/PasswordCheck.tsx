import React, { FC, useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { me_me, passwordCheck, passwordCheckVariables } from '../../schemaTypes'
import { useLazyQuery } from '@apollo/client'
import { PASSWORD_CHECK_MUTATION } from './Home'

export type PasswordCheckProps = {
  me: me_me
  setPasswordCheck: React.Dispatch<React.SetStateAction<boolean>>
}

export const PasswordCheck: FC<PasswordCheckProps> = ({
  me,
  setPasswordCheck,
}) => {
  const [passwordCheck] = useLazyQuery<passwordCheck, passwordCheckVariables>(
    PASSWORD_CHECK_MUTATION,
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
    }
  )
  useEffect(() => {
    if (me) {
      passwordCheck()
    }
  }, [me, passwordCheck])

  return null
}

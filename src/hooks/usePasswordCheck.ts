import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { PASSWORD_CHECK_QUERY } from '../components/home/PasswordCheck'
import { passwordCheckVariables, passwordCheck, me_me } from '../schemaTypes'

export type UsePasswordCheckProps = {
  me: me_me
  setPasswordCheck: React.Dispatch<React.SetStateAction<boolean>>
}

export const usePasswordCheck = ({
  me,
  setPasswordCheck,
}: UsePasswordCheckProps) => {
  const [passwordCheck, { loading }] = useLazyQuery<
    passwordCheck,
    passwordCheckVariables
  >(PASSWORD_CHECK_QUERY, {
    variables: {
      input: { password: me.password },
    },
    onCompleted: (data) => {
      if (data.passwordCheck.firstTimeLoginIn) {
        setPasswordCheck(true)
      } else setPasswordCheck(false)
    },
    onError: (error) => console.error(error),
  })
  useEffect(() => {
    if (me) {
      passwordCheck()
    }
  }, [me, passwordCheck])
  return loading
}

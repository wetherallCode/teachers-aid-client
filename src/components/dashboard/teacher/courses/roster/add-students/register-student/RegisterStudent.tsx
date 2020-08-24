import React, { FC, useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useAddStudentsContextProvider } from '../state/AddStudentsContext'
import {
  findAllUsers,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerStudent,
  registerStudentVariables,
  StudentCohortEnum,
} from '../../../../../../../schemaTypes'
import { RegisterUserNameAndPassword } from './RegisterUserNameAndPassword'
import { Modal } from '../../../../../../../animations'
import { AddToCourseModal } from './AddToCourseModal'
import { redCohort } from '../../../../../../../utils'

export type RegisterStudentProps = {}

export const REGISTER_STUDENT_MUTATION = gql`
  mutation registerStudent($input: RegisterStudentInput!) {
    registerStudent(input: $input) {
      student {
        _id
        firstName
        lastName
        userName
        email
      }
    }
  }
`
export const FIND_USERS_QUERY = gql`
  query findAllUsers {
    findAllUsers {
      users {
        ... on Student {
          userName
        }
        ... on Teacher {
          userName
        }
      }
    }
  }
`

export const RegisterStudent: FC<RegisterStudentProps> = () => {
  const [state, event] = useAddStudentsContextProvider()

  const [addToCourseToggle, setAddToCourseToggle] = useState(false)
  const [addIdFinished, setAddIdFinished] = useState(false)

  const { loading, data } = useQuery<findAllUsers>(FIND_USERS_QUERY, {
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  const userNamesInUse = data?.findAllUsers.users.map((user) => user.userName)

  const [registerStudent] = useMutation<
    registerStudent,
    registerStudentVariables
  >(REGISTER_STUDENT_MUTATION, {
    variables: { input: state.context.studentToRegister },
    onCompleted: (data) => {
      event({
        type: 'ADD_STUDENT_IDS',
        payload: data.registerStudent.student._id!,
      })
      setAddIdFinished(true)
    },
    refetchQueries: ['findAllUsers'],
  })
  useEffect(() => {
    if (
      redCohort.includes(state.context.studentToRegister.lastName.charAt(0))
    ) {
      event({ type: 'ADD_COHORT', payload: StudentCohortEnum.RED })
    } else event({ type: 'ADD_COHORT', payload: StudentCohortEnum.WHITE })
  }, [state.context.studentToRegister.lastName])

  if (loading) return <div>Loading </div>
  return (
    <>
      <div onClick={() => event({ type: 'IDLE' })}>Back</div>
      <div>Register New Student</div>
      <form onSubmit={(e: any) => e.preventDefault()}>
        <div>First Name: </div>
        <input
          onChange={(e: any) =>
            event({ type: 'ADD_FIRST_NAME', payload: e.target.value })
          }
        />
        <div>Middle Name: </div>
        <input
          onChange={(e: any) =>
            event({ type: 'ADD_MIDDLE_NAME', payload: e.target.value })
          }
        />
        <div>Last Name: </div>
        <input
          onChange={(e: any) =>
            event({ type: 'ADD_LAST_NAME', payload: e.target.value })
          }
        />
        <div>Email:</div>
        <input
          onChange={(e: any) =>
            event({ type: 'ADD_EMAIL', payload: e.target.value })
          }
        />
        <RegisterUserNameAndPassword userNamesInUse={userNamesInUse!} />
        {!addToCourseToggle &&
          userNamesInUse?.includes(
            state.context.studentToRegister.userName
          ) && (
            <>
              <div>Username is already in use, please use another username</div>
              <div>UserName:</div>
              <input
                onChange={(e: any) =>
                  event({ type: 'ADD_USERNAME', payload: e.target.value })
                }
              />
            </>
          )}
        {state.context.studentToRegister.firstName &&
          state.context.studentToRegister.lastName && (
            <button
              type='reset'
              onClick={() => {
                setAddToCourseToggle(true)
              }}
            >
              Register
            </button>
          )}
        <Modal
          isToggled={addToCourseToggle}
          setIsToggled={setAddToCourseToggle}
        >
          <AddToCourseModal
            addToCourseToggle={addToCourseToggle}
            setAddToCourseToggle={setAddToCourseToggle}
            registerStudent={registerStudent}
            addIdFinished={addIdFinished}
          />
        </Modal>
      </form>
    </>
  )
}

import React, { FC, useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useAddStudentsContextProvider } from '../state-n-styles/AddStudentsContext'
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
import {
  BottomButton,
  BottomButtonContainer,
  FormContainer,
  InformationContainer,
  InformationDetailInputContainer,
  InformationInput,
  PageTitle,
  RegisterStudentContainer,
  YesNoContainer,
  YesNoSelect,
} from '../state-n-styles/addStudentsStyles'

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

export const RegisterStudent = ({}: RegisterStudentProps) => {
  const [state, event] = useAddStudentsContextProvider()

  const [addToCourseToggle, setAddToCourseToggle] = useState(false)
  const [addIdFinished, setAddIdFinished] = useState(false)

  const { loading, data } = useQuery<findAllUsers>(FIND_USERS_QUERY, {
    onCompleted: (data) =>
      console.log(
        data.findAllUsers.users.map(
          (u) => u.__typename === 'Student' && u.userName
        )
      ),
    onError: (error) => console.error(error),
  })

  const userNamesInUse = data?.findAllUsers.users.map(
    (user) => user.__typename === 'Student' && user.userName
  )!

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
    refetchQueries: ['findAllUsers', 'findAllStudents'],
  })
  useEffect(() => {
    if (
      redCohort.includes(state.context.studentToRegister.lastName.charAt(0))
    ) {
      event({ type: 'ADD_COHORT', payload: StudentCohortEnum.RED })
    } else event({ type: 'ADD_COHORT', payload: StudentCohortEnum.WHITE })
  }, [state.context.studentToRegister.lastName])

  const handleAddToCourse = () => {
    registerStudent()
    event({
      type: 'RESET_REGISTER_INPUTS',
      payload: {
        firstName: '',
        lastName: '',
        email: '',
        middleName: '',
        schoolId: '',
        cohort: StudentCohortEnum.RED,
        virtual: false,
        password: 'password',
        userName: '',
        hasIEP: false,
      },
    })
    event({ type: 'ADD_TO_COURSE' })
    setAddToCourseToggle(false)
  }
  const handleAnotherStudent = () => {
    registerStudent()
    event({
      type: 'RESET_REGISTER_INPUTS',
      payload: {
        firstName: '',
        lastName: '',
        email: '',
        middleName: '',
        schoolId: '',
        cohort: StudentCohortEnum.RED,
        virtual: false,
        password: 'password',
        userName: '',
      },
    })
    setAddToCourseToggle(false)
  }

  if (loading) return <div>Loading </div>
  return (
    <RegisterStudentContainer>
      <PageTitle>
        <div>Register New Student</div>
      </PageTitle>
      <FormContainer onSubmit={(e: any) => e.preventDefault()}>
        <InformationContainer>
          <InformationDetailInputContainer>
            <div>First Name: </div>
            <InformationInput
              onChange={(e: any) =>
                event({
                  type: 'ADD_FIRST_NAME',
                  payload: e.target.value.trim(),
                })
              }
            />
          </InformationDetailInputContainer>
          <InformationDetailInputContainer>
            <div>Middle Name: </div>
            <InformationInput
              onChange={(e: any) =>
                event({
                  type: 'ADD_MIDDLE_NAME',
                  payload: e.target.value.trim(),
                })
              }
            />
          </InformationDetailInputContainer>
          <InformationDetailInputContainer>
            <div>Last Name: </div>
            <InformationInput
              onChange={(e: any) =>
                event({ type: 'ADD_LAST_NAME', payload: e.target.value.trim() })
              }
            />
          </InformationDetailInputContainer>
          <InformationDetailInputContainer>
            <div>Email:</div>
            <InformationInput
              onChange={(e: any) =>
                event({ type: 'ADD_EMAIL', payload: e.target.value.trim() })
              }
            />
          </InformationDetailInputContainer>
          <InformationDetailInputContainer>
            <div>School Id:</div>
            <InformationInput
              onChange={(e: any) =>
                event({ type: 'ADD_SCHOOL_ID', payload: e.target.value.trim() })
              }
            />
          </InformationDetailInputContainer>
          <InformationDetailInputContainer>
            <div>IEP Student</div>
            <YesNoContainer>
              <YesNoSelect
                selected={state.context.studentToRegister.hasIEP!}
                onClick={() => event({ type: 'SET_IEP_STATUS', payload: true })}
              >
                Yes
              </YesNoSelect>
              <YesNoSelect
                selected={!state.context.studentToRegister.hasIEP!}
                onClick={() =>
                  event({ type: 'SET_IEP_STATUS', payload: false })
                }
              >
                No
              </YesNoSelect>
            </YesNoContainer>
          </InformationDetailInputContainer>
        </InformationContainer>
        {/* <div>Change Cohort:</div>
        <select
          value={state.context.studentToRegister.cohort}
          onChange={(e: any) =>
            event({ type: 'ADD_COHORT', payload: e.target.value })
          }
        >
          <option value={StudentCohortEnum.RED}>Red</option>
          <option value={StudentCohortEnum.WHITE}>White</option>
        </select> */}
        {/* <RegisterUserNameAndPassword userNamesInUse={userNamesInUse!} /> */}
        {!addToCourseToggle &&
          userNamesInUse?.includes(
            state.context.studentToRegister.userName
          ) && (
            <>
              <div>Username is already in use, please use another username</div>
              <div>UserName:</div>
              <input
                onChange={(e: any) =>
                  event({
                    type: 'ADD_USERNAME',
                    payload: e.target.value.trim(),
                  })
                }
              />
            </>
          )}
        <>
          {addToCourseToggle ? (
            <BottomButtonContainer>
              {/* <AddToCourseModal
                addToCourseToggle={addToCourseToggle}
                setAddToCourseToggle={setAddToCourseToggle}
                registerStudent={registerStudent}
                addIdFinished={addIdFinished}
              /> */}
              <>
                <BottomButton type='button' onClick={handleAddToCourse}>
                  Add to Course?
                </BottomButton>
                <BottomButton type='reset' onClick={handleAnotherStudent}>
                  Add Another Student
                </BottomButton>
              </>
            </BottomButtonContainer>
          ) : (
            <BottomButtonContainer>
              <BottomButton
                type='button'
                onClick={() => event({ type: 'IDLE' })}
              >
                Back
              </BottomButton>
              {state.context.studentToRegister.firstName &&
                state.context.studentToRegister.lastName && (
                  <BottomButton
                    type='button'
                    onClick={() => {
                      setAddToCourseToggle(true)
                    }}
                  >
                    Register
                  </BottomButton>
                )}
            </BottomButtonContainer>
          )}
        </>
      </FormContainer>
    </RegisterStudentContainer>
  )
}

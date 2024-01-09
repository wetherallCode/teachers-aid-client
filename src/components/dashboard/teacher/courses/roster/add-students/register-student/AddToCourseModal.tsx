import React, { FC, Dispatch, SetStateAction, useEffect } from 'react'
import { useAddStudentsContextProvider } from '../state-n-styles/AddStudentsContext'
import { MutationFunctionOptions } from '@apollo/client'
import {
  StudentCohortEnum,
  registerStudent,
  registerStudentVariables,
} from '../../../../../../../schemaTypes'
import { BottomButton } from '../state-n-styles/addStudentsStyles'

export type AddToCourseModalProps = {
  addToCourseToggle: boolean
  setAddToCourseToggle: Dispatch<SetStateAction<boolean>>
  addIdFinished: boolean
  registerStudent: (
    options?:
      | MutationFunctionOptions<registerStudent, registerStudentVariables>
      | undefined,
  ) => void
}

export const AddToCourseModal: FC<AddToCourseModalProps> = ({
  addToCourseToggle,
  setAddToCourseToggle,
  registerStudent,
  addIdFinished,
}) => {
  const [state, event] = useAddStudentsContextProvider()
  useEffect(() => {
    registerStudent()
  }, [registerStudent])

  const handleAddToCourse = () => {
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
    event({ type: 'ADD_TO_COURSE' })
    setAddToCourseToggle(false)
  }
  return (
    <>
      <BottomButton type="button" onClick={handleAddToCourse}>
        Add to Course?
      </BottomButton>
      <BottomButton
        type="reset"
        onClick={() => {
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
        }}
      >
        Add Another Student
      </BottomButton>
    </>
  )
}

import React, { FC, Dispatch, SetStateAction, useEffect } from 'react'
import { useAddStudentsContextProvider } from '../state/AddStudentsContext'
import { MutationFunctionOptions } from '@apollo/client'
import {
  registerStudent,
  registerStudentVariables,
} from '../../../../../../../schemaTypes'

export type AddToCourseModalProps = {
  addToCourseToggle: boolean
  setAddToCourseToggle: Dispatch<SetStateAction<boolean>>
  addIdFinished: boolean
  registerStudent: (
    options?:
      | MutationFunctionOptions<registerStudent, registerStudentVariables>
      | undefined
  ) => void
}

export const AddToCourseModal: FC<AddToCourseModalProps> = ({
  addToCourseToggle,
  setAddToCourseToggle,
  registerStudent,
  addIdFinished,
}) => {
  const [, event] = useAddStudentsContextProvider()
  useEffect(() => {
    registerStudent()
  }, [registerStudent])
  return (
    <>
      <button
        onClick={() => {
          event({ type: 'ADD_TO_COURSE' })
          setAddToCourseToggle(false)
        }}
      >
        Add to Course?
      </button>
      <button
        onClick={() => {
          event({
            type: 'RESET_REGISTER_INPUTS',
            payload: {
              firstName: '',
              lastName: '',
              email: '',
              middleName: '',
              schoolId: '',
              password: 'password',
              userName: '',
            },
          })
          setAddToCourseToggle(false)
        }}
      >
        Add Another Student
      </button>
    </>
  )
}

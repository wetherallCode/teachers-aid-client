import { gql, useMutation } from '@apollo/client'
import React, { FC, useEffect } from 'react'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import {
  ContactTypeEnum,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createParentContact,
  createParentContactVariables,
  me_me_Teacher,
} from '../../../../../schemaTypes'
import { dateConverter } from '../../../../../utils'
import { FindAllStudents } from './FindAllStudents'

import { useCreateContactContextProvider } from './state-style/CreateContactContext'

export type CreateContactProps = {}

export const CREATE_PARENT_CONTACT_MUTATION = gql`
  mutation createParentContact($input: CreateParentContactInput!) {
    createParentContact(input: $input) {
      parentContact {
        _id
      }
    }
  }
`

export const CreateContact: FC<CreateContactProps> = () => {
  const [state, event] = useCreateContactContextProvider()
  const { contactTypeEnum } = useEnumContextProvider()
  const me: me_me_Teacher = useUserContextProvider()

  useEffect(() => {
    event({ type: 'SET_TEACHER_ID', payload: me._id! })
  }, [me])

  const [createParentContact] = useMutation<
    createParentContact,
    createParentContactVariables
  >(CREATE_PARENT_CONTACT_MUTATION, {
    variables: { input: state.context.contactToCreate },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  console.log(state.context.contactToCreate)
  return (
    <>
      <div>Create Contact</div>

      <div>Select Student By Course</div>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            event({ type: 'SET_COURSE_ID', payload: e.target.value })
          }
        }}
      >
        <option value={'none'}>Select</option>
        {me.teachesCourses
          .filter((course) => course.name !== 'Cohort Class')
          .map((course) => (
            <option key={course._id!} value={course._id!}>
              {course.name}
            </option>
          ))}
      </select>
      {state.context.courseId && <FindAllStudents />}
      {state.context.studentName && (
        <form onSubmit={(e: any) => e.preventDefault()}>
          <div>{state.context.studentName}</div>
          <div>Date: </div>
          <input
            type='date'
            onChange={(e: any) => {
              event({
                type: 'SET_DATE',
                payload: dateConverter(e.target.value),
              })
            }}
          />
          <div>Contact Type</div>
          <select
            onChange={(e: any) => {
              if (e.target.value !== 'none') {
                event({ type: 'SET_CONTACT_TYPE', payload: e.target.value })
              }
            }}
          >
            <option value={'none'}>Select</option>
            {contactTypeEnum.map((contactType: ContactTypeEnum) => (
              <option key={contactType} value={contactType}>
                {contactType}
              </option>
            ))}
          </select>
          <input
            type='checkbox'
            onChange={() =>
              event({ type: 'SET_CONTENT', payload: 'Emailed Progress Report' })
            }
          />
          <span>Emailed Progress Report</span>
          <div>Contact Notes</div>
          <textarea
            onChange={(e: any) =>
              event({ type: 'SET_CONTENT', payload: e.target.value })
            }
          />
          <button
            type='reset'
            onClick={() => {
              createParentContact()
              event({ type: 'RESET' })
            }}
          >
            Create Contact
          </button>
        </form>
      )}
    </>
  )
}

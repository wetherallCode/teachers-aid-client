import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import {
  ContactTypeEnum,
  createParentContactVariables,
  createParentContact,
  me_me_Teacher,
} from '../../../../../schemaTypes'
import { dateConverter } from '../../../../../utils'
import { CREATE_PARENT_CONTACT_MUTATION } from '../../parent-contact/create-contacts/CreateContact'

export type CreateContactFormProps = { studentId: string }

export const CreateContactForm = ({ studentId }: CreateContactFormProps) => {
  const { contactTypeEnum } = useEnumContextProvider()
  const me: me_me_Teacher = useUserContextProvider()
  const [contactType, setContactType] = useState(contactTypeEnum.EMAIL)
  const [date, setDate] = useState('')
  const [contentOfContact, setContentOfContact] = useState('')

  const [createParentContact] = useMutation<
    createParentContact,
    createParentContactVariables
  >(CREATE_PARENT_CONTACT_MUTATION, {
    variables: {
      input: {
        contactType,
        date,
        studentId,
        teacherId: me._id!,
        contentOfContact,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findContactsByStudentId'],
  })

  return (
    <>
      <form onSubmit={(e: any) => e.preventDefault()}>
        <div>Date: </div>
        <input
          type='date'
          onChange={(e: any) => {
            setDate(dateConverter(e.target.value))
          }}
        />
        <div>Contact Type</div>
        <select
          onChange={(e: any) => {
            if (e.target.value !== 'none') {
              setContactType(e.target.value)
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
          onChange={() => setContentOfContact('Emailed Progress Report')}
        />
        <span>Emailed Progress Report</span>
        <div>Contact Notes</div>
        <textarea onChange={(e: any) => setContentOfContact(e.target.value)} />
        <button
          type='reset'
          onClick={() => {
            setContactType(contactTypeEnum.EMAIL)
            setDate(new Date().toLocaleDateString())
            setContentOfContact('')
            createParentContact()
          }}
        >
          Create Contact
        </button>
      </form>
    </>
  )
}

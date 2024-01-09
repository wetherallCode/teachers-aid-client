import { useMutation } from '@apollo/client'
import { create } from 'domain'
import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import {
  ContactTypeEnum,
  createParentContactVariables,
  createParentContact,
  me_me_Teacher,
  CreateParentContactInput,
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
  const [createParentContactInputs, setcreateParentContactInputs] =
    useState<CreateParentContactInput>({
      contactType: ContactTypeEnum.EMAIL,
      contentOfContact: '',
      date: new Date().toLocaleDateString(),
      studentId,
      teacherId: me._id!,
    })

  const [createParentContact] = useMutation<
    createParentContact,
    createParentContactVariables
  >(CREATE_PARENT_CONTACT_MUTATION, {
    variables: {
      input: createParentContactInputs,
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findContactsByStudentId'],
  })

  const handleCreateContact = () => {
    setcreateParentContactInputs({
      ...createParentContactInputs,
      contactType: ContactTypeEnum.EMAIL,
      contentOfContact: '',
      date: new Date().toLocaleDateString(),
    })
    createParentContact()
  }

  return (
    <>
      <form onSubmit={(e: any) => e.preventDefault()}>
        <div>Date: </div>
        <input
          type="date"
          onChange={(e: any) => {
            setcreateParentContactInputs({
              ...createParentContactInputs,
              date: dateConverter(e.target.value),
            })
          }}
        />
        <div>Contact Type</div>
        <select
          onChange={(e: any) => {
            if (e.target.value !== 'none') {
              setcreateParentContactInputs({
                ...createParentContactInputs,
                contactType: e.target.value,
              })
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
          type="checkbox"
          onChange={() =>
            setcreateParentContactInputs({
              ...createParentContactInputs,
              contentOfContact: 'Emailed Progress Report',
            })
          }
        />
        <span>Emailed Progress Report</span>
        <div>Contact Notes</div>
        <textarea
          onChange={(e: any) =>
            setcreateParentContactInputs({
              ...createParentContactInputs,
              contentOfContact: e.target.value,
            })
          }
        />
        <button type="reset" onClick={() => handleCreateContact()}>
          Create Contact
        </button>
      </form>
    </>
  )
}

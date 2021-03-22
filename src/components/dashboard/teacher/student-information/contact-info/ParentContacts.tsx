import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findContactsByStudentId,
  findContactsByStudentIdVariables,
} from '../../../../../schemaTypes'
import { useStudentInformationContextProvider } from '../state-n-styles/StudentInformationContext'
import { ContactInformationContainer } from '../state-n-styles/studentInformationStyles'
import { CreateContactForm } from './CreateContactForm'

export type ParentContactsProps = { studentId: string }

export const FIND_PARENT_CONTACTS_BY_STUDENT_ID_QUERY = gql`
  query findContactsByStudentId($input: FindContactsByStudentIdInput!) {
    findContactsByStudentId(input: $input) {
      parentContacts {
        _id
        date
        contentOfContact
        contactType
      }
    }
  }
`

export const ParentContacts = ({ studentId }: ParentContactsProps) => {
  const [state, event] = useStudentInformationContextProvider()

  const { loading, data } = useQuery<
    findContactsByStudentId,
    findContactsByStudentIdVariables
  >(FIND_PARENT_CONTACTS_BY_STUDENT_ID_QUERY, {
    variables: {
      input: { studentId: state.context.student?._id! },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <ContactInformationContainer>
      {data?.findContactsByStudentId.parentContacts.map((contact) => (
        <div key={contact._id}>
          {contact.date}: {contact.contactType} - {contact.contentOfContact}
        </div>
      ))}
      <div>
        <CreateContactForm studentId={studentId} />
      </div>
    </ContactInformationContainer>
  )
}

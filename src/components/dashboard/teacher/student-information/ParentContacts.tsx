import { gql, useQuery } from '@apollo/client'
import React from 'react'
import {
  findContactsByStudentId,
  findContactsByStudentIdVariables,
} from '../../../../schemaTypes'
import { useStudentInformationContextProvider } from './state-n-styles/StudentInformationContext'

export type ParentContactsProps = {}

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

export const ParentContacts = ({}: ParentContactsProps) => {
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
    <>
      <div></div>
    </>
  )
}

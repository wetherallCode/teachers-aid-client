import { gql, useQuery } from '@apollo/client'
import React, { FC } from 'react'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import {
  findParentContactsByTeacherId,
  findParentContactsByTeacherIdVariables,
  me_me_Teacher,
} from '../../../../../schemaTypes'

import {
  ParentContactContainer,
  ParentContactTitle,
} from '../state-n-styles/parentContactStyles'
import { Contact } from './Contact'
import { DownloadContacts } from './DownloadContacts'

export type AllContactsProps = {}

export const FIND_ALL_PARENT_CONTACTS_BY_TEACHER_QUERY = gql`
  query findParentContactsByTeacherId(
    $input: FindParentContactsByTeacherIdInput!
  ) {
    findParentContactsByTeacherId(input: $input) {
      parentContacts {
        _id
        student {
          _id
          firstName
          lastName
        }
        date
        contactType
        contentOfContact
      }
    }
  }
`

export const AllContacts: FC<AllContactsProps> = () => {
  const me: me_me_Teacher = useUserContextProvider()
  const { loading, data } = useQuery<
    findParentContactsByTeacherId,
    findParentContactsByTeacherIdVariables
  >(FIND_ALL_PARENT_CONTACTS_BY_TEACHER_QUERY, {
    variables: {
      input: { teacherId: me._id! },
    },
    onCompleted: (data) =>
      console.log(data.findParentContactsByTeacherId.parentContacts),
    onError: (error) => console.error(error),
  })
  const contacts = data?.findParentContactsByTeacherId.parentContacts!

  return (
    <ParentContactContainer>
      <ParentContactTitle>
        <div>Parent Contact List</div>
        {data?.findParentContactsByTeacherId.parentContacts! && (
          <DownloadContacts
            contacts={data?.findParentContactsByTeacherId.parentContacts!}
          />
        )}
      </ParentContactTitle>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div style={{ borderBottom: '1px solid var(--blue)' }}>
          {contacts.map((contact) => (
            <Contact key={contact._id!} contact={contact} />
          ))}
        </div>
      )}
    </ParentContactContainer>
  )
}

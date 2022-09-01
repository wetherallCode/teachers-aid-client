import React from 'react'
import { findParentContactsByTeacherId_findParentContactsByTeacherId_parentContacts } from '../../../../../schemaTypes'

export type ContactProps = {
  contact: findParentContactsByTeacherId_findParentContactsByTeacherId_parentContacts
}

export const Contact = ({ contact }: ContactProps) => {
  return (
    <div style={{ borderTop: '1px solid var(--blue)' }}>
      <div>
        {contact.student.firstName} {contact.student.lastName}
      </div>
      <div>{contact.date}</div>
      <div>{contact.contactType}</div>
      <div>{contact.contentOfContact}</div>
    </div>
  )
}

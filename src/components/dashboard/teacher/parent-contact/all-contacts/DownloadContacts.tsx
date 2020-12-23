import React, { FC, useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { findParentContactsByTeacherId_findParentContactsByTeacherId_parentContacts } from '../../../../../schemaTypes'

export type DownloadContactsProps = {
  contacts: findParentContactsByTeacherId_findParentContactsByTeacherId_parentContacts[]
}

export type contactInfoProps = {
  DATE: string
  STUDENT_NAME: string
  WHO_I_SPOKE_WITH: string
  EMAIL_OR_PHONE_CALL: string
  WHAT_WAS_DISCUSSED: string
}

export const DownloadContacts: FC<DownloadContactsProps> = ({ contacts }) => {
  const [createCSVToggle, setCreateCSVToggle] = useState(false)
  const [contactInformation, setContactInformation] = useState<
    contactInfoProps[]
  >([])
  console.log(contactInformation.length)
  const headers = [
    { label: 'Date', key: 'DATE' },
    { label: 'Student Name', key: 'STUDENT_NAME' },
    { label: 'Who I Spoke With', key: 'WHO_I_SPOKE_WITH' },
    { label: 'Email or Phone Call', key: 'EMAIL_OR_PHONE_CALL' },
    { label: 'What was Discussed', key: 'WHAT_WAS_DISCUSSED' },
  ]

  useEffect(() => {
    for (const contact of contacts) {
      setContactInformation((list) => [
        ...list,
        {
          DATE: contact.date,
          EMAIL_OR_PHONE_CALL: contact.contactType,
          STUDENT_NAME:
            contact.student.lastName + ', ' + contact.student.firstName,
          WHAT_WAS_DISCUSSED: contact.contentOfContact,
          WHO_I_SPOKE_WITH: '',
        },
      ])
    }
  }, [contacts])

  return (
    <>
      {contactInformation?.length! > 0 && (
        <CSVLink
          data={contactInformation!}
          headers={headers}
          filename={'parent_contacts'}
          style={{
            //   backgroundColor: 'var(--n)',
            color: 'var(--blue)',
            //   fontSize: '140%',
            //   display: 'flex',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            textDecoration: 'none',
          }}
          target='_blank'
          onClick={() => {}}
        >
          Download
        </CSVLink>
      )}
    </>
  )
}

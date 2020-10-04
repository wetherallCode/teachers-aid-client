import { useQuery } from '@apollo/client'
import React, { FC } from 'react'
import {
  findParentContactsByTeacherId_findParentContactsByTeacherId_parentContacts,
  findStudentInfoByStudentId,
  findStudentInfoByStudentIdVariables,
} from '../../../../../schemaTypes'
import { FIND_STUDENT_INFORMATION_QUERY } from '../../teachers-aid/student-info/StudentInfo'

export type ContactProps = {
  contact: findParentContactsByTeacherId_findParentContactsByTeacherId_parentContacts
}

export const Contact: FC<ContactProps> = ({ contact }) => {
  // const { loading, data } = useQuery<
  //   findStudentInfoByStudentId,
  //   findStudentInfoByStudentIdVariables
  // >(FIND_STUDENT_INFORMATION_QUERY, {
  //   variables: {
  //     input: { studentId: contact.studentId },
  //   },
  //   onCompleted: (data) => console.log(data),
  //   onError: (error) => console.error(error),
  // })

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

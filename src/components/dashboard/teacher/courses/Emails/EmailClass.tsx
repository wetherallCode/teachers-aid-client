import { gql, useMutation, useQuery } from '@apollo/client'
import {
  CreateParentContactByCourse,
  CreateParentContactByCourseVariables,
  findParentContactsByTeacherId,
  findParentContactsByTeacherIdVariables,
  me_me_Teacher,
} from '../../../../../schemaTypes'
import { FIND_ALL_PARENT_CONTACTS_BY_TEACHER_QUERY } from '../../parent-contact/all-contacts/AllContacts'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'

export const EMAIL_CLASS_MUTATION = gql`
  mutation CreateParentContactByCourse(
    $input: CreateParentContactByCourseInput!
  ) {
    createParentContactByCourse(input: $input) {
      success
    }
  }
`

export type EmailClassProps = { courseId: string }
export const EmailClass = ({ courseId }: EmailClassProps) => {
  const me: me_me_Teacher = useUserContextProvider()
  const { contactTypeEnum } = useEnumContextProvider()

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
  const contacts = data?.findParentContactsByTeacherId
    .parentContacts!.filter(
      (contact) => contact.date === new Date().toLocaleDateString(),
    )
    // .filter((contact) => contact.contactType === contactTypeEnum.EMAIL)
    .filter((contact) =>
      contact.student.inCourses.some((course) => course._id === courseId),
    )
  const [emailClass] = useMutation<
    CreateParentContactByCourse,
    CreateParentContactByCourseVariables
  >(EMAIL_CLASS_MUTATION, {
    variables: { input: { courseId } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findParentContactsByTeacherId'],
  })
  console.log(
    data?.findParentContactsByTeacherId
      .parentContacts!.filter(
        (contact) => contact.date === new Date().toLocaleDateString(),
      )
      .filter((contact) => contact.contactType === contactTypeEnum.EMAIL),
    // .filter((contact) =>
    //   contact.student.inCourses.some((course) => course._id === courseId),
    // )
  )
  console.log(contacts?.length)
  return (
    <>
      <div>
        <div>
          {loading ? (
            <div>Loading</div>
          ) : contacts?.length === 0 ? (
            <div>No emails sent today</div>
          ) : (
            contacts?.map((contact, index) => (
              <div key={index}>
                {contact.date} {contact.student.firstName}{' '}
                {contact.student.lastName}: {contact.contentOfContact}
              </div>
            ))
          )}
        </div>
        <br />
        {loading ? (
          <div>Loading</div>
        ) : contacts?.length !== 0 ? (
          <div>Emails already sent today</div>
        ) : (
          <div>
            <div>Email Class</div>
            <button onClick={() => emailClass()}>Send Email</button>
          </div>
        )}
      </div>
    </>
  )
}

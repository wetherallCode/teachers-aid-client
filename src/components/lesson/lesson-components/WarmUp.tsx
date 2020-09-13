import React, { FC, useState } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  findStudentProtocol_findStudentById_student_hasProtocols,
  AcademicOutcomeTypes,
  respondToProtocol,
  respondToProtocolVariables,
} from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  LessonComponentDetailsContainer,
  LessonComponentDetailsStyle,
} from '../state/lessonStyles'
import { useMutation } from '@apollo/client'
import { RESPOND_TO_PROTOCOL_MUTATION } from './StudentProtocolResponse'

export type WarmUpProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const WarmUp: FC<WarmUpProps> = ({ lesson }) => {
  // const [response, setResponse] = useState('')
  // const [protocol, setProtocol] = useState<
  //   findStudentProtocol_findStudentById_student_hasProtocols
  // >({
  //   __typename: 'Protocol',
  //   _id: '',
  //   academicOutcomeType: AcademicOutcomeTypes.LOGIC_BUILDING,
  //   assignedDate: '',
  //   completed: false,
  //   isActive: false,
  //   task: '',
  //   response: null,
  // })
  // const { loading, data } = useQuery<
  //   findStudentProtocol,
  //   findStudentProtocolVariables
  // >(FIND_STUDENT_PROTOCOL_QUERY, {
  //   variables: {
  //     input: { studentId: me._id! },
  //   },
  //   onCompleted: (data) => {
  //     const [protocol] = data.findStudentById.student.hasProtocols.filter(
  //       (protocol) => protocol.isActive
  //     )
  //     setProtocol(protocol)
  //   },
  //   onError: (error) => console.error(error),
  // })

  // const [respond] = useMutation<respondToProtocol, respondToProtocolVariables>(
  //   RESPOND_TO_PROTOCOL_MUTATION,
  //   {
  //     variables: { input: { protocolId: protocol._id!, response } },
  //     onCompleted: (data) => console.log(data),
  //     refetchQueries: ['findStudentProtocol'],
  //   }
  // )
  // const isProtocolRespondedTo = data?.findStudentById.student.hasProtocols
  //   .filter((protocol) => protocol.isActive)
  //   .some((protocol) => protocol.response)

  // const protocolResponse = data?.findStudentById.student.hasProtocols
  //   .filter((protocol) => protocol.isActive)
  //   .map((protocol) => protocol.response)

  return (
    <>
      <LessonComponentTitleContainer>Warm Up</LessonComponentTitleContainer>
      <LessonComponentDetailsContainer>
        <LessonComponentDetailsStyle>
          {lesson.beforeActivity.task}
        </LessonComponentDetailsStyle>
      </LessonComponentDetailsContainer>
    </>
  )
}

import React, { FC, useState, useEffect } from 'react'
import {
  findEssaysToGradeById,
  findEssaysToGradeByIdVariables,
  me_me_Teacher,
  findEssaysToGradeById_findEssaysToGradeById_essays,
} from '../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'

export type EssaysToGradeProps = {
  courseId: string
}

export const FIND_ESSAYS_TO_GRADE_BY_ID_QUERY = gql`
  query findEssaysToGradeById($input: FindEssaysToGradeByIdInput!) {
    findEssaysToGradeById(input: $input) {
      essays {
        _id
        assigned
        readings {
          readingSections
        }
        hasOwner {
          firstName
          lastName
          inCourses {
            _id
          }
        }
      }
    }
  }
`

export const EssaysToGrade: FC<EssaysToGradeProps> = ({ courseId }) => {
  const [essayList, setEssayList] = useState<
    findEssaysToGradeById_findEssaysToGradeById_essays[]
  >([])
  console.log(essayList)
  const me: me_me_Teacher = useUserContextProvider()
  const { _id } = me
  const { loading, data } = useQuery<
    findEssaysToGradeById,
    findEssaysToGradeByIdVariables
  >(FIND_ESSAYS_TO_GRADE_BY_ID_QUERY, {
    variables: {
      input: { teacherId: _id! },
    },
    onCompleted: (data) => {
      console.log(data.findEssaysToGradeById.essays)
      console.log(
        data?.findEssaysToGradeById.essays.filter((essay) =>
          essay.hasOwner.inCourses.some(
            (course) => course._id === courseId.toString()
          )
        )
      )
    },
    onError: (error) => console.error(error),
  })
  useEffect(() => {
    setEssayList(
      data?.findEssaysToGradeById.essays.filter((essay) =>
        essay.hasOwner.inCourses.some((course) => course._id === courseId)
      )!
    )
  }, [data, courseId])
  if (loading) return <div>Loading </div>
  return (
    <>
      <div>Essays To Grade</div>
      {essayList !== undefined &&
        essayList.map((essay) => (
          <Link to={essay._id!} key={essay._id!}>
            {essay.hasOwner.lastName}, {essay.hasOwner.firstName}:{' '}
            {essay.readings.readingSections}
          </Link>
        ))}
    </>
  )
}

import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createSignInSheets,
  createSignInSheetsVariables,
  me_me_Teacher_teachesCourses,
  findCurrentSchoolDay_findSchoolDayByDate_schoolDay_signInSheets,
} from '../../../schemaTypes'
import { date } from '../../../utils'
import { useSchoolDayContextProvider } from './state/SchoolDayContext'

export type CreateSignInSheetsProps = {
  todaysCourses: me_me_Teacher_teachesCourses[]
  signInSheets: findCurrentSchoolDay_findSchoolDayByDate_schoolDay_signInSheets[]
}

export const CREATE_SIGN_IN_SHEETS_MUTATION = gql`
  mutation createSignInSheets($input: CreateSignInSheetsInput!) {
    createSignInSheets(input: $input) {
      schoolDay {
        _id
        signInSheets {
          course {
            _id
          }
        }
      }
    }
  }
`
export const CreateSignInSheets: FC<CreateSignInSheetsProps> = ({
  todaysCourses,
  signInSheets,
}) => {
  const [state, event] = useSchoolDayContextProvider()
  const todaysCourseIDs = todaysCourses.map((course) => course._id!)

  const [createSignInSheets] = useMutation<
    createSignInSheets,
    createSignInSheetsVariables
  >(CREATE_SIGN_IN_SHEETS_MUTATION, {
    variables: { input: { courseIds: todaysCourseIDs, todaysDate: date } },
    refetchQueries: ['findCurrentSchoolDay'],
  })

  const signInSheetCheck = signInSheets.some((sheet) => sheet.studentsSignInlog)

  return (
    <>
      <div>Create Sign-In Sheets for all classes?</div>
      {!signInSheetCheck && (
        <button
          onClick={() => {
            createSignInSheets()
          }}
        >
          Yes
        </button>
      )}
    </>
  )
}

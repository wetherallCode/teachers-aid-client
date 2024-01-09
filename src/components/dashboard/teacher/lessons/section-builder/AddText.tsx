import React, { FC, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { addNewText, addNewTextVariables } from '../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../contexts/UserContext'

export const ADD_NEW_TEXT_MUTATION = gql`
  mutation addNewText($input: AddNewTextInput!) {
    addNewText(input: $input) {
      text {
        _id
      }
    }
  }
`

export type AddTextProps = {}

export const AddText: FC<AddTextProps> = () => {
  const [textTitle, setTextTitle] = useState('')
  const me = useUserContextProvider()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [addNewText, { data }] = useMutation<addNewText, addNewTextVariables>(
    ADD_NEW_TEXT_MUTATION,
    {
      variables: { input: { textTitle, ownerId: me._id } },
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findTexts'],
    },
  )
  return (
    <div>
      <div>Add New Text</div>
      <input
        type="text"
        value={textTitle}
        onChange={(e: any) => setTextTitle(e.target.value)}
      />
      <button onClick={() => addNewText()}> Add Text</button>
    </div>
  )
}

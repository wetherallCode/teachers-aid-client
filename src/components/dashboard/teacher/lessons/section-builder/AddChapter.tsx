import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  AddNewChapter,
  AddNewChapterVariables,
} from '../../../../../schemaTypes'
import { useForm } from '../../../../../hooks'
import { State } from 'xstate'
import { sectionBuilderMachineContext } from './state/sectionBuilderMachine'
import { useSectionBuilderContextProvider } from './state/SectionBuilderContext'

export type AddChapterProps = {
  // state: State<sectionBuilderMachineContext, sectionBuilderMachineEvent, any, any>
}

export const ADD_NEW_CHAPTER_MUTATION = gql`
  mutation AddNewChapter($input: AddNewChapterInput!) {
    addNewChapter(input: $input) {
      chapter {
        _id
      }
    }
  }
`

export const AddChapter: FC<AddChapterProps> = () => {
  const [state] = useSectionBuilderContextProvider()
  const [chapterValues, setValues] = useForm({
    title: '',
    number: '',
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [addNewChapter, { data }] = useMutation<
    AddNewChapter,
    AddNewChapterVariables
  >(ADD_NEW_CHAPTER_MUTATION, {
    variables: {
      input: {
        textTitle: state.context.fromText,
        chapterNumber: Number(chapterValues.number),
        chapterTitle: chapterValues.title,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findChaptersInText'],
  })
  return (
    <div>
      <div>Add a New Chapter</div>
      <div>Title</div>
      <input type='text' name='title' onChange={setValues} />
      <div>Number: </div>
      <input type='text' name='number' onChange={setValues} />
      <button onClick={() => addNewChapter()}>Add Chapter</button>
    </div>
  )
}

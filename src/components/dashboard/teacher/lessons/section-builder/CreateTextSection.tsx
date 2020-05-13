import React from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createTextSection,
  createTextSectionVariables,
} from '../../../../../schemaTypes'
import { useSectionBuilderContextProvider } from './SectionBuilderContext'

export const CREATE_TEXT_SECTION_MUTATION = gql`
  mutation createTextSection($input: CreateTextSectionInput!) {
    createTextSection(input: $input) {
      textSection {
        _id
      }
    }
  }
`

export const CreateTextSection = () => {
  const [state] = useSectionBuilderContextProvider()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createTextSection, { data }] = useMutation<
    createTextSection,
    createTextSectionVariables
  >(CREATE_TEXT_SECTION_MUTATION, {
    variables: {
      input: {
        fromChapterId: state.context.fromChapterId,
        header: state.context.header,
        pageNumbers: state.context.pageNumbers,
        hasProtocols: state.context.hasProtocols,
        hasQuestions: state.context.hasQuestions,
        hasVocab: state.context.hasVocab,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return <button onClick={() => createTextSection()}>Add Section</button>
}

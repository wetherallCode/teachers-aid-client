import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createTextSection,
  createTextSectionVariables,
} from '../../../../../schemaTypes'
import { State } from './SectionBuilderInfo'

export const CREATE_TEXT_SECTION_MUTATION = gql`
  mutation createTextSection($input: CreateTextSectionInput!) {
    createTextSection(input: $input) {
      textSection {
        _id
      }
    }
  }
`
type CreateTextSectionProps = {
  state: State
}

export const CreateTextSection: FC<CreateTextSectionProps> = ({ state }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createTextSection, { data }] = useMutation<
    createTextSection,
    createTextSectionVariables
  >(CREATE_TEXT_SECTION_MUTATION, {
    variables: {
      input: {
        fromChapterId: state.fromChapterId,
        header: state.header,
        pageNumbers: state.pageNumbers,
        hasProtocols: state.hasProtocols,
        hasQuestions: state.hasQuestions,
        hasVocab: state.hasVocab,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return <button onClick={() => createTextSection()}>Add Section</button>
}

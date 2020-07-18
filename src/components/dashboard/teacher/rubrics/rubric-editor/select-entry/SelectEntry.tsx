import React, { FC } from 'react'
import { SelectWritingLevel } from './SelectWritingLevel'
import { SelectRubricSection } from './SelectRubricSection'
import { RubricEntries } from './RubricEntries'
import { gql, useQuery } from '@apollo/client'
import { findRubricEntries } from '../../../../../../schemaTypes'

export type SelectEntryProps = {}

export const FIND_RUBRIC_ENTRIES = gql`
  query findRubricEntries {
    findRubricEntries {
      rubricEntries {
        _id
        entry
        score
        rubricSection
        rubricWritingLevels
        howToImprove
      }
    }
  }
`

export const SelectEntry: FC<SelectEntryProps> = () => {
  const { loading, data } = useQuery<findRubricEntries>(FIND_RUBRIC_ENTRIES, {
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return null

  return (
    <>
      <SelectWritingLevel />
      <SelectRubricSection />
      <RubricEntries rubricEntries={data?.findRubricEntries.rubricEntries!} />
    </>
  )
}

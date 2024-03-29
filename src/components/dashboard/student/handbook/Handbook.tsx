import React, { useState } from 'react'
import { me_me_Student } from '../../../../schemaTypes'
import { phraseCapitalizer, underscoreEliminator } from '../../../../utils'
import { Behavior } from './Behavior'
import { ContactInfo } from './ContactInfo'
import { Expecations } from './Expecations'
import { FAQ } from './FAQ'
import { Grading } from './Grading'
import {
  ContentSelectorTabType,
  HandbookContainer,
  HandbookContentSelectorContainer,
  HandbookInformationDisplayContainer,
  OwnersTitleContainer,
} from './handbookStyles'
import { Procedures } from './Procedures'
import { TextAnalysis } from './TextAnalysis'

export type HandbookProps = { me: me_me_Student }

type ContentSelectorTabNameProps =
  | 'Expectations'
  | 'Grading'
  | 'Procedures'
  | 'Contact Info'
  | 'FAQs'
  | 'Text Analysis'
  | 'Behavior'

export const Handbook = ({ me }: HandbookProps) => {
  const [contentSelection, setContentSelection] =
    useState<ContentSelectorTabNameProps>('Expectations')
  const contentSelectionList: ContentSelectorTabNameProps[] = [
    'Expectations',
    'Procedures',
    'Grading',
    'Behavior',
    'FAQs',
    'Text Analysis',
    'Contact Info',
  ]

  return (
    <HandbookContainer>
      <OwnersTitleContainer>
        <div>{me.firstName}'s Social Studies Handbook</div>
      </OwnersTitleContainer>
      <HandbookContentSelectorContainer>
        {contentSelectionList.map((selection) => (
          <ContentSelectorTabType
            key={selection}
            selected={contentSelection === selection}
            onClick={() => setContentSelection(selection)}
          >
            {selection}
          </ContentSelectorTabType>
        ))}
      </HandbookContentSelectorContainer>
      <HandbookInformationDisplayContainer>
        {contentSelection === 'Expectations' && <Expecations />}
        {contentSelection === 'Procedures' && <Procedures />}
        {contentSelection === 'Grading' && <Grading />}
        {contentSelection === 'Contact Info' && <ContactInfo />}
        {contentSelection === 'Behavior' && <Behavior />}
        {contentSelection === 'Text Analysis' && <TextAnalysis />}
        {contentSelection === 'FAQs' && <FAQ />}
      </HandbookInformationDisplayContainer>
    </HandbookContainer>
  )
}

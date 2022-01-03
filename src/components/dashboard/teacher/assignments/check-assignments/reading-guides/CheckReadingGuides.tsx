import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import {
  findReadingGuidesByMarkingPeriod,
  findReadingGuidesByMarkingPeriodVariables,
  findReadingGuidesByMarkingPeriod_findReadingGuidesByMarkingPeriod_readingGuides,
  MarkingPeriodEnum,
} from '../../../../../../schemaTypes'
import { phraseCapitalizer } from '../../../../../../utils'
import {
  MarkingPeriodSelectorContainer,
  MarkingPeriodSelectorBack,
  CurrentMarkingPeriodContainer,
  MarkingPeriodSelectorForward,
} from '../../article-reviews/state-styles/articleReviewStyles'
import { MarkingPeriodSelector } from '../../grade-assignments/state-n-styles/GradeEssayContainerStyles'
import {
  ReadingGuideCheckContainer,
  ReadingGuidesToCheckContainer,
  ReadingGuideToReviewContainer,
  ReadingGuideToSelectContainer,
  ReadingGuideToSelectNameContainer,
} from '../state-n-styles/CheckAssignmentsStyles'
import { IndividualReadingGuide } from './IndividualReadingGuide'

export type CheckReadingGuidesProps = {}

export const FIND_READING_GUIDES_BY_MARKING_PERIOD_QUERY = gql`
  query findReadingGuidesByMarkingPeriod(
    $input: FindReadingGuidesByMarkingPeriodInput!
  ) {
    findReadingGuidesByMarkingPeriod(input: $input) {
      readingGuides {
        _id
        hasOwner {
          firstName
          lastName
        }
        reviewed
        completed
        exempt
        readings {
          readingSections
        }
        readingGuideFinal {
          problems
          biggestProblem
          reasonForBiggestProblem
          importantPeople
          howArePeopleInvolvedInProblems
          sectionConsequences
        }
      }
    }
  }
`

export const CheckReadingGuides = ({}: CheckReadingGuidesProps) => {
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { markingPeriodEnum } = useEnumContextProvider()
  const [readingGuideToReview, setReadingGuideToReview] =
    useState<null | findReadingGuidesByMarkingPeriod_findReadingGuidesByMarkingPeriod_readingGuides>(
      null
    )
  const [markingPeriodToGrade, setMarkingPeriodToGrade] = useState(
    markingPeriodState.context.currentMarkingPeriod
  )
  const index = markingPeriodEnum.findIndex(
    (c: MarkingPeriodEnum) => c === markingPeriodToGrade
  )
  const { loading, data } = useQuery<
    findReadingGuidesByMarkingPeriod,
    findReadingGuidesByMarkingPeriodVariables
  >(FIND_READING_GUIDES_BY_MARKING_PERIOD_QUERY, {
    variables: {
      input: { markingPeriod: markingPeriodToGrade },
    },
    onCompleted: (data) =>
      console.log(
        data.findReadingGuidesByMarkingPeriod.readingGuides.filter(
          (rg) => !rg.exempt && !rg.reviewed && rg.completed
        )
      ),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  const readingGuidesToCheck =
    data?.findReadingGuidesByMarkingPeriod.readingGuides.filter(
      (rg) => !rg.exempt && !rg.reviewed && rg.completed
    )!

  return (
    <ReadingGuideCheckContainer>
      <div>Reading Guides</div>
      <MarkingPeriodSelector>
        <MarkingPeriodSelectorContainer>
          {index > 0 && (
            <MarkingPeriodSelectorBack
              onClick={() => {
                setMarkingPeriodToGrade(markingPeriodEnum[index - 1])
              }}
            >
              &lt;
            </MarkingPeriodSelectorBack>
          )}
          <CurrentMarkingPeriodContainer>
            <div>{phraseCapitalizer(markingPeriodToGrade)} Marking Period</div>
          </CurrentMarkingPeriodContainer>
          {index < 3 && (
            <MarkingPeriodSelectorForward
              onClick={() =>
                setMarkingPeriodToGrade(markingPeriodEnum[index + 1])
              }
            >
              &gt;
            </MarkingPeriodSelectorForward>
          )}
        </MarkingPeriodSelectorContainer>
      </MarkingPeriodSelector>
      <ReadingGuidesToCheckContainer>
        <div>
          {readingGuidesToCheck.map((rg, i) => (
            <ReadingGuideToSelectContainer
              key={rg._id}
              alternatingLine={i % 2 === 0}
            >
              <ReadingGuideToSelectNameContainer
                onClick={() => setReadingGuideToReview(rg)}
              >
                <div>{rg.hasOwner.firstName}</div>
                <div>{rg.hasOwner.lastName}</div>
              </ReadingGuideToSelectNameContainer>
              <div>{rg.readings.readingSections}</div>
            </ReadingGuideToSelectContainer>
          ))}
        </div>
        <div>
          {readingGuideToReview ? (
            <ReadingGuideToReviewContainer>
              <IndividualReadingGuide readingGuide={readingGuideToReview!} />
            </ReadingGuideToReviewContainer>
          ) : (
            <ReadingGuideToReviewContainer>
              No Reading Guide Selected
            </ReadingGuideToReviewContainer>
          )}
        </div>
      </ReadingGuidesToCheckContainer>
    </ReadingGuideCheckContainer>
  )
}

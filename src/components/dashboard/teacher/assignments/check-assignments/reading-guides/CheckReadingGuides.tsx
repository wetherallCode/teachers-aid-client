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
  ReadingGuides,
  ReadingGuidesToCheckContainer,
  ReadingGuideToReviewContainer,
  ReadingGuideToSelectContainer,
  ReadingGuideToSelectNameContainer,
} from '../state-n-styles/CheckAssignmentsStyles'
import { IndividualReadingGuide } from './IndividualReadingGuide'
import { ReadingGuideQuestionReview } from '../../../../student/assignments/readingGuides/state-and-styles/readingGuideStyles'

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
        effort
        readings {
          readingSections
        }
        dueDate
        readingGuideFinal {
          readingGuideQuestions {
            answer
            questionType
          }
          submitted
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
      null,
    )
  const [markingPeriodToGrade, setMarkingPeriodToGrade] = useState(
    markingPeriodState.context.currentMarkingPeriod,
  )
  const index = markingPeriodEnum.findIndex(
    (c: MarkingPeriodEnum) => c === markingPeriodToGrade,
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
          (rg) => !rg.exempt && !rg.reviewed && rg.completed,
        ),
      ),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const readingGuidesToCheck =
    data?.findReadingGuidesByMarkingPeriod.readingGuides.filter(
      (rg) => !rg.exempt && !rg.reviewed && rg.completed,
    )!
  console.log(readingGuideToReview)
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
        <ReadingGuides>
          {readingGuidesToCheck.map((rg, i) => (
            <ReadingGuideToSelectContainer
              key={rg._id}
              alternatingLine={i % 2 === 0}
              onClick={() => setReadingGuideToReview(rg)}
            >
              <ReadingGuideToSelectNameContainer>
                <div>{rg.hasOwner.firstName}</div>
                <div>{rg.hasOwner.lastName}</div>
              </ReadingGuideToSelectNameContainer>
              <div>{rg.readings.readingSections}</div>
            </ReadingGuideToSelectContainer>
          ))}
        </ReadingGuides>
        <div>
          {readingGuideToReview ? (
            <ReadingGuideToReviewContainer>
              <IndividualReadingGuide
                readingGuide={readingGuideToReview!}
                setReadingGuideToReview={setReadingGuideToReview}
                readingGuidesToCheck={
                  data?.findReadingGuidesByMarkingPeriod.readingGuides.filter(
                    (rg) => !rg.exempt && !rg.reviewed && rg.completed,
                  )!
                }
              />
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

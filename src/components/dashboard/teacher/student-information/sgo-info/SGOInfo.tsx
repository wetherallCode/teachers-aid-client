import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {
  findEssayQuestionByIdForSGO,
  findEssayQuestionByIdForSGOVariables,
  findEssaysByStudentId,
  findEssaysByStudentIdVariables,
  findEssaysByStudentId_findEssaysByStudentId_essays_finalDraft_submittedFinalDraft_rubricEntries,
  findSGOEssaysByStudentId,
  findSGOEssaysByStudentIdVariables,
  findSGOEssaysByStudentId_findSGOEssaysByStudentId_essays_finalDraft_submittedFinalDraft_rubricEntries,
  RubricSectionEnum,
} from '../../../../../schemaTypes'
import { average, copyToClipBoard } from '../../../../../utils'
import { SGOContainer } from '../state-n-styles/studentInformationStyles'

export type SGOInfoProps = {
  studentId: string
}

export const FIND_ESSAYS_BY_STUDENT_QUERY = gql`
  query findEssaysByStudentId($input: FindEssaysByStudentIdInput!) {
    findEssaysByStudentId(input: $input) {
      essays {
        markingPeriod
        score {
          earnedPoints
        }
        topic {
          essayQuestionId
        }
        readings {
          readingSections
        }
        finalDraft {
          submittedFinalDraft {
            score
            rubricEntries {
              rubricSection
              score
              entry
            }
          }
        }
      }
    }
  }
`
export const FIND_ESSAY_QUESTION_INFO_FOR_SGO_QUERY = gql`
  query findEssayQuestionByIdForSGO($input: FindEssayQuestionByIdInput!) {
    findEssayQuestionById(input: $input) {
      essayQuestion {
        sgoQuestion
      }
    }
  }
`

export const FIND_SGO_ESSAYS_QUERY = gql`
  query findSGOEssaysByStudentId($input: FindSGOEssaysByStudentIdInput!) {
    findSGOEssaysByStudentId(input: $input) {
      essays {
        markingPeriod
        assignedDate
        score {
          earnedPoints
        }
        topic {
          essayQuestionId
        }
        readings {
          readingSections
        }
        finalDraft {
          submittedFinalDraft {
            score
            rubricEntries {
              rubricSection
              score
              entry
            }
          }
        }
      }
    }
  }
`

export type RubricEntries =
  | {
      __typename: 'RubricEntry'
      rubricSection: RubricSectionEnum
      score: number
      entry: string
      readings: string
      number: number
    }[]
  | null
export const SGOInfo = ({ studentId }: SGOInfoProps) => {
  const [sgoSwitch, setSgoSwitch] = useState<'WRITING' | 'CONCLUSION'>(
    'WRITING'
  )
  const { loading, data } = useQuery<
    findSGOEssaysByStudentId,
    findSGOEssaysByStudentIdVariables
  >(FIND_SGO_ESSAYS_QUERY, {
    variables: {
      input: { studentId },
    },
    // onCompleted: (data) =>
    //   console.log(data.findSGOEssaysByStudentId.essays),
    onError: (error) => console.error(error),
  })

  const essaysToReview = data?.findSGOEssaysByStudentId.essays.filter(
    (essay) =>
      essay.finalDraft &&
      essay.markingPeriod !== 'FIRST' &&
      essay.score.earnedPoints !== 0
  )!

  const answerEntries: RubricEntries = []
  const conclusionEntries: RubricEntries = []
  let i: number = 1

  const answerEntryScore: {
    score: number
    readingSection: string
    number: number
  }[] = []

  const conclusionEntryScore: {
    score: number
    readingSection: string
    number: number
  }[] = []

  if (!loading) {
    for (const essay of data?.findSGOEssaysByStudentId.essays.slice(0, 30)!) {
      if (essay.finalDraft) {
        const essayToSort = [...essay.finalDraft?.submittedFinalDraft!]
        const bestEssay = essayToSort.sort((a, b) => {
          if (a.score < b.score) {
            return 1
          }
          if (a.score > b.score) {
            return -1
          }
          return 0
        })[0]

        let answerScoreContainer: number[] = []
        let conclusionScoreContainer: number[] = []

        for (const entry of bestEssay.rubricEntries) {
          if (entry.rubricSection === 'ANSWER') {
            answerEntries.push({
              __typename: entry.__typename,
              rubricSection: entry.rubricSection,
              score: entry.score > 4 ? 4 : entry.score,
              entry: entry.entry,
              readings: essay.readings.readingSections,
              number: i,
            })

            answerScoreContainer.push(entry.score > 4 ? 4 : entry.score)
          }

          if (entry.rubricSection === 'CONCLUSION') {
            conclusionEntries.push({
              __typename: entry.__typename,
              rubricSection: entry.rubricSection,
              score: entry.score > 4 ? 4 : entry.score,
              entry: entry.entry,
              readings: essay.readings.readingSections,
              number: i,
            })
            conclusionScoreContainer.push(entry.score > 4 ? 4 : entry.score)
          }

          // answerScoreContainer.length > 1 &&
          //   console.log(average(answerScoreContainer))
          // conclusionEntryScore.push(average(answerScoreContainer))
        }
        answerScoreContainer.length > 1
          ? answerEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: average(answerScoreContainer),
            })
          : answerScoreContainer.length === 1
          ? answerEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: answerScoreContainer[0],
            })
          : answerEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: 0,
            })

        conclusionScoreContainer.length > 1
          ? conclusionEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: average(conclusionScoreContainer),
            })
          : conclusionScoreContainer.length === 1
          ? conclusionEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: conclusionScoreContainer[0],
            })
          : conclusionEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: 0,
            })
      } else {
        answerEntries.push({
          __typename: 'RubricEntry',
          rubricSection: RubricSectionEnum.ANSWER,
          score: 0,
          entry: '',
          readings: essay.readings.readingSections,
          number: i,
        })

        answerEntryScore.push({
          number: i,
          readingSection: essay.readings.readingSections,
          score: 0,
        })
        conclusionEntries.push({
          __typename: 'RubricEntry',
          rubricSection: RubricSectionEnum.CONCLUSION,
          score: 0,
          entry: '',
          readings: essay.readings.readingSections,
          number: i,
        })
        conclusionEntryScore.push({
          number: i,
          readingSection: essay.readings.readingSections,
          score: 0,
        })
      }
      i = i + 1
    }

    const totalAnswerScore = answerEntryScore
      .map((a) => (a.score > 4 ? 4 : a.score))
      .reduce((acc, i) => acc + i, 0)

    const answerScoreAverage = totalAnswerScore / answerEntryScore.length

    const totalConclusionScore = conclusionEntryScore
      .map((a) => (a.score > 4 ? 4 : a.score))
      .reduce((acc, i) => acc + i, 0)

    const conclusionScoreAverage =
      totalConclusionScore / conclusionEntryScore.length

    const answerData = answerEntryScore.map((entry) => entry.score)
    const conclusionData = conclusionEntryScore.map((entry) => entry.score)

    return (
      <SGOContainer>
        <div>
          <div onClick={() => setSgoSwitch('WRITING')}>Writing SGO</div>
          <div onClick={() => setSgoSwitch('CONCLUSION')}>Conclusion SGO</div>
        </div>
        <div>
          {sgoSwitch === 'WRITING' && (
            <div style={{ overflow: 'scroll', height: '40vh' }}>
              <div>
                {answerEntryScore.map((entry, i: number) => (
                  <div key={i}>
                    <div>
                      Number {entry.number}: {entry.readingSection}
                    </div>
                    <div>{entry.score}</div>
                  </div>
                ))}
              </div>
              <div>{+answerScoreAverage.toFixed(2)}</div>
              <br />
              <button onClick={copyToClipBoard(answerData.toString())}>
                Copy Data
              </button>
            </div>
          )}
          {sgoSwitch === 'CONCLUSION' && (
            <div style={{ overflow: 'scroll', height: '40vh' }}>
              <div>
                {conclusionEntryScore.map((entry, i: number) => (
                  <div key={i}>
                    <div>
                      Number {entry.number}: {entry.readingSection}
                    </div>
                    <div>{entry.score}</div>
                  </div>
                ))}
              </div>
              <div>{+conclusionScoreAverage.toFixed(2)}</div>
              <br />
              <button onClick={copyToClipBoard(conclusionData.toString())}>
                Copy Data
              </button>
            </div>
          )}
        </div>
      </SGOContainer>
    )
  } else return <div>Loading </div>
}

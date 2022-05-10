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
    onCompleted: (data) => console.log(data.findSGOEssaysByStudentId.essays),
    onError: (error) => console.error(error),
  })

  const essaysToReview = data?.findSGOEssaysByStudentId.essays.filter(
    (essay) =>
      essay.finalDraft &&
      essay.markingPeriod !== 'FIRST' &&
      essay.score.earnedPoints !== 0
  )!

  const answerEntries: RubricEntries = []
  const answerEntryScore: number[] = []
  const conclusionEntries: RubricEntries = []
  const conclusionEntryScore: number[] = []

  if (!loading) {
    for (const essay of data?.findSGOEssaysByStudentId.essays!) {
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
        console.log(essay.readings.readingSections)
        for (const entry of bestEssay.rubricEntries) {
          if (entry.rubricSection === 'ANSWER') {
            console.log(entry)
            answerEntries.push({
              __typename: entry.__typename,
              rubricSection: entry.rubricSection,
              score: entry.score > 4 ? 4 : entry.score,
              entry: entry.entry,
              readings: essay.readings.readingSections,
            })
          }
          if (entry.rubricSection === 'CONCLUSION') {
            conclusionEntries.push({
              __typename: entry.__typename,
              rubricSection: entry.rubricSection,
              score: entry.score > 4 ? 4 : entry.score,
              entry: entry.entry,
              readings: essay.readings.readingSections,
            })
          }
        }
      } else {
        answerEntries.push({
          __typename: 'RubricEntry',
          rubricSection: RubricSectionEnum.ANSWER,
          score: 1,
          entry: '',
          readings: essay.readings.readingSections,
        })
        conclusionEntries.push({
          __typename: 'RubricEntry',
          rubricSection: RubricSectionEnum.CONCLUSION,
          score: 1,
          entry: '',
          readings: essay.readings.readingSections,
        })
      }
    }

    const totalAnswerScore = answerEntries
      .map((a) => (a.score > 4 ? 4 : a.score))
      .reduce((acc, i) => acc + i, 0)

    const answerScoreAverage = totalAnswerScore / answerEntries.length

    const totalConclusionScore = conclusionEntries
      .map((a) => (a.score > 4 ? 4 : a.score))
      .reduce((acc, i) => acc + i, 0)

    const conclusionScoreAverage =
      totalConclusionScore / conclusionEntries.length
    // const test = answerEntries.reduce((acc ,i)=> acc.includes(i) ? [...acc] : [...i] )

    // for (const entry of answerEntries){
    //  if ()
    // }
    return (
      <>
        <div>
          <div>
            <div onClick={() => setSgoSwitch('WRITING')}>Writing SGO</div>
            <div onClick={() => setSgoSwitch('CONCLUSION')}>Conclusion SGO</div>
          </div>
          <div>
            {sgoSwitch === 'WRITING' && (
              <div style={{ overflow: 'scroll', height: '40vh' }}>
                <div>
                  {answerEntries.map((entry, i: number) => (
                    <div key={i}>
                      <div>{entry.readings}</div>
                      <div>{entry.score}</div>
                    </div>
                  ))}
                </div>
                <div>{+answerScoreAverage.toFixed(2)}</div>
              </div>
            )}
            {sgoSwitch === 'CONCLUSION' && (
              <div style={{ overflow: 'scroll', height: '40vh' }}>
                <div>
                  {conclusionEntries.map((entry, i: number) => (
                    <div key={i}>
                      <div>{entry.readings}</div>
                      <div>{entry.score}</div>
                    </div>
                  ))}
                </div>
                <div>{+conclusionScoreAverage.toFixed(2)}</div>
              </div>
            )}
          </div>
        </div>
        {/* <div>Conclusion Score: {+conclusionScoreAverage.toFixed(2) - 1}</div> */}
      </>
    )
  } else return <div>Loading </div>
}

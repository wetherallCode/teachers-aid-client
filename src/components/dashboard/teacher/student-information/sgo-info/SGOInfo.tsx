import { gql, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {
  findAllQuestions,
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
import {
  SGOContainer,
  SGOTypeSwitch,
} from '../state-n-styles/studentInformationStyles'
import { Essays } from './Essays'

export type SGOInfoProps = {
  studentId: string
}

export const FIND_ESSAYS_BY_STUDENT_QUERY = gql`
  query findEssaysByStudentId($input: FindEssaysByStudentIdInput!) {
    findEssaysByStudentId(input: $input) {
      essays {
        _id
        markingPeriod
        score {
          earnedPoints
        }
        topic {
          essayQuestionId
          question
        }
        readings {
          readingSections
        }
        assignedDate
        finalDraft {
          submittedFinalDraft {
            score
            draft
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
        _id
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
export const FIND_ALL_ESSAY_QUESTIONS_QUERY = gql`
  query findAllQuestions {
    findAllQuestions {
      questions
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

export type AnswerEntryType = {
  score: number
  readingSection: string
  number: number
  questionNumber: number
  draft: string
}[]

export type EssayEntryType = {
  readingSection: string
  questionNumber: number
  draft: string
  number: number
  question: string
  answerScore: number
  conclusionScore: number
}[]

export const SGOInfo = ({ studentId }: SGOInfoProps) => {
  const [sgoSwitch, setSgoSwitch] = useState<
    'WRITING' | 'CONCLUSION' | 'ESSAYS'
  >('WRITING')
  const { loading, data: sgoEssays } = useQuery<
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
  const { data: allEssays } = useQuery<
    findEssaysByStudentId,
    findEssaysByStudentIdVariables
  >(FIND_ESSAYS_BY_STUDENT_QUERY, {
    variables: {
      input: { studentId },
    },
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  const { data: allQuestionsData } = useQuery<findAllQuestions>(
    FIND_ALL_ESSAY_QUESTIONS_QUERY,
    {
      // onCompleted: (data) => console.log(data.findAllQuestions.questions),
      onError: (error) => console.error(error),
    }
  )

  const essayTotal = 40
  const sgoEssaysList = sgoEssays?.findSGOEssaysByStudentId.essays.slice(
    0,
    essayTotal
  )!

  const allEssayList = allEssays?.findEssaysByStudentId
    .essays!.filter(
      (essay) =>
        // essay.finalDraft &&
        essay.markingPeriod !== 'FIRST'
      //  &&
      // essay.score.earnedPoints !== 0
    )
    .sort((a, b) => {
      const essayA = Date.parse(a.assignedDate)
      const essayB = Date.parse(b.assignedDate)
      if (essayA < essayB) return -1
      if (essayA > essayB) return 1
      return 0
    })
    .sort((a, b) => {
      const essayA = a.score
      const essayB = b.score
      if (essayA < essayB) return -1
      if (essayA > essayB) return 1
      return 0
    })
    .slice(0, 40)!

  const questionList = allQuestionsData?.findAllQuestions.questions.slice(
    16,
    allQuestionsData.findAllQuestions.questions.length - 1
  )

  const answerEntries: RubricEntries = []
  const conclusionEntries: RubricEntries = []
  // let i: number = 1

  const answerEntryScore: {
    score: number
    readingSection: string
    number: number
    questionNumber: number
    // essayId: string
    draft: string
  }[] = []

  const conclusionEntryScore: {
    score: number
    readingSection: string
    number: number
    questionNumber: number
  }[] = []

  const essayEntryList: EssayEntryType = []

  if (!loading) {
    let i: number = 1
    const allCompletedEssays = allEssayList.filter(
      (essay) => essay.finalDraft && essay.score.earnedPoints !== 0
    )

    if (allCompletedEssays.length > 25) {
      for (const essay of allCompletedEssays.slice(0, 25)) {
        const questionNo = questionList?.findIndex(
          (i) => i === essay.topic.question
        )!

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
          answerScoreContainer.push(entry.score > 4 ? 4 : entry.score)
          conclusionScoreContainer.push(entry.score > 4 ? 4 : entry.score)
        }

        answerScoreContainer.length > 1
          ? essayEntryList.push({
              answerScore: average(answerScoreContainer),
              conclusionScore: average(conclusionScoreContainer),
              draft: bestEssay.draft,
              number: i,
              question: essay.topic.question,
              questionNumber: questionNo + 1,
              readingSection: essay.readings.readingSections,
            })
          : answerScoreContainer.length === 1
          ? essayEntryList.push({
              answerScore: answerScoreContainer[0],
              conclusionScore: conclusionScoreContainer[0],
              draft: bestEssay.draft,
              number: i,
              question: essay.topic.question,
              questionNumber: questionNo + 1,
              readingSection: essay.readings.readingSections,
            })
          : essayEntryList.push({
              answerScore: 0,
              conclusionScore: 0,
              draft: bestEssay.draft,
              number: i,
              question: essay.topic.question,
              questionNumber: questionNo + 1,
              readingSection: essay.readings.readingSections,
            })

        answerScoreContainer.length > 1
          ? answerEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: average(answerScoreContainer),
              questionNumber: questionNo + 1,
              draft: bestEssay.draft,
            })
          : answerScoreContainer.length === 1
          ? answerEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: answerScoreContainer[0],
              questionNumber: questionNo + 1,
              draft: bestEssay.draft,
            })
          : answerEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: 0,
              questionNumber: questionNo + 1,
              draft: bestEssay.draft,
            })

        conclusionScoreContainer.length > 1
          ? conclusionEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: average(conclusionScoreContainer),
              questionNumber: questionNo + 1,
            })
          : conclusionScoreContainer.length === 1
          ? conclusionEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: conclusionScoreContainer[0],
              questionNumber: questionNo + 1,
            })
          : conclusionEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: 0,
              questionNumber: questionNo + 1,
            })
        i = i + 1
      }
    } else {
      for (const essay of allEssayList.slice(0, 25)!) {
        const questionNo = questionList?.findIndex(
          (i) => i === essay.topic.question
        )!

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
            ? essayEntryList.push({
                answerScore: average(answerScoreContainer),
                conclusionScore: average(conclusionScoreContainer),
                draft: bestEssay.draft,
                number: i,
                question: essay.topic.question,
                questionNumber: questionNo + 1,
                readingSection: essay.readings.readingSections,
              })
            : answerScoreContainer.length === 1
            ? essayEntryList.push({
                answerScore: answerScoreContainer[0],
                conclusionScore: conclusionScoreContainer[0],
                draft: bestEssay.draft,
                number: i,
                question: essay.topic.question,
                questionNumber: questionNo + 1,
                readingSection: essay.readings.readingSections,
              })
            : essayEntryList.push({
                answerScore: 0,
                conclusionScore: 0,
                draft: bestEssay.draft,
                number: i,
                question: essay.topic.question,
                questionNumber: questionNo + 1,
                readingSection: essay.readings.readingSections,
              })

          answerScoreContainer.length > 1
            ? answerEntryScore.push({
                number: i,
                readingSection: essay.readings.readingSections,
                score: average(answerScoreContainer),
                questionNumber: questionNo + 1,
                draft: bestEssay.draft,
              })
            : answerScoreContainer.length === 1
            ? answerEntryScore.push({
                number: i,
                readingSection: essay.readings.readingSections,
                score: answerScoreContainer[0],
                questionNumber: questionNo + 1,
                draft: bestEssay.draft,
              })
            : answerEntryScore.push({
                number: i,
                readingSection: essay.readings.readingSections,
                score: 0,
                questionNumber: questionNo + 1,
                draft: '',
              })
          console.log('filling answerEntryScore')
          conclusionScoreContainer.length > 1
            ? conclusionEntryScore.push({
                number: i,
                readingSection: essay.readings.readingSections,
                score: average(conclusionScoreContainer),
                questionNumber: questionNo + 1,
              })
            : conclusionScoreContainer.length === 1
            ? conclusionEntryScore.push({
                number: i,
                readingSection: essay.readings.readingSections,
                score: conclusionScoreContainer[0],
                questionNumber: questionNo + 1,
              })
            : conclusionEntryScore.push({
                number: i,
                readingSection: essay.readings.readingSections,
                score: 0,
                questionNumber: questionNo + 1,
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
            questionNumber: questionNo + 1,
            draft: '',
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
            questionNumber: questionNo + 1,
          })
        }
        i = i + 1
      }
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

    const answerData = answerEntryScore.map(
      (entry) => entry.score + ' (' + entry.questionNumber + ')'
    )
    const conclusionData = conclusionEntryScore.map(
      (entry) => entry.score + ' (' + entry.questionNumber + ')'
    )
    // const individualEssayIds = answerEntryScore.map((i) => i.essayId)

    return (
      <SGOContainer>
        <SGOTypeSwitch>
          <div onClick={() => setSgoSwitch('WRITING')}>Writing SGO</div>
          <div onClick={() => setSgoSwitch('CONCLUSION')}>Conclusion SGO</div>
          <div onClick={() => setSgoSwitch('ESSAYS')}>Essays</div>
        </SGOTypeSwitch>
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
          {sgoSwitch === 'ESSAYS' && (
            <div style={{ overflow: 'scroll', height: '40vh' }}>
              <Essays essays={essayEntryList} />
            </div>
          )}
        </div>
      </SGOContainer>
    )
  } else return <div>Loading </div>
}

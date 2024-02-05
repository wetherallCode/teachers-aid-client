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
  SGOTypeSwitchContainer,
} from '../state-n-styles/studentInformationStyles'
import { Essays } from './Essays'
import { ALL } from 'node:dns'

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
        hasOwner {
          lastName
          firstName
        }
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
  answerEntries: string[]
  conclusionEntries: string[]
  conclusionScore: number
  studentName: string
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
    // onCompleted: (data) => console.log(data.findSGOEssaysByStudentId.essays),
    onError: (error) => console.error(error),
  })
  const { loading: allEssayLoading, data: allEssays } = useQuery<
    findEssaysByStudentId,
    findEssaysByStudentIdVariables
  >(FIND_ESSAYS_BY_STUDENT_QUERY, {
    variables: {
      input: { studentId },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  const { data: allQuestionsData } = useQuery<findAllQuestions>(
    FIND_ALL_ESSAY_QUESTIONS_QUERY,
    {
      // onCompleted: (data) => console.log(data.findAllQuestions.questions),
      onError: (error) => console.error(error),
    },
  )
  if (allEssayLoading) return <div>Loading</div>
  const essayTotal = 40

  const sgoEssaysList = sgoEssays?.findSGOEssaysByStudentId.essays.slice(
    0,
    essayTotal,
  )!

  console.log(
    allEssays !== undefined &&
      allEssays?.findEssaysByStudentId.essays.filter(
        (e) =>
          e.__typename === 'Essay' &&
          e.finalDraft &&
          e.score.earnedPoints !== 0,
      ),
  )

  const allEssayList = allEssays?.findEssaysByStudentId
    .essays!.filter(
      (essay) => {},
      // essay.finalDraft &&
      // essay.markingPeriod !== 'FIRST',
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
  // .slice(0, 40)!
  // console.log(allEssayList)
  const questionList = allQuestionsData?.findAllQuestions.questions.slice(
    16,
    allQuestionsData.findAllQuestions.questions.length - 1,
  )

  const answerEntries: RubricEntries = []
  const conclusionEntries: RubricEntries = []
  // let i: number = 1

  const answerEntryScore: {
    score: number
    readingSection: string
    number: number
    questionNumber: number
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
    const allCompletedEssays = allEssayList!.filter(
      (essay) => essay.finalDraft && essay.score.earnedPoints !== 0,
    )

    if (allCompletedEssays.length > 25) {
      for (const essay of allCompletedEssays.slice(0, 25)) {
        const studentName =
          essay.hasOwner.firstName + ' ' + essay.hasOwner.lastName
        const questionNo = questionList?.findIndex(
          (i) => i === essay.topic.question,
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
        console.log(bestEssay)
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

            // answerScoreContainer.push(entry.score > 4 ? 4 : entry.score)
            answerScoreContainer.push(
              entry.score === 0 ? 0 : entry.score === 1 ? 1 : entry.score - 1,
            )
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
            // conclusionScoreContainer.push(entry.score > 4 ? 4 : entry.score)
            conclusionScoreContainer.push(
              entry.score === 0 ? 0 : entry.score === 1 ? 1 : entry.score - 1,
            )
          }
        }

        const answerEntryList = bestEssay.rubricEntries
          .filter((e) => e.rubricSection === 'ANSWER' && e.entry)
          .map((e) => e.entry)

        const conclusionEntryList = bestEssay.rubricEntries
          .filter((e) => e.rubricSection === 'CONCLUSION' && e.entry)
          .map((e) => e.entry)

        answerScoreContainer.length > 1
          ? essayEntryList.push({
              answerScore: average(answerScoreContainer),
              conclusionScore: average(conclusionScoreContainer),
              draft: bestEssay.draft,
              number: i,
              question: essay.topic.question,
              questionNumber: questionNo + 1,
              readingSection: essay.readings.readingSections,
              studentName,
              answerEntries: answerEntryList,
              conclusionEntries: conclusionEntryList,
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
                studentName,
                answerEntries: answerEntryList,
                conclusionEntries: conclusionEntryList,
              })
            : essayEntryList.push({
                answerScore: 0,
                conclusionScore: 0,
                draft: bestEssay.draft,
                number: i,
                question: essay.topic.question,
                questionNumber: questionNo + 1,
                readingSection: essay.readings.readingSections,
                studentName,
                answerEntries: answerEntryList,
                conclusionEntries: conclusionEntryList,
              })

        answerScoreContainer.length > 1
          ? answerEntryScore.push({
              number: i,
              readingSection: essay.readings.readingSections,
              score: average(answerScoreContainer),
              questionNumber: questionNo + 1,
            })
          : answerScoreContainer.length === 1
            ? answerEntryScore.push({
                number: i,
                readingSection: essay.readings.readingSections,
                score: answerScoreContainer[0],
                questionNumber: questionNo + 1,
              })
            : answerEntryScore.push({
                number: i,
                readingSection: essay.readings.readingSections,
                score: 0,
                questionNumber: questionNo + 1,
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
      console.log(answerEntryScore)
      console.log(conclusionEntryScore)
    } else {
      for (const essay of allEssayList!.slice(0, 25)!) {
        const studentName =
          essay.hasOwner.firstName + ' ' + essay.hasOwner.lastName
        const questionNo = questionList?.findIndex(
          (i) => i === essay.topic.question,
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

              // answerScoreContainer.push(entry.score > 4 ? 4 : entry.score)
              answerScoreContainer.push(
                entry.score === 0 ? 0 : entry.score === 1 ? 1 : entry.score - 1,
              )
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
              // conclusionScoreContainer.push(entry.score > 4 ? 4 : entry.score)
              conclusionScoreContainer.push(
                entry.score === 0 ? 0 : entry.score === 1 ? 1 : entry.score - 1,
              )
            }

            // answerScoreContainer.length > 1 &&
            //   console.log(average(answerScoreContainer))
            // conclusionEntryScore.push(average(answerScoreContainer))
          }
          const answerEntryList = bestEssay.rubricEntries
            .filter((e) => e.rubricSection === 'ANSWER' && e.entry)
            .map((e) => e.entry)
          const conclusionEntryList = bestEssay.rubricEntries
            .filter((e) => e.rubricSection === 'CONCLUSION' && e.entry)
            .map((e) => e.entry)

          answerScoreContainer.length > 1
            ? essayEntryList.push({
                answerScore: average(answerScoreContainer),
                conclusionScore: average(conclusionScoreContainer),
                draft: bestEssay.draft,
                number: i,
                question: essay.topic.question,
                questionNumber: questionNo + 1,
                readingSection: essay.readings.readingSections,
                studentName,
                answerEntries: answerEntryList,
                conclusionEntries: conclusionEntryList,
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
                  studentName,
                  answerEntries: answerEntryList,
                  conclusionEntries: conclusionEntryList,
                })
              : essayEntryList.push({
                  answerScore: 0,
                  conclusionScore: 0,
                  draft: bestEssay.draft,
                  number: i,
                  question: essay.topic.question,
                  questionNumber: questionNo + 1,
                  readingSection: essay.readings.readingSections,
                  studentName,
                  answerEntries: answerEntryList,
                  conclusionEntries: conclusionEntryList,
                })

          answerScoreContainer.length > 1
            ? answerEntryScore.push({
                number: i,
                readingSection: essay.readings.readingSections,
                score: average(answerScoreContainer),
                questionNumber: questionNo + 1,
              })
            : answerScoreContainer.length === 1
              ? answerEntryScore.push({
                  number: i,
                  readingSection: essay.readings.readingSections,
                  score: answerScoreContainer[0],
                  questionNumber: questionNo + 1,
                })
              : answerEntryScore.push({
                  number: i,
                  readingSection: essay.readings.readingSections,
                  score: 0,
                  questionNumber: questionNo + 1,
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
      // console.log(answerEntryScore)
      // console.log(conclusionEntryScore)
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
      // (entry) => entry.score + ' (' + entry.questionNumber + ')'
      (entry) => entry.score,
    )
    const conclusionData = conclusionEntryScore.map(
      // (entry) => entry.score + ' (' + entry.questionNumber + ')'
      (entry) => entry.score,
    )
    // const individualEssayIds = answerEntryScore.map((i) => i.essayId)

    return (
      <SGOContainer>
        <SGOTypeSwitchContainer>
          <SGOTypeSwitch
            selected={sgoSwitch === 'WRITING'}
            onClick={() => setSgoSwitch('WRITING')}
          >
            Writing SGO
          </SGOTypeSwitch>
          <SGOTypeSwitch
            selected={sgoSwitch === 'CONCLUSION'}
            onClick={() => setSgoSwitch('CONCLUSION')}
          >
            Conclusion SGO
          </SGOTypeSwitch>
          <SGOTypeSwitch
            selected={sgoSwitch === 'ESSAYS'}
            onClick={() => setSgoSwitch('ESSAYS')}
          >
            Essays
          </SGOTypeSwitch>
        </SGOTypeSwitchContainer>
        <div>
          {sgoSwitch === 'WRITING' && (
            <div style={{ overflow: 'scroll', height: '40vh' }}>
              <button onClick={copyToClipBoard(answerData.toString())}>
                Copy Data
              </button>
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
            </div>
          )}
          {sgoSwitch === 'CONCLUSION' && (
            <div style={{ overflow: 'scroll', height: '40vh' }}>
              <button onClick={copyToClipBoard(conclusionData.toString())}>
                Copy Data
              </button>
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

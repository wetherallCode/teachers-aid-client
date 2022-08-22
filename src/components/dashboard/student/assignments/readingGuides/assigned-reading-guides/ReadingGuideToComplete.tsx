import React, { FC, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { gql, useQuery, useMutation } from '@apollo/client'
import {
  findReadingGuideById,
  findReadingGuideByIdVariables,
  me_me_Student,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startReadingGuide,
  startReadingGuideVariables,
} from '../../../../../../schemaTypes'

import { CompleteReadingGuide } from './CompleteReadingGuide'
import { useReadingGuideToCompleteContextProvider } from '../state-and-styles/ReadingGuideToCompleteContext'
import { VocabList } from './VocabList'
import { ReadingGuideHelp } from './ReadingGuideHelp'
import { dueTimeDisplay } from '../../../../../../utils'
import {
  ReadingGuideContainer,
  ReadingGuideDetailsContainer,
  ReadingGuideInfoContainer,
  ReadingGuideToCompleteContainer,
  ReadingGuideInfoSwitchButtonContainer,
  ReadingGuideInfoSwitchButton,
} from '../state-and-styles/readingGuideStyles'
import { useGradeCalculator } from '../../../../../../hooks/useGradeCalculator'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { useClassTimeIndicator } from '../../../../../../hooks/useClassTimeIndicator'
import {
  AssignmentDetailsContainer,
  AssignmentDetailsPartContainers,
  AssignmentDetailsReadingInfo,
  AssignmentDetailsDueDate,
  AssignmentDetailsGoBackButtonContainer,
  AssignmentDetailsGoBackButton,
} from '../../essays/assigned-essays/state-and-styles/assignedEssayStyles'

export type ReadingGuideToCompleteProps = {}

export const FIND_READING_GUIDE_BY_ID_QUERY = gql`
  query findReadingGuideById($input: FindReadingGuideByIdInput!) {
    findReadingGuideById(input: $input) {
      readingGuide {
        _id
        readings {
          readingPages
          readingSections
        }
        dueDate
        dueTime
        lessonInfo {
          vocabList {
            word
            definition
          }
          assignedSectionIdList
        }
        readingGuideFinal {
          # howIsSectionOrganized
          # whyWasSectionOrganized
          # majorIssue
          # majorSolution
          # clarifyingQuestions
          # majorIssueSolved
          problems
          biggestProblem
          reasonForBiggestProblem
          importantPeople
          howArePeopleInvolvedInProblems
          sectionConsequences
        }
        markingPeriod
        hasOwner {
          _id
        }
      }
    }
  }
`

export const START_READING_GUIDE_MUTATION = gql`
  mutation startReadingGuide($input: StartReadingGuideInput!) {
    startReadingGuide(input: $input) {
      readingGuide {
        _id
      }
    }
  }
`

export const ReadingGuideToComplete: FC<ReadingGuideToCompleteProps> = () => {
  const me: me_me_Student = useUserContextProvider()
  const { classTime } = useClassTimeIndicator(me)

  const { readingGuideToComplete } = useParams()
  const navigate = useNavigate()
  const [state, event] = useReadingGuideToCompleteContextProvider()

  const [startReadingGuide] = useMutation<
    startReadingGuide,
    startReadingGuideVariables
  >(START_READING_GUIDE_MUTATION, {
    variables: {
      input: { readingGuideId: readingGuideToComplete!, paperBased: false },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findReadingGuideById'],
  })

  const { loading, data } = useQuery<
    findReadingGuideById,
    findReadingGuideByIdVariables
  >(FIND_READING_GUIDE_BY_ID_QUERY, {
    variables: {
      input: { readingGuideId: readingGuideToComplete! },
    },
    onCompleted: (data) => {
      event({ type: 'SET_READING_GUIDE_ID', payload: readingGuideToComplete! })
      if (data.findReadingGuideById.readingGuide.readingGuideFinal)
        event({
          type: 'SET_READING_GUIDE_INPUTS',

          payload: {
            readingGuideId: readingGuideToComplete!,
            problems:
              data.findReadingGuideById.readingGuide.readingGuideFinal.problems,
            biggestProblem:
              data.findReadingGuideById.readingGuide.readingGuideFinal
                .biggestProblem,
            reasonForBiggestProblem:
              data.findReadingGuideById.readingGuide.readingGuideFinal
                .reasonForBiggestProblem,
            importantPeople:
              data.findReadingGuideById.readingGuide.readingGuideFinal
                .importantPeople,
            howArePeopleInvolvedInProblems:
              data.findReadingGuideById.readingGuide.readingGuideFinal
                .howArePeopleInvolvedInProblems,
            sectionConsequences:
              data.findReadingGuideById.readingGuide.readingGuideFinal
                .sectionConsequences,
          },
          // payload: {
          //   clarifyingQuestions:
          //     data.findReadingGuideById.readingGuide.readingGuideFinal
          //       .clarifyingQuestions,
          //   majorIssue:
          //     data.findReadingGuideById.readingGuide.readingGuideFinal
          //       .majorIssue,
          //   howIsSectionOrganized:
          //     data.findReadingGuideById.readingGuide.readingGuideFinal
          //       .howIsSectionOrganized,
          //   majorSolution:
          //     data.findReadingGuideById.readingGuide.readingGuideFinal
          //       .majorSolution,
          //   whyWasSectionOrganized:
          //     data.findReadingGuideById.readingGuide.readingGuideFinal
          //       .whyWasSectionOrganized!,
          //   majorIssueSolved:
          //     data.findReadingGuideById.readingGuide.readingGuideFinal
          //       .majorIssueSolved,
          //   readingGuideId: readingGuideToComplete,
          // },
        })
      if (!data?.findReadingGuideById.readingGuide.readingGuideFinal) {
        startReadingGuide()
      }
    },
    onError: (error) => console.error(error),
  })

  const { grade, loading: gradeLoading } = useGradeCalculator({
    studentId: data?.findReadingGuideById.readingGuide.hasOwner._id!,
    markingPeriod: data?.findReadingGuideById.readingGuide.markingPeriod!,
    polling: false,
  })

  useEffect(() => {
    if (classTime) navigate('dashboard/assignments')
  }, [classTime, navigate])
  if (loading) return <div>Loading </div>

  return (
    <>
      {state.context.updateReadingGuideInputs.readingGuideId && (
        <ReadingGuideContainer>
          <>
            <AssignmentDetailsContainer>
              <AssignmentDetailsPartContainers>
                <AssignmentDetailsReadingInfo>
                  Read pages{' '}
                  {
                    data?.findReadingGuideById.readingGuide.readings
                      .readingPages
                  }
                  :{' '}
                  {
                    data?.findReadingGuideById.readingGuide.readings
                      .readingSections
                  }
                </AssignmentDetailsReadingInfo>
              </AssignmentDetailsPartContainers>
              <AssignmentDetailsPartContainers>
                <AssignmentDetailsDueDate>
                  Essay due: {data?.findReadingGuideById.readingGuide.dueDate}{' '}
                  at {data?.findReadingGuideById.readingGuide.dueTime}
                </AssignmentDetailsDueDate>
              </AssignmentDetailsPartContainers>
              <AssignmentDetailsGoBackButtonContainer>
                <AssignmentDetailsGoBackButton
                  onClick={() => navigate('/dashboard/assignments')}
                >
                  Go Back to Assignments
                </AssignmentDetailsGoBackButton>
              </AssignmentDetailsGoBackButtonContainer>
            </AssignmentDetailsContainer>

            <ReadingGuideToCompleteContainer>
              <CompleteReadingGuide
                readingGuideInfo={data?.findReadingGuideById.readingGuide!}
                grade={grade}
              />
            </ReadingGuideToCompleteContainer>

            <ReadingGuideInfoContainer>
              <ReadingGuideInfoSwitchButtonContainer>
                <ReadingGuideInfoSwitchButton
                  onClick={() => event({ type: 'SET_HELP_DISPLAY' })}
                >
                  Help
                </ReadingGuideInfoSwitchButton>
                <ReadingGuideInfoSwitchButton
                  onClick={() => event({ type: 'SET_VOCAB_DISPLAY' })}
                >
                  Vocab
                </ReadingGuideInfoSwitchButton>
              </ReadingGuideInfoSwitchButtonContainer>
              {state.context.vocabDisplay && (
                <VocabList
                  words={
                    data?.findReadingGuideById.readingGuide.lessonInfo!
                      .vocabList!
                  }
                />
              )}
              {state.context.helpDisplay && <ReadingGuideHelp />}
            </ReadingGuideInfoContainer>
          </>
        </ReadingGuideContainer>
      )}
    </>
  )
}

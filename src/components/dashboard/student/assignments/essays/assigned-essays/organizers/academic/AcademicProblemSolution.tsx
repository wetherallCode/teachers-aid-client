import React, { FC, SyntheticEvent, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import { useMutation, gql } from '@apollo/client'
import {
  findEssayById_findEssayById_essay_topic,
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateProblemSolution,
  updateProblemSolutionVariables,
} from '../../../../../../../../schemaTypes'
import {
  AcademicQuestionAnswerTypeContainer,
  QuestionTypeChangeButton,
  AnswerTypeContainter,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
  AcademicRestatementTitle,
  PartInput,
  OrganizerTitleContainer,
  OrganizerTitleStyle,
  RestatementDirectionsContainer,
  PartTextArea,
} from '../../state-and-styles/assignedEssayStyles'
import {
  irregularPastTenseVerbList,
  isLetterUpperCase,
  verbsThatChangeInIngFormList,
} from '../../../../../../../../utils'
import { UnderlinedText } from '../../../../../../../../appStyles'

export type AcademicProblemSolutionProps = {
  questionParts: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  topic: findEssayById_findEssayById_essay_topic
}

export const UPDATE_PROBLEM_SOLUTION_MUTATION = gql`
  mutation updateProblemSolution($input: UpdateProblemSolutionInput!) {
    updateProblemSolution(input: $input) {
      essay {
        _id
      }
    }
  }
`

export const AcademicProblemSolution = ({
  questionParts,
  topic,
}: AcademicProblemSolutionProps) => {
  const [state, event] = useStudentEssayContextProvider()
  console.log(state)
  const { subject, verb, object } =
    state.context.academicOrganizer.academicSentenceStructure
  const irregularVerbCheck = irregularPastTenseVerbList(verb)

  const { problemSolution } = state.context.academicOrganizer.answer

  const [updateProblemSolution] = useMutation<
    updateProblemSolution,
    updateProblemSolutionVariables
  >(UPDATE_PROBLEM_SOLUTION_MUTATION, {
    variables: {
      input: {
        essayId: state.context.essayId,
        problem: state.context.academicOrganizer.answer.problemSolution.problem,
        reasonForProblem:
          state.context.academicOrganizer.answer.problemSolution
            .reasonForProblem,
        solvedBy:
          state.context.academicOrganizer.answer.problemSolution.solvedBy,
        whySolutionSolved:
          state.context.academicOrganizer.answer.problemSolution
            .whySolutionSolved,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssayById'],
  })
  useEffect(() => {
    updateProblemSolution()
  }, [
    problemSolution,
    updateProblemSolution,
    // state.context.academicOrganizer.answer.problemSolution,
  ])

  const congugatedVerb =
    verb === irregularVerbCheck
      ? irregularVerbCheck
          .charAt(irregularVerbCheck.length - 1)
          .toLowerCase() === 'e'
        ? verb + 'd'
        : verb + 'ed'
      : irregularVerbCheck

  const properNounCheck = (word: string) => {
    const firstLetter = word.charAt(0)

    if (isLetterUpperCase(firstLetter)) return true
    else return false
  }
  const noun =
    questionParts.simpleSubject.split(' ')[
      questionParts.simpleSubject.split(' ').length - 1
    ]
  const properNoun = properNounCheck(noun)
  const properNameEndsInS =
    properNoun &&
    questionParts.simpleSubject.charAt(
      questionParts.simpleSubject.length - 1,
    ) === 's'

  const verbInIngFormat =
    verbsThatChangeInIngFormList(questionParts.simplePredicate) ===
    questionParts.simplePredicate
      ? questionParts.simplePredicate + 'ing'
      : verbsThatChangeInIngFormList(questionParts.simplePredicate)

  return (
    <>
      <OrganizerTitleContainer>
        <OrganizerTitleStyle>Answer the Question</OrganizerTitleStyle>
      </OrganizerTitleContainer>

      <RestatementDirectionsContainer>
        <UnderlinedText>Directions</UnderlinedText>
        {/* <div>
          Problem and Solution Questions need to give a complete explanation of
          the problem and then a complete explanation of the solution. To do
          this, answer each of these questions with paraphrased answers that you
          found in the text in the assigned sections or sections that came
          before the assigned sections.
        </div> */}
        <div>
          To give a complete explanation to this question: {topic.question}, you
          need to address all four parts of a problem and solution. Answer the
          questions below and don't forget what {questionParts.simpleSubject}{' '}
          did is usually the solution.
        </div>
      </RestatementDirectionsContainer>

      <AcademicQuestionAnswerTypeContainer>
        <AcademicRestatementTitle>
          {/* <div style={{ fontSize: '70%' }}>{topic.question}</div> */}
          <div>How Question: Problem and Solution</div>
        </AcademicRestatementTitle>
        <AnswerTypeContainter>
          <div>What is the problem for {questionParts.simpleSubject}?</div>
          <PartTextArea
            value={
              state.context.academicOrganizer.answer.problemSolution.problem
            }
            onPaste={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onCopy={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onChange={(e: any) => {
              event({
                type: 'SET_PROBLEM_SOLUTION',
                payload: { ...problemSolution, problem: e.target.value },
              })
            }}
          />
        </AnswerTypeContainter>
        <AnswerTypeContainter>
          <div>
            Why is this {questionParts.simpleSubject}
            {properNameEndsInS ? `'` : `'s`} problem or what problem did{' '}
            {questionParts.simpleSubject} solve?
          </div>
          <PartTextArea
            value={
              state.context.academicOrganizer.answer.problemSolution
                .reasonForProblem
            }
            onPaste={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onCopy={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onChange={(e: any) => {
              event({
                type: 'SET_PROBLEM_SOLUTION',
                payload: {
                  ...problemSolution,
                  reasonForProblem: e.target.value,
                },
              })
            }}
          />
        </AnswerTypeContainter>
        <AnswerTypeContainter>
          <div>How did {questionParts.simpleSubject} solve the problem?</div>
          <PartTextArea
            value={
              state.context.academicOrganizer.answer.problemSolution.solvedBy
            }
            onPaste={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onCopy={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onChange={(e: any) => {
              event({
                type: 'SET_PROBLEM_SOLUTION',
                payload: { ...problemSolution, solvedBy: e.target.value },
              })
            }}
          />
        </AnswerTypeContainter>
        <AnswerTypeContainter>
          <div>
            Why did/would the solution solve {questionParts.simpleSubject}
            {properNameEndsInS ? `'` : `'s`} problem?
          </div>
          <PartTextArea
            value={
              state.context.academicOrganizer.answer.problemSolution
                .whySolutionSolved
            }
            onPaste={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onCopy={(e: SyntheticEvent) => {
              e.preventDefault()
            }}
            onChange={(e: any) => {
              event({
                type: 'SET_PROBLEM_SOLUTION',
                payload: {
                  ...problemSolution,
                  whySolutionSolved: e.target.value,
                },
              })
            }}
          />
        </AnswerTypeContainter>
      </AcademicQuestionAnswerTypeContainer>
      <OrganizerControlButtonContainer>
        <OrganizerControlButton
          onClick={() => {
            event({ type: 'PREVIOUS' })
            event({ type: 'SET_PRE_LOADED', payload: false })
          }}
        >
          Back
        </OrganizerControlButton>
        <OrganizerControlButton
          onClick={() => {
            event({ type: 'NEXT' })
          }}
        >
          Next
        </OrganizerControlButton>
      </OrganizerControlButtonContainer>
    </>
  )
}

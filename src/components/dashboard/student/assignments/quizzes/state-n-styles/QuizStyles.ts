import styled from 'styled-components'

export const QuizContainer = styled.div`
  height: 95vh;
  display: grid;

  grid-template-rows: 1fr 5fr;
`

export const QuizTitleContainer = styled.div`
  font-size: 4vh;
  justify-self: center;
  align-self: center;
`

export const QuizMessageContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`

export const QuestionBlankContainer = styled.form`
  display: grid;
  grid-template-rows: 1fr 4fr 3fr;
`
export const FinishedQuizContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 5vh;
`
export const QuizQuestionContainer = styled.div`
  justify-self: left;
  align-self: center;
  font-size: 3vh;
  margin-left: 5%;
`

export const QuizQuestionAnswersContainer = styled.div`
  display: grid;
  grid-auto-rows: row;
  justify-items: left;
  align-items: start;
  font-size: 3vh;
  margin-left: 10%;
  /* grid-row-gap: 1vh; */
`
export const QuizQuestionAnswerLabelContainer = styled.label`
  display: grid;
  justify-items: left;
  align-items: center;
  grid-auto-flow: column;
`
export const QuizQuestionAnswerInput = styled.input`
  display: grid;
  justify-items: left;
  align-items: center;
  font-size: 3vh;
`

export const QuizQuestionSubmitContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`

export const SubmitButton = styled.button`
  background-color: var(--blue);
  color: var(--white);
  font-size: 3vh;
  width: 25%;
  height: 15%;
`

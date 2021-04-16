import styled from 'styled-components'

export const CreateAssignmentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 95vh;
`

export const CourseSelectContainer = styled.div`
  background: var(--blue);
  color: var(--white);
  font-size: 4vh;
  cursor: pointer;
  display: grid;
  border-top: 3px solid var(--white);
  grid-template-rows: 5fr 1fr;
`
export const AssignmentCreatorContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
`

export const CreateAssignmentTitle = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 4vh;
`
export const AssignmentTypeSelectorContainer = styled.div`
  font-size: 3vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export type AssignmentTypeTypes = {
  selected: boolean
}

export const AssignmentType = styled.div<AssignmentTypeTypes>`
  display: grid;
  justify-items: center;
  align-items: center;
  border-bottom: ${({ selected }) =>
    selected ? '3px solid var(--blue)' : '3px solid var(--white)'};
  color: ${({ selected }) => (selected ? 'var(--blue)' : 'var(--grey)')};
`

export const LessonInformationSelectContainer = styled.div`
  height: 95%;
  display: grid;
  grid-template-rows: 5fr 1fr;
`

export const SelectorContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
`

export const SelectorTitle = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 3vh;
  text-decoration: underline;
`
export const ItemSelectorContainer = styled.div`
  font-size: 2.5vh;
  cursor: pointer;
  display: grid;
  grid-auto-rows: 10%;
  padding-left: 5%;
  height: 100%;
  overflow: scroll;
`
export const SelectableItem = styled.div`
  &:hover {
    text-decoration: underline;
  }
`
export const SelectButtonContainer = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
`
export const SelectButton = styled.button`
  width: 70%;
  height: 30%;
  font-size: 2.5vh;
  color: var(--white);
  background-color: var(--blue);
`
export const EssayInformationSelectContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 3fr 1fr;
`

export const DateAssignContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
`

export const DateAssignItemContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 85%;
  grid-auto-flow: column;
`

export const LinkCoursesContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`
export const LinkCoursesHeader = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 2vh;
  text-decoration: underline;
`
export const LinkCoursesCheckbox = styled.input`
  /* visibility: hidden; */
  &:checked {
    background-color: var(--blue);
  }
`

export const CoursesCheckBoxContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-self: center;
  justify-items: center;
  width: 100%;
`
export const DateAssignInput = styled.input`
  background-color: var(--white);
  color: var(--blue);
  font-size: 1.4vh;
  border: 1px solid var(--blue);
`

export const DateAssignSelect = styled.select`
  background-color: var(--white);
  color: var(--blue);
  font-size: 1.4vh;
  border: 1px solid var(--blue);
`
export const QuestionSelectContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`

export const QuestionSelector = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;
  padding: 2%;
`
export const MaxPointSelectorContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
`
export const GeneralInput = styled.input`
  background-color: var(--white);
  color: var(--blue);
  font-size: 1.4vh;
  border: 1px solid var(--blue);
`

export const AddQuestionForm = styled.form`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-rows: 20%;
`
export const AddQuestionTitle = styled.div`
  font-size: 2vh;
  text-decoration: underline;
`

export const AddQuestionSelect = styled.select`
  background-color: var(--white);
  color: var(--blue);
  font-size: 1.4vh;
  border: 1px solid var(--blue);
  width: 35vw;
`
export const AddQuestionLevelSelect = styled(AddQuestionSelect)`
  width: 15vw;
`
export const SelectedQuestionContainer = styled.div`
  grid-template-rows: 1fr 5fr;
  border: 1px solid var(--blue);
  margin: 1%;
  padding-left: 1%;
  padding-bottom: 1%;
  padding-right: 1%;
`

export const SelectedQuestionTitle = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 1.7vh;
`
export const SelectedQuestionsDisplay = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 93%;
`
export const DisplayedQuestionWritingLevelContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`

export type WritingLevelTitleContainerProps = { bottom: boolean }

export const WritingLevelTitleContainer = styled.div<WritingLevelTitleContainerProps>`
  display: grid;
  justify-items: center;
  align-items: center;
  border-top: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  border-bottom: ${({ bottom }) => (bottom ? '1px solid var(--grey)' : 'none')};
`

export type DisplayedQuestionsProps = {
  bottom: boolean
}

export const DisplayedQuestions = styled.div<DisplayedQuestionsProps>`
  border: 1px solid var(--grey);
  border-bottom: ${({ bottom }) => (bottom ? '1px solid var(--grey)' : 'none')};
  overflow: scroll;
  height: 9vh;
`
export const Question = styled.div`
  padding-left: 1%;
`

export const ReadingGuideInformationSelectContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 0fr 1fr;
`

export const MaxPointsForReadingGuideContainer = styled.div`
  height: 10vh;
`

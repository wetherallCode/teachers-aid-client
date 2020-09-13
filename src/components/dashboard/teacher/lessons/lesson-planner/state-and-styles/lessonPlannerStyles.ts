import styled from 'styled-components'
import { Standard8x12Container } from '../../../../../../appStyles'

export const LessonPlannerContainer = styled(Standard8x12Container)`
  height: 95vh;
`
export const LessonPlanOutput = styled.div`
  grid-row: 1/-1;
  grid-column: -4/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: repeat(12, 1fr);
  background-color: var(--blue);
  border-left: 3px solid var(--white);
  border-top: 3px solid var(--white);
  color: var(--white);
  font-size: 1.2rem;
`
export const LessonPlanOutputHeader = styled.div`
  font-size: 2rem;
  text-decoration: underline;
`

export const LessonPlannerDesignContainer = styled(Standard8x12Container)`
  grid-row: 1/-1;
  grid-column: 1/-4;
  border-right: 1px solid var(--blue);
  font-size: 1.2rem;
  /* border: 1px solid var(--blue); */
  /* border: 1px solid var(--blue); */
`

export const LessonPlanGeneralInfoContainer = styled.div`
  grid-row: 2/-1;
  grid-column: 1/-1;
  /* display: grid;
  justify-items: center;
  align-items: start; */
  font-size: 2.5rem;
`

export const LessonPlanDateAssign = styled.div`
  grid-row: 3/7;
  grid-column: 3/-3;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  font-size: 2.5rem;
`
export const LessonPlanDateInput = styled.input`
  width: 32%;
  height: 32%;
  font-size: 1.5rem;
  color: var(--blue);
`
export const LessonPlanMarkingPeriodSelect = styled.select`
  width: 32%;
  height: 32%;
  font-size: 1.5rem;
  color: var(--blue);
`

export const LessonPlannerHeader = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3rem;
  text-decoration: underline;
`

export const LessonPlannerSectionHeader = styled.div`
  grid-row: 2/3;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 1.5rem;
`

export const LessonPlannerSectionBody = styled.div`
  grid-row: 3/7;
  grid-column: 3/-3;
  font-size: 1.2rem;
  overflow: scroll;
`
export const LessonPlannerListSelectorOption = styled.div`
  width: max-content;
  height: max-content;
  cursor: default;
  :hover {
    text-decoration: underline;
  }
`
export const LessonPlannerButtonContainer = styled.div`
  grid-row: 7/9;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
`

export const LessonPlannerButton = styled.button`
  width: 80%;
  height: 20%;
  font-size: larger;
  background-color: var(--blue);
  color: var(--white);
`

export const TextPickerHeader = styled(LessonPlannerSectionHeader)``

export const TextPickerBody = styled(LessonPlannerSectionBody)``

export const TextPickerTextSelection = styled(LessonPlannerListSelectorOption)``

export const SectionPickerHeader = styled(LessonPlannerSectionHeader)``
export const SectionPickerBody = styled(TextPickerBody)`
  display: grid;
  grid-template-rows: 6fr 1fr;
`
export const SectionPickerSelectOptionsForm = styled.form`
  display: grid;
  grid-template-rows: 6fr 1fr;
`

export type SectionSelectorOptionProps = {
  selected: boolean
}
export const SectionSelectorOption = styled(LessonPlannerListSelectorOption)<
  SectionSelectorOptionProps
>`
  color: ${({ selected }) => (selected ? 'var(--grey)' : 'var(--blue)')};
`
export const SectionSelectorOptionAddButtonContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`
export const SectionSelectorOptionAddButton = styled(LessonPlannerButton)`
  justify-self: center;
  height: 50%;
`
export const SectionPickerButtonContainer = styled(
  LessonPlannerButtonContainer
)`
  grid-auto-flow: column;
`
export const SectionPickerNextButton = styled(LessonPlannerButton)``

export const UnitSectionBody = styled(LessonPlannerSectionBody)`
  /* grid-template-rows: 4fr 1fr; */
`
export type UnitSelectorOptionsProps = {
  selected: boolean
}
export const UnitSelectorOption = styled(LessonPlannerListSelectorOption)<
  UnitSelectorOptionsProps
>`
  color: ${({ selected }) => (selected ? 'var(--grey)' : 'var(--blue)')};
`

export const CreateUnitContainer = styled.div`
  grid-row: 6/7;
  grid-column: 3/-3;
  display: grid;
  justify-items: center;
  align-items: center;
`
export const CreateUnitInput = styled.input`
  width: 100%;
  font-size: inherit;
  color: inherit;
`
export const CreateUnitButton = styled(SectionSelectorOptionAddButton)`
  height: 75%;
`
export const LessonInfoContainer = styled(Standard8x12Container)``

export const LessonInfoTitleContainer = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 2rem;
`

export const LessonPlannerActivityBody = styled(Standard8x12Container)`
  grid-row: 3/-2;
  grid-column: 1/-1;
  grid-auto-flow: column;
`

export const VocabList = styled.div`
  grid-row: 2/-1;
  grid-column: 1/4;
  overflow: scroll;
`

export const LessonNameContainer = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
`
export const LessonNameTitle = styled.div`
  justify-self: right;
  padding-right: 10%;
`

export const LessonNameInput = styled.input`
  width: 80%;
  border: 1px solid var(--white);
  height: 40%;
  border-bottom: 1px solid var(--blue);
  justify-self: left;
  font-size: inherit;
  color: inherit;
`

export const ActivityContainer = styled.div`
  grid-row: 2/5;
  grid-column: 4/-1;
  overflow: scroll;
`

export const ActivitySelectorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  cursor: default;
`
export const ActivityCreatorStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-row-gap: 25%;
  padding-top: 5%;
`
export const ActivityCategorySelect = styled.select`
  width: 60%;
  font-size: 1.3rem;
  color: inherit;
`

export const ActivityCategoryInput = styled.input`
  width: 80%;
  font-size: inherit;
  color: inherit;
`
export const BeforeActivityContainer = styled(ActivityCreatorStyle)``
export const DuringActivityContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
`
export const DuringActivityTitle = styled.div`
  justify-self: center;
`
export const DuringActivityBody = styled.div`
  overflow: scroll;
`
export type DuringActivitySelectionProps = {
  selected: boolean
}
export const DuringActivitySelection = styled.div<DuringActivitySelectionProps>`
  :hover {
    text-decoration: underline;
  }
  color: ${({ selected }) => (selected ? 'var(--grey)' : 'var(--blue)')};
`

export const AfterActivityContainer = styled(ActivityCreatorStyle)``
export const EssentialQuestionContainer = styled.div`
  grid-row: 5/-2;
  grid-column: 4/-1;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
`
export const EssentialQuestionTitle = styled.div`
  font-size: 1.3rem;
  justify-self: center;
`

export const EssentialQuestionOptionsContainer = styled.div`
  overflow: scroll;
`
export type EssentialQuestionOptionSelectProps = {
  selected: boolean
}
export const EssentialQuestionOptionSelect = styled.div<
  EssentialQuestionOptionSelectProps
>`
  color: ${({ selected }) => (selected ? 'var(--grey)' : 'var(--blue)')};
`

export const EssentialQuestionAddContainter = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`
export const EssentialQuestionAddTitle = styled.div`
  justify-self: right;
  padding-right: 10%;
  align-self: center;
`
export const EssentialQuestionInput = styled.input`
  width: 90%;
  align-self: center;
  height: 50%;
  border: 1px solid var(--white);
  border-bottom: 1px solid var(--blue);
  font-size: inherit;
  color: inherit;
  justify-self: left;
`

export const AssignCourseContainer = styled.div`
  grid-row: 3/-3;
  grid-column: 1/-1;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
`
export const CourseToAssignContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  align-items: center;
`
export const AssignCourseCheckBox = styled.input`
  justify-self: right;
  height: 3rem;
  width: 4rem;
`
export const AssignCourseName = styled.div`
  justify-self: left;
  font-size: 2rem;
`

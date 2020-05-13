import React from 'react'
import { useSectionBuilderContextProvider } from './SectionBuilderContext'
import styled from 'styled-components'

export const SectionBuilderInfoDisplay = () => {
  const [state] = useSectionBuilderContextProvider()
  console.log(state.context)
  return (
    <SectionBuilderDisplayContainer>
      <FromTextAndChapterRow>
        <FromTextAndChapterSection>
          <div>Title: </div>
          <div>{state.context.fromText ? state.context.fromText : null}</div>
        </FromTextAndChapterSection>
        <FromTextAndChapterSection>
          <div>Chapter: </div>
          <div>
            {state.context.fromChapterTitle
              ? state.context.fromChapterTitle
              : null}
          </div>
        </FromTextAndChapterSection>
        <FromTextAndChapterSection>
          <div>Section Header: </div>
          <div>{state.context.header ? state.context.header : null}</div>
        </FromTextAndChapterSection>
        <FromTextAndChapterSection>
          <div>Pages: </div>
          {state.context.pageNumbers ? (
            <div>
              {state.context.pageNumbers.startingPage} -{' '}
              {state.context.pageNumbers.endingPage}
            </div>
          ) : null}
        </FromTextAndChapterSection>
      </FromTextAndChapterRow>
      <SectionBuilderDisplayLevelTwo>
        {/* VocabBox */}
        <LevelTwoContainers>
          <LevelTwoTitleBoxes>
            <div>Vocab</div>
          </LevelTwoTitleBoxes>
          <LevelTwoContainerVocabAndQuestions>
            {state.context.hasVocab.map((word) => (
              <div>
                {word.word}: {word.definition}
              </div>
            ))}
          </LevelTwoContainerVocabAndQuestions>
        </LevelTwoContainers>
        {/* QuestionsBox */}
        <LevelTwoContainers>
          <LevelTwoTitleBoxes>
            <div>Questions</div>
          </LevelTwoTitleBoxes>
          <LevelTwoContainerVocabAndQuestions>
            {state.context.hasQuestions.map((question) => (
              <div>{question.question}</div>
            ))}
          </LevelTwoContainerVocabAndQuestions>
        </LevelTwoContainers>
        {/* ProtocolBox */}
        <LevelTwoContainers>
          <LevelTwoTitleBoxes>
            <div>Protocols</div>
          </LevelTwoTitleBoxes>
          <LevelTwoContainerProtocols>
            {state.context.hasProtocols.map((protocol) => (
              <div>
                {protocol.activityType} - {protocol.task}
              </div>
            ))}
          </LevelTwoContainerProtocols>
        </LevelTwoContainers>
      </SectionBuilderDisplayLevelTwo>
    </SectionBuilderDisplayContainer>
  )
}

export const SectionBuilderDisplayContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 9fr;
`
export const SectionBuilderDisplayLevelTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid var(--blue);
`

export const FromTextAndChapterRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 5vh;
`

export const FromTextAndChapterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const LevelTwoContainers = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
`
export const LevelTwoTitleBoxes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
`
export const LevelTwoContainerVocabAndQuestions = styled(LevelTwoContainers)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-right: 1px solid var(--blue);
  overflow-y: scroll;
  overflow-x: hidden;
`
export const LevelTwoContainerProtocols = styled(LevelTwoContainers)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;
`

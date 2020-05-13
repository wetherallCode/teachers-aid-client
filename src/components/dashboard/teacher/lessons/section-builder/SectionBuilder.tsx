import React from 'react'
import { Title } from './sectionBuilderStyles'
import { TextListLoader } from './TextListLoader'
import { ChapterSelect } from './ChapterSelect'
import { VocabInfo } from './VocabInfo'
import { QuestionsInfo } from './QuestionsInfo'
import { ProtocolsInfo } from './ProtocolsInfo'
import { CreateTextSection } from './CreateTextSection'
import { useSectionBuilderContextProvider } from './SectionBuilderContext'
import { SectionBuilderInfoDisplay } from './SectionBuilderInfoDisplay'
import styled from 'styled-components'

export const SectionBuilder = () => {
  const [state, event] = useSectionBuilderContextProvider()

  return (
    <div>
      <Title>
        <div>Section Builder</div>
      </Title>
      {/* <DisplayInfoContainter> */}
      <div>
        <SectionBuilderInfoDisplay />
      </div>

      {/* </DisplayInfoContainter> */}
      <div>
        {state.matches('text') && (
          <div
            style={{
              height: '30vh',
              display: 'grid',
              gridTemplateColumns: '5fr 1fr',
            }}
          >
            <TextListLoader event={event} />
            <button onClick={() => event({ type: 'NEXT' })}>Next</button>
          </div>
        )}
        {state.matches('chapter') && (
          <>
            <button onClick={() => event({ type: 'PREVIOUS' })}>Back</button>
            <ChapterSelect state={state} event={event} />
            <button onClick={() => event({ type: 'NEXT' })}>Next</button>
          </>
        )}
        {state.matches('header') && (
          <div>
            <button onClick={() => event({ type: 'PREVIOUS' })}>Back</button>
            <div>Header:</div>
            <input
              type='text'
              name='header'
              onChange={(e: any) => {
                if (e.target.value !== '') {
                  event({ type: 'SET_HEADER', header: e.target.value })
                }
              }}
            />
            <button onClick={() => event({ type: 'NEXT' })}>Next</button>
          </div>
        )}
        {state.matches('pages') && (
          <>
            <div>
              <button onClick={() => event({ type: 'PREVIOUS' })}>Back</button>
              <div>Pages:</div>
              <input
                type='text'
                name='startingPage'
                onChange={(e) => {
                  if (Number(e.target.value) > 0) {
                    event({
                      type: 'SET_PAGE_NUMBERS',
                      payload: {
                        ...state.context.pageNumbers,
                        startingPage: Number(e.target.value),
                      },
                    })
                  }
                }}
              />
            </div>
            <div>
              <input
                type='text'
                name='endingPage'
                onChange={(e: any) => {
                  if (Number(e.target.value) > 0) {
                    event({
                      type: 'SET_PAGE_NUMBERS',
                      payload: {
                        ...state.context.pageNumbers,
                        endingPage: Number(e.target.value),
                      },
                    })
                  }
                }}
              />
              <button onClick={() => event({ type: 'NEXT' })}>Next</button>
            </div>
          </>
        )}
        {state.matches('vocab') && (
          <div>
            <button onClick={() => event({ type: 'PREVIOUS' })}>Back</button>
            <VocabInfo />
            <button
              onClick={() => {
                if (state.context.hasVocab.length > 0) {
                  event({ type: 'NEXT' })
                }
              }}
            >
              Next
            </button>
          </div>
        )}
        {state.matches('questions') && (
          <div>
            <button onClick={() => event({ type: 'PREVIOUS' })}>Back</button>
            <QuestionsInfo />
            <button
              onClick={() => {
                if (state.context.hasQuestions.length > 0) {
                  event({ type: 'NEXT' })
                }
              }}
            >
              Next
            </button>
          </div>
        )}
        {state.matches('protocols') && (
          <div>
            <button onClick={() => event({ type: 'PREVIOUS' })}>Back</button>
            <ProtocolsInfo />
            <button
              onClick={() => {
                if (state.context.hasProtocols.length > 0) {
                  event({ type: 'NEXT' })
                }
              }}
            >
              Next
            </button>
          </div>
        )}
        {state.matches('create') && (
          <div>
            <button onClick={() => event({ type: 'PREVIOUS' })}>Back</button>
            <CreateTextSection />
            <button onClick={() => event({ type: 'NEXT' })}>Next</button>
          </div>
        )}
      </div>
    </div>
  )
}

export const DisplayInfoContainter = styled.div`
  /* height: 50vh; */
`

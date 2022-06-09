import React, { useState } from 'react'
import { useSectionBuilderContextProvider } from './state/SectionBuilderContext'
import { TextSectionVocabInput } from '../../../../../schemaTypes'

export const VocabInfo = () => {
  const [vocabWordInfo, setVocabWordInfo] = useState<TextSectionVocabInput>({
    word: '',
    definition: '',
  })
  const [state, event] = useSectionBuilderContextProvider()

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault()
        setVocabWordInfo({ word: '', definition: '' })
      }}
    >
      <div>Vocab</div>
      <div>Word: </div>
      <input
        type='text'
        onChange={(e: any) =>
          setVocabWordInfo({ ...vocabWordInfo, word: e.target.value })
        }
      />
      <div>Definition: </div>
      <input
        type='text'
        onChange={(e: any) =>
          setVocabWordInfo({ ...vocabWordInfo, definition: e.target.value })
        }
      />
      <button
        type='reset'
        onClick={() =>
          event({ type: 'SET_VOCAB_LIST', payload: vocabWordInfo })
        }
      >
        Add Word
      </button>
    </form>
  )
}

import React, { Dispatch, FC, useState } from 'react'
import { TextSectionInputAction } from './SectionBuilderInfo'

type VocabInfoProps = {
  dispatch: Dispatch<TextSectionInputAction>
}

export const VocabInfo: FC<VocabInfoProps> = ({ dispatch }) => {
  const [vocabWordInfo, setVocabWordInfo] = useState({
    word: '',
    definition: '',
  })
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
          dispatch({ type: 'addVocabListItem', payload: vocabWordInfo })
        }
      >
        Add Word
      </button>
    </form>
  )
}

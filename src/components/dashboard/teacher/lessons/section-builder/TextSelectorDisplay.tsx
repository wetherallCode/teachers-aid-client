import React, { FC, Dispatch, SetStateAction, useEffect } from 'react'
import {
  findTextTitles_findTexts_texts,
  findChaptersInText_findChaptersInText_chapters,
} from '../../../../../schemaTypes'

type TextSelectorDisplayProps = {
  setTitle: Dispatch<
    SetStateAction<findTextTitles_findTexts_texts['textTitle']>
  >
  textList: findTextTitles_findTexts_texts[]
  chapterList: findChaptersInText_findChaptersInText_chapters[]
  setChapterList: Dispatch<
    SetStateAction<findChaptersInText_findChaptersInText_chapters[]>
  >
}

export const TextSelectorDisplay: FC<TextSelectorDisplayProps> = ({
  setTitle,
  textList,
  chapterList,
  setChapterList,
}) => {
  useEffect(() => {
    setChapterList(chapterList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterList])
  return (
    <div>
      <select
        name='title'
        onChange={(e: any) => setTitle(e.target.value)}
        // onChange={(e: any) => console.log(...[e.target.value])}
      >
        <option value={undefined}>Pick a Text</option>
        {textList.map((text: findTextTitles_findTexts_texts) => (
          <option key={text._id!} value={text.textTitle}>
            {text.textTitle}
          </option>
        ))}
      </select>
    </div>
  )
}

import React, { FC, Dispatch, SetStateAction } from 'react'
import { CenterItems } from './sectionBuilderStyles'
import { findChaptersInText_findChaptersInText_chapters } from '../../../../../schemaTypes'

type ChapterSelectorProps = {
  chapterList: findChaptersInText_findChaptersInText_chapters[]
  setChapterID: Dispatch<SetStateAction<string>>
}

export const ChapterSelector: FC<ChapterSelectorProps> = ({
  chapterList,
  setChapterID,
}) => {
  return (
    <div>
      <CenterItems>
        <div>Chapter</div>
        <select
          name='chapter'
          onChange={(e: any) => setChapterID(e.target.value)}
        >
          <option value={undefined}>Pick a Chapter</option>
          {chapterList.map((chapter) => (
            <option key={chapter._id!} value={chapter._id!}>
              {chapter.chapterTitle}
            </option>
          ))}
        </select>
      </CenterItems>
    </div>
  )
}

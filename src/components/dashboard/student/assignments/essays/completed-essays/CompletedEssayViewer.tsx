import React, { FC } from 'react'

export type CompletedEssayViewerProps = {
  draft: string
}

export const CompletedEssayViewer: FC<CompletedEssayViewerProps> = ({
  draft,
}) => {
  const [parsedEssay] = JSON.parse(draft)
  const text = parsedEssay.children[0].text
  return (
    <>
      <div>{text}</div>
    </>
  )
}

import React, { useMemo } from 'react'
import { createEditor } from 'slate'
import { withReact, Slate, Editable } from 'slate-react'

export type EssayViewerProps = { draft: string }

export const EssayViewer = ({ draft }: EssayViewerProps) => {
  const editor = useMemo(() => withReact(createEditor()), [])

  const parsedEssay = JSON.parse(draft)

  return (
    <>
      <div>
        <Slate
          editor={editor}
          value={parsedEssay as any}
          onChange={(value: any) => {
            // setValue(value as Node[])
          }}
        >
          <Editable
            // renderElement={renderElement}
            spellCheck
            onSelect={(e: any) => e.preventDefault()}
            onCopy={(e: any) => {
              e.preventDefault()
            }}
            autoFocus={true}
            // renderLeaf={renderLeaf}
            style={{
              height: '98%',
              userSelect: 'none',
            }}
          ></Editable>
        </Slate>
      </div>
    </>
  )
}

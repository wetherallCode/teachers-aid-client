import React, { useMemo, useState, useCallback, FC, useEffect } from 'react'

// import { CompletedEssayContainer } from './state/completedEssayStyles'

import { createEditor, Node } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

import {
	findEssayById_findEssayById_essay,
	UpdateWorkingDraft,
	UpdateWorkingDraftVariables,
	SubmittedFinalDraftsInput,
} from '../../../../../../schemaTypes'

import { useMutation } from '@apollo/client'
import { EssaySheet } from '../assigned-essays/state-and-styles/assignedEssayStyles'
import { Leaf } from '../../../../teacher/assignments/grade-assignments/essays/essay-grader/TeacherEssayEditor'

// type StudentEssayEditorProps = {
//   essay: findEssayById_findEssayById_essay
//   submittedFinalDraft: SubmittedFinalDraftsInput
// }

export type CompletedEssayViewerProps = {
	draft: string
}

export type submittedFinalDraftType = {
	draft: string
	gradingDraft: string
	comments: string[]
	score: number
}

export const CompletedEssayViewer: FC<CompletedEssayViewerProps> = ({ draft }) => {
	const editor = useMemo(() => withReact(createEditor()), [])

	const parsedEssay = JSON.parse(draft)
	const [value, setValue] = useState(parsedEssay)
	const content = JSON.stringify(value)

	const renderElement = useCallback((props) => {
		switch (props.element.type) {
			case 'code':
				return <CodeElement {...props} />
			default:
				return <DefaultElement {...props} />
		}
	}, [])

	const renderLeaf = useCallback((props) => {
		return <Leaf {...props} />
	}, [])

	return (
		<EssaySheet style={{ userSelect: 'all' }}>
			<Slate
				editor={editor}
				value={value as Node[]}
				onChange={(value: any) => {
					setValue(value as Node[])
				}}>
				<Editable
					renderElement={renderElement}
					spellCheck
					onSelect={(e: any) => {}}
					onCopy={(e: any) => {
						e.preventDefault()
					}}
					autoFocus={true}
					renderLeaf={renderLeaf}
					style={{
						height: '98%',
						userSelect: 'none',
					}}
					placeholder={`Your essay goes here; let's get started...`}
					onKeyDown={(e) => {
						// e.preventDefault()
						// if (e.key === 'Enter') return null
						// updateWorkingDraft()
						// if (!e.ctrlKey) {
						// return
						// }
						// switch (e.key) {
						//   case '`': {
						//     e.preventDefault()
						//     const [match] = Editor.nodes(editor, {
						//       match: (n) => n.type === 'code',
						//     })
						//     Transforms.setNodes(
						//       editor,
						//       { type: match ? 'paragraph' : 'code' },
						//       { match: (n) => Editor.isBlock(editor, n) }
						//     )
						//     break
						//   }
						//   case 'b': {
						//     e.preventDefault()
						//     CustomEditor.toggleBoldMark(editor)
						//     break
						//   }
						//   case 's': {
						//     e.preventDefault()
						//     CustomEditor.toggleStrikeThrough(editor)
						//     break
						//   }
						//   case 'u': {
						//     e.preventDefault()
						//     CustomEditor.toggleUnderline(editor)
						//     break
						//   }
						// case '17': {
						//   e.preventDefault()
						// }
						// }
					}}
				/>
			</Slate>
		</EssaySheet>
	)
}
const CodeElement = (props: any) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	)
}
const DefaultElement = (props: any) => {
	return (
		<p style={{ textIndent: '2%', userSelect: 'none' }} {...props.attributes}>
			{props.children}
		</p>
	)
}

// export const Leaf = (props: any) => {
//   return (
//     <span
//       {...props.attributes}
//       style={{
//         fontWeight: props.leaf.bold ? 'bold' : 'normal',
//         textDecoration: props.leaf.strikeThrough
//           ? 'line-through'
//           : props.leaf.underline
//           ? 'underline'
//           : 'none',
//       }}
//     >
//       {props.children}
//     </span>
//   )
// }

// export const CompletedEssayViewer: FC<CompletedEssayViewerProps> = ({
//   draft,
// }) => {
//   const [parsedEssay] = JSON.parse(draft)
//   const text = parsedEssay.children[0].text
//   return (
//     <>
//       <EssaySheet>{text}</EssaySheet>
//     </>
//   )
// }

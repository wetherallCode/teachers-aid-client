import { gql, MutationFunctionOptions, useMutation } from '@apollo/client'
import React, { Dispatch, FC, SetStateAction } from 'react'
import {
	findTemporaryTasks_findTemporaryTasks_temporaryTasks,
	markTemporaryTaskAbsentVariables,
	markTemporaryTaskAbsent,
	// gradeTemporaryTask,
	// gradeTemporaryTaskVariables,
} from '../../../../../schemaTypes'
// import { responsibilityPointConverter } from '../../../../../utils'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import { MarkAbsentContainer } from './state-n-styles/temporaryTaskStyles'

export type MarkAbsentProps = {
	setStudentPresent: Dispatch<SetStateAction<boolean>>
	studentPresent: boolean
	task: findTemporaryTasks_findTemporaryTasks_temporaryTasks
}

export const MARK_TEMPORARY_TASK_ABSENT_MUTATION = gql`
	mutation markTemporaryTaskAbsent($input: MarkTemporaryTaskAbsentInput!) {
		markTemporaryTaskAbsent(input: $input) {
			temporaryTask {
				_id
			}
		}
	}
`

export const MarkAbsent: FC<MarkAbsentProps> = ({ setStudentPresent, studentPresent, task }) => {
	const [, event] = useTemporaryTasksContextProvider()
	return (
		<MarkAbsentContainer>
			<input
				type='checkbox'
				disabled={task.answered}
				checked={!studentPresent}
				onChange={() => {
					setStudentPresent((studentPresent) => !studentPresent)
					studentPresent &&
						event({
							type: 'ADD_TO_ABSENT_LIST',
							payload: {
								taskNumber: task.taskNumber,
								studentIdToAdd: task.student._id!,
							},
						})
					!studentPresent &&
						event({
							type: 'DELETE_FROM_ABSENT_LIST',
							payload: {
								taskNumber: task.taskNumber,
								studentIdToDelete: task.student._id!,
							},
						})
				}}
			/>
		</MarkAbsentContainer>
	)
}

import { gql, useMutation } from '@apollo/client'
import React, { FC, useEffect, useState } from 'react'

import { useGradeCalculator } from '../../../../../hooks/useGradeCalculator'
import {
	findTemporaryTasks_findTemporaryTasks_temporaryTasks,
	gradeTemporaryTask,
	gradeTemporaryTaskVariables,
	markTemporaryTaskAbsentVariables,
	markTemporaryTaskAbsent,
} from '../../../../../schemaTypes'
import { responsibilityPointConverter } from '../../../../../utils'
import { MarkAbsent, MARK_TEMPORARY_TASK_ABSENT_MUTATION } from './MarkAbsent'
import { MarkComplete } from './MarkComplete'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import { TaskListData, TaskNameContainer } from './state-n-styles/temporaryTaskStyles'

export type TaskGraderProps = {
	task: findTemporaryTasks_findTemporaryTasks_temporaryTasks
	i: number
	absentStudentList?: findTemporaryTasks_findTemporaryTasks_temporaryTasks[]
}

export const GRADE_TEMPORARY_TASK_MUTATION = gql`
	mutation gradeTemporaryTask($input: GradeTemporaryTaskInput!) {
		gradeTemporaryTask(input: $input) {
			temporaryTask {
				_id
				student {
					firstName
				}
				answered
			}
		}
	}
`

export const TaskGrader: FC<TaskGraderProps> = ({ task, i }) => {
	const [state] = useTemporaryTasksContextProvider()
	const { grade } = useGradeCalculator(task.student._id!, task.markingPeriod)

	const [studentPresent, setStudentPresent] = useState(task.studentPresent)

	const [gradeTask] = useMutation<gradeTemporaryTask, gradeTemporaryTaskVariables>(
		GRADE_TEMPORARY_TASK_MUTATION,
		{
			refetchQueries: ['findTemporaryTasks'],
		}
	)

	const [markTemporaryTaskAbsent] = useMutation<
		markTemporaryTaskAbsent,
		markTemporaryTaskAbsentVariables
	>(MARK_TEMPORARY_TASK_ABSENT_MUTATION, {
		variables: { input: { taskId: task._id!, studentPresent } },
		onCompleted: (data) => console.log(data),
		refetchQueries: ['findTemporaryTasks'],
	})

	useEffect(() => {
		markTemporaryTaskAbsent()
	}, [studentPresent])

	useEffect(() => {
		const [absentList] = state.context.absentList.filter(
			(i) => i.taskNumber === state.context.taskNumber - 1
		)

		if (absentList && absentList.tasks.includes(task.student._id!)) {
			setStudentPresent(false)
		}
	}, [state.context.taskNumber])

	return (
		<TaskListData i={i}>
			<MarkAbsent
				setStudentPresent={setStudentPresent}
				studentPresent={studentPresent}
				task={task}
			/>
			<TaskNameContainer studentPresent={studentPresent}>
				{task.student.lastName}, {task.student.firstName} {studentPresent ? '' : '(Absent)'}
			</TaskNameContainer>
			<MarkComplete
				answered={task.answered}
				studentPresent={studentPresent}
				gradeTask={gradeTask}
				task={task!}
				grade={grade}
			/>
		</TaskListData>
	)
}

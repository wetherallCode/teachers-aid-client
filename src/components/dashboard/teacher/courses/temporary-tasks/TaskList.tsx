import React, { FC, useState } from 'react'
import { findTemporaryTasks_findTemporaryTasks_temporaryTasks } from '../../../../../schemaTypes'
import {
	TaskCompleteHeader,
	TaskListContainer,
	TaskListHeaders,
	TaskListTaskGraderContainer,
} from './state-n-styles/temporaryTaskStyles'
import { TaskGrader } from './TaskGrader'

export type TaskListProps = {
	taskList: findTemporaryTasks_findTemporaryTasks_temporaryTasks[]
}

export const TaskList: FC<TaskListProps> = ({ taskList }) => {
	return (
		<TaskListContainer>
			<TaskListHeaders>
				<div>Attendance</div>
				<div>Student</div>
				{/* <TaskCompleteHeader>Complete</TaskCompleteHeader> */}
			</TaskListHeaders>
			<TaskListTaskGraderContainer>
				{taskList.map((task, i: number) => (
					<TaskGrader key={task._id} task={task} i={i} />
				))}
			</TaskListTaskGraderContainer>
		</TaskListContainer>
	)
}

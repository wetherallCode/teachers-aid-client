import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
	CreateEssayQuestion,
	CreateEssayQuestionVariables,
	NounTypeEnum,
	VerbTypeEnum,
	QuestionWordEnum,
} from '../../../../../../schemaTypes'
import { useBuildEssayQuestionContextProvider } from './state-n-styles/BuildEssayQuestionContext'
import { EssayQuestionInfoContainer } from './state-n-styles/essayQuestionStyles'

export type EssayQuestionInformationProps = {}

export const CREATE_ESSAY_QUESTION_MUTATION = gql`
	mutation CreateEssayQuestion($input: CreateEssayQuestionInput!) {
		createEssayQuestion(input: $input) {
			essayQuestion {
				_id
			}
		}
	}
`

export type EssayQuestionStepsProps = 'create' | 'test'

export const EssayQuestionInformation = ({}: EssayQuestionInformationProps) => {
	const [state, event] = useBuildEssayQuestionContextProvider()
	const [essayQuestionSteps, setEssayQuestionSteps] = useState<EssayQuestionStepsProps>('create')
	const { nounTypeEnum, verbTypeEnum, questionWordEnum, questionTypeEnum } =
		useEnumContextProvider()
	console.log(state.context.essayQuestionInfo.questionPartsInput)

	const [createEssayQuestion] = useMutation<CreateEssayQuestion, CreateEssayQuestionVariables>(
		CREATE_ESSAY_QUESTION_MUTATION,
		{
			variables: { input: state.context.essayQuestionInfo },
			onCompleted: (data) => console.log(data),
			refetchQueries: [],
		}
	)
	return (
		<EssayQuestionInfoContainer>
			<div>
				<div>Essay Question Information</div>
				<div>Test Question</div>
			</div>
			<div>
				<div>Create New Question</div>
				<div>{state.context.essayQuestionInfo.questionPartsInput.originalQuestion}</div>
				<input
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'originalQuestion',
							payload: e.target.value.trim(),
						})
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'modifiedQuestion',
							payload: e.target.value.trim(),
						})
					}}
				/>
			</div>
			<div>
				<div>Complete Subject</div>
				<input
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'completeSubject',
							payload: e.target.value.trim(),
						})
					}}
				/>
			</div>
			<div>
				<div>Simple Subject</div>
				<input
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'simpleSubject',
							payload: e.target.value.trim(),
						})
					}}
				/>
			</div>
			<div>
				<div>Noun Type</div>
				<select
					value={state.context.essayQuestionInfo.questionPartsInput.nounType}
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'nounType',
							payload: e.target.value.trim(),
						})
					}}>
					{nounTypeEnum.map((nounType: NounTypeEnum) => (
						<option key={nounType}>{nounType}</option>
					))}
				</select>
			</div>
			<div>
				<div>Compound Noun</div>
				<select
					value={state.context.essayQuestionInfo.questionPartsInput.compoundNoun ? '1' : '0'}
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'compoundNoun',
							payload: e.target.value === '1' ? true : false,
						})
					}}>
					<option value={1}>Yes</option>
					<option value={0}>No</option>
				</select>
			</div>
			<div>
				<div>Complete Predicate</div>
				<input
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'completePredicate',
							payload: e.target.value.trim(),
						})
					}}
				/>
			</div>
			<div>
				<div>Simple Predicate</div>
				<input
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'simplePredicate',
							payload: e.target.value.trim(),
						})
					}}
				/>
			</div>
			<div>
				<div>Helping Verb</div>
				<input
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'helpingVerb',
							payload: e.target.value.trim(),
						})
					}}
				/>
			</div>
			<div>
				<div>Verb Type</div>
				<select
					value={state.context.essayQuestionInfo.questionPartsInput.verbType}
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'verbType',
							payload: e.target.value,
						})
					}}>
					{verbTypeEnum.map((verbType: VerbTypeEnum) => (
						<option key={verbType}>{verbType}</option>
					))}
				</select>
			</div>
			<div>
				<div>Question Word</div>
				<select
					value={state.context.essayQuestionInfo.questionPartsInput.questionWord}
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'questionWord',
							payload: e.target.value,
						})
					}}>
					{questionWordEnum.map((questionWord: QuestionWordEnum) => (
						<option key={questionWord}>{questionWord}</option>
					))}
				</select>
			</div>
			<div>
				<div>Object</div>
				<input
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'object',
							payload: e.target.value.trim(),
						})
					}}
				/>
			</div>
			<div>
				<div>Subject Compliment</div>
				<input
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'subjectCompliment',
							payload: e.target.value.trim(),
						})
					}}
				/>
			</div>
			<div>
				<div>Question Word</div>
				<select
					value={state.context.essayQuestionInfo.questionPartsInput.questionType}
					onChange={(e) => {
						event({
							type: 'SET_QUESTION_PARTS',
							keyName: 'questionType',
							payload: e.target.value,
						})
					}}>
					{questionTypeEnum.map((questionType: QuestionWordEnum) => (
						<option key={questionType}>{questionType}</option>
					))}
				</select>
			</div>
			<button onClick={() => createEssayQuestion()}>Create Question</button>
		</EssayQuestionInfoContainer>
	)
}

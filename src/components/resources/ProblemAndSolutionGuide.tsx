import React from 'react'
import styled from 'styled-components'

export const ProblemAndSolutionGuide = () => {
	return (
		<ProblemAndSolutionGuideContainer>
			<ProblemAndSolutionGuideInstructionsContainer>
				<div style={{ textAlign: 'center', textDecoration: 'underline' }}>Instructions</div>
				<div>Step One: Figure out who or what has a problem.</div>
				<div>Step Two: Use the diagram below to figure out the problem.</div>
			</ProblemAndSolutionGuideInstructionsContainer>
			<ProblemAndSolutionGuideDiagramContainer>
				<ProblemAndSolutionGuideDiagramColumn style={{ borderRight: 'none' }}>
					<ProblemAndSolutionGuideDiagramColumnHeader>
						<div>Solution Type</div>
					</ProblemAndSolutionGuideDiagramColumnHeader>
					<ProblemAndSolutionGuideDiagramColumnInformation>
						<div>Compromise</div>
						<div>Invention or Creation</div>
						<div style={{ padding: '2%' }}>
							Doing something a different way or Changing the way things are done
						</div>
					</ProblemAndSolutionGuideDiagramColumnInformation>
				</ProblemAndSolutionGuideDiagramColumn>
				<ProblemAndSolutionGuideDiagramColumn style={{ borderRight: 'none' }}>
					<ProblemAndSolutionGuideDiagramColumnHeader>
						<div>Problem Type</div>
					</ProblemAndSolutionGuideDiagramColumnHeader>
					<ProblemAndSolutionGuideDiagramColumnInformation>
						<div style={{ padding: '2%' }}>Two Sides can't agree on one or more things</div>
						<div style={{ padding: '2%' }}>
							Something can't be done with existing technology or ways of doing things
						</div>
						<div style={{ padding: '2%' }}>
							Something is wrong with the way things are currently being done
						</div>
					</ProblemAndSolutionGuideDiagramColumnInformation>
				</ProblemAndSolutionGuideDiagramColumn>
				<ProblemAndSolutionGuideDiagramColumn>
					<ProblemAndSolutionGuideDiagramColumnHeader>
						How to Figure Out the Problem
					</ProblemAndSolutionGuideDiagramColumnHeader>
					<ProblemAndSolutionGuideDiagramColumnInformation>
						<div style={{ padding: '2%' }}>
							Ask yourself: What is the thing that the to sides can't agree on, and why can't they
							agree?
						</div>
						<div style={{ padding: '2%' }}>
							Ask yourself: What is the thing that is stopping the person or thing, and why is it
							getting in the way
						</div>
						<div style={{ padding: '2%' }}>
							Ask yourself: What is wrong with the way things are done for the person, and why is
							that the person's problem?
						</div>
					</ProblemAndSolutionGuideDiagramColumnInformation>
				</ProblemAndSolutionGuideDiagramColumn>
			</ProblemAndSolutionGuideDiagramContainer>
		</ProblemAndSolutionGuideContainer>
	)
}

export const ProblemAndSolutionGuideContainer = styled.div`
	background-color: var(--white);
	color: var(--blue);
	display: grid;
	align-items: center;
	justify-items: center;
	height: 95vh;
	font-size: 2.5vh;
`

export const ProblemAndSolutionGuideInstructionsContainer = styled.div`
	display: grid;
	grid-template-rows: 1fr 2fr;
	width: 100%;
	margin-left: 5%;
`
export const ProblemAndSolutionGuideDiagramContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 90vw;
	height: 80vh;
`
export const ProblemAndSolutionGuideDiagramColumn = styled.div`
	display: grid;
	grid-template-rows: 1fr 4fr;
	border: 1px solid var(--blue);
`
export const ProblemAndSolutionGuideDiagramColumnHeader = styled.div`
	justify-items: center;
	align-items: center;
	height: 100%;
	border-bottom: 1px solid var(--blue);
	display: grid;
`
export const ProblemAndSolutionGuideDiagramColumnInformation = styled.div`
	justify-items: center;
	align-items: center;
	height: 100%;
	/* border-bottom: 1px solid var(--blue); */
	display: grid;
	grid-auto-rows: 1fr;
`

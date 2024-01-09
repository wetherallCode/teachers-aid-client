import {
  AssignmentDashboardDisplayContainer,
  AssignmentDisplayOptionsContainer,
  AssignmentsDisplayOptionsLink,
  AssignmentTitle,
} from './assignmentDashboardStyles'

export type AssignmentDashboardDisplayProps = {}

export const AssignmentDashboardDisplay =
  ({}: AssignmentDashboardDisplayProps) => {
    return (
      <AssignmentDashboardDisplayContainer>
        <AssignmentTitle>Assignments</AssignmentTitle>
        <AssignmentDisplayOptionsContainer>
          <AssignmentsDisplayOptionsLink to="create">
            Create
          </AssignmentsDisplayOptionsLink>
          <AssignmentsDisplayOptionsLink to="grade">
            Grade
          </AssignmentsDisplayOptionsLink>
          <AssignmentsDisplayOptionsLink to="check">
            Check
          </AssignmentsDisplayOptionsLink>
        </AssignmentDisplayOptionsContainer>
      </AssignmentDashboardDisplayContainer>
    )
  }

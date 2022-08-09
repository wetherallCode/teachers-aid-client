import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { findAllBehaviorTypes } from '../../../../schemaTypes'
import { EditBehaviors } from './EditBehaviors'
import { BehaviorListContainer } from './behaviorStyles'

export type BehaviorTypeListProps = {}

export const FIND_ALL_BEHAVIOR_TYPES_QUERY = gql`
  query findAllBehaviorTypes {
    findAllBehaviorTypes {
      behaviorTypes {
        _id
        behaviorName
        behaviorQuality
        behaviorCategory
        points
        forTeachersAid
      }
    }
  }
`

export const BehaviorTypeList = ({}: BehaviorTypeListProps) => {
  const { loading, data } = useQuery<findAllBehaviorTypes>(
    FIND_ALL_BEHAVIOR_TYPES_QUERY,
    {
      onCompleted: (data) => console.log(data),
      onError: (error) => console.error(error),
    }
  )

  if (loading) return <div>Loading </div>
  return (
    <>
      <BehaviorListContainer>
        {data?.findAllBehaviorTypes.behaviorTypes.map((behavior) => (
          <EditBehaviors behavior={behavior} key={behavior._id} />
        ))}
      </BehaviorListContainer>
    </>
  )
}

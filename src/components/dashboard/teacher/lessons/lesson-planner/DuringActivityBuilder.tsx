import React, { useEffect, useState } from 'react'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import {
  LessonTypeEnum,
  ProtocolActivityTypes,
  TextSectionProtocolsInput,
} from '../../../../../schemaTypes'
import { underscoreEliminator, phraseCapitalizer } from '../../../../../utils'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import {
  ActivityCategorySelect,
  AddProtocolButton,
  DuringActivityBody,
  DuringActivityBuilderContainer,
  DuringActivityConstructorContainer,
  DuringActivitySelection,
  DuringActivityTitle,
  DuringActivityTitleContainer,
  ProtocolConstructorInfoContainer,
  ProtocolConstructorTitle,
  SelectedProtocolContainer,
  SelectedProtocolItem,
} from './state-and-styles/lessonPlannerStyles'

export type DuringActivityBuilderProps = {
  protocolList: TextSectionProtocolsInput[]
}

export const DuringActivityBuilder = ({
  protocolList,
}: DuringActivityBuilderProps) => {
  const [state, event] = useLessonPlannerContextProvider()
  const [protocolListState, setprotocolListState] = useState<
    'PROTOCOLS_TO_SELECT' | 'SELECTED_PROTOCOLS'
  >('PROTOCOLS_TO_SELECT')

  const { protocolActivityTypes } = useEnumContextProvider()

  const [protocolSelectList, setProtocolSelectList] = useState<
    TextSectionProtocolsInput[]
  >([...state.context.duringActivity])

  const [protocolToAdd, setProtocolToAdd] =
    useState<TextSectionProtocolsInput | null>(null)

  useEffect(() => {
    event({ type: 'SET_DURING_ACTIVITY', payload: protocolSelectList })
  }, [protocolSelectList, event])

  const unUsedProtocolList = protocolList.reduce(
    (acc: TextSectionProtocolsInput[], i) =>
      protocolSelectList.some((protocol) => protocol.task === i.task)
        ? [...acc]
        : [...acc, i],
    [],
  )
  const selectedProtocolList = protocolList.filter((protocol) =>
    protocolSelectList.some((p) => p.task === protocol.task),
  )

  useEffect(() => {
    if (selectedProtocolList.length === 0) {
      setprotocolListState('PROTOCOLS_TO_SELECT')
    }
  }, [selectedProtocolList])
  console.log(state.context.lessonType === LessonTypeEnum.INTRODUCTORY)
  return (
    <DuringActivityBuilderContainer>
      <>
        {state.context.lessonType === LessonTypeEnum.INTRODUCTORY && (
          <div>Introductory Lessons don't have protocols during class.</div>
        )}
        {state.context.lessonType === LessonTypeEnum.REINFORCEMENT && (
          <>
            <DuringActivityTitleContainer>
              <DuringActivityTitle
                onClick={() => setprotocolListState('PROTOCOLS_TO_SELECT')}
              >
                Select from these Protocols
              </DuringActivityTitle>
              {protocolSelectList.length > 0 && (
                <DuringActivityTitle
                  onClick={() => setprotocolListState('SELECTED_PROTOCOLS')}
                >
                  During Protocol List ({protocolSelectList.length})
                </DuringActivityTitle>
              )}
            </DuringActivityTitleContainer>
            {protocolListState === 'PROTOCOLS_TO_SELECT' ? (
              <>
                <DuringActivityBody>
                  {unUsedProtocolList.map((item, i) => {
                    const selected = protocolToAdd?.task === item.task
                    return (
                      <DuringActivitySelection
                        key={i}
                        selected={
                          selected ||
                          protocolSelectList.some(
                            (protocol) => protocol.task === item.task,
                          )
                        }
                        onClick={() => {
                          const protocolListIndexIndex = protocolList.findIndex(
                            (index) => index.task === item.task,
                          )
                          const protocolSelectListIndex =
                            protocolSelectList.findIndex(
                              (index) => index.task === item.task,
                            )

                          if (!selected) {
                            setProtocolToAdd(
                              protocolList[protocolListIndexIndex],
                            )
                          }
                          if (selected) {
                            if (
                              protocolToAdd!.task ===
                                protocolList[protocolListIndexIndex].task &&
                              protocolSelectListIndex === -1
                            ) {
                              setProtocolToAdd(null)
                            } else {
                              const index = protocolSelectList.findIndex(
                                (items) => items.task === item.task,
                              )
                              setProtocolSelectList([
                                ...protocolSelectList.slice(0, index),
                                ...protocolSelectList.slice(index + 1),
                              ])
                            }
                          }
                        }}
                      >
                        {item.task}
                      </DuringActivitySelection>
                    )
                  })}
                </DuringActivityBody>
                {protocolToAdd && (
                  <DuringActivityConstructorContainer>
                    <ProtocolConstructorTitle>
                      Construct Protocol
                    </ProtocolConstructorTitle>
                    <ProtocolConstructorInfoContainer>
                      <div>Activity Type</div>
                      <ActivityCategorySelect
                        value={protocolToAdd.activityType}
                        onChange={(e: any) => {
                          if (e.target.value !== 'none') {
                            setProtocolToAdd({
                              ...protocolToAdd,
                              activityType: e.target.value,
                            })
                          }
                        }}
                      >
                        <option value="none">Select Activity Type</option>
                        {protocolActivityTypes.map(
                          (type: ProtocolActivityTypes) => {
                            const normalizedType = underscoreEliminator(type)
                            return (
                              <option key={type!} value={type}>
                                {phraseCapitalizer(normalizedType)}
                              </option>
                            )
                          },
                        )}
                      </ActivityCategorySelect>
                    </ProtocolConstructorInfoContainer>
                    <AddProtocolButton
                      onClick={() => {
                        const protocolIndex = protocolList.findIndex(
                          (index) => index.task === protocolToAdd.task,
                        )
                        console.log(protocolIndex)
                        setProtocolSelectList([
                          ...protocolSelectList,
                          protocolToAdd,
                        ])
                        setProtocolToAdd(null)
                      }}
                    >
                      Add to Protocol List
                    </AddProtocolButton>
                  </DuringActivityConstructorContainer>
                )}
              </>
            ) : (
              <SelectedProtocolContainer>
                <div>
                  {selectedProtocolList.map((item, i) => (
                    <SelectedProtocolItem
                      key={i}
                      onClick={() => {
                        const index = protocolSelectList.findIndex(
                          (items) => items.task === item.task,
                        )
                        setProtocolSelectList([
                          ...protocolSelectList.slice(0, index),
                          ...protocolSelectList.slice(index + 1),
                        ])
                      }}
                    >
                      {item.task}
                    </SelectedProtocolItem>
                  ))}
                </div>

                <AddProtocolButton onClick={() => setProtocolSelectList([])}>
                  Reset Protocol List
                </AddProtocolButton>
              </SelectedProtocolContainer>
            )}
          </>
        )}
      </>
    </DuringActivityBuilderContainer>
  )
}

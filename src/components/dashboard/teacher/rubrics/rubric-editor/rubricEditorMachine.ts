import { Machine, assign } from 'xstate'
import {
  WritingLevelEnum,
  RubricSectionEnum,
  findRubricEntries_findRubricEntries_rubricEntries,
} from '../../../../../schemaTypes'

export type rubricEditorMachineSchema = {
  states: {
    selectEntry: {}
    edit: {}
    delete: {}
  }
}
export type rubricEditorMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'DELETE' }
  | { type: 'DELETED' }
  | { type: 'SET_WRITING_LEVEL'; payload: WritingLevelEnum }
  | { type: 'SET_WRITING_LEVEL_SELECTOR'; payload: number }
  | { type: 'SET_RUBRIC_SECTION'; payload: RubricSectionEnum }
  | { type: 'SET_RUBRIC_SECTION_SELECTOR'; payload: number }
  | {
      type: 'SET_RUBRIC_ENTRIES'
      payload: findRubricEntries_findRubricEntries_rubricEntries[]
    }
  | {
      type: 'SET_RUBRIC_ENTRY'
      payload: findRubricEntries_findRubricEntries_rubricEntries
    }
  | {
      type: 'SET_EDITABLE_ENTRY'
      payload: findRubricEntries_findRubricEntries_rubricEntries
    }
  | {
      type: 'SET_EDITABLE_ENTRY_WRITING_LEVEL_LIST'
      payload: WritingLevelEnum[]
    }

export type rubricEditorMachineContext = {
  writingLevelSelector: number
  writingLevel: WritingLevelEnum
  rubricSection: RubricSectionEnum
  rubricSectionSelector: number
  rubricEntries: findRubricEntries_findRubricEntries_rubricEntries[]
  selectedRubricEntry: findRubricEntries_findRubricEntries_rubricEntries
  editableRubricEntry: findRubricEntries_findRubricEntries_rubricEntries
}

export const rubricEditorMachine = Machine<
  rubricEditorMachineContext,
  rubricEditorMachineSchema,
  rubricEditorMachineEvent
>({
  id: 'rubricEditor',
  // type: 'parallel',
  initial: 'selectEntry',
  context: {
    writingLevelSelector: 0,
    writingLevel: WritingLevelEnum.DEVELOPING,
    rubricSection: RubricSectionEnum.OVERALL,
    rubricSectionSelector: 0,
    rubricEntries: [],
    selectedRubricEntry: {
      __typename: 'RubricEntry',
      _id: '',
      entry: '',
      rubricWritingLevels: [],
      rubricSection: RubricSectionEnum.ANSWER,
      score: 0,
    },
    editableRubricEntry: {
      __typename: 'RubricEntry',
      _id: '',
      entry: '',
      rubricWritingLevels: [],
      rubricSection: RubricSectionEnum.ANSWER,
      score: 0,
    },
  },
  states: {
    selectEntry: {
      on: {
        NEXT: 'edit',
        SET_WRITING_LEVEL_SELECTOR: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              writingLevelSelector: evt.payload,
            }
          }),
        },
        SET_WRITING_LEVEL: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              writingLevel: evt.payload,
            }
          }),
        },
        SET_RUBRIC_SECTION: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              rubricSection: evt.payload,
            }
          }),
        },
        SET_RUBRIC_SECTION_SELECTOR: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              rubricSectionSelector: evt.payload,
            }
          }),
        },
        SET_RUBRIC_ENTRIES: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              rubricEntries: evt.payload,
            }
          }),
        },
        SET_RUBRIC_ENTRY: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              selectedRubricEntry: evt.payload,
              editableRubricEntry: evt.payload,
            }
          }),
        },
      },
    },
    edit: {
      on: {
        PREVIOUS: 'selectEntry',
        DELETE: 'delete',
        SET_EDITABLE_ENTRY: {
          actions: assign((ctx, evt) => {
            console.log(evt.payload)
            return {
              ...ctx,
              editableRubricEntry: evt.payload,
            }
          }),
        },
        SET_EDITABLE_ENTRY_WRITING_LEVEL_LIST: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              editableRubricWritingLevelList: evt.payload,
            }
          }),
        },
      },
    },
    delete: {
      on: {
        PREVIOUS: 'edit',
        DELETED: 'selectEntry',
      },
    },
  },
})

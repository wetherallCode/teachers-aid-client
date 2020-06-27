/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findEssaysToComplete
// ====================================================

export interface findEssaysToComplete_findEssaysToCompleteByStudentId_essays_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findEssaysToComplete_findEssaysToCompleteByStudentId_essays_topic {
  __typename: "Topic";
  writingLevel: WritingLevelEnum;
}

export interface findEssaysToComplete_findEssaysToCompleteByStudentId_essays {
  __typename: "Essay";
  _id: string | null;
  readings: findEssaysToComplete_findEssaysToCompleteByStudentId_essays_readings;
  topic: findEssaysToComplete_findEssaysToCompleteByStudentId_essays_topic;
}

export interface findEssaysToComplete_findEssaysToCompleteByStudentId {
  __typename: "FindEssaysToCompleteByStudentIdPayload";
  essays: findEssaysToComplete_findEssaysToCompleteByStudentId_essays[];
}

export interface findEssaysToComplete {
  findEssaysToCompleteByStudentId: findEssaysToComplete_findEssaysToCompleteByStudentId;
}

export interface findEssaysToCompleteVariables {
  input: FindEssaysToCompleteByStudentIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findEssayById
// ====================================================

export interface findEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer_developingSentenceStructure {
  __typename: "DevelopingSentenceStructure";
  subject: string;
  verb: string;
}

export interface findEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer {
  __typename: "DevelopingOrganizer";
  basicQuestionType: BasicQuestionEnum | null;
  developingSentenceStructure: findEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer_developingSentenceStructure;
  restatement: string;
  answer: string;
  conclusion: string;
}

export interface findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_academicSentenceStructure {
  __typename: "AcademicSentenceStructure";
  subject: string;
  verb: string;
  object: string | null;
}

export interface findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_ProblemSolutionAnswerType {
  __typename: "ProblemSolutionAnswerType";
  problem: string;
  reasonForProblem: string;
  solvedBy: string;
  whySolutionSolved: string;
}

export interface findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_HowCauseEffectAnswerType {
  __typename: "HowCauseEffectAnswerType";
  before: string;
  cause: string;
  after: string;
}

export interface findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_WhyCauseEffectAnswerType {
  __typename: "WhyCauseEffectAnswerType";
  ultimateCause: string;
  proximateCause: string;
}

export type findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType = findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_ProblemSolutionAnswerType | findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_HowCauseEffectAnswerType | findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_WhyCauseEffectAnswerType;

export interface findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer {
  __typename: "AcademicOrganizer";
  academicSentenceStructure: findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_academicSentenceStructure;
  restatement: string;
  conclusion: string;
  questionType: QuestionTypeEnum | null;
  answerType: findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType | null;
}

export interface findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_advancedSentenceStructure {
  __typename: "AdvancedSentenceStructure";
  subject: string;
  verb: string;
  object: string | null;
}

export interface findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_ProblemSolutionAnswerType {
  __typename: "ProblemSolutionAnswerType";
  problem: string;
  reasonForProblem: string;
  solvedBy: string;
  whySolutionSolved: string;
}

export interface findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_HowCauseEffectAnswerType {
  __typename: "HowCauseEffectAnswerType";
  before: string;
  cause: string;
  after: string;
}

export interface findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_WhyCauseEffectAnswerType {
  __typename: "WhyCauseEffectAnswerType";
  ultimateCause: string;
  proximateCause: string;
}

export type findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType = findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_ProblemSolutionAnswerType | findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_HowCauseEffectAnswerType | findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_WhyCauseEffectAnswerType;

export interface findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer {
  __typename: "AdvancedOrganizer";
  advancedSentenceStructure: findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_advancedSentenceStructure;
  answerType: findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType | null;
  restatement: string;
  conclusion: string;
  questionType: QuestionTypeEnum | null;
}

export type findEssayById_findEssayById_essay_workingDraft_organizer = findEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer | findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer | findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer;

export interface findEssayById_findEssayById_essay_workingDraft {
  __typename: "WorkingDraft";
  organizer: findEssayById_findEssayById_essay_workingDraft_organizer | null;
  draft: any;
}

export interface findEssayById_findEssayById_essay_readings {
  __typename: "Readings";
  readingPages: string;
  readingSections: string;
}

export interface findEssayById_findEssayById_essay_topic {
  __typename: "Topic";
  question: string;
  questionType: QuestionTypeEnum;
  writingLevel: WritingLevelEnum;
}

export interface findEssayById_findEssayById_essay {
  __typename: "Essay";
  _id: string | null;
  workingDraft: findEssayById_findEssayById_essay_workingDraft;
  readings: findEssayById_findEssayById_essay_readings;
  dueDate: any;
  dueTime: string;
  topic: findEssayById_findEssayById_essay_topic;
}

export interface findEssayById_findEssayById {
  __typename: "FindEssayByIdPayload";
  essay: findEssayById_findEssayById_essay;
}

export interface findEssayById {
  findEssayById: findEssayById_findEssayById;
}

export interface findEssayByIdVariables {
  input: FindEssayByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateWorkingDraft
// ====================================================

export interface UpdateWorkingDraft_updateWorkingDraft_essay_workingDraft {
  __typename: "WorkingDraft";
  draft: any;
}

export interface UpdateWorkingDraft_updateWorkingDraft_essay {
  __typename: "Essay";
  workingDraft: UpdateWorkingDraft_updateWorkingDraft_essay_workingDraft;
}

export interface UpdateWorkingDraft_updateWorkingDraft {
  __typename: "UpdateWorkingDraftPayload";
  essay: UpdateWorkingDraft_updateWorkingDraft_essay;
}

export interface UpdateWorkingDraft {
  updateWorkingDraft: UpdateWorkingDraft_updateWorkingDraft;
}

export interface UpdateWorkingDraftVariables {
  input: UpdateWorkingDraftInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setAnswerType
// ====================================================

export interface setAnswerType_setAnswerType_essay {
  __typename: "Essay";
  _id: string | null;
}

export interface setAnswerType_setAnswerType {
  __typename: "SetAnswerTypePayload";
  essay: setAnswerType_setAnswerType_essay;
}

export interface setAnswerType {
  setAnswerType: setAnswerType_setAnswerType;
}

export interface setAnswerTypeVariables {
  input: SetAnswerTypeInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateHowCauseEffect
// ====================================================

export interface updateHowCauseEffect_updateHowCauseEffect_essay {
  __typename: "Essay";
  _id: string | null;
}

export interface updateHowCauseEffect_updateHowCauseEffect {
  __typename: "UpdateHowCauseEffectPayload";
  essay: updateHowCauseEffect_updateHowCauseEffect_essay;
}

export interface updateHowCauseEffect {
  updateHowCauseEffect: updateHowCauseEffect_updateHowCauseEffect;
}

export interface updateHowCauseEffectVariables {
  input: UpdateHowCauseEffectInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateAcademicOrganizer
// ====================================================

export interface updateAcademicOrganizer_updateAcademicOrganizer_essay {
  __typename: "Essay";
  _id: string | null;
}

export interface updateAcademicOrganizer_updateAcademicOrganizer {
  __typename: "UpdateAcademicOrganizerPayload";
  essay: updateAcademicOrganizer_updateAcademicOrganizer_essay;
}

export interface updateAcademicOrganizer {
  updateAcademicOrganizer: updateAcademicOrganizer_updateAcademicOrganizer;
}

export interface updateAcademicOrganizerVariables {
  input: UpdateAcademicOrganizerInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProblemSolution
// ====================================================

export interface updateProblemSolution_updateProblemSolution_essay {
  __typename: "Essay";
  _id: string | null;
}

export interface updateProblemSolution_updateProblemSolution {
  __typename: "UpdateProblemSolutionPayload";
  essay: updateProblemSolution_updateProblemSolution_essay;
}

export interface updateProblemSolution {
  updateProblemSolution: updateProblemSolution_updateProblemSolution;
}

export interface updateProblemSolutionVariables {
  input: UpdateProblemSolutionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateWhyCauseEffect
// ====================================================

export interface updateWhyCauseEffect_updateWhyCauseEffect_essay {
  __typename: "Essay";
  _id: string | null;
}

export interface updateWhyCauseEffect_updateWhyCauseEffect {
  __typename: "UpdateWhyCauseEffectPayload";
  essay: updateWhyCauseEffect_updateWhyCauseEffect_essay;
}

export interface updateWhyCauseEffect {
  updateWhyCauseEffect: updateWhyCauseEffect_updateWhyCauseEffect;
}

export interface updateWhyCauseEffectVariables {
  input: UpdateWhyCauseEffectInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateAdvancedOrganizer
// ====================================================

export interface updateAdvancedOrganizer_updateAdvancedOrganizer_essay {
  __typename: "Essay";
  _id: string | null;
}

export interface updateAdvancedOrganizer_updateAdvancedOrganizer {
  __typename: "UpdateAdvancedOrganizerPayload";
  essay: updateAdvancedOrganizer_updateAdvancedOrganizer_essay;
}

export interface updateAdvancedOrganizer {
  updateAdvancedOrganizer: updateAdvancedOrganizer_updateAdvancedOrganizer;
}

export interface updateAdvancedOrganizerVariables {
  input: UpdateAdvancedOrganizerInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateDevelopingOrganizer
// ====================================================

export interface updateDevelopingOrganizer_updateDevelopingOrganizer_essay {
  __typename: "Essay";
  _id: string | null;
}

export interface updateDevelopingOrganizer_updateDevelopingOrganizer {
  __typename: "UpdateDevelopingOrganizerPayload";
  essay: updateDevelopingOrganizer_updateDevelopingOrganizer_essay;
}

export interface updateDevelopingOrganizer {
  updateDevelopingOrganizer: updateDevelopingOrganizer_updateDevelopingOrganizer;
}

export interface updateDevelopingOrganizerVariables {
  input: UpdateDevelopingOrganizerInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setOrganizer
// ====================================================

export interface setOrganizer_setOrganizer_essay_workingDraft_organizer_DevelopingOrganizer_developingSentenceStructure {
  __typename: "DevelopingSentenceStructure";
  subject: string;
  verb: string;
}

export interface setOrganizer_setOrganizer_essay_workingDraft_organizer_DevelopingOrganizer {
  __typename: "DevelopingOrganizer";
  developingSentenceStructure: setOrganizer_setOrganizer_essay_workingDraft_organizer_DevelopingOrganizer_developingSentenceStructure;
  restatement: string;
  conclusion: string;
}

export interface setOrganizer_setOrganizer_essay_workingDraft_organizer_AcademicOrganizer_academicSentenceStructure {
  __typename: "AcademicSentenceStructure";
  subject: string;
  verb: string;
  object: string | null;
}

export interface setOrganizer_setOrganizer_essay_workingDraft_organizer_AcademicOrganizer {
  __typename: "AcademicOrganizer";
  academicSentenceStructure: setOrganizer_setOrganizer_essay_workingDraft_organizer_AcademicOrganizer_academicSentenceStructure;
  restatement: string;
  conclusion: string;
}

export interface setOrganizer_setOrganizer_essay_workingDraft_organizer_AdvancedOrganizer_advancedSentenceStructure {
  __typename: "AdvancedSentenceStructure";
  subject: string;
  verb: string;
  object: string | null;
}

export interface setOrganizer_setOrganizer_essay_workingDraft_organizer_AdvancedOrganizer {
  __typename: "AdvancedOrganizer";
  advancedSentenceStructure: setOrganizer_setOrganizer_essay_workingDraft_organizer_AdvancedOrganizer_advancedSentenceStructure;
  restatement: string;
  conclusion: string;
}

export type setOrganizer_setOrganizer_essay_workingDraft_organizer = setOrganizer_setOrganizer_essay_workingDraft_organizer_DevelopingOrganizer | setOrganizer_setOrganizer_essay_workingDraft_organizer_AcademicOrganizer | setOrganizer_setOrganizer_essay_workingDraft_organizer_AdvancedOrganizer;

export interface setOrganizer_setOrganizer_essay_workingDraft {
  __typename: "WorkingDraft";
  organizer: setOrganizer_setOrganizer_essay_workingDraft_organizer | null;
}

export interface setOrganizer_setOrganizer_essay {
  __typename: "Essay";
  workingDraft: setOrganizer_setOrganizer_essay_workingDraft;
}

export interface setOrganizer_setOrganizer {
  __typename: "SetOrganizerPayload";
  essay: setOrganizer_setOrganizer_essay;
}

export interface setOrganizer {
  setOrganizer: setOrganizer_setOrganizer;
}

export interface setOrganizerVariables {
  input: SetOrganizerInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: submitEssayFinalDraft
// ====================================================

export interface submitEssayFinalDraft_submitEssayFinalDraft_essay {
  __typename: "Essay";
  _id: string | null;
}

export interface submitEssayFinalDraft_submitEssayFinalDraft {
  __typename: "SubmitEssayFinalDraftPayload";
  essay: submitEssayFinalDraft_submitEssayFinalDraft_essay;
}

export interface submitEssayFinalDraft {
  submitEssayFinalDraft: submitEssayFinalDraft_submitEssayFinalDraft;
}

export interface submitEssayFinalDraftVariables {
  input: SubmitEssayFinalDraftInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createEssay
// ====================================================

export interface createEssay_createEssay_essays {
  __typename: "Essay";
  _id: string | null;
}

export interface createEssay_createEssay {
  __typename: "CreateEssayPayload";
  essays: createEssay_createEssay_essays[];
}

export interface createEssay {
  createEssay: createEssay_createEssay;
}

export interface createEssayVariables {
  input: CreateEssayInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findLessonById
// ====================================================

export interface findLessonById_findLessonById_lesson_questionList {
  __typename: "TextSectionQuestions";
  question: string;
  questionType: QuestionTypeEnum;
}

export interface findLessonById_findLessonById_lesson_pageNumbers {
  __typename: "PageNumbers";
  startingPage: number;
  endingPage: number;
}

export interface findLessonById_findLessonById_lesson_assignedSections {
  __typename: "LessonTextSections";
  startingSection: string;
  endingSection: string;
}

export interface findLessonById_findLessonById_lesson {
  __typename: "Lesson";
  _id: string | null;
  questionList: findLessonById_findLessonById_lesson_questionList[];
  pageNumbers: findLessonById_findLessonById_lesson_pageNumbers;
  assignedSections: findLessonById_findLessonById_lesson_assignedSections;
  linkedCourseIds: string[];
}

export interface findLessonById_findLessonById {
  __typename: "FindLessonByIdPayload";
  lesson: findLessonById_findLessonById_lesson;
}

export interface findLessonById {
  findLessonById: findLessonById_findLessonById;
}

export interface findLessonByIdVariables {
  input: FindLessonByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findLessonsByUnit
// ====================================================

export interface findLessonsByUnit_findLessonsByUnit_lessons {
  __typename: "Lesson";
  _id: string | null;
  lessonName: string;
}

export interface findLessonsByUnit_findLessonsByUnit {
  __typename: "FindLessonsByUnitPayload";
  lessons: findLessonsByUnit_findLessonsByUnit_lessons[];
}

export interface findLessonsByUnit {
  findLessonsByUnit: findLessonsByUnit_findLessonsByUnit;
}

export interface findLessonsByUnitVariables {
  input: FindLessonsByUnitInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findEssayToGradeById
// ====================================================

export interface findEssayToGradeById_findEssayById_essay_hasOwner {
  __typename: "Student";
  firstName: string;
  lastName: string;
}

export interface findEssayToGradeById_findEssayById_essay_topic {
  __typename: "Topic";
  question: string;
  writingLevel: WritingLevelEnum;
}

export interface findEssayToGradeById_findEssayById_essay_finalDraft_submittedFinalDraft {
  __typename: "SubmittedFinalDraft";
  draft: any;
  gradingDraft: any;
  comments: string[];
}

export interface findEssayToGradeById_findEssayById_essay_finalDraft {
  __typename: "FinalDraftContainer";
  submitTime: any | null;
  submittedFinalDraft: findEssayToGradeById_findEssayById_essay_finalDraft_submittedFinalDraft;
}

export interface findEssayToGradeById_findEssayById_essay {
  __typename: "Essay";
  _id: string | null;
  hasOwner: findEssayToGradeById_findEssayById_essay_hasOwner;
  topic: findEssayToGradeById_findEssayById_essay_topic;
  dueDate: any;
  dueTime: string;
  finalDraft: findEssayToGradeById_findEssayById_essay_finalDraft | null;
}

export interface findEssayToGradeById_findEssayById {
  __typename: "FindEssayByIdPayload";
  essay: findEssayToGradeById_findEssayById_essay;
}

export interface findEssayToGradeById {
  findEssayById: findEssayToGradeById_findEssayById;
}

export interface findEssayToGradeByIdVariables {
  input: FindEssayByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findEssaysToGradeById
// ====================================================

export interface findEssaysToGradeById_findEssaysToGradeById_essays_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findEssaysToGradeById_findEssaysToGradeById_essays_hasOwner_inCourses {
  __typename: "Course";
  _id: string | null;
}

export interface findEssaysToGradeById_findEssaysToGradeById_essays_hasOwner {
  __typename: "Student";
  firstName: string;
  lastName: string;
  inCourses: findEssaysToGradeById_findEssaysToGradeById_essays_hasOwner_inCourses[];
}

export interface findEssaysToGradeById_findEssaysToGradeById_essays {
  __typename: "Essay";
  _id: string | null;
  readings: findEssaysToGradeById_findEssaysToGradeById_essays_readings;
  hasOwner: findEssaysToGradeById_findEssaysToGradeById_essays_hasOwner;
}

export interface findEssaysToGradeById_findEssaysToGradeById {
  __typename: "FindEssaysToGradeByIdPayload";
  essays: findEssaysToGradeById_findEssaysToGradeById_essays[];
}

export interface findEssaysToGradeById {
  findEssaysToGradeById: findEssaysToGradeById_findEssaysToGradeById;
}

export interface findEssaysToGradeByIdVariables {
  input: FindEssaysToGradeByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findCoursesById
// ====================================================

export interface findCoursesById_findCoursesById_courses {
  __typename: "Course";
  _id: string | null;
  name: string;
}

export interface findCoursesById_findCoursesById {
  __typename: "FindCoursesByIdPayload";
  courses: findCoursesById_findCoursesById_courses[];
}

export interface findCoursesById {
  findCoursesById: findCoursesById_findCoursesById;
}

export interface findCoursesByIdVariables {
  input: FindCoursesByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateLesson
// ====================================================

export interface updateLesson_updateLesson_lessons {
  __typename: "Lesson";
  _id: string | null;
  linkedCourseIds: string[];
}

export interface updateLesson_updateLesson {
  __typename: "UpdateLessonPayload";
  lessons: updateLesson_updateLesson_lessons[];
}

export interface updateLesson {
  updateLesson: updateLesson_updateLesson;
}

export interface updateLessonVariables {
  input: UpdateLessonInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findLessonByIdForLessonEditor
// ====================================================

export interface findLessonByIdForLessonEditor_findLessonById_lesson_inUnit {
  __typename: "Unit";
  _id: string | null;
  unitName: string;
}

export interface findLessonByIdForLessonEditor_findLessonById_lesson_assignedCourse {
  __typename: "Course";
  _id: string | null;
  name: string;
}

export interface findLessonByIdForLessonEditor_findLessonById_lesson_assignedSections {
  __typename: "LessonTextSections";
  startingSection: string;
  endingSection: string;
}

export interface findLessonByIdForLessonEditor_findLessonById_lesson_pageNumbers {
  __typename: "PageNumbers";
  startingPage: number;
  endingPage: number;
}

export interface findLessonByIdForLessonEditor_findLessonById_lesson_vocabList {
  __typename: "TextSectionVocab";
  word: string;
  definition: string;
}

export interface findLessonByIdForLessonEditor_findLessonById_lesson_beforeActivity {
  __typename: "TextSectionProtocols";
  academicOutcomeTypes: AcademicOutomeTypes;
  activityType: ProtocolActivityTypes;
  task: string;
}

export interface findLessonByIdForLessonEditor_findLessonById_lesson_duringActivities {
  __typename: "TextSectionProtocols";
  academicOutcomeTypes: AcademicOutomeTypes;
  activityType: ProtocolActivityTypes;
  task: string;
}

export interface findLessonByIdForLessonEditor_findLessonById_lesson_afterActivity {
  __typename: "TextSectionProtocols";
  academicOutcomeTypes: AcademicOutomeTypes;
  activityType: ProtocolActivityTypes;
  task: string;
}

export interface findLessonByIdForLessonEditor_findLessonById_lesson_questionList {
  __typename: "TextSectionQuestions";
  question: string;
  questionType: QuestionTypeEnum;
}

export interface findLessonByIdForLessonEditor_findLessonById_lesson {
  __typename: "Lesson";
  _id: string | null;
  assignedDate: any;
  inUnit: findLessonByIdForLessonEditor_findLessonById_lesson_inUnit;
  assignedMarkingPeriod: MarkingPeriodEnum;
  assignedCourse: findLessonByIdForLessonEditor_findLessonById_lesson_assignedCourse;
  linkedCourseIds: string[];
  assignedSections: findLessonByIdForLessonEditor_findLessonById_lesson_assignedSections;
  pageNumbers: findLessonByIdForLessonEditor_findLessonById_lesson_pageNumbers;
  assignedSectionIdList: string[];
  vocabList: findLessonByIdForLessonEditor_findLessonById_lesson_vocabList[];
  beforeActivity: findLessonByIdForLessonEditor_findLessonById_lesson_beforeActivity;
  duringActivities: findLessonByIdForLessonEditor_findLessonById_lesson_duringActivities[];
  afterActivity: findLessonByIdForLessonEditor_findLessonById_lesson_afterActivity;
  questionList: findLessonByIdForLessonEditor_findLessonById_lesson_questionList[];
  essentialQuestion: string;
  lessonName: string;
}

export interface findLessonByIdForLessonEditor_findLessonById {
  __typename: "FindLessonByIdPayload";
  lesson: findLessonByIdForLessonEditor_findLessonById_lesson;
}

export interface findLessonByIdForLessonEditor_MarkingPeriod_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface findLessonByIdForLessonEditor_MarkingPeriod {
  __typename: "__Type";
  enumValues: findLessonByIdForLessonEditor_MarkingPeriod_enumValues[] | null;
}

export interface findLessonByIdForLessonEditor {
  findLessonById: findLessonByIdForLessonEditor_findLessonById;
  MarkingPeriod: findLessonByIdForLessonEditor_MarkingPeriod | null;
}

export interface findLessonByIdForLessonEditorVariables {
  input: FindLessonByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCoursesForUser
// ====================================================

export interface getCoursesForUser_findUserData_user_Student {
  __typename: "Student";
  _id: string | null;
}

export interface getCoursesForUser_findUserData_user_Teacher_teachesCourses {
  __typename: "Course";
  _id: string | null;
  name: string;
}

export interface getCoursesForUser_findUserData_user_Teacher {
  __typename: "Teacher";
  _id: string | null;
  teachesCourses: getCoursesForUser_findUserData_user_Teacher_teachesCourses[];
}

export type getCoursesForUser_findUserData_user = getCoursesForUser_findUserData_user_Student | getCoursesForUser_findUserData_user_Teacher;

export interface getCoursesForUser_findUserData {
  __typename: "FindUserDataPayload";
  user: getCoursesForUser_findUserData_user;
}

export interface getCoursesForUser {
  findUserData: getCoursesForUser_findUserData;
}

export interface getCoursesForUserVariables {
  input: FindUserDataInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createLesson
// ====================================================

export interface createLesson_createLesson_lessons {
  __typename: "Lesson";
  _id: string | null;
  assignedMarkingPeriod: MarkingPeriodEnum;
}

export interface createLesson_createLesson {
  __typename: "CreateLessonPayload";
  lessons: createLesson_createLesson_lessons[];
}

export interface createLesson {
  createLesson: createLesson_createLesson;
}

export interface createLessonVariables {
  input: CreateLessonInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findTextSectionsById
// ====================================================

export interface findTextSectionsById_findTextSectionsById_textSections_hasVocab {
  __typename: "TextSectionVocab";
  word: string;
  definition: string;
}

export interface findTextSectionsById_findTextSectionsById_textSections_hasProtocols {
  __typename: "TextSectionProtocols";
  academicOutcomeTypes: AcademicOutomeTypes;
  activityType: ProtocolActivityTypes;
  task: string;
}

export interface findTextSectionsById_findTextSectionsById_textSections_hasQuestions {
  __typename: "TextSectionQuestions";
  questionType: QuestionTypeEnum;
  question: string;
}

export interface findTextSectionsById_findTextSectionsById_textSections_pageNumbers {
  __typename: "PageNumbers";
  startingPage: number;
  endingPage: number;
}

export interface findTextSectionsById_findTextSectionsById_textSections {
  __typename: "TextSection";
  _id: string | null;
  header: string;
  hasVocab: findTextSectionsById_findTextSectionsById_textSections_hasVocab[];
  hasProtocols: findTextSectionsById_findTextSectionsById_textSections_hasProtocols[];
  hasQuestions: findTextSectionsById_findTextSectionsById_textSections_hasQuestions[];
  pageNumbers: findTextSectionsById_findTextSectionsById_textSections_pageNumbers;
}

export interface findTextSectionsById_findTextSectionsById {
  __typename: "FindTextSectionsByIdPayload";
  textSections: findTextSectionsById_findTextSectionsById_textSections[];
}

export interface findTextSectionsById {
  findTextSectionsById: findTextSectionsById_findTextSectionsById;
}

export interface findTextSectionsByIdVariables {
  input: FindTextSectionsByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findUnits
// ====================================================

export interface findUnits_findUnits_units {
  __typename: "Unit";
  _id: string | null;
  unitName: string;
}

export interface findUnits_findUnits {
  __typename: "FindUnitsPayload";
  units: findUnits_findUnits_units[];
}

export interface findUnits {
  findUnits: findUnits_findUnits;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddNewChapter
// ====================================================

export interface AddNewChapter_addNewChapter_chapter {
  __typename: "Chapter";
  _id: string | null;
}

export interface AddNewChapter_addNewChapter {
  __typename: "AddNewChapterPayload";
  chapter: AddNewChapter_addNewChapter_chapter;
}

export interface AddNewChapter {
  addNewChapter: AddNewChapter_addNewChapter;
}

export interface AddNewChapterVariables {
  input: AddNewChapterInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addNewText
// ====================================================

export interface addNewText_addNewText_text {
  __typename: "Text";
  _id: string | null;
}

export interface addNewText_addNewText {
  __typename: "AddNewTextPayload";
  text: addNewText_addNewText_text;
}

export interface addNewText {
  addNewText: addNewText_addNewText;
}

export interface addNewTextVariables {
  input: AddNewTextInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findChaptersInText
// ====================================================

export interface findChaptersInText_findChaptersInText_chapters {
  __typename: "Chapter";
  _id: string | null;
  chapterTitle: string;
}

export interface findChaptersInText_findChaptersInText {
  __typename: "FindChaptersInTextPayload";
  chapters: findChaptersInText_findChaptersInText_chapters[];
}

export interface findChaptersInText {
  findChaptersInText: findChaptersInText_findChaptersInText;
}

export interface findChaptersInTextVariables {
  input: FindChaptersInTextInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createTextSection
// ====================================================

export interface createTextSection_createTextSection_textSection {
  __typename: "TextSection";
  _id: string | null;
}

export interface createTextSection_createTextSection {
  __typename: "CreateTextSectionPayload";
  textSection: createTextSection_createTextSection_textSection;
}

export interface createTextSection {
  createTextSection: createTextSection_createTextSection;
}

export interface createTextSectionVariables {
  input: CreateTextSectionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: protocolEnumTypes
// ====================================================

export interface protocolEnumTypes_AcademicOutomeTypes_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface protocolEnumTypes_AcademicOutomeTypes {
  __typename: "__Type";
  enumValues: protocolEnumTypes_AcademicOutomeTypes_enumValues[] | null;
}

export interface protocolEnumTypes_ProtocolActivityTypes_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface protocolEnumTypes_ProtocolActivityTypes {
  __typename: "__Type";
  enumValues: protocolEnumTypes_ProtocolActivityTypes_enumValues[] | null;
}

export interface protocolEnumTypes {
  AcademicOutomeTypes: protocolEnumTypes_AcademicOutomeTypes | null;
  ProtocolActivityTypes: protocolEnumTypes_ProtocolActivityTypes | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: questionTypeEnum
// ====================================================

export interface questionTypeEnum_QuestionTypeEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface questionTypeEnum_QuestionTypeEnum {
  __typename: "__Type";
  enumValues: questionTypeEnum_QuestionTypeEnum_enumValues[] | null;
}

export interface questionTypeEnum {
  QuestionTypeEnum: questionTypeEnum_QuestionTypeEnum | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findTexts
// ====================================================

export interface findTexts_findTexts_texts {
  __typename: "Text";
  _id: string | null;
  textTitle: string;
  ownerId: string;
}

export interface findTexts_findTexts {
  __typename: "FindTextsPayload";
  texts: findTexts_findTexts_texts[];
}

export interface findTexts {
  findTexts: findTexts_findTexts;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findTextsForTextSectionEditor
// ====================================================

export interface findTextsForTextSectionEditor_findTexts_texts {
  __typename: "Text";
  _id: string | null;
  textTitle: string;
  ownerId: string;
}

export interface findTextsForTextSectionEditor_findTexts {
  __typename: "FindTextsPayload";
  texts: findTextsForTextSectionEditor_findTexts_texts[];
}

export interface findTextsForTextSectionEditor {
  findTexts: findTextsForTextSectionEditor_findTexts;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindTextSectionById
// ====================================================

export interface FindTextSectionById_findTextSectionById_textSection_pageNumbers {
  __typename: "PageNumbers";
  startingPage: number;
  endingPage: number;
}

export interface FindTextSectionById_findTextSectionById_textSection_hasVocab {
  __typename: "TextSectionVocab";
  word: string;
  definition: string;
}

export interface FindTextSectionById_findTextSectionById_textSection_hasQuestions {
  __typename: "TextSectionQuestions";
  question: string;
  questionType: QuestionTypeEnum;
}

export interface FindTextSectionById_findTextSectionById_textSection_hasProtocols {
  __typename: "TextSectionProtocols";
  activityType: ProtocolActivityTypes;
  academicOutcomeTypes: AcademicOutomeTypes;
  task: string;
}

export interface FindTextSectionById_findTextSectionById_textSection {
  __typename: "TextSection";
  _id: string | null;
  header: string;
  pageNumbers: FindTextSectionById_findTextSectionById_textSection_pageNumbers;
  hasVocab: FindTextSectionById_findTextSectionById_textSection_hasVocab[];
  hasQuestions: FindTextSectionById_findTextSectionById_textSection_hasQuestions[];
  hasProtocols: FindTextSectionById_findTextSectionById_textSection_hasProtocols[];
}

export interface FindTextSectionById_findTextSectionById {
  __typename: "FindTextSectionByIdPayload";
  textSection: FindTextSectionById_findTextSectionById_textSection;
}

export interface FindTextSectionById {
  findTextSectionById: FindTextSectionById_findTextSectionById;
}

export interface FindTextSectionByIdVariables {
  input: FindTextSectionByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateTextSection
// ====================================================

export interface updateTextSection_updateTextSection_textSection {
  __typename: "TextSection";
  _id: string | null;
}

export interface updateTextSection_updateTextSection {
  __typename: "UpdateTextSectionPayload";
  textSection: updateTextSection_updateTextSection_textSection;
}

export interface updateTextSection {
  updateTextSection: updateTextSection_updateTextSection;
}

export interface updateTextSectionVariables {
  input: UpdateTextSectionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findTextSectionsByChapter
// ====================================================

export interface findTextSectionsByChapter_findTextSectionsByChapter_textSections {
  __typename: "TextSection";
  _id: string | null;
  header: string;
}

export interface findTextSectionsByChapter_findTextSectionsByChapter {
  __typename: "FindTextSectionsByChapterPayload";
  textSections: findTextSectionsByChapter_findTextSectionsByChapter_textSections[];
}

export interface findTextSectionsByChapter {
  findTextSectionsByChapter: findTextSectionsByChapter_findTextSectionsByChapter;
}

export interface findTextSectionsByChapterVariables {
  input: FindTextSectionsByChapterInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_user {
  __typename: "Teacher" | "Student";
  _id: string | null;
}

export interface login_login {
  __typename: "LoginPayload";
  user: login_login_user;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  input: LoginInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: logout
// ====================================================

export interface logout {
  logout: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findCurrentMarkingPeriod
// ====================================================

export interface findCurrentMarkingPeriod_findCurrentMarkingPeriod_markingPeriod {
  __typename: "MarkingPeriod";
  currentMarkingPeriod: MarkingPeriodEnum;
}

export interface findCurrentMarkingPeriod_findCurrentMarkingPeriod {
  __typename: "FindCurrentMarkingPeriodPayload";
  markingPeriod: findCurrentMarkingPeriod_findCurrentMarkingPeriod_markingPeriod;
}

export interface findCurrentMarkingPeriod {
  findCurrentMarkingPeriod: findCurrentMarkingPeriod_findCurrentMarkingPeriod;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetCurrentMarkingPeriod
// ====================================================

export interface SetCurrentMarkingPeriod_setCurrentMarkingPeriod_markingPeriod {
  __typename: "MarkingPeriod";
  currentMarkingPeriod: MarkingPeriodEnum;
}

export interface SetCurrentMarkingPeriod_setCurrentMarkingPeriod {
  __typename: "SetCurrentMarkingPeriodPayload";
  markingPeriod: SetCurrentMarkingPeriod_setCurrentMarkingPeriod_markingPeriod;
}

export interface SetCurrentMarkingPeriod {
  setCurrentMarkingPeriod: SetCurrentMarkingPeriod_setCurrentMarkingPeriod;
}

export interface SetCurrentMarkingPeriodVariables {
  input: SetCurrentMarkingPeriodInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: enumValues
// ====================================================

export interface enumValues_MarkingPeriod_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_MarkingPeriod {
  __typename: "__Type";
  enumValues: enumValues_MarkingPeriod_enumValues[] | null;
}

export interface enumValues_WritingLevelEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_WritingLevelEnum {
  __typename: "__Type";
  enumValues: enumValues_WritingLevelEnum_enumValues[] | null;
}

export interface enumValues_QuestionTypeEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_QuestionTypeEnum {
  __typename: "__Type";
  enumValues: enumValues_QuestionTypeEnum_enumValues[] | null;
}

export interface enumValues {
  MarkingPeriod: enumValues_MarkingPeriod | null;
  WritingLevelEnum: enumValues_WritingLevelEnum | null;
  QuestionTypeEnum: enumValues_QuestionTypeEnum | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me_Student {
  __typename: "Student";
  userName: string;
  firstName: string;
  lastName: string;
  _id: string | null;
}

export interface me_me_Teacher_teachesCourses {
  __typename: "Course";
  _id: string | null;
  name: string;
}

export interface me_me_Teacher {
  __typename: "Teacher";
  userName: string;
  firstName: string;
  lastName: string;
  _id: string | null;
  title: TitleEnum;
  teachesCourses: me_me_Teacher_teachesCourses[];
}

export type me_me = me_me_Student | me_me_Teacher;

export interface me {
  me: me_me | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AcademicOutomeTypes {
  LOGIC_BUILDING = "LOGIC_BUILDING",
  SCHEMA_BUIDING = "SCHEMA_BUIDING",
  SOCRATIC_QUESTIONS = "SOCRATIC_QUESTIONS",
}

export enum BasicQuestionEnum {
  HOW = "HOW",
  WHY = "WHY",
}

export enum MarkingPeriodEnum {
  FIRST = "FIRST",
  FOURTH = "FOURTH",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

export enum ProtocolActivityTypes {
  INDIVIDUAL = "INDIVIDUAL",
  THINK_PAIR_SHARE = "THINK_PAIR_SHARE",
}

export enum QuestionTypeEnum {
  HOW_CAUSE_EFFECT = "HOW_CAUSE_EFFECT",
  HOW_PROBLEM_SOLUTION = "HOW_PROBLEM_SOLUTION",
  WHY_CAUSE_EFFECT = "WHY_CAUSE_EFFECT",
}

export enum TitleEnum {
  MISS = "MISS",
  MR = "MR",
  MRS = "MRS",
  MS = "MS",
}

export enum WritingLevelEnum {
  ACADEMIC = "ACADEMIC",
  ADVANCED = "ADVANCED",
  DEVELOPING = "DEVELOPING",
}

export interface AcademicSentenceStructureInput {
  object?: string | null;
  subject: string;
  verb: string;
}

export interface AddNewChapterInput {
  chapterNumber: number;
  chapterTitle: string;
  textTitle: string;
}

export interface AddNewTextInput {
  ownerId: string;
  textTitle: string;
}

export interface AdvancedSentenceStructureInput {
  object?: string | null;
  subject: string;
  verb: string;
}

export interface CreateEssayInput {
  assignedCourseId: string[];
  assignedDate: any;
  associatedLessonId: string;
  dueDate: any;
  dueTime: string;
  hasAssignerId: string;
  markingPeriod: MarkingPeriodEnum;
  maxPoints: number;
  readings: ReadingsInput;
  topicList: TopicInput[];
}

export interface CreateLessonInput {
  afterActivity: TextSectionProtocolsInput;
  assignedCourses: string[];
  assignedDate: any;
  assignedMarkingPeriod: MarkingPeriodEnum;
  assignedSectionIdList: string[];
  assignedSections: LessonTextSectionsInput;
  beforeActivity: TextSectionProtocolsInput;
  duringActivities: TextSectionProtocolsInput[];
  essentialQuestion: string;
  inUnit: string;
  lessonName: string;
  pageNumbers: PageNumbersInput;
  questionList: TextSectionQuestionsInput[];
  vocabList: TextSectionVocabInput[];
}

export interface CreateTextSectionInput {
  fromChapterId: string;
  hasProtocols: TextSectionProtocolsInput[];
  hasQuestions: TextSectionQuestionsInput[];
  hasVocab: TextSectionVocabInput[];
  header: string;
  pageNumbers: PageNumbersInput;
}

export interface DevelopingSentenceStructureInput {
  subject: string;
  verb: string;
}

export interface FindChaptersInTextInput {
  textTitle: string;
}

export interface FindCoursesByIdInput {
  _ids: string[];
}

export interface FindEssayByIdInput {
  _id: string;
}

export interface FindEssaysToCompleteByStudentIdInput {
  studentId: string;
}

export interface FindEssaysToGradeByIdInput {
  teacherId: string;
}

export interface FindLessonByIdInput {
  _id: string;
}

export interface FindLessonsByUnitInput {
  courseId: string;
  unitId: string;
}

export interface FindTextSectionByIdInput {
  _id: string;
}

export interface FindTextSectionsByChapterInput {
  fromChapterId: string;
}

export interface FindTextSectionsByIdInput {
  _ids: string[];
}

export interface FindUserDataInput {
  _id: string;
}

export interface LessonTextSectionsInput {
  endingSection: string;
  startingSection: string;
}

export interface LoginInput {
  password: string;
  userName: string;
}

export interface PageNumbersInput {
  endingPage: number;
  startingPage: number;
}

export interface ReadingsInput {
  readingPages: string;
  readingSections: string;
}

export interface SetAnswerTypeInput {
  essayId: string;
  questionType: QuestionTypeEnum;
}

export interface SetCurrentMarkingPeriodInput {
  currentMarkingPeriod: MarkingPeriodEnum;
}

export interface SetOrganizerInput {
  essayId: string;
  writingLevel: WritingLevelEnum;
}

export interface SubmitEssayFinalDraftInput {
  _id: string;
  late: boolean;
  submittedFinalDraft: SubmittedFinalDraftsInput;
}

export interface SubmittedFinalDraftsInput {
  comments: string[];
  draft: any;
  gradingDraft: any;
  score: number;
}

export interface TextSectionProtocolsInput {
  academicOutcomeTypes: AcademicOutomeTypes;
  activityType: ProtocolActivityTypes;
  task: string;
}

export interface TextSectionQuestionsInput {
  question: string;
  questionType: QuestionTypeEnum;
}

export interface TextSectionVocabInput {
  definition: string;
  word: string;
}

export interface TopicInput {
  question: string;
  questionType: QuestionTypeEnum;
  writingLevel: WritingLevelEnum;
}

export interface UpdateAcademicOrganizerInput {
  academicSentenceStructure: AcademicSentenceStructureInput;
  conclusion: string;
  essayId: string;
  restatement: string;
}

export interface UpdateAdvancedOrganizerInput {
  advancedSentenceStructure: AdvancedSentenceStructureInput;
  conclusion: string;
  essayId: string;
  restatement: string;
}

export interface UpdateDevelopingOrganizerInput {
  answer: string;
  basicQuestionType: BasicQuestionEnum;
  conclusion: string;
  developingSentenceStructure: DevelopingSentenceStructureInput;
  essayId: string;
  restatement: string;
}

export interface UpdateHowCauseEffectInput {
  after: string;
  before: string;
  cause: string;
  essayId: string;
}

export interface UpdateLessonInput {
  afterActivity: TextSectionProtocolsInput;
  assignedDate: any;
  assignedMarkingPeriod: MarkingPeriodEnum;
  assignedSectionIdList: string[];
  assignedSections: LessonTextSectionsInput;
  beforeActivity: TextSectionProtocolsInput;
  duringActivities: TextSectionProtocolsInput[];
  essentialQuestion: string;
  inUnit: string;
  lessonName: string;
  linkedCourseIds: string[];
  pageNumbers: PageNumbersInput;
  questionList: TextSectionQuestionsInput[];
  vocabList: TextSectionVocabInput[];
}

export interface UpdateProblemSolutionInput {
  essayId: string;
  problem: string;
  reasonForProblem: string;
  solvedBy: string;
  whySolutionSolved: string;
}

export interface UpdateTextSectionInput {
  _id: string;
  fromChapterId: string;
  hasProtocols: TextSectionProtocolsInput[];
  hasQuestions: TextSectionQuestionsInput[];
  hasVocab: TextSectionVocabInput[];
  header: string;
  pageNumbers: PageNumbersInput;
}

export interface UpdateWhyCauseEffectInput {
  essayId: string;
  proximateCause: string;
  ultimateCause: string;
}

export interface UpdateWorkingDraftInput {
  _id: string;
  updatedDraft: any;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

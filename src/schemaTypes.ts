/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createSchoolDay
// ====================================================

export interface createSchoolDay_createSchoolDay_schoolDay {
  __typename: "SchoolDay";
  _id: string | null;
}

export interface createSchoolDay_createSchoolDay {
  __typename: "CreateSchoolDayPayload";
  schoolDay: createSchoolDay_createSchoolDay_schoolDay;
}

export interface createSchoolDay {
  createSchoolDay: createSchoolDay_createSchoolDay;
}

export interface createSchoolDayVariables {
  input: CreateSchoolDayInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findCurrentSchoolDayCount
// ====================================================

export interface findCurrentSchoolDayCount_findSchoolDayTracker_schoolDayTracker {
  __typename: "SchoolDayTracker";
  schoolDayTracker: number;
  schoolDayTypeTracker: SchoolDayType;
  cohortWeekTracker: StudentCohortEnum;
}

export interface findCurrentSchoolDayCount_findSchoolDayTracker {
  __typename: "FindSchoolDayPayload";
  schoolDayTracker: findCurrentSchoolDayCount_findSchoolDayTracker_schoolDayTracker;
}

export interface findCurrentSchoolDayCount {
  findSchoolDayTracker: findCurrentSchoolDayCount_findSchoolDayTracker;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createSignInSheets
// ====================================================

export interface createSignInSheets_createSignInSheets_schoolDay_signInSheets_course {
  __typename: "Course";
  _id: string | null;
}

export interface createSignInSheets_createSignInSheets_schoolDay_signInSheets {
  __typename: "StudentSignInSheet";
  course: createSignInSheets_createSignInSheets_schoolDay_signInSheets_course;
}

export interface createSignInSheets_createSignInSheets_schoolDay {
  __typename: "SchoolDay";
  _id: string | null;
  signInSheets: createSignInSheets_createSignInSheets_schoolDay_signInSheets[] | null;
}

export interface createSignInSheets_createSignInSheets {
  __typename: "CreateSignInSheetsPayload";
  schoolDay: createSignInSheets_createSignInSheets_schoolDay;
}

export interface createSignInSheets {
  createSignInSheets: createSignInSheets_createSignInSheets;
}

export interface createSignInSheetsVariables {
  input: CreateSignInSheetsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findCurrentSchoolDay
// ====================================================

export interface findCurrentSchoolDay_findSchoolDayByDate_schoolDay_signInSheets_course {
  __typename: "Course";
  _id: string | null;
}

export interface findCurrentSchoolDay_findSchoolDayByDate_schoolDay_signInSheets_studentsSignInlog {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findCurrentSchoolDay_findSchoolDayByDate_schoolDay_signInSheets {
  __typename: "StudentSignInSheet";
  course: findCurrentSchoolDay_findSchoolDayByDate_schoolDay_signInSheets_course;
  studentsSignInlog: findCurrentSchoolDay_findSchoolDayByDate_schoolDay_signInSheets_studentsSignInlog[] | null;
}

export interface findCurrentSchoolDay_findSchoolDayByDate_schoolDay {
  __typename: "SchoolDay";
  _id: string | null;
  cohortWeek: StudentCohortEnum;
  schoolDayCount: number;
  todaysDate: string;
  currentSchoolDayType: SchoolDayType;
  signInSheets: findCurrentSchoolDay_findSchoolDayByDate_schoolDay_signInSheets[] | null;
}

export interface findCurrentSchoolDay_findSchoolDayByDate {
  __typename: "FindSchoolDayByDatePayload";
  schoolDay: findCurrentSchoolDay_findSchoolDayByDate_schoolDay | null;
}

export interface findCurrentSchoolDay {
  findSchoolDayByDate: findCurrentSchoolDay_findSchoolDayByDate;
}

export interface findCurrentSchoolDayVariables {
  input: FindSchoolDayByDateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findArticleReviewsByStudent
// ====================================================

export interface findArticleReviewsByStudent_findArticleReviewsByStudent_articleReviews {
  __typename: "ArticleReview";
  _id: string | null;
  assignedDate: string;
  paperBased: boolean;
  markingPeriod: MarkingPeriodEnum;
  submitted: boolean;
}

export interface findArticleReviewsByStudent_findArticleReviewsByStudent {
  __typename: "FindArticleReviewsByStudentPayload";
  articleReviews: findArticleReviewsByStudent_findArticleReviewsByStudent_articleReviews[];
}

export interface findArticleReviewsByStudent {
  findArticleReviewsByStudent: findArticleReviewsByStudent_findArticleReviewsByStudent;
}

export interface findArticleReviewsByStudentVariables {
  input: FindArticleReviewsByStudentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findArticleReviewById
// ====================================================

export interface findArticleReviewById_findArticleReviewById_articleReview {
  __typename: "ArticleReview";
  _id: string | null;
  articleAuthor: string;
  articleLink: string;
  articleTitle: string;
  assignedDate: string;
  bias: boolean | null;
  dueDate: string;
  dueTime: string;
  issue: string;
  publishedDate: string | null;
  solutions: string | null;
  topicsImportance: string;
  markingPeriod: MarkingPeriodEnum;
}

export interface findArticleReviewById_findArticleReviewById {
  __typename: "FindArticleReviewByIdPayload";
  articleReview: findArticleReviewById_findArticleReviewById_articleReview;
}

export interface findArticleReviewById {
  findArticleReviewById: findArticleReviewById_findArticleReviewById;
}

export interface findArticleReviewByIdVariables {
  input: FindArticleReviewByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: submitArticleReview
// ====================================================

export interface submitArticleReview_submitArticleReview_articleReview {
  __typename: "ArticleReview";
  _id: string | null;
}

export interface submitArticleReview_submitArticleReview {
  __typename: "SubmitArticleReviewPayload";
  articleReview: submitArticleReview_submitArticleReview_articleReview;
}

export interface submitArticleReview {
  submitArticleReview: submitArticleReview_submitArticleReview;
}

export interface submitArticleReviewVariables {
  input: SubmitArticleReviewInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateArticleReview
// ====================================================

export interface updateArticleReview_updateArticleReview_articleReview {
  __typename: "ArticleReview";
  _id: string | null;
}

export interface updateArticleReview_updateArticleReview {
  __typename: "UpdateArticleReviewPayload";
  articleReview: updateArticleReview_updateArticleReview_articleReview;
}

export interface updateArticleReview {
  updateArticleReview: updateArticleReview_updateArticleReview;
}

export interface updateArticleReviewVariables {
  input: UpdateArticleReviewInput;
}

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
  paperBased: boolean;
  assigned: boolean;
  missing: boolean;
  readings: findEssaysToComplete_findEssaysToCompleteByStudentId_essays_readings;
  topic: findEssaysToComplete_findEssaysToCompleteByStudentId_essays_topic;
  markingPeriod: MarkingPeriodEnum;
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
  draft: string;
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
  essayQuestionId: string;
}

export interface findEssayById_findEssayById_essay_lessonInfo_vocabList {
  __typename: "TextSectionVocab";
  word: string;
  definition: string;
}

export interface findEssayById_findEssayById_essay_lessonInfo {
  __typename: "Lesson";
  vocabList: findEssayById_findEssayById_essay_lessonInfo_vocabList[];
}

export interface findEssayById_findEssayById_essay {
  __typename: "Essay";
  _id: string | null;
  workingDraft: findEssayById_findEssayById_essay_workingDraft;
  readings: findEssayById_findEssayById_essay_readings;
  dueDate: string;
  dueTime: string;
  topic: findEssayById_findEssayById_essay_topic;
  lessonInfo: findEssayById_findEssayById_essay_lessonInfo;
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
  draft: string;
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

export interface setAnswerType_setAnswerType_essay_workingDraft_organizer_AdvancedOrganizer {
  __typename: "AdvancedOrganizer" | "DevelopingOrganizer";
}

export interface setAnswerType_setAnswerType_essay_workingDraft_organizer_AcademicOrganizer {
  __typename: "AcademicOrganizer";
  questionType: QuestionTypeEnum | null;
}

export type setAnswerType_setAnswerType_essay_workingDraft_organizer = setAnswerType_setAnswerType_essay_workingDraft_organizer_AdvancedOrganizer | setAnswerType_setAnswerType_essay_workingDraft_organizer_AcademicOrganizer;

export interface setAnswerType_setAnswerType_essay_workingDraft {
  __typename: "WorkingDraft";
  organizer: setAnswerType_setAnswerType_essay_workingDraft_organizer | null;
}

export interface setAnswerType_setAnswerType_essay {
  __typename: "Essay";
  _id: string | null;
  workingDraft: setAnswerType_setAnswerType_essay_workingDraft;
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
  subjectCompliment: string | null;
  object: string | null;
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
// GraphQL query operation: findEssayQuestionById
// ====================================================

export interface findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts {
  __typename: "QuestionPartsContainer";
  originalQuestion: string;
  modifiedQuestion: string;
  questionWord: QuestionWordEnum;
  helpingVerb: string;
  completeSubject: string;
  completePredicate: string;
  simpleSubject: string;
  simplePredicate: string;
  nounType: NounTypeEnum;
  verbType: VerbTypeEnum;
  compoundNoun: boolean;
  object: string | null;
  subjectCompliment: string | null;
  questionType: QuestionTypeEnum;
}

export interface findEssayQuestionById_findEssayQuestionById_essayQuestion {
  __typename: "EssayQuestion";
  questionParts: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts;
}

export interface findEssayQuestionById_findEssayQuestionById {
  __typename: "FindEssayQuestionByIdPayload";
  essayQuestion: findEssayQuestionById_findEssayQuestionById_essayQuestion;
}

export interface findEssayQuestionById {
  findEssayQuestionById: findEssayQuestionById_findEssayQuestionById;
}

export interface findEssayQuestionByIdVariables {
  input: FindEssayQuestionByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: submitEssayFinalDraft
// ====================================================

export interface submitEssayFinalDraft_submitEssayFinalDraft_essay_finalDraft_submittedFinalDraft {
  __typename: "SubmittedFinalDraft";
  gradingDraft: any;
  draft: any;
}

export interface submitEssayFinalDraft_submitEssayFinalDraft_essay_finalDraft {
  __typename: "FinalDraftContainer";
  submittedFinalDraft: submitEssayFinalDraft_submitEssayFinalDraft_essay_finalDraft_submittedFinalDraft[];
}

export interface submitEssayFinalDraft_submitEssayFinalDraft_essay {
  __typename: "Essay";
  _id: string | null;
  assigned: boolean;
  finalDraft: submitEssayFinalDraft_submitEssayFinalDraft_essay_finalDraft | null;
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
// GraphQL query operation: findCompletedEssayById
// ====================================================

export interface findCompletedEssayById_findEssayById_essay_topic {
  __typename: "Topic";
  question: string;
  writingLevel: WritingLevelEnum;
}

export interface findCompletedEssayById_findEssayById_essay_readings {
  __typename: "Readings";
  readingPages: string;
  readingSections: string;
}

export interface findCompletedEssayById_findEssayById_essay_score {
  __typename: "Score";
  maxPoints: number;
  earnedPoints: number;
}

export interface findCompletedEssayById_findEssayById_essay_finalDraft_submittedFinalDraft_rubricEntries {
  __typename: "RubricEntry";
  entry: string;
  rubricSection: RubricSectionEnum;
  score: number;
  howToImprove: string | null;
}

export interface findCompletedEssayById_findEssayById_essay_finalDraft_submittedFinalDraft {
  __typename: "SubmittedFinalDraft";
  draft: any;
  gradingDraft: any;
  score: number;
  draftNumber: number;
  rubricEntries: findCompletedEssayById_findEssayById_essay_finalDraft_submittedFinalDraft_rubricEntries[];
  additionalComments: string[] | null;
}

export interface findCompletedEssayById_findEssayById_essay_finalDraft {
  __typename: "FinalDraftContainer";
  submittedFinalDraft: findCompletedEssayById_findEssayById_essay_finalDraft_submittedFinalDraft[];
}

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer_developingSentenceStructure {
  __typename: "DevelopingSentenceStructure";
  subject: string;
  verb: string;
}

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer {
  __typename: "DevelopingOrganizer";
  basicQuestionType: BasicQuestionEnum | null;
  developingSentenceStructure: findCompletedEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer_developingSentenceStructure;
  restatement: string;
  answer: string;
  conclusion: string;
}

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_academicSentenceStructure {
  __typename: "AcademicSentenceStructure";
  subject: string;
  verb: string;
  object: string | null;
}

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_ProblemSolutionAnswerType {
  __typename: "ProblemSolutionAnswerType";
  problem: string;
  reasonForProblem: string;
  solvedBy: string;
  whySolutionSolved: string;
}

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_HowCauseEffectAnswerType {
  __typename: "HowCauseEffectAnswerType";
  before: string;
  cause: string;
  after: string;
}

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_WhyCauseEffectAnswerType {
  __typename: "WhyCauseEffectAnswerType";
  ultimateCause: string;
  proximateCause: string;
}

export type findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType = findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_ProblemSolutionAnswerType | findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_HowCauseEffectAnswerType | findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_WhyCauseEffectAnswerType;

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer {
  __typename: "AcademicOrganizer";
  academicSentenceStructure: findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_academicSentenceStructure;
  restatement: string;
  conclusion: string;
  questionType: QuestionTypeEnum | null;
  answerType: findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType | null;
}

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_advancedSentenceStructure {
  __typename: "AdvancedSentenceStructure";
  subject: string;
  verb: string;
  object: string | null;
}

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_ProblemSolutionAnswerType {
  __typename: "ProblemSolutionAnswerType";
  problem: string;
  reasonForProblem: string;
  solvedBy: string;
  whySolutionSolved: string;
}

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_HowCauseEffectAnswerType {
  __typename: "HowCauseEffectAnswerType";
  before: string;
  cause: string;
  after: string;
}

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_WhyCauseEffectAnswerType {
  __typename: "WhyCauseEffectAnswerType";
  ultimateCause: string;
  proximateCause: string;
}

export type findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType = findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_ProblemSolutionAnswerType | findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_HowCauseEffectAnswerType | findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_WhyCauseEffectAnswerType;

export interface findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer {
  __typename: "AdvancedOrganizer";
  advancedSentenceStructure: findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_advancedSentenceStructure;
  answerType: findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType | null;
  restatement: string;
  conclusion: string;
  questionType: QuestionTypeEnum | null;
}

export type findCompletedEssayById_findEssayById_essay_workingDraft_organizer = findCompletedEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer | findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer | findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer;

export interface findCompletedEssayById_findEssayById_essay_workingDraft {
  __typename: "WorkingDraft";
  draft: string;
  organizer: findCompletedEssayById_findEssayById_essay_workingDraft_organizer | null;
}

export interface findCompletedEssayById_findEssayById_essay {
  __typename: "Essay";
  _id: string | null;
  topic: findCompletedEssayById_findEssayById_essay_topic;
  readings: findCompletedEssayById_findEssayById_essay_readings;
  score: findCompletedEssayById_findEssayById_essay_score;
  finalDraft: findCompletedEssayById_findEssayById_essay_finalDraft | null;
  workingDraft: findCompletedEssayById_findEssayById_essay_workingDraft;
}

export interface findCompletedEssayById_findEssayById {
  __typename: "FindEssayByIdPayload";
  essay: findCompletedEssayById_findEssayById_essay;
}

export interface findCompletedEssayById {
  findEssayById: findCompletedEssayById_findEssayById;
}

export interface findCompletedEssayByIdVariables {
  input: FindEssayByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findCompletedEssaysByStudentId
// ====================================================

export interface findCompletedEssaysByStudentId_findCompletedEssaysByStudentId_essays_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findCompletedEssaysByStudentId_findCompletedEssaysByStudentId_essays_topic {
  __typename: "Topic";
  writingLevel: WritingLevelEnum;
}

export interface findCompletedEssaysByStudentId_findCompletedEssaysByStudentId_essays_finalDraft {
  __typename: "FinalDraftContainer";
  submitted: boolean;
  returned: boolean;
}

export interface findCompletedEssaysByStudentId_findCompletedEssaysByStudentId_essays_score {
  __typename: "Score";
  earnedPoints: number;
  maxPoints: number;
}

export interface findCompletedEssaysByStudentId_findCompletedEssaysByStudentId_essays {
  __typename: "Essay";
  _id: string | null;
  readings: findCompletedEssaysByStudentId_findCompletedEssaysByStudentId_essays_readings;
  topic: findCompletedEssaysByStudentId_findCompletedEssaysByStudentId_essays_topic;
  markingPeriod: MarkingPeriodEnum;
  finalDraft: findCompletedEssaysByStudentId_findCompletedEssaysByStudentId_essays_finalDraft | null;
  score: findCompletedEssaysByStudentId_findCompletedEssaysByStudentId_essays_score;
}

export interface findCompletedEssaysByStudentId_findCompletedEssaysByStudentId {
  __typename: "FindCompletedEssaysByStudentIdPayload";
  essays: findCompletedEssaysByStudentId_findCompletedEssaysByStudentId_essays[];
}

export interface findCompletedEssaysByStudentId {
  findCompletedEssaysByStudentId: findCompletedEssaysByStudentId_findCompletedEssaysByStudentId;
}

export interface findCompletedEssaysByStudentIdVariables {
  input: FindCompletedEssaysByStudentIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: resubmitEssayFinalDraft
// ====================================================

export interface resubmitEssayFinalDraft_resubmitEssayFinalDraft_essay {
  __typename: "Essay";
  _id: string | null;
}

export interface resubmitEssayFinalDraft_resubmitEssayFinalDraft {
  __typename: "ResubmitEssayFinalDraftPayload";
  essay: resubmitEssayFinalDraft_resubmitEssayFinalDraft_essay;
}

export interface resubmitEssayFinalDraft {
  resubmitEssayFinalDraft: resubmitEssayFinalDraft_resubmitEssayFinalDraft;
}

export interface resubmitEssayFinalDraftVariables {
  input: ResubmitEssayFinalDraftInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findReadingGuidesToComplete
// ====================================================

export interface findReadingGuidesToComplete_findReadingGuidesToCompleteByStudentId_readingGuides_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findReadingGuidesToComplete_findReadingGuidesToCompleteByStudentId_readingGuides {
  __typename: "ReadingGuide";
  _id: string | null;
  paperBased: boolean;
  graded: boolean;
  readings: findReadingGuidesToComplete_findReadingGuidesToCompleteByStudentId_readingGuides_readings;
  markingPeriod: MarkingPeriodEnum;
  assigned: boolean;
}

export interface findReadingGuidesToComplete_findReadingGuidesToCompleteByStudentId {
  __typename: "FindReadingGuidesToCompleteByStudentIdPayload";
  readingGuides: findReadingGuidesToComplete_findReadingGuidesToCompleteByStudentId_readingGuides[];
}

export interface findReadingGuidesToComplete {
  findReadingGuidesToCompleteByStudentId: findReadingGuidesToComplete_findReadingGuidesToCompleteByStudentId;
}

export interface findReadingGuidesToCompleteVariables {
  input: FindReadingGuidesToCompleteByStudentIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateReadingGuide
// ====================================================

export interface updateReadingGuide_updateReadingGuide_readingGuide {
  __typename: "ReadingGuide";
  _id: string | null;
}

export interface updateReadingGuide_updateReadingGuide {
  __typename: "UpdateReadingGuidePayload";
  readingGuide: updateReadingGuide_updateReadingGuide_readingGuide;
}

export interface updateReadingGuide {
  updateReadingGuide: updateReadingGuide_updateReadingGuide;
}

export interface updateReadingGuideVariables {
  input: UpdateReadingGuideInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findReadingGuideById
// ====================================================

export interface findReadingGuideById_findReadingGuideById_readingGuide_readings {
  __typename: "Readings";
  readingPages: string;
  readingSections: string;
}

export interface findReadingGuideById_findReadingGuideById_readingGuide_lessonInfo_vocabList {
  __typename: "TextSectionVocab";
  word: string;
  definition: string;
}

export interface findReadingGuideById_findReadingGuideById_readingGuide_lessonInfo {
  __typename: "Lesson";
  vocabList: findReadingGuideById_findReadingGuideById_readingGuide_lessonInfo_vocabList[];
  assignedSectionIdList: string[];
}

export interface findReadingGuideById_findReadingGuideById_readingGuide_readingGuideFinal {
  __typename: "ReadingGuideFinalContainer";
  problems: string[];
  biggestProblem: string;
  reasonForBiggestProblem: string;
  importantPeople: string[];
  howArePeopleInvolvedInProblems: string;
  sectionConsequences: string;
}

export interface findReadingGuideById_findReadingGuideById_readingGuide {
  __typename: "ReadingGuide";
  _id: string | null;
  readings: findReadingGuideById_findReadingGuideById_readingGuide_readings;
  dueDate: string;
  dueTime: string;
  lessonInfo: findReadingGuideById_findReadingGuideById_readingGuide_lessonInfo;
  readingGuideFinal: findReadingGuideById_findReadingGuideById_readingGuide_readingGuideFinal | null;
}

export interface findReadingGuideById_findReadingGuideById {
  __typename: "FindReadingGuideByIdPayload";
  readingGuide: findReadingGuideById_findReadingGuideById_readingGuide;
}

export interface findReadingGuideById {
  findReadingGuideById: findReadingGuideById_findReadingGuideById;
}

export interface findReadingGuideByIdVariables {
  input: FindReadingGuideByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startReadingGuide
// ====================================================

export interface startReadingGuide_startReadingGuide_readingGuide {
  __typename: "ReadingGuide";
  _id: string | null;
}

export interface startReadingGuide_startReadingGuide {
  __typename: "StartReadingGuidePayload";
  readingGuide: startReadingGuide_startReadingGuide_readingGuide;
}

export interface startReadingGuide {
  startReadingGuide: startReadingGuide_startReadingGuide;
}

export interface startReadingGuideVariables {
  input: StartReadingGuideInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: submitReadingGuide
// ====================================================

export interface submitReadingGuide_submitReadingGuide_readingGuide {
  __typename: "ReadingGuide";
  _id: string | null;
}

export interface submitReadingGuide_submitReadingGuide {
  __typename: "SubmitReadingGuidePayload";
  readingGuide: submitReadingGuide_submitReadingGuide_readingGuide;
}

export interface submitReadingGuide {
  submitReadingGuide: submitReadingGuide_submitReadingGuide;
}

export interface submitReadingGuideVariables {
  input: SubmitReadingGuideInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createArticleReviews
// ====================================================

export interface createArticleReviews_createArticleReviews_articleReviews {
  __typename: "ArticleReview";
  _id: string | null;
}

export interface createArticleReviews_createArticleReviews {
  __typename: "CreateArticleReviewsPayload";
  articleReviews: createArticleReviews_createArticleReviews_articleReviews[];
}

export interface createArticleReviews {
  createArticleReviews: createArticleReviews_createArticleReviews;
}

export interface createArticleReviewsVariables {
  input: CreateArticleReviewsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: returnArticleReview
// ====================================================

export interface returnArticleReview_returnArticleReview_articleReview {
  __typename: "ArticleReview";
  _id: string | null;
}

export interface returnArticleReview_returnArticleReview {
  __typename: "ReturnArticleReviewPayload";
  articleReview: returnArticleReview_returnArticleReview_articleReview;
}

export interface returnArticleReview {
  returnArticleReview: returnArticleReview_returnArticleReview;
}

export interface returnArticleReviewVariables {
  input: ReturnArticleReviewInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findArticleReviewsByCourse
// ====================================================

export interface findArticleReviewsByCourse_findArticleReviewsByCourse_articleReviews_score {
  __typename: "Score";
  earnedPoints: number;
}

export interface findArticleReviewsByCourse_findArticleReviewsByCourse_articleReviews_hasOwner {
  __typename: "Student";
  firstName: string;
  lastName: string;
  schoolId: string | null;
  _id: string | null;
}

export interface findArticleReviewsByCourse_findArticleReviewsByCourse_articleReviews {
  __typename: "ArticleReview";
  _id: string | null;
  score: findArticleReviewsByCourse_findArticleReviewsByCourse_articleReviews_score;
  hasOwner: findArticleReviewsByCourse_findArticleReviewsByCourse_articleReviews_hasOwner;
  assignedDate: string;
  dueDate: string;
  completed: boolean;
  late: boolean;
  returned: boolean;
}

export interface findArticleReviewsByCourse_findArticleReviewsByCourse {
  __typename: "FindArticleReviewsByCoursePayload";
  articleReviews: findArticleReviewsByCourse_findArticleReviewsByCourse_articleReviews[];
}

export interface findArticleReviewsByCourse {
  findArticleReviewsByCourse: findArticleReviewsByCourse_findArticleReviewsByCourse;
}

export interface findArticleReviewsByCourseVariables {
  input: FindArticleReviewsByCourseInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: assignEssays
// ====================================================

export interface assignEssays_assignEssays_essays {
  __typename: "Essay";
  _id: string | null;
}

export interface assignEssays_assignEssays {
  __typename: "AssignEssaysPayload";
  essays: assignEssays_assignEssays_essays[];
}

export interface assignEssays {
  assignEssays: assignEssays_assignEssays;
}

export interface assignEssaysVariables {
  input: AssignEssaysInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findEssaysByAssociatedLessonIdAndCourseId
// ====================================================

export interface findEssaysByAssociatedLessonIdAndCourseId_findEssaysByAssociatedLessonIdAndCourseId_essays_hasOwner {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findEssaysByAssociatedLessonIdAndCourseId_findEssaysByAssociatedLessonIdAndCourseId_essays_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findEssaysByAssociatedLessonIdAndCourseId_findEssaysByAssociatedLessonIdAndCourseId_essays {
  __typename: "Essay";
  assigned: boolean;
  hasOwner: findEssaysByAssociatedLessonIdAndCourseId_findEssaysByAssociatedLessonIdAndCourseId_essays_hasOwner;
  readings: findEssaysByAssociatedLessonIdAndCourseId_findEssaysByAssociatedLessonIdAndCourseId_essays_readings;
  dueDate: string;
  assignedDate: string;
}

export interface findEssaysByAssociatedLessonIdAndCourseId_findEssaysByAssociatedLessonIdAndCourseId {
  __typename: "FindEssaysByAssociatedLessonIdAndCourseIdPayload";
  essays: findEssaysByAssociatedLessonIdAndCourseId_findEssaysByAssociatedLessonIdAndCourseId_essays[];
}

export interface findEssaysByAssociatedLessonIdAndCourseId {
  findEssaysByAssociatedLessonIdAndCourseId: findEssaysByAssociatedLessonIdAndCourseId_findEssaysByAssociatedLessonIdAndCourseId;
}

export interface findEssaysByAssociatedLessonIdAndCourseIdVariables {
  input: FindEssaysByAssociatedLessonIdAndCourseIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findLessonsByCourse
// ====================================================

export interface findLessonsByCourse_findLessonByCourse_lessons {
  __typename: "Lesson";
  _id: string | null;
  lessonName: string;
  assignedDate: any;
}

export interface findLessonsByCourse_findLessonByCourse {
  __typename: "FindLessonByCoursePayload";
  lessons: findLessonsByCourse_findLessonByCourse_lessons[];
}

export interface findLessonsByCourse {
  findLessonByCourse: findLessonsByCourse_findLessonByCourse;
}

export interface findLessonsByCourseVariables {
  input: FindLessonByCourseInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findReadingGuidesByAssociatedLessonAndCourseId
// ====================================================

export interface findReadingGuidesByAssociatedLessonAndCourseId_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides_hasOwner {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findReadingGuidesByAssociatedLessonAndCourseId_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findReadingGuidesByAssociatedLessonAndCourseId_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides {
  __typename: "ReadingGuide";
  assigned: boolean;
  hasOwner: findReadingGuidesByAssociatedLessonAndCourseId_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides_hasOwner;
  readings: findReadingGuidesByAssociatedLessonAndCourseId_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides_readings;
  dueDate: string;
  assignedDate: string;
}

export interface findReadingGuidesByAssociatedLessonAndCourseId_findReadingGuidesByAssociatedLessonAndCourseId {
  __typename: "FindReadingGuidesByAssociatedLessonAndCourseIdPayload";
  readingGuides: findReadingGuidesByAssociatedLessonAndCourseId_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides[];
}

export interface findReadingGuidesByAssociatedLessonAndCourseId {
  findReadingGuidesByAssociatedLessonAndCourseId: findReadingGuidesByAssociatedLessonAndCourseId_findReadingGuidesByAssociatedLessonAndCourseId;
}

export interface findReadingGuidesByAssociatedLessonAndCourseIdVariables {
  input: FindReadingGuidesByAssociatedLessonAndCourseIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: assignReadingGuides
// ====================================================

export interface assignReadingGuides_assignReadingGuides_readingGuides {
  __typename: "ReadingGuide";
  _id: string | null;
}

export interface assignReadingGuides_assignReadingGuides {
  __typename: "AssignReadingGuidesPayload";
  readingGuides: assignReadingGuides_assignReadingGuides_readingGuides[];
}

export interface assignReadingGuides {
  assignReadingGuides: assignReadingGuides_assignReadingGuides;
}

export interface assignReadingGuidesVariables {
  input: AssignReadingGuidesInput;
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
// GraphQL query operation: findWritingLevelsForCourse
// ====================================================

export interface findWritingLevelsForCourse_findStudentsByCourse_students_hasWritingMetrics_overallWritingMetric {
  __typename: "OverallWritingMetric";
  overallWritingLevel: WritingLevelEnum;
}

export interface findWritingLevelsForCourse_findStudentsByCourse_students_hasWritingMetrics {
  __typename: "WritingMetrics";
  overallWritingMetric: findWritingLevelsForCourse_findStudentsByCourse_students_hasWritingMetrics_overallWritingMetric;
}

export interface findWritingLevelsForCourse_findStudentsByCourse_students {
  __typename: "Student";
  hasWritingMetrics: findWritingLevelsForCourse_findStudentsByCourse_students_hasWritingMetrics;
}

export interface findWritingLevelsForCourse_findStudentsByCourse {
  __typename: "FindStudentsByCoursePayload";
  students: findWritingLevelsForCourse_findStudentsByCourse_students[];
}

export interface findWritingLevelsForCourse {
  findStudentsByCourse: findWritingLevelsForCourse_findStudentsByCourse;
}

export interface findWritingLevelsForCourseVariables {
  input: FindStudentsByCourseInput;
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

export interface findLessonById_findLessonById_lesson_assignedCourses_hasCourseInfo {
  __typename: "CourseInfo";
  startsAt: string;
  endsAt: string;
  schoolDayType: SchoolDayType;
}

export interface findLessonById_findLessonById_lesson_assignedCourses {
  __typename: "Course";
  hasCourseInfo: findLessonById_findLessonById_lesson_assignedCourses_hasCourseInfo | null;
  _id: string | null;
}

export interface findLessonById_findLessonById_lesson {
  __typename: "Lesson";
  _id: string | null;
  assignedMarkingPeriod: MarkingPeriodEnum;
  assignedDate: any;
  questionList: findLessonById_findLessonById_lesson_questionList[];
  pageNumbers: findLessonById_findLessonById_lesson_pageNumbers;
  assignedSections: findLessonById_findLessonById_lesson_assignedSections;
  assignedSectionIdList: string[];
  assignedCourses: findLessonById_findLessonById_lesson_assignedCourses[];
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
  assignedDate: any;
  lessonType: LessonTypeEnum;
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
// GraphQL query operation: findTextSectionsByIdForEssayQuestionLoader
// ====================================================

export interface findTextSectionsByIdForEssayQuestionLoader_findTextSectionsById_textSections_hasEssayQuestions_questionParts {
  __typename: "QuestionPartsContainer";
  originalQuestion: string;
  questionType: QuestionTypeEnum;
}

export interface findTextSectionsByIdForEssayQuestionLoader_findTextSectionsById_textSections_hasEssayQuestions {
  __typename: "EssayQuestion";
  _id: string | null;
  questionParts: findTextSectionsByIdForEssayQuestionLoader_findTextSectionsById_textSections_hasEssayQuestions_questionParts;
}

export interface findTextSectionsByIdForEssayQuestionLoader_findTextSectionsById_textSections {
  __typename: "TextSection";
  hasEssayQuestions: findTextSectionsByIdForEssayQuestionLoader_findTextSectionsById_textSections_hasEssayQuestions[];
}

export interface findTextSectionsByIdForEssayQuestionLoader_findTextSectionsById {
  __typename: "FindTextSectionsByIdPayload";
  textSections: findTextSectionsByIdForEssayQuestionLoader_findTextSectionsById_textSections[];
}

export interface findTextSectionsByIdForEssayQuestionLoader {
  findTextSectionsById: findTextSectionsByIdForEssayQuestionLoader_findTextSectionsById;
}

export interface findTextSectionsByIdForEssayQuestionLoaderVariables {
  input: FindTextSectionsByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createReadingGuide
// ====================================================

export interface createReadingGuide_createReadingGuide_readingGuides {
  __typename: "ReadingGuide";
  _id: string | null;
}

export interface createReadingGuide_createReadingGuide {
  __typename: "CreateReadingGuidePayload";
  readingGuides: createReadingGuide_createReadingGuide_readingGuides[];
}

export interface createReadingGuide {
  createReadingGuide: createReadingGuide_createReadingGuide;
}

export interface createReadingGuideVariables {
  input: CreateReadingGuideInput;
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
  _id: string | null;
  firstName: string;
  lastName: string;
  inCourses: findEssaysToGradeById_findEssaysToGradeById_essays_hasOwner_inCourses[];
}

export interface findEssaysToGradeById_findEssaysToGradeById_essays_finalDraft_submittedFinalDraft {
  __typename: "SubmittedFinalDraft";
  draftNumber: number;
  graded: boolean;
}

export interface findEssaysToGradeById_findEssaysToGradeById_essays_finalDraft {
  __typename: "FinalDraftContainer";
  returned: boolean;
  submitted: boolean;
  submittedFinalDraft: findEssaysToGradeById_findEssaysToGradeById_essays_finalDraft_submittedFinalDraft[];
}

export interface findEssaysToGradeById_findEssaysToGradeById_essays {
  __typename: "Essay";
  _id: string | null;
  late: boolean;
  assigned: boolean;
  markingPeriod: MarkingPeriodEnum;
  readings: findEssaysToGradeById_findEssaysToGradeById_essays_readings;
  hasOwner: findEssaysToGradeById_findEssaysToGradeById_essays_hasOwner;
  finalDraft: findEssaysToGradeById_findEssaysToGradeById_essays_finalDraft | null;
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
// GraphQL query operation: findEssayToGradeById
// ====================================================

export interface findEssayToGradeById_findEssayById_essay_hasOwner {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findEssayToGradeById_findEssayById_essay_topic {
  __typename: "Topic";
  question: string;
  writingLevel: WritingLevelEnum;
}

export interface findEssayToGradeById_findEssayById_essay_readings {
  __typename: "Readings";
  readingPages: string;
  readingSections: string;
}

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer_developingSentenceStructure {
  __typename: "DevelopingSentenceStructure";
  subject: string;
  verb: string;
}

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer {
  __typename: "DevelopingOrganizer";
  restatement: string;
  developingSentenceStructure: findEssayToGradeById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer_developingSentenceStructure;
  basicQuestionType: BasicQuestionEnum | null;
  answer: string;
  conclusion: string;
}

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_academicSentenceStructure {
  __typename: "AcademicSentenceStructure";
  subject: string;
  verb: string;
  object: string | null;
}

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_HowCauseEffectAnswerType {
  __typename: "HowCauseEffectAnswerType";
  before: string;
  cause: string;
  after: string;
}

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_ProblemSolutionAnswerType {
  __typename: "ProblemSolutionAnswerType";
  problem: string;
  reasonForProblem: string;
  solvedBy: string;
  whySolutionSolved: string;
}

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_WhyCauseEffectAnswerType {
  __typename: "WhyCauseEffectAnswerType";
  ultimateCause: string;
  proximateCause: string;
}

export type findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType = findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_HowCauseEffectAnswerType | findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_ProblemSolutionAnswerType | findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType_WhyCauseEffectAnswerType;

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer {
  __typename: "AcademicOrganizer";
  academicSentenceStructure: findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_academicSentenceStructure;
  questionType: QuestionTypeEnum | null;
  answerType: findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer_answerType | null;
  restatement: string;
  conclusion: string;
}

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_advancedSentenceStructure {
  __typename: "AdvancedSentenceStructure";
  subject: string;
  verb: string;
  object: string | null;
}

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_HowCauseEffectAnswerType {
  __typename: "HowCauseEffectAnswerType";
  before: string;
  cause: string;
  after: string;
}

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_ProblemSolutionAnswerType {
  __typename: "ProblemSolutionAnswerType";
  problem: string;
  reasonForProblem: string;
  solvedBy: string;
  whySolutionSolved: string;
}

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_WhyCauseEffectAnswerType {
  __typename: "WhyCauseEffectAnswerType";
  ultimateCause: string;
  proximateCause: string;
}

export type findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType = findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_HowCauseEffectAnswerType | findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_ProblemSolutionAnswerType | findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType_WhyCauseEffectAnswerType;

export interface findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer {
  __typename: "AdvancedOrganizer";
  advancedSentenceStructure: findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_advancedSentenceStructure;
  questionType: QuestionTypeEnum | null;
  answerType: findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer_answerType | null;
  restatement: string;
  conclusion: string;
}

export type findEssayToGradeById_findEssayById_essay_workingDraft_organizer = findEssayToGradeById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer | findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer | findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer;

export interface findEssayToGradeById_findEssayById_essay_workingDraft {
  __typename: "WorkingDraft";
  organizer: findEssayToGradeById_findEssayById_essay_workingDraft_organizer | null;
}

export interface findEssayToGradeById_findEssayById_essay_finalDraft_submittedFinalDraft_rubricEntries {
  __typename: "RubricEntry";
  entry: string;
  score: number;
  rubricSection: RubricSectionEnum;
  howToImprove: string | null;
}

export interface findEssayToGradeById_findEssayById_essay_finalDraft_submittedFinalDraft {
  __typename: "SubmittedFinalDraft";
  draft: any;
  gradingDraft: any;
  draftNumber: number;
  score: number;
  additionalComments: string[] | null;
  rubricEntries: findEssayToGradeById_findEssayById_essay_finalDraft_submittedFinalDraft_rubricEntries[];
}

export interface findEssayToGradeById_findEssayById_essay_finalDraft {
  __typename: "FinalDraftContainer";
  submitTime: any | null;
  submitted: boolean;
  returned: boolean;
  submittedFinalDraft: findEssayToGradeById_findEssayById_essay_finalDraft_submittedFinalDraft[];
}

export interface findEssayToGradeById_findEssayById_essay {
  __typename: "Essay";
  _id: string | null;
  assigned: boolean;
  hasOwner: findEssayToGradeById_findEssayById_essay_hasOwner;
  topic: findEssayToGradeById_findEssayById_essay_topic;
  dueDate: string;
  dueTime: string;
  readings: findEssayToGradeById_findEssayById_essay_readings;
  workingDraft: findEssayToGradeById_findEssayById_essay_workingDraft;
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
// GraphQL mutation operation: returnGradedEssay
// ====================================================

export interface returnGradedEssay_returnGradedEssay_essay {
  __typename: "Essay";
  _id: string | null;
  assigned: boolean;
}

export interface returnGradedEssay_returnGradedEssay {
  __typename: "ReturnGradedEssayPayload";
  essay: returnGradedEssay_returnGradedEssay_essay;
}

export interface returnGradedEssay {
  returnGradedEssay: returnGradedEssay_returnGradedEssay;
}

export interface returnGradedEssayVariables {
  input: ReturnGradedEssayInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateGradingDraft
// ====================================================

export interface updateGradingDraft_updateGradingDraft_essay {
  __typename: "Essay";
  _id: string | null;
}

export interface updateGradingDraft_updateGradingDraft {
  __typename: "UpdateGradingDraftPayload";
  essay: updateGradingDraft_updateGradingDraft_essay;
}

export interface updateGradingDraft {
  updateGradingDraft: updateGradingDraft_updateGradingDraft;
}

export interface updateGradingDraftVariables {
  input: UpdateGradingDraftInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findStudentsByCourse
// ====================================================

export interface findStudentsByCourse_findStudentsByCourse_students_hasAssignments_Test_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findStudentsByCourse_findStudentsByCourse_students_hasAssignments_Test {
  __typename: "Test";
  _id: string | null;
  markingPeriod: MarkingPeriodEnum;
  readings: findStudentsByCourse_findStudentsByCourse_students_hasAssignments_Test_readings;
}

export interface findStudentsByCourse_findStudentsByCourse_students_hasAssignments_Essay_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findStudentsByCourse_findStudentsByCourse_students_hasAssignments_Essay_finalDraft {
  __typename: "FinalDraftContainer";
  submitted: boolean;
}

export interface findStudentsByCourse_findStudentsByCourse_students_hasAssignments_Essay {
  __typename: "Essay";
  _id: string | null;
  markingPeriod: MarkingPeriodEnum;
  readings: findStudentsByCourse_findStudentsByCourse_students_hasAssignments_Essay_readings;
  finalDraft: findStudentsByCourse_findStudentsByCourse_students_hasAssignments_Essay_finalDraft | null;
}

export interface findStudentsByCourse_findStudentsByCourse_students_hasAssignments_ReadingGuide_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findStudentsByCourse_findStudentsByCourse_students_hasAssignments_ReadingGuide_readingGuideFinal {
  __typename: "ReadingGuideFinalContainer";
  submitted: boolean;
}

export interface findStudentsByCourse_findStudentsByCourse_students_hasAssignments_ReadingGuide {
  __typename: "ReadingGuide";
  _id: string | null;
  markingPeriod: MarkingPeriodEnum;
  readings: findStudentsByCourse_findStudentsByCourse_students_hasAssignments_ReadingGuide_readings;
  readingGuideFinal: findStudentsByCourse_findStudentsByCourse_students_hasAssignments_ReadingGuide_readingGuideFinal | null;
  graded: boolean;
}

export type findStudentsByCourse_findStudentsByCourse_students_hasAssignments = findStudentsByCourse_findStudentsByCourse_students_hasAssignments_Test | findStudentsByCourse_findStudentsByCourse_students_hasAssignments_Essay | findStudentsByCourse_findStudentsByCourse_students_hasAssignments_ReadingGuide;

export interface findStudentsByCourse_findStudentsByCourse_students {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
  hasAssignments: findStudentsByCourse_findStudentsByCourse_students_hasAssignments[];
}

export interface findStudentsByCourse_findStudentsByCourse {
  __typename: "FindStudentsByCoursePayload";
  students: findStudentsByCourse_findStudentsByCourse_students[];
}

export interface findStudentsByCourse {
  findStudentsByCourse: findStudentsByCourse_findStudentsByCourse;
}

export interface findStudentsByCourseVariables {
  input: FindStudentsByCourseInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findAssignmentById
// ====================================================

export interface findAssignmentById_findAssignmentById_assignment_Test_hasOwner {
  __typename: "Student";
  firstName: string;
  lastName: string;
}

export interface findAssignmentById_findAssignmentById_assignment_Test_readings {
  __typename: "Readings";
  readingPages: string;
  readingSections: string;
}

export interface findAssignmentById_findAssignmentById_assignment_Test {
  __typename: "Test";
  _id: string | null;
  hasOwner: findAssignmentById_findAssignmentById_assignment_Test_hasOwner;
  late: boolean;
  readings: findAssignmentById_findAssignmentById_assignment_Test_readings;
}

export interface findAssignmentById_findAssignmentById_assignment_Essay_hasOwner {
  __typename: "Student";
  firstName: string;
  lastName: string;
}

export interface findAssignmentById_findAssignmentById_assignment_Essay_readings {
  __typename: "Readings";
  readingPages: string;
  readingSections: string;
}

export interface findAssignmentById_findAssignmentById_assignment_Essay_workingDraft {
  __typename: "WorkingDraft";
  draft: string;
}

export interface findAssignmentById_findAssignmentById_assignment_Essay_topic {
  __typename: "Topic";
  writingLevel: WritingLevelEnum;
  question: string;
}

export interface findAssignmentById_findAssignmentById_assignment_Essay_finalDraft_submittedFinalDraft_rubricEntries {
  __typename: "RubricEntry";
  _id: string | null;
  entry: string;
  score: number;
  rubricSection: RubricSectionEnum;
}

export interface findAssignmentById_findAssignmentById_assignment_Essay_finalDraft_submittedFinalDraft {
  __typename: "SubmittedFinalDraft";
  draft: any;
  gradingDraft: any;
  draftNumber: number;
  graded: boolean;
  score: number;
  additionalComments: string[] | null;
  rubricEntries: findAssignmentById_findAssignmentById_assignment_Essay_finalDraft_submittedFinalDraft_rubricEntries[];
}

export interface findAssignmentById_findAssignmentById_assignment_Essay_finalDraft {
  __typename: "FinalDraftContainer";
  submitTime: any | null;
  submitted: boolean;
  returned: boolean;
  submittedFinalDraft: findAssignmentById_findAssignmentById_assignment_Essay_finalDraft_submittedFinalDraft[];
}

export interface findAssignmentById_findAssignmentById_assignment_Essay {
  __typename: "Essay";
  _id: string | null;
  hasOwner: findAssignmentById_findAssignmentById_assignment_Essay_hasOwner;
  late: boolean;
  readings: findAssignmentById_findAssignmentById_assignment_Essay_readings;
  workingDraft: findAssignmentById_findAssignmentById_assignment_Essay_workingDraft;
  topic: findAssignmentById_findAssignmentById_assignment_Essay_topic;
  finalDraft: findAssignmentById_findAssignmentById_assignment_Essay_finalDraft | null;
}

export interface findAssignmentById_findAssignmentById_assignment_ReadingGuide_hasOwner {
  __typename: "Student";
  firstName: string;
  lastName: string;
}

export interface findAssignmentById_findAssignmentById_assignment_ReadingGuide_readings {
  __typename: "Readings";
  readingPages: string;
  readingSections: string;
}

export interface findAssignmentById_findAssignmentById_assignment_ReadingGuide_readingGuideFinal {
  __typename: "ReadingGuideFinalContainer";
  submitted: boolean;
}

export interface findAssignmentById_findAssignmentById_assignment_ReadingGuide {
  __typename: "ReadingGuide";
  _id: string | null;
  hasOwner: findAssignmentById_findAssignmentById_assignment_ReadingGuide_hasOwner;
  late: boolean;
  readings: findAssignmentById_findAssignmentById_assignment_ReadingGuide_readings;
  paperBased: boolean;
  graded: boolean;
  completed: boolean;
  readingGuideFinal: findAssignmentById_findAssignmentById_assignment_ReadingGuide_readingGuideFinal | null;
}

export type findAssignmentById_findAssignmentById_assignment = findAssignmentById_findAssignmentById_assignment_Test | findAssignmentById_findAssignmentById_assignment_Essay | findAssignmentById_findAssignmentById_assignment_ReadingGuide;

export interface findAssignmentById_findAssignmentById {
  __typename: "FindAssignmentByIdPayload";
  assignment: findAssignmentById_findAssignmentById_assignment;
}

export interface findAssignmentById {
  findAssignmentById: findAssignmentById_findAssignmentById;
}

export interface findAssignmentByIdVariables {
  input: FindAssignmentByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findReadingGuideDataForCourseAndLesson
// ====================================================

export interface findReadingGuideDataForCourseAndLesson_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides_hasOwner {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findReadingGuideDataForCourseAndLesson_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findReadingGuideDataForCourseAndLesson_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides_readingGuideFinal {
  __typename: "ReadingGuideFinalContainer";
  submitted: boolean;
}

export interface findReadingGuideDataForCourseAndLesson_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides {
  __typename: "ReadingGuide";
  assigned: boolean;
  hasOwner: findReadingGuideDataForCourseAndLesson_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides_hasOwner;
  readings: findReadingGuideDataForCourseAndLesson_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides_readings;
  completed: boolean;
  graded: boolean;
  readingGuideFinal: findReadingGuideDataForCourseAndLesson_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides_readingGuideFinal | null;
}

export interface findReadingGuideDataForCourseAndLesson_findReadingGuidesByAssociatedLessonAndCourseId {
  __typename: "FindReadingGuidesByAssociatedLessonAndCourseIdPayload";
  readingGuides: findReadingGuideDataForCourseAndLesson_findReadingGuidesByAssociatedLessonAndCourseId_readingGuides[];
}

export interface findReadingGuideDataForCourseAndLesson {
  findReadingGuidesByAssociatedLessonAndCourseId: findReadingGuideDataForCourseAndLesson_findReadingGuidesByAssociatedLessonAndCourseId;
}

export interface findReadingGuideDataForCourseAndLessonVariables {
  input: FindReadingGuidesByAssociatedLessonAndCourseIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findEssaysByAssociatedLessonId
// ====================================================

export interface findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays_hasOwner {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
  schoolId: string | null;
}

export interface findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays_score {
  __typename: "Score";
  earnedPoints: number;
}

export interface findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays_finalDraft {
  __typename: "FinalDraftContainer";
  returned: boolean;
  submitted: boolean;
}

export interface findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays {
  __typename: "Essay";
  _id: string | null;
  readings: findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays_readings;
  hasOwner: findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays_hasOwner;
  score: findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays_score;
  finalDraft: findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays_finalDraft | null;
  exempt: boolean;
}

export interface findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId {
  __typename: "FindEssaysByAssociatedLessonIdPayload";
  essays: findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId_essays[];
}

export interface findEssaysByAssociatedLessonId {
  findEssaysByAssociatedLessonId: findEssaysByAssociatedLessonId_findEssaysByAssociatedLessonId;
}

export interface findEssaysByAssociatedLessonIdVariables {
  input: FindEssaysByAssociatedLessonIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findResponsibilityPointsByCourse
// ====================================================

export interface findResponsibilityPointsByCourse_findResponsibilityPointsByCourse_responsibilityPointList_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
  schoolId: string | null;
}

export interface findResponsibilityPointsByCourse_findResponsibilityPointsByCourse_responsibilityPointList {
  __typename: "ResponsibilityPoints";
  student: findResponsibilityPointsByCourse_findResponsibilityPointsByCourse_responsibilityPointList_student;
  responsibilityPoints: number;
  markingPeriod: MarkingPeriodEnum;
}

export interface findResponsibilityPointsByCourse_findResponsibilityPointsByCourse {
  __typename: "FindResponsibilityPointsByCoursePayload";
  responsibilityPointList: findResponsibilityPointsByCourse_findResponsibilityPointsByCourse_responsibilityPointList[];
}

export interface findResponsibilityPointsByCourse {
  findResponsibilityPointsByCourse: findResponsibilityPointsByCourse_findResponsibilityPointsByCourse;
}

export interface findResponsibilityPointsByCourseVariables {
  input: FindResponsibilityPointsByCourseInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCourseInfo
// ====================================================

export interface createCourseInfo_createCourseInfo_courseInfo {
  __typename: "CourseInfo";
  _id: string | null;
}

export interface createCourseInfo_createCourseInfo {
  __typename: "CreateCourseInfoPayload";
  courseInfo: createCourseInfo_createCourseInfo_courseInfo;
}

export interface createCourseInfo {
  createCourseInfo: createCourseInfo_createCourseInfo;
}

export interface createCourseInfoVariables {
  input: CreateCourseInfoInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addCourseToTeacher
// ====================================================

export interface addCourseToTeacher_addCourseToTeacher_teacher {
  __typename: "Teacher";
  _id: string | null;
}

export interface addCourseToTeacher_addCourseToTeacher {
  __typename: "AddCourseToTeacherPayload";
  teacher: addCourseToTeacher_addCourseToTeacher_teacher;
}

export interface addCourseToTeacher {
  addCourseToTeacher: addCourseToTeacher_addCourseToTeacher;
}

export interface addCourseToTeacherVariables {
  input: AddCourseToTeacherInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeCourse
// ====================================================

export interface removeCourse_removeCourse {
  __typename: "RemoveCoursePayload";
  removed: boolean;
}

export interface removeCourse {
  removeCourse: removeCourse_removeCourse;
}

export interface removeCourseVariables {
  input: RemoveCourseInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCourse
// ====================================================

export interface createCourse_createCourse_course {
  __typename: "Course";
  _id: string | null;
}

export interface createCourse_createCourse {
  __typename: "CreateCoursePayload";
  course: createCourse_createCourse_course;
}

export interface createCourse {
  createCourse: createCourse_createCourse;
}

export interface createCourseVariables {
  input: CreateCourseInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findAllCourseTitles
// ====================================================

export interface findAllCourseTitles_findAllCourseTitles_courses {
  __typename: "Course";
  _id: string | null;
  name: string;
}

export interface findAllCourseTitles_findAllCourseTitles {
  __typename: "FindAllCourseTitlesPayload";
  courses: findAllCourseTitles_findAllCourseTitles_courses[];
}

export interface findAllCourseTitles {
  findAllCourseTitles: findAllCourseTitles_findAllCourseTitles;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateCourseInfo
// ====================================================

export interface updateCourseInfo_updateCourseInfo_courseInfo_course_hasCourseInfo {
  __typename: "CourseInfo";
  _id: string | null;
}

export interface updateCourseInfo_updateCourseInfo_courseInfo_course {
  __typename: "Course";
  _id: string | null;
  hasCourseInfo: updateCourseInfo_updateCourseInfo_courseInfo_course_hasCourseInfo | null;
}

export interface updateCourseInfo_updateCourseInfo_courseInfo {
  __typename: "CourseInfo";
  course: updateCourseInfo_updateCourseInfo_courseInfo_course;
}

export interface updateCourseInfo_updateCourseInfo {
  __typename: "UpdateCourseInfoPayload";
  courseInfo: updateCourseInfo_updateCourseInfo_courseInfo;
}

export interface updateCourseInfo {
  updateCourseInfo: updateCourseInfo_updateCourseInfo;
}

export interface updateCourseInfoVariables {
  input: UpdateCourseInfoInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findCourseByIdForCourseEditor
// ====================================================

export interface findCourseByIdForCourseEditor_findCourseById_course_hasCourseInfo_assignedSeats_student {
  __typename: "Student";
  _id: string | null;
}

export interface findCourseByIdForCourseEditor_findCourseById_course_hasCourseInfo_assignedSeats {
  __typename: "StudentSeat";
  student: findCourseByIdForCourseEditor_findCourseById_course_hasCourseInfo_assignedSeats_student | null;
}

export interface findCourseByIdForCourseEditor_findCourseById_course_hasCourseInfo {
  __typename: "CourseInfo";
  courseType: CourseTypeEnum;
  endsAt: string;
  halfDayEndsAt: string;
  halfDayStartsAt: string;
  schoolDayType: SchoolDayType;
  startsAt: string;
  assignedSeats: findCourseByIdForCourseEditor_findCourseById_course_hasCourseInfo_assignedSeats[];
  cohortBasedSeating: boolean;
}

export interface findCourseByIdForCourseEditor_findCourseById_course {
  __typename: "Course";
  _id: string | null;
  name: string;
  hasCourseInfo: findCourseByIdForCourseEditor_findCourseById_course_hasCourseInfo | null;
}

export interface findCourseByIdForCourseEditor_findCourseById {
  __typename: "FindCourseByIdPayload";
  course: findCourseByIdForCourseEditor_findCourseById_course;
}

export interface findCourseByIdForCourseEditor {
  findCourseById: findCourseByIdForCourseEditor_findCourseById;
}

export interface findCourseByIdForCourseEditorVariables {
  input: FindCourseByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addStudentsToCourse
// ====================================================

export interface addStudentsToCourse_addStudentsToCourse_students {
  __typename: "Student";
  _id: string | null;
  userName: string;
}

export interface addStudentsToCourse_addStudentsToCourse {
  __typename: "AddStudentsToCoursePayload";
  students: addStudentsToCourse_addStudentsToCourse_students[];
}

export interface addStudentsToCourse {
  addStudentsToCourse: addStudentsToCourse_addStudentsToCourse;
}

export interface addStudentsToCourseVariables {
  input: AddStudentsToCourseInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findAllStudents
// ====================================================

export interface findAllStudents_findAllStudents_students_inCourses_hasCourseInfo {
  __typename: "CourseInfo";
  courseType: CourseTypeEnum;
}

export interface findAllStudents_findAllStudents_students_inCourses {
  __typename: "Course";
  _id: string | null;
  hasCourseInfo: findAllStudents_findAllStudents_students_inCourses_hasCourseInfo | null;
}

export interface findAllStudents_findAllStudents_students {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
  inCourses: findAllStudents_findAllStudents_students_inCourses[];
}

export interface findAllStudents_findAllStudents {
  __typename: "FindAllStudentsPayload";
  students: findAllStudents_findAllStudents_students[];
}

export interface findAllStudents {
  findAllStudents: findAllStudents_findAllStudents;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: initializeStudent
// ====================================================

export interface initializeStudent_initializeStudents_students {
  __typename: "Student";
  _id: string | null;
}

export interface initializeStudent_initializeStudents {
  __typename: "InitializeStudentsPayload";
  students: initializeStudent_initializeStudents_students[];
}

export interface initializeStudent {
  initializeStudents: initializeStudent_initializeStudents;
}

export interface initializeStudentVariables {
  input: InitializeStudentsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findCourseByIdForStudentRegistration
// ====================================================

export interface findCourseByIdForStudentRegistration_findCourseById_course_hasStudents {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
  virtual: boolean;
  cohort: StudentCohortEnum;
}

export interface findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats_redCohortStudent {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats_whiteCohortStudent {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats {
  __typename: "StudentSeat";
  deskNumber: number;
  student: findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats_student | null;
  redCohortStudent: findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats_redCohortStudent | null;
  whiteCohortStudent: findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats_whiteCohortStudent | null;
}

export interface findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo {
  __typename: "CourseInfo";
  _id: string | null;
  courseType: CourseTypeEnum;
  cohortBasedSeating: boolean;
  assignedSeats: findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats[];
}

export interface findCourseByIdForStudentRegistration_findCourseById_course {
  __typename: "Course";
  _id: string | null;
  hasStudents: findCourseByIdForStudentRegistration_findCourseById_course_hasStudents[];
  hasCourseInfo: findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo | null;
}

export interface findCourseByIdForStudentRegistration_findCourseById {
  __typename: "FindCourseByIdPayload";
  course: findCourseByIdForStudentRegistration_findCourseById_course;
}

export interface findCourseByIdForStudentRegistration {
  findCourseById: findCourseByIdForStudentRegistration_findCourseById;
}

export interface findCourseByIdForStudentRegistrationVariables {
  input: FindCourseByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: registerStudent
// ====================================================

export interface registerStudent_registerStudent_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
  userName: string;
  email: string | null;
}

export interface registerStudent_registerStudent {
  __typename: "RegisterStudentPayload";
  student: registerStudent_registerStudent_student;
}

export interface registerStudent {
  registerStudent: registerStudent_registerStudent;
}

export interface registerStudentVariables {
  input: RegisterStudentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findAllUsers
// ====================================================

export interface findAllUsers_findAllUsers_users_Student {
  __typename: "Student";
  userName: string;
}

export interface findAllUsers_findAllUsers_users_Teacher {
  __typename: "Teacher";
  userName: string;
}

export type findAllUsers_findAllUsers_users = findAllUsers_findAllUsers_users_Student | findAllUsers_findAllUsers_users_Teacher;

export interface findAllUsers_findAllUsers {
  __typename: "FindAllUsersPayload";
  users: findAllUsers_findAllUsers_users[];
}

export interface findAllUsers {
  findAllUsers: findAllUsers_findAllUsers;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: assignCohortBasedSeats
// ====================================================

export interface assignCohortBasedSeats_assignSeats_courseInfo_assignedSeats_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
}

export interface assignCohortBasedSeats_assignSeats_courseInfo_assignedSeats_redCohortStudent {
  __typename: "Student";
  _id: string | null;
  firstName: string;
}

export interface assignCohortBasedSeats_assignSeats_courseInfo_assignedSeats_whiteCohortStudent {
  __typename: "Student";
  _id: string | null;
  firstName: string;
}

export interface assignCohortBasedSeats_assignSeats_courseInfo_assignedSeats {
  __typename: "StudentSeat";
  deskNumber: number;
  student: assignCohortBasedSeats_assignSeats_courseInfo_assignedSeats_student | null;
  redCohortStudent: assignCohortBasedSeats_assignSeats_courseInfo_assignedSeats_redCohortStudent | null;
  whiteCohortStudent: assignCohortBasedSeats_assignSeats_courseInfo_assignedSeats_whiteCohortStudent | null;
}

export interface assignCohortBasedSeats_assignSeats_courseInfo {
  __typename: "CourseInfo";
  _id: string | null;
  assignedSeats: assignCohortBasedSeats_assignSeats_courseInfo_assignedSeats[];
}

export interface assignCohortBasedSeats_assignSeats {
  __typename: "AssignSeatsPayload";
  courseInfo: assignCohortBasedSeats_assignSeats_courseInfo;
}

export interface assignCohortBasedSeats {
  assignSeats: assignCohortBasedSeats_assignSeats;
}

export interface assignCohortBasedSeatsVariables {
  input: AssignSeatsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeCohortBasedSeat
// ====================================================

export interface removeCohortBasedSeat_removeAssignedSeat_courseInfo {
  __typename: "CourseInfo";
  _id: string | null;
}

export interface removeCohortBasedSeat_removeAssignedSeat {
  __typename: "RemoveAssignedSeatPayload";
  courseInfo: removeCohortBasedSeat_removeAssignedSeat_courseInfo;
}

export interface removeCohortBasedSeat {
  removeAssignedSeat: removeCohortBasedSeat_removeAssignedSeat;
}

export interface removeCohortBasedSeatVariables {
  input: RemoveAssignedSeatInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: assignRegularSeats
// ====================================================

export interface assignRegularSeats_assignSeats_courseInfo_assignedSeats_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
}

export interface assignRegularSeats_assignSeats_courseInfo_assignedSeats {
  __typename: "StudentSeat";
  deskNumber: number;
  student: assignRegularSeats_assignSeats_courseInfo_assignedSeats_student | null;
}

export interface assignRegularSeats_assignSeats_courseInfo {
  __typename: "CourseInfo";
  _id: string | null;
  assignedSeats: assignRegularSeats_assignSeats_courseInfo_assignedSeats[];
}

export interface assignRegularSeats_assignSeats {
  __typename: "AssignSeatsPayload";
  courseInfo: assignRegularSeats_assignSeats_courseInfo;
}

export interface assignRegularSeats {
  assignSeats: assignRegularSeats_assignSeats;
}

export interface assignRegularSeatsVariables {
  input: AssignSeatsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findRosterByCourse
// ====================================================

export interface findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student_hasProtocols {
  __typename: "Protocol";
  completed: boolean;
  assessment: ProtocolAssessmentEnum | null;
  discussionLevel: DiscussionTypesEnum | null;
}

export interface findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student_hasUnExcusedLatenesses {
  __typename: "UnexcusedLateness";
  markingPeriod: MarkingPeriodEnum;
  dayLate: any;
}

export interface findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student_hasExcusedLatenesses {
  __typename: "ExcusedLateness";
  markingPeriod: MarkingPeriodEnum;
  dayLateExcused: any;
}

export interface findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student_hasAbsences {
  __typename: "StudentAbsence";
  markingPeriod: MarkingPeriodEnum;
  dayAbsent: any;
}

export interface findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student_hasAssignments {
  __typename: "Essay" | "ReadingGuide" | "Test";
}

export interface findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student {
  __typename: "Student";
  _id: string | null;
  userName: string;
  lastName: string;
  firstName: string;
  hasProtocols: findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student_hasProtocols[];
  hasUnExcusedLatenesses: findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student_hasUnExcusedLatenesses[];
  hasExcusedLatenesses: findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student_hasExcusedLatenesses[];
  hasAbsences: findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student_hasAbsences[];
  hasAssignments: findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student_hasAssignments[];
}

export interface findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats {
  __typename: "StudentSeat";
  deskNumber: number;
  student: findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats_student | null;
}

export interface findRosterByCourse_findCourseById_course_hasCourseInfo {
  __typename: "CourseInfo";
  assignedSeats: findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats[];
}

export interface findRosterByCourse_findCourseById_course {
  __typename: "Course";
  hasCourseInfo: findRosterByCourse_findCourseById_course_hasCourseInfo | null;
}

export interface findRosterByCourse_findCourseById {
  __typename: "FindCourseByIdPayload";
  course: findRosterByCourse_findCourseById_course;
}

export interface findRosterByCourse {
  findCourseById: findRosterByCourse_findCourseById;
}

export interface findRosterByCourseVariables {
  input: FindCourseByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createTemporaryTasks
// ====================================================

export interface createTemporaryTasks_createTemporaryTasks_temporaryTasks_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface createTemporaryTasks_createTemporaryTasks_temporaryTasks {
  __typename: "TemporaryTask";
  _id: string | null;
  dateIssued: string;
  student: createTemporaryTasks_createTemporaryTasks_temporaryTasks_student;
  studentPresent: boolean;
  taskNumber: number;
}

export interface createTemporaryTasks_createTemporaryTasks {
  __typename: "CreateTemporaryTasksPayload";
  temporaryTasks: createTemporaryTasks_createTemporaryTasks_temporaryTasks[];
}

export interface createTemporaryTasks {
  createTemporaryTasks: createTemporaryTasks_createTemporaryTasks;
}

export interface createTemporaryTasksVariables {
  input: CreateTemporaryTasksInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: markTemporaryTaskAbsent
// ====================================================

export interface markTemporaryTaskAbsent_markTemporaryTaskAbsent_temporaryTask {
  __typename: "TemporaryTask";
  _id: string | null;
}

export interface markTemporaryTaskAbsent_markTemporaryTaskAbsent {
  __typename: "MarkTemporaryTaskAbsentPayload";
  temporaryTask: markTemporaryTaskAbsent_markTemporaryTaskAbsent_temporaryTask;
}

export interface markTemporaryTaskAbsent {
  markTemporaryTaskAbsent: markTemporaryTaskAbsent_markTemporaryTaskAbsent;
}

export interface markTemporaryTaskAbsentVariables {
  input: MarkTemporaryTaskAbsentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: gradeTemporaryTask
// ====================================================

export interface gradeTemporaryTask_gradeTemporaryTask_temporaryTask_student {
  __typename: "Student";
  firstName: string;
}

export interface gradeTemporaryTask_gradeTemporaryTask_temporaryTask {
  __typename: "TemporaryTask";
  _id: string | null;
  student: gradeTemporaryTask_gradeTemporaryTask_temporaryTask_student;
  answered: boolean;
}

export interface gradeTemporaryTask_gradeTemporaryTask {
  __typename: "GradeTemporaryTaskPayload";
  temporaryTask: gradeTemporaryTask_gradeTemporaryTask_temporaryTask;
}

export interface gradeTemporaryTask {
  gradeTemporaryTask: gradeTemporaryTask_gradeTemporaryTask;
}

export interface gradeTemporaryTaskVariables {
  input: GradeTemporaryTaskInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findTemporaryTasksToReview
// ====================================================

export interface findTemporaryTasksToReview_findTemporaryTasks_temporaryTasks_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findTemporaryTasksToReview_findTemporaryTasks_temporaryTasks {
  __typename: "TemporaryTask";
  _id: string | null;
  dateIssued: string;
  student: findTemporaryTasksToReview_findTemporaryTasks_temporaryTasks_student;
  studentPresent: boolean;
  taskNumber: number;
  answered: boolean;
}

export interface findTemporaryTasksToReview_findTemporaryTasks {
  __typename: "FindTemporaryTasksPayload";
  temporaryTasks: findTemporaryTasksToReview_findTemporaryTasks_temporaryTasks[];
}

export interface findTemporaryTasksToReview {
  findTemporaryTasks: findTemporaryTasksToReview_findTemporaryTasks;
}

export interface findTemporaryTasksToReviewVariables {
  input: FindTemporaryTasksInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findTemporaryTasks
// ====================================================

export interface findTemporaryTasks_findTemporaryTasks_temporaryTasks_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findTemporaryTasks_findTemporaryTasks_temporaryTasks {
  __typename: "TemporaryTask";
  _id: string | null;
  dateIssued: string;
  student: findTemporaryTasks_findTemporaryTasks_temporaryTasks_student;
  studentPresent: boolean;
  taskNumber: number;
  answered: boolean;
  lastGrade: number;
  markingPeriod: MarkingPeriodEnum;
}

export interface findTemporaryTasks_findTemporaryTasks {
  __typename: "FindTemporaryTasksPayload";
  temporaryTasks: findTemporaryTasks_findTemporaryTasks_temporaryTasks[];
}

export interface findTemporaryTasks {
  findTemporaryTasks: findTemporaryTasks_findTemporaryTasks;
}

export interface findTemporaryTasksVariables {
  input: FindTemporaryTasksInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findChaptersByTextId
// ====================================================

export interface findChaptersByTextId_findChaptersByTextId_chapters {
  __typename: "Chapter";
  _id: string | null;
  chapterTitle: string;
}

export interface findChaptersByTextId_findChaptersByTextId {
  __typename: "FindChaptersByTextIdPayload";
  chapters: findChaptersByTextId_findChaptersByTextId_chapters[];
}

export interface findChaptersByTextId {
  findChaptersByTextId: findChaptersByTextId_findChaptersByTextId;
}

export interface findChaptersByTextIdVariables {
  input: FindChaptersByTextIdInput;
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

export interface findLessonByIdForLessonEditor_findLessonById_lesson_assignedCourses {
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
  academicOutcomeTypes: AcademicOutcomeTypes;
  activityType: ProtocolActivityTypes;
  task: string;
}

export interface findLessonByIdForLessonEditor_findLessonById_lesson_duringActivities {
  __typename: "TextSectionProtocols";
  academicOutcomeTypes: AcademicOutcomeTypes;
  activityType: ProtocolActivityTypes;
  task: string;
}

export interface findLessonByIdForLessonEditor_findLessonById_lesson_afterActivity {
  __typename: "TextSectionProtocols";
  academicOutcomeTypes: AcademicOutcomeTypes;
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
  assignedCourses: findLessonByIdForLessonEditor_findLessonById_lesson_assignedCourses[];
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

export interface findLessonByIdForLessonEditor {
  findLessonById: findLessonByIdForLessonEditor_findLessonById;
}

export interface findLessonByIdForLessonEditorVariables {
  input: FindLessonByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findLessonsByAssignedDate
// ====================================================

export interface findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_inUnit {
  __typename: "Unit";
  _id: string | null;
  unitName: string;
}

export interface findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_assignedCourses {
  __typename: "Course";
  _id: string | null;
  name: string;
}

export interface findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_assignedSections {
  __typename: "LessonTextSections";
  startingSection: string;
  endingSection: string;
}

export interface findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_pageNumbers {
  __typename: "PageNumbers";
  startingPage: number;
  endingPage: number;
}

export interface findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_vocabList {
  __typename: "TextSectionVocab";
  word: string;
  definition: string;
}

export interface findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_beforeActivity {
  __typename: "TextSectionProtocols";
  academicOutcomeTypes: AcademicOutcomeTypes;
  activityType: ProtocolActivityTypes;
  task: string;
}

export interface findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_duringActivities {
  __typename: "TextSectionProtocols";
  academicOutcomeTypes: AcademicOutcomeTypes;
  activityType: ProtocolActivityTypes;
  task: string;
}

export interface findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_afterActivity {
  __typename: "TextSectionProtocols";
  academicOutcomeTypes: AcademicOutcomeTypes;
  activityType: ProtocolActivityTypes;
  task: string;
}

export interface findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_questionList {
  __typename: "TextSectionQuestions";
  question: string;
  questionType: QuestionTypeEnum;
}

export interface findLessonsByAssignedDate_findLessonsByAssignedDate_lessons {
  __typename: "Lesson";
  _id: string | null;
  lessonName: string;
  assignedDate: any;
  inUnit: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_inUnit;
  assignedMarkingPeriod: MarkingPeriodEnum;
  assignedCourses: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_assignedCourses[];
  assignedSections: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_assignedSections;
  pageNumbers: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_pageNumbers;
  assignedSectionIdList: string[];
  vocabList: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_vocabList[];
  beforeActivity: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_beforeActivity;
  duringActivities: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_duringActivities[];
  afterActivity: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_afterActivity;
  questionList: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons_questionList[];
  essentialQuestion: string;
  lessonType: LessonTypeEnum;
}

export interface findLessonsByAssignedDate_findLessonsByAssignedDate {
  __typename: "FindLessonsByAssignedDatePayload";
  lessons: findLessonsByAssignedDate_findLessonsByAssignedDate_lessons[] | null;
}

export interface findLessonsByAssignedDate {
  findLessonsByAssignedDate: findLessonsByAssignedDate_findLessonsByAssignedDate;
}

export interface findLessonsByAssignedDateVariables {
  input: FindLessonsByAssignedDateInput;
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
// GraphQL mutation operation: createEssentialQuestion
// ====================================================

export interface createEssentialQuestion_createEssentialQuestion_essentialQuestion {
  __typename: "EssentialQuestion";
  _id: string | null;
}

export interface createEssentialQuestion_createEssentialQuestion {
  __typename: "CreateEssentialQuestionPayload";
  essentialQuestion: createEssentialQuestion_createEssentialQuestion_essentialQuestion;
}

export interface createEssentialQuestion {
  createEssentialQuestion: createEssentialQuestion_createEssentialQuestion;
}

export interface createEssentialQuestionVariables {
  input: CreateEssentialQuestionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findEssentialQuestionsByAssociatedTextSectionIds
// ====================================================

export interface findEssentialQuestionsByAssociatedTextSectionIds_findEssentialQuestionsByAssociatedTextSectionIds_essentialQuestions {
  __typename: "EssentialQuestion";
  _id: string | null;
  question: string;
}

export interface findEssentialQuestionsByAssociatedTextSectionIds_findEssentialQuestionsByAssociatedTextSectionIds {
  __typename: "FindEssentialQuestionsByAssociatedTextSectionIdsPayload";
  essentialQuestions: findEssentialQuestionsByAssociatedTextSectionIds_findEssentialQuestionsByAssociatedTextSectionIds_essentialQuestions[];
}

export interface findEssentialQuestionsByAssociatedTextSectionIds {
  findEssentialQuestionsByAssociatedTextSectionIds: findEssentialQuestionsByAssociatedTextSectionIds_findEssentialQuestionsByAssociatedTextSectionIds;
}

export interface findEssentialQuestionsByAssociatedTextSectionIdsVariables {
  input: FindEssentialQuestionsByAssociatedTextSectionIdsInput;
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
  academicOutcomeTypes: AcademicOutcomeTypes;
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
  hasVocab: findTextSectionsById_findTextSectionsById_textSections_hasVocab[] | null;
  hasProtocols: findTextSectionsById_findTextSectionsById_textSections_hasProtocols[] | null;
  hasQuestions: findTextSectionsById_findTextSectionsById_textSections_hasQuestions[] | null;
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
// GraphQL mutation operation: createUnit
// ====================================================

export interface createUnit_createUnit_unit {
  __typename: "Unit";
  _id: string | null;
}

export interface createUnit_createUnit {
  __typename: "CreateUnitPayload";
  unit: createUnit_createUnit_unit;
}

export interface createUnit {
  createUnit: createUnit_createUnit;
}

export interface createUnitVariables {
  input: CreateUnitInput;
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
// GraphQL mutation operation: createQuizQuestion
// ====================================================

export interface createQuizQuestion_createQuizQuestion_quizQuestion {
  __typename: "QuizQuestion";
  _id: string | null;
}

export interface createQuizQuestion_createQuizQuestion {
  __typename: "CreateQuizQuestionPayload";
  quizQuestion: createQuizQuestion_createQuizQuestion_quizQuestion;
}

export interface createQuizQuestion {
  createQuizQuestion: createQuizQuestion_createQuizQuestion;
}

export interface createQuizQuestionVariables {
  input: CreateQuizQuestionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findQuizQuestionsByTextSectionId
// ====================================================

export interface findQuizQuestionsByTextSectionId_findQuizQuestionsByTextSectionId_quizQuestions_answerList {
  __typename: "AnswerList";
  correct: boolean;
  partiallyCorrect: boolean;
}

export interface findQuizQuestionsByTextSectionId_findQuizQuestionsByTextSectionId_quizQuestions {
  __typename: "QuizQuestion";
  _id: string | null;
  question: string;
  answerList: findQuizQuestionsByTextSectionId_findQuizQuestionsByTextSectionId_quizQuestions_answerList[];
  questionType: QuizQuestionTypeEnum;
  difficultyLevel: QuizQuestionDifficultyLevelEnum;
}

export interface findQuizQuestionsByTextSectionId_findQuizQuestionsByTextSectionId {
  __typename: "FindQuizQuestionsByTextSectionIdPayload";
  quizQuestions: findQuizQuestionsByTextSectionId_findQuizQuestionsByTextSectionId_quizQuestions[];
}

export interface findQuizQuestionsByTextSectionId {
  findQuizQuestionsByTextSectionId: findQuizQuestionsByTextSectionId_findQuizQuestionsByTextSectionId;
}

export interface findQuizQuestionsByTextSectionIdVariables {
  input: FindQuizQuestionsByTextSectionIdInput;
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
  academicOutcomeTypes: AcademicOutcomeTypes;
  task: string;
}

export interface FindTextSectionById_findTextSectionById_textSection {
  __typename: "TextSection";
  _id: string | null;
  header: string;
  pageNumbers: FindTextSectionById_findTextSectionById_textSection_pageNumbers;
  hasVocab: FindTextSectionById_findTextSectionById_textSection_hasVocab[] | null;
  hasQuestions: FindTextSectionById_findTextSectionById_textSection_hasQuestions[] | null;
  hasProtocols: FindTextSectionById_findTextSectionById_textSection_hasProtocols[] | null;
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
// GraphQL query operation: findParentContactsByTeacherId
// ====================================================

export interface findParentContactsByTeacherId_findParentContactsByTeacherId_parentContacts_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findParentContactsByTeacherId_findParentContactsByTeacherId_parentContacts {
  __typename: "ParentContact";
  _id: string | null;
  student: findParentContactsByTeacherId_findParentContactsByTeacherId_parentContacts_student;
  date: string;
  contactType: ContactTypeEnum;
  contentOfContact: string;
}

export interface findParentContactsByTeacherId_findParentContactsByTeacherId {
  __typename: "FindParentContactsByTeacherIdPayload";
  parentContacts: findParentContactsByTeacherId_findParentContactsByTeacherId_parentContacts[];
}

export interface findParentContactsByTeacherId {
  findParentContactsByTeacherId: findParentContactsByTeacherId_findParentContactsByTeacherId;
}

export interface findParentContactsByTeacherIdVariables {
  input: FindParentContactsByTeacherIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createParentContact
// ====================================================

export interface createParentContact_createParentContact_parentContact {
  __typename: "ParentContact";
  _id: string | null;
}

export interface createParentContact_createParentContact {
  __typename: "CreateParentContactPayload";
  parentContact: createParentContact_createParentContact_parentContact;
}

export interface createParentContact {
  createParentContact: createParentContact_createParentContact;
}

export interface createParentContactVariables {
  input: CreateParentContactInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findStudentsByCourseForParentContacts
// ====================================================

export interface findStudentsByCourseForParentContacts_findStudentsByCourse_students {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findStudentsByCourseForParentContacts_findStudentsByCourse {
  __typename: "FindStudentsByCoursePayload";
  students: findStudentsByCourseForParentContacts_findStudentsByCourse_students[];
}

export interface findStudentsByCourseForParentContacts {
  findStudentsByCourse: findStudentsByCourseForParentContacts_findStudentsByCourse;
}

export interface findStudentsByCourseForParentContactsVariables {
  input: FindStudentsByCourseInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: buildRubricEntry
// ====================================================

export interface buildRubricEntry_buildRubricEntry_rubricEntry {
  __typename: "RubricEntry";
  entry: string;
  score: number;
  rubricSection: RubricSectionEnum;
  rubricWritingLevels: WritingLevelEnum[];
}

export interface buildRubricEntry_buildRubricEntry {
  __typename: "BuildRubricEntryPayload";
  rubricEntry: buildRubricEntry_buildRubricEntry_rubricEntry;
}

export interface buildRubricEntry {
  buildRubricEntry: buildRubricEntry_buildRubricEntry;
}

export interface buildRubricEntryVariables {
  input: BuildRubricEntryInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeRubricEntry
// ====================================================

export interface removeRubricEntry_removeRubricEntry {
  __typename: "RemoveRubricEntryPayload";
  removed: boolean;
}

export interface removeRubricEntry {
  removeRubricEntry: removeRubricEntry_removeRubricEntry;
}

export interface removeRubricEntryVariables {
  input: RemoveRubricEntryInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateRubricEntry
// ====================================================

export interface updateRubricEntry_updateRubricEntry_rubricEntry {
  __typename: "RubricEntry";
  _id: string | null;
  entry: string;
  score: number;
  rubricSection: RubricSectionEnum;
  rubricWritingLevels: WritingLevelEnum[];
}

export interface updateRubricEntry_updateRubricEntry {
  __typename: "UpdateRubricEntryPayload";
  rubricEntry: updateRubricEntry_updateRubricEntry_rubricEntry;
}

export interface updateRubricEntry {
  updateRubricEntry: updateRubricEntry_updateRubricEntry;
}

export interface updateRubricEntryVariables {
  input: UpdateRubricEntryInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findRubricEntries
// ====================================================

export interface findRubricEntries_findRubricEntries_rubricEntries {
  __typename: "RubricEntry";
  _id: string | null;
  entry: string;
  score: number;
  rubricSection: RubricSectionEnum;
  rubricWritingLevels: WritingLevelEnum[];
  howToImprove: string | null;
}

export interface findRubricEntries_findRubricEntries {
  __typename: "FindRubricEntriesPayload";
  rubricEntries: findRubricEntries_findRubricEntries_rubricEntries[];
}

export interface findRubricEntries {
  findRubricEntries: findRubricEntries_findRubricEntries;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findAssignmentByStudentId
// ====================================================

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_Test_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_Test_score {
  __typename: "Score";
  earnedPoints: number;
  maxPoints: number;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_Test {
  __typename: "Test";
  _id: string | null;
  assigned: boolean;
  readings: findAssignmentByStudentId_findAssignmentByStudentId_assignments_Test_readings;
  score: findAssignmentByStudentId_findAssignmentByStudentId_assignments_Test_score;
  exempt: boolean;
  dueDate: string;
  dueTime: string;
  markingPeriod: MarkingPeriodEnum;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_Essay_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_Essay_score {
  __typename: "Score";
  earnedPoints: number;
  maxPoints: number;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_Essay_finalDraft_submittedFinalDraft {
  __typename: "SubmittedFinalDraft";
  graded: boolean;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_Essay_finalDraft {
  __typename: "FinalDraftContainer";
  returned: boolean;
  submitted: boolean;
  submittedFinalDraft: findAssignmentByStudentId_findAssignmentByStudentId_assignments_Essay_finalDraft_submittedFinalDraft[];
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_Essay {
  __typename: "Essay";
  _id: string | null;
  assigned: boolean;
  readings: findAssignmentByStudentId_findAssignmentByStudentId_assignments_Essay_readings;
  score: findAssignmentByStudentId_findAssignmentByStudentId_assignments_Essay_score;
  exempt: boolean;
  dueDate: string;
  dueTime: string;
  markingPeriod: MarkingPeriodEnum;
  finalDraft: findAssignmentByStudentId_findAssignmentByStudentId_assignments_Essay_finalDraft | null;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_ReadingGuide_readings {
  __typename: "Readings";
  readingSections: string;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_ReadingGuide_score {
  __typename: "Score";
  earnedPoints: number;
  maxPoints: number;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_ReadingGuide_readingGuideFinal {
  __typename: "ReadingGuideFinalContainer";
  submitted: boolean;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_assignments_ReadingGuide {
  __typename: "ReadingGuide";
  _id: string | null;
  assigned: boolean;
  readings: findAssignmentByStudentId_findAssignmentByStudentId_assignments_ReadingGuide_readings;
  score: findAssignmentByStudentId_findAssignmentByStudentId_assignments_ReadingGuide_score;
  exempt: boolean;
  dueDate: string;
  dueTime: string;
  markingPeriod: MarkingPeriodEnum;
  readingGuideFinal: findAssignmentByStudentId_findAssignmentByStudentId_assignments_ReadingGuide_readingGuideFinal | null;
}

export type findAssignmentByStudentId_findAssignmentByStudentId_assignments = findAssignmentByStudentId_findAssignmentByStudentId_assignments_Test | findAssignmentByStudentId_findAssignmentByStudentId_assignments_Essay | findAssignmentByStudentId_findAssignmentByStudentId_assignments_ReadingGuide;

export interface findAssignmentByStudentId_findAssignmentByStudentId_articleReviews_score {
  __typename: "Score";
  earnedPoints: number;
  maxPoints: number;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId_articleReviews {
  __typename: "ArticleReview";
  _id: string | null;
  score: findAssignmentByStudentId_findAssignmentByStudentId_articleReviews_score;
  assignedDate: string;
  exempt: boolean;
  submitted: boolean;
  markingPeriod: MarkingPeriodEnum;
  dueDate: string;
  dueTime: string;
}

export interface findAssignmentByStudentId_findAssignmentByStudentId {
  __typename: "FindAssignmentByStudentIdPayload";
  assignments: findAssignmentByStudentId_findAssignmentByStudentId_assignments[];
  articleReviews: findAssignmentByStudentId_findAssignmentByStudentId_articleReviews[];
}

export interface findAssignmentByStudentId {
  findAssignmentByStudentId: findAssignmentByStudentId_findAssignmentByStudentId;
}

export interface findAssignmentByStudentIdVariables {
  input: FindAssignmentByStudentIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findContactsByStudentId
// ====================================================

export interface findContactsByStudentId_findContactsByStudentId_parentContacts {
  __typename: "ParentContact";
  _id: string | null;
  date: string;
  contentOfContact: string;
  contactType: ContactTypeEnum;
}

export interface findContactsByStudentId_findContactsByStudentId {
  __typename: "FindContactsByStudentIdPayload";
  parentContacts: findContactsByStudentId_findContactsByStudentId_parentContacts[];
}

export interface findContactsByStudentId {
  findContactsByStudentId: findContactsByStudentId_findContactsByStudentId;
}

export interface findContactsByStudentIdVariables {
  input: FindContactsByStudentIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findResponsibilityPointsByStudentId
// ====================================================

export interface findResponsibilityPointsByStudentId_findResponsibilityPointsByStudentId_responsibilityPoints {
  __typename: "ResponsibilityPoints";
  responsibilityPoints: number;
  markingPeriod: MarkingPeriodEnum;
}

export interface findResponsibilityPointsByStudentId_findResponsibilityPointsByStudentId {
  __typename: "FindResponsibilityPointsByStudentIdPayload";
  responsibilityPoints: findResponsibilityPointsByStudentId_findResponsibilityPointsByStudentId_responsibilityPoints[];
}

export interface findResponsibilityPointsByStudentId {
  findResponsibilityPointsByStudentId: findResponsibilityPointsByStudentId_findResponsibilityPointsByStudentId;
}

export interface findResponsibilityPointsByStudentIdVariables {
  input: FindResponsibilityPointsByStudentIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findWritingMetrics
// ====================================================

export interface findWritingMetrics_findWritingMetrics_writingMetrics_student {
  __typename: "Student";
  firstName: string;
}

export interface findWritingMetrics_findWritingMetrics_writingMetrics_overallWritingMetric {
  __typename: "OverallWritingMetric";
  overallWritingLevel: WritingLevelEnum;
  levelPoints: number;
}

export interface findWritingMetrics_findWritingMetrics_writingMetrics {
  __typename: "WritingMetrics";
  student: findWritingMetrics_findWritingMetrics_writingMetrics_student;
  overallWritingMetric: findWritingMetrics_findWritingMetrics_writingMetrics_overallWritingMetric;
}

export interface findWritingMetrics_findWritingMetrics {
  __typename: "FindWritingMetricsPayload";
  writingMetrics: findWritingMetrics_findWritingMetrics_writingMetrics;
}

export interface findWritingMetrics {
  findWritingMetrics: findWritingMetrics_findWritingMetrics;
}

export interface findWritingMetricsVariables {
  input: FindWritingMetricsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findAllStudentsForStudentInformation
// ====================================================

export interface findAllStudentsForStudentInformation_findAllStudents_students_inCourses {
  __typename: "Course";
  name: string;
}

export interface findAllStudentsForStudentInformation_findAllStudents_students {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
  inCourses: findAllStudentsForStudentInformation_findAllStudents_students_inCourses[];
}

export interface findAllStudentsForStudentInformation_findAllStudents {
  __typename: "FindAllStudentsPayload";
  students: findAllStudentsForStudentInformation_findAllStudents_students[];
}

export interface findAllStudentsForStudentInformation {
  findAllStudents: findAllStudentsForStudentInformation_findAllStudents;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findTemporaryTasksByStudentId
// ====================================================

export interface findTemporaryTasksByStudentId_findTemporaryTasksByStudentId_temporaryTasks {
  __typename: "TemporaryTask";
  _id: string | null;
  dateIssued: string;
  answered: boolean;
  studentPresent: boolean;
  markingPeriod: MarkingPeriodEnum;
}

export interface findTemporaryTasksByStudentId_findTemporaryTasksByStudentId {
  __typename: "FindTemporaryTasksByStudentIdPayload";
  temporaryTasks: findTemporaryTasksByStudentId_findTemporaryTasksByStudentId_temporaryTasks[];
}

export interface findTemporaryTasksByStudentId {
  findTemporaryTasksByStudentId: findTemporaryTasksByStudentId_findTemporaryTasksByStudentId;
}

export interface findTemporaryTasksByStudentIdVariables {
  input: FindTemporaryTasksByStudentIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findCourseInfoByCourseId
// ====================================================

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course_hasStudents_hasAbsences {
  __typename: "StudentAbsence";
  dayAbsent: any;
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course_hasStudents_hasProtocols_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course_hasStudents_hasProtocols {
  __typename: "Protocol";
  _id: string | null;
  student: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course_hasStudents_hasProtocols_student;
  isActive: boolean;
  response: string | null;
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course_hasStudents {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  schoolId: string | null;
  lastName: string;
  cohort: StudentCohortEnum;
  hasAbsences: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course_hasStudents_hasAbsences[];
  hasProtocols: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course_hasStudents_hasProtocols[];
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course {
  __typename: "Course";
  _id: string | null;
  name: string;
  hasStudents: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course_hasStudents[];
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_redCohortStudent_hasAbsences {
  __typename: "StudentAbsence";
  dayAbsent: any;
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_redCohortStudent {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
  cohort: StudentCohortEnum;
  hasAbsences: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_redCohortStudent_hasAbsences[];
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_whiteCohortStudent_hasAbsences {
  __typename: "StudentAbsence";
  dayAbsent: any;
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_whiteCohortStudent {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
  cohort: StudentCohortEnum;
  hasAbsences: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_whiteCohortStudent_hasAbsences[];
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_student_hasAbsences {
  __typename: "StudentAbsence";
  dayAbsent: any;
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
  cohort: StudentCohortEnum;
  hasAbsences: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_student_hasAbsences[];
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats {
  __typename: "StudentSeat";
  deskNumber: number;
  redCohortStudent: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_redCohortStudent | null;
  whiteCohortStudent: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_whiteCohortStudent | null;
  student: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats_student | null;
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo {
  __typename: "CourseInfo";
  _id: string | null;
  startsAt: string;
  course: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_course;
  endsAt: string;
  schoolDayType: SchoolDayType;
  cohortBasedSeating: boolean;
  assignedSeats: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo_assignedSeats[];
}

export interface findCourseInfoByCourseId_findCourseInfoByCourseId {
  __typename: "FindCourseInfoByCourseIdPayload";
  courseInfo: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo;
}

export interface findCourseInfoByCourseId {
  findCourseInfoByCourseId: findCourseInfoByCourseId_findCourseInfoByCourseId;
}

export interface findCourseInfoByCourseIdVariables {
  input: FindCourseInfoByCourseIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: controlCoolDown
// ====================================================

export interface controlCoolDown_controlCoolDown_lesson {
  __typename: "Lesson";
  _id: string | null;
}

export interface controlCoolDown_controlCoolDown {
  __typename: "ControlCoolDownPayload";
  lesson: controlCoolDown_controlCoolDown_lesson;
}

export interface controlCoolDown {
  controlCoolDown: controlCoolDown_controlCoolDown;
}

export interface controlCoolDownVariables {
  input: ControlCoolDownInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateDynamicLesson
// ====================================================

export interface updateDynamicLesson_UpdateDynamicLesson_lesson {
  __typename: "Lesson";
  _id: string | null;
  dynamicLesson: DynamicLessonEnums;
}

export interface updateDynamicLesson_UpdateDynamicLesson {
  __typename: "UpdateDynamicLessonPayload";
  lesson: updateDynamicLesson_UpdateDynamicLesson_lesson;
}

export interface updateDynamicLesson {
  UpdateDynamicLesson: updateDynamicLesson_UpdateDynamicLesson;
}

export interface updateDynamicLessonVariables {
  input: UpdateDynamicLessonInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: finishStudentProtocol
// ====================================================

export interface finishStudentProtocol_finishProtocol_protocols {
  __typename: "Protocol";
  _id: string | null;
}

export interface finishStudentProtocol_finishProtocol {
  __typename: "FinishProtocolPayload";
  protocols: finishStudentProtocol_finishProtocol_protocols[];
}

export interface finishStudentProtocol {
  finishProtocol: finishStudentProtocol_finishProtocol;
}

export interface finishStudentProtocolVariables {
  input: FinishProtocolInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteProtocols
// ====================================================

export interface deleteProtocols_removeProtocol {
  __typename: "RemoveProtocolPayload";
  deleteCount: number;
}

export interface deleteProtocols {
  removeProtocol: deleteProtocols_removeProtocol;
}

export interface deleteProtocolsVariables {
  input: RemoveProtocolInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findActiveProtocolsByCourseForProtocolRemoval
// ====================================================

export interface findActiveProtocolsByCourseForProtocolRemoval_findActiveProtocolsByCourse_protocols_student {
  __typename: "Student";
  _id: string | null;
}

export interface findActiveProtocolsByCourseForProtocolRemoval_findActiveProtocolsByCourse_protocols {
  __typename: "Protocol";
  _id: string | null;
  task: string;
  assignedDate: string;
  student: findActiveProtocolsByCourseForProtocolRemoval_findActiveProtocolsByCourse_protocols_student;
}

export interface findActiveProtocolsByCourseForProtocolRemoval_findActiveProtocolsByCourse {
  __typename: "FindActiveProtocolsByCoursePayload";
  protocols: findActiveProtocolsByCourseForProtocolRemoval_findActiveProtocolsByCourse_protocols[];
}

export interface findActiveProtocolsByCourseForProtocolRemoval {
  findActiveProtocolsByCourse: findActiveProtocolsByCourseForProtocolRemoval_findActiveProtocolsByCourse;
}

export interface findActiveProtocolsByCourseForProtocolRemovalVariables {
  input: FindActiveProtocolsByCourseInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateLessonProtocol
// ====================================================

export interface updateLessonProtocol_updateLessonProtocol_lesson_duringActivities {
  __typename: "TextSectionProtocols";
  isActive: boolean;
}

export interface updateLessonProtocol_updateLessonProtocol_lesson {
  __typename: "Lesson";
  _id: string | null;
  duringActivities: updateLessonProtocol_updateLessonProtocol_lesson_duringActivities[];
}

export interface updateLessonProtocol_updateLessonProtocol {
  __typename: "UpdateProtocolPayload";
  lesson: updateLessonProtocol_updateLessonProtocol_lesson;
}

export interface updateLessonProtocol {
  updateLessonProtocol: updateLessonProtocol_updateLessonProtocol;
}

export interface updateLessonProtocolVariables {
  input: UpdateLessonProtocolInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startProtocol
// ====================================================

export interface startProtocol_startProtocol_lesson_duringActivities {
  __typename: "TextSectionProtocols";
  isActive: boolean;
}

export interface startProtocol_startProtocol_lesson {
  __typename: "Lesson";
  _id: string | null;
  duringActivities: startProtocol_startProtocol_lesson_duringActivities[];
}

export interface startProtocol_startProtocol {
  __typename: "StartProtocolPayload";
  lesson: startProtocol_startProtocol_lesson;
}

export interface startProtocol {
  startProtocol: startProtocol_startProtocol;
}

export interface startProtocolVariables {
  input: StartProtocolInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createStudentProtocol
// ====================================================

export interface createStudentProtocol_createProtocol_protocols_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
}

export interface createStudentProtocol_createProtocol_protocols {
  __typename: "Protocol";
  _id: string | null;
  student: createStudentProtocol_createProtocol_protocols_student;
}

export interface createStudentProtocol_createProtocol {
  __typename: "CreateProtocolPayload";
  protocols: createStudentProtocol_createProtocol_protocols[];
}

export interface createStudentProtocol {
  createProtocol: createStudentProtocol_createProtocol;
}

export interface createStudentProtocolVariables {
  input: CreateProtocolInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: controlWarmUp
// ====================================================

export interface controlWarmUp_controlWarmUp_lesson_beforeActivity {
  __typename: "TextSectionProtocols";
  isActive: boolean;
}

export interface controlWarmUp_controlWarmUp_lesson {
  __typename: "Lesson";
  beforeActivity: controlWarmUp_controlWarmUp_lesson_beforeActivity;
}

export interface controlWarmUp_controlWarmUp {
  __typename: "ControlWarmUpPayload";
  lesson: controlWarmUp_controlWarmUp_lesson;
}

export interface controlWarmUp {
  controlWarmUp: controlWarmUp_controlWarmUp;
}

export interface controlWarmUpVariables {
  input: ControlWarmUpInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: assignEssayInTeachersAid
// ====================================================

export interface assignEssayInTeachersAid_assignEssays_essays {
  __typename: "Essay";
  _id: string | null;
}

export interface assignEssayInTeachersAid_assignEssays {
  __typename: "AssignEssaysPayload";
  essays: assignEssayInTeachersAid_assignEssays_essays[];
}

export interface assignEssayInTeachersAid {
  assignEssays: assignEssayInTeachersAid_assignEssays;
}

export interface assignEssayInTeachersAidVariables {
  input: AssignEssaysInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findEssaysByAssociatedLessonIdForTodaysClass
// ====================================================

export interface findEssaysByAssociatedLessonIdForTodaysClass_findEssaysByAssociatedLessonId_essays_hasOwner {
  __typename: "Student";
  _id: string | null;
}

export interface findEssaysByAssociatedLessonIdForTodaysClass_findEssaysByAssociatedLessonId_essays_readings {
  __typename: "Readings";
  readingPages: string;
  readingSections: string;
}

export interface findEssaysByAssociatedLessonIdForTodaysClass_findEssaysByAssociatedLessonId_essays {
  __typename: "Essay";
  _id: string | null;
  hasOwner: findEssaysByAssociatedLessonIdForTodaysClass_findEssaysByAssociatedLessonId_essays_hasOwner;
  dueDate: string;
  assigned: boolean;
  readings: findEssaysByAssociatedLessonIdForTodaysClass_findEssaysByAssociatedLessonId_essays_readings;
}

export interface findEssaysByAssociatedLessonIdForTodaysClass_findEssaysByAssociatedLessonId {
  __typename: "FindEssaysByAssociatedLessonIdPayload";
  essays: findEssaysByAssociatedLessonIdForTodaysClass_findEssaysByAssociatedLessonId_essays[];
}

export interface findEssaysByAssociatedLessonIdForTodaysClass {
  findEssaysByAssociatedLessonId: findEssaysByAssociatedLessonIdForTodaysClass_findEssaysByAssociatedLessonId;
}

export interface findEssaysByAssociatedLessonIdForTodaysClassVariables {
  input: FindEssaysByAssociatedLessonIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: assignReadingGuidesForTeachersAid
// ====================================================

export interface assignReadingGuidesForTeachersAid_assignReadingGuides_readingGuides {
  __typename: "ReadingGuide";
  _id: string | null;
}

export interface assignReadingGuidesForTeachersAid_assignReadingGuides {
  __typename: "AssignReadingGuidesPayload";
  readingGuides: assignReadingGuidesForTeachersAid_assignReadingGuides_readingGuides[];
}

export interface assignReadingGuidesForTeachersAid {
  assignReadingGuides: assignReadingGuidesForTeachersAid_assignReadingGuides;
}

export interface assignReadingGuidesForTeachersAidVariables {
  input: AssignReadingGuidesInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findReadingGuidesByCourseIdAndAssignedDate
// ====================================================

export interface findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides_hasOwner {
  __typename: "Student";
  _id: string | null;
}

export interface findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides_readings {
  __typename: "Readings";
  readingPages: string;
  readingSections: string;
}

export interface findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides {
  __typename: "ReadingGuide";
  _id: string | null;
  hasOwner: findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides_hasOwner;
  assigned: boolean;
  dueDate: string;
  associatedLessonId: string | null;
  readings: findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides_readings;
}

export interface findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate {
  __typename: "FindReadingGuidesByCourseIdAndAssignedDatePayload";
  readingGuides: findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate_readingGuides[];
}

export interface findReadingGuidesByCourseIdAndAssignedDate {
  findReadingGuidesByCourseIdAndAssignedDate: findReadingGuidesByCourseIdAndAssignedDate_findReadingGuidesByCourseIdAndAssignedDate;
}

export interface findReadingGuidesByCourseIdAndAssignedDateVariables {
  input: FindReadingGuidesByCourseIdAndAssignedDateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findActiveProtocolsByCourse
// ====================================================

export interface findActiveProtocolsByCourse_findActiveProtocolsByCourse_protocols_student {
  __typename: "Student";
  _id: string | null;
  schoolId: string | null;
  firstName: string;
  lastName: string;
}

export interface findActiveProtocolsByCourse_findActiveProtocolsByCourse_protocols {
  __typename: "Protocol";
  _id: string | null;
  student: findActiveProtocolsByCourse_findActiveProtocolsByCourse_protocols_student;
  assessment: ProtocolAssessmentEnum | null;
}

export interface findActiveProtocolsByCourse_findActiveProtocolsByCourse {
  __typename: "FindActiveProtocolsByCoursePayload";
  protocols: findActiveProtocolsByCourse_findActiveProtocolsByCourse_protocols[];
}

export interface findActiveProtocolsByCourse {
  findActiveProtocolsByCourse: findActiveProtocolsByCourse_findActiveProtocolsByCourse;
}

export interface findActiveProtocolsByCourseVariables {
  input: FindActiveProtocolsByCourseInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: assessIndividualProtocols
// ====================================================

export interface assessIndividualProtocols_assessIndividualProtocols_protocol {
  __typename: "Protocol";
  _id: string | null;
}

export interface assessIndividualProtocols_assessIndividualProtocols {
  __typename: "AssessIndividualProtocolsPayload";
  protocol: assessIndividualProtocols_assessIndividualProtocols_protocol;
}

export interface assessIndividualProtocols {
  assessIndividualProtocols: assessIndividualProtocols_assessIndividualProtocols;
}

export interface assessIndividualProtocolsVariables {
  input: AssessIndividualProtocolsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findVirtualResponses
// ====================================================

export interface findVirtualResponses_findCourseInfoByCourseId_courseInfo_course_hasLessons_duringActivities {
  __typename: "TextSectionProtocols";
  isActive: boolean;
}

export interface findVirtualResponses_findCourseInfoByCourseId_courseInfo_course_hasLessons {
  __typename: "Lesson";
  duringActivities: findVirtualResponses_findCourseInfoByCourseId_courseInfo_course_hasLessons_duringActivities[];
}

export interface findVirtualResponses_findCourseInfoByCourseId_courseInfo_course_hasStudents_hasProtocols_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findVirtualResponses_findCourseInfoByCourseId_courseInfo_course_hasStudents_hasProtocols {
  __typename: "Protocol";
  _id: string | null;
  student: findVirtualResponses_findCourseInfoByCourseId_courseInfo_course_hasStudents_hasProtocols_student;
  isActive: boolean;
  response: string | null;
  assignedDate: string;
  markingPeriod: MarkingPeriodEnum;
  task: string;
  protocolActivityType: ProtocolActivityTypes;
}

export interface findVirtualResponses_findCourseInfoByCourseId_courseInfo_course_hasStudents {
  __typename: "Student";
  hasProtocols: findVirtualResponses_findCourseInfoByCourseId_courseInfo_course_hasStudents_hasProtocols[];
}

export interface findVirtualResponses_findCourseInfoByCourseId_courseInfo_course {
  __typename: "Course";
  hasLessons: findVirtualResponses_findCourseInfoByCourseId_courseInfo_course_hasLessons[];
  hasStudents: findVirtualResponses_findCourseInfoByCourseId_courseInfo_course_hasStudents[];
}

export interface findVirtualResponses_findCourseInfoByCourseId_courseInfo {
  __typename: "CourseInfo";
  course: findVirtualResponses_findCourseInfoByCourseId_courseInfo_course;
}

export interface findVirtualResponses_findCourseInfoByCourseId {
  __typename: "FindCourseInfoByCourseIdPayload";
  courseInfo: findVirtualResponses_findCourseInfoByCourseId_courseInfo;
}

export interface findVirtualResponses {
  findCourseInfoByCourseId: findVirtualResponses_findCourseInfoByCourseId;
}

export interface findVirtualResponsesVariables {
  input: FindCourseInfoByCourseIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findStudentInfoByStudentIdForDesk
// ====================================================

export interface findStudentInfoByStudentIdForDesk_findStudentById_student_hasAbsences {
  __typename: "StudentAbsence";
  _id: string | null;
  dayAbsent: any;
}

export interface findStudentInfoByStudentIdForDesk_findStudentById_student {
  __typename: "Student";
  _id: string | null;
  hasAbsences: findStudentInfoByStudentIdForDesk_findStudentById_student_hasAbsences[];
}

export interface findStudentInfoByStudentIdForDesk_findStudentById {
  __typename: "FindStudentByIdPayload";
  student: findStudentInfoByStudentIdForDesk_findStudentById_student;
}

export interface findStudentInfoByStudentIdForDesk {
  findStudentById: findStudentInfoByStudentIdForDesk_findStudentById;
}

export interface findStudentInfoByStudentIdForDeskVariables {
  input: FindStudentByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findStudentQuestions
// ====================================================

export interface findStudentQuestions_findStudentQuestions_studentQuestions_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
}

export interface findStudentQuestions_findStudentQuestions_studentQuestions {
  __typename: "StudentQuestion";
  student: findStudentQuestions_findStudentQuestions_studentQuestions_student;
  question: string;
  timeAsked: string;
}

export interface findStudentQuestions_findStudentQuestions {
  __typename: "FindStudentQuestionsPayload";
  studentQuestions: findStudentQuestions_findStudentQuestions_studentQuestions[];
}

export interface findStudentQuestions {
  findStudentQuestions: findStudentQuestions_findStudentQuestions;
}

export interface findStudentQuestionsVariables {
  input: FindStudentQuestionsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createAbsence
// ====================================================

export interface createAbsence_createAbsence_studentAbsence {
  __typename: "StudentAbsence";
  _id: string | null;
}

export interface createAbsence_createAbsence {
  __typename: "CreateAbsencePayload";
  studentAbsence: createAbsence_createAbsence_studentAbsence;
}

export interface createAbsence {
  createAbsence: createAbsence_createAbsence;
}

export interface createAbsenceVariables {
  input: CreateAbsenceInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeAbsence
// ====================================================

export interface removeAbsence_removeAbsence {
  __typename: "RemoveAbsencePayload";
  removed: boolean;
}

export interface removeAbsence {
  removeAbsence: removeAbsence_removeAbsence;
}

export interface removeAbsenceVariables {
  input: RemoveAbsenceInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeLateness
// ====================================================

export interface removeLateness_removeLateness {
  __typename: "RemoveLatenessPayload";
  removed: boolean;
}

export interface removeLateness {
  removeLateness: removeLateness_removeLateness;
}

export interface removeLatenessVariables {
  input: RemoveLatenessInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateResponsibilityPoints
// ====================================================

export interface updateResponsibilityPoints_updateResponsibilityPoints_responsibilityPoints {
  __typename: "ResponsibilityPoints";
  _id: string | null;
  responsibilityPoints: number;
}

export interface updateResponsibilityPoints_updateResponsibilityPoints {
  __typename: "UpdateResponsibilityPointsPayload";
  responsibilityPoints: updateResponsibilityPoints_updateResponsibilityPoints_responsibilityPoints;
}

export interface updateResponsibilityPoints {
  updateResponsibilityPoints: updateResponsibilityPoints_updateResponsibilityPoints;
}

export interface updateResponsibilityPointsVariables {
  input: UpdateResponsibilityPointsInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createExcusedLateness
// ====================================================

export interface createExcusedLateness_createExcusedLateness_excusedLateness {
  __typename: "ExcusedLateness";
  _id: string | null;
}

export interface createExcusedLateness_createExcusedLateness {
  __typename: "CreateExcusedLatenessPayload";
  excusedLateness: createExcusedLateness_createExcusedLateness_excusedLateness;
}

export interface createExcusedLateness {
  createExcusedLateness: createExcusedLateness_createExcusedLateness;
}

export interface createExcusedLatenessVariables {
  input: CreateExcusedLatenessInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUnexcusedLateness
// ====================================================

export interface createUnexcusedLateness_createUnexcusedLateness_unexcusedLateness {
  __typename: "UnexcusedLateness";
  _id: string | null;
}

export interface createUnexcusedLateness_createUnexcusedLateness {
  __typename: "CreateUnexcusedLatenessPayload";
  unexcusedLateness: createUnexcusedLateness_createUnexcusedLateness_unexcusedLateness;
}

export interface createUnexcusedLateness {
  createUnexcusedLateness: createUnexcusedLateness_createUnexcusedLateness;
}

export interface createUnexcusedLatenessVariables {
  input: CreateUnexcusedLatenessInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: assessStudentProtocol
// ====================================================

export interface assessStudentProtocol_assessStudentProtocol_protocols_student {
  __typename: "Student";
  _id: string | null;
}

export interface assessStudentProtocol_assessStudentProtocol_protocols_partners {
  __typename: "Student";
  _id: string | null;
}

export interface assessStudentProtocol_assessStudentProtocol_protocols {
  __typename: "Protocol";
  _id: string | null;
  student: assessStudentProtocol_assessStudentProtocol_protocols_student;
  partners: assessStudentProtocol_assessStudentProtocol_protocols_partners[] | null;
}

export interface assessStudentProtocol_assessStudentProtocol {
  __typename: "AssessStudentProtocolPayload";
  protocols: assessStudentProtocol_assessStudentProtocol_protocols[];
}

export interface assessStudentProtocol {
  assessStudentProtocol: assessStudentProtocol_assessStudentProtocol;
}

export interface assessStudentProtocolVariables {
  input: AssessStudentProtocolInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findStudentInfoByStudentId
// ====================================================

export interface findStudentInfoByStudentId_findStudentById_student_hasAbsences {
  __typename: "StudentAbsence";
  _id: string | null;
  dayAbsent: any;
}

export interface findStudentInfoByStudentId_findStudentById_student_hasUnExcusedLatenesses {
  __typename: "UnexcusedLateness";
  _id: string | null;
  dayLate: any;
}

export interface findStudentInfoByStudentId_findStudentById_student_hasExcusedLatenesses {
  __typename: "ExcusedLateness";
  _id: string | null;
  dayLateExcused: any;
}

export interface findStudentInfoByStudentId_findStudentById_student_hasResponsibilityPoints {
  __typename: "ResponsibilityPoints";
  _id: string | null;
  markingPeriod: MarkingPeriodEnum;
  responsibilityPoints: number;
}

export interface findStudentInfoByStudentId_findStudentById_student_hasProtocols_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
}

export interface findStudentInfoByStudentId_findStudentById_student_hasProtocols_partners {
  __typename: "Student";
  _id: string | null;
}

export interface findStudentInfoByStudentId_findStudentById_student_hasProtocols {
  __typename: "Protocol";
  _id: string | null;
  completed: boolean;
  assignedDate: string;
  academicOutcomeType: AcademicOutcomeTypes;
  student: findStudentInfoByStudentId_findStudentById_student_hasProtocols_student;
  isActive: boolean;
  task: string;
  partners: findStudentInfoByStudentId_findStudentById_student_hasProtocols_partners[] | null;
  discussionLevel: DiscussionTypesEnum | null;
  assessment: ProtocolAssessmentEnum | null;
  protocolActivityType: ProtocolActivityTypes;
  markingPeriod: MarkingPeriodEnum;
}

export interface findStudentInfoByStudentId_findStudentById_student {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  lastName: string;
  hasAbsences: findStudentInfoByStudentId_findStudentById_student_hasAbsences[];
  hasUnExcusedLatenesses: findStudentInfoByStudentId_findStudentById_student_hasUnExcusedLatenesses[];
  hasExcusedLatenesses: findStudentInfoByStudentId_findStudentById_student_hasExcusedLatenesses[];
  hasResponsibilityPoints: findStudentInfoByStudentId_findStudentById_student_hasResponsibilityPoints[];
  hasProtocols: findStudentInfoByStudentId_findStudentById_student_hasProtocols[];
}

export interface findStudentInfoByStudentId_findStudentById {
  __typename: "FindStudentByIdPayload";
  student: findStudentInfoByStudentId_findStudentById_student;
}

export interface findStudentInfoByStudentId {
  findStudentById: findStudentInfoByStudentId_findStudentById;
}

export interface findStudentInfoByStudentIdVariables {
  input: FindStudentByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findCourseByIdForTeachersAid
// ====================================================

export interface findCourseByIdForTeachersAid_findCourseById_course_hasStudents_hasAbsences {
  __typename: "StudentAbsence";
  dayAbsent: any;
}

export interface findCourseByIdForTeachersAid_findCourseById_course_hasStudents {
  __typename: "Student";
  _id: string | null;
  firstName: string;
  hasAbsences: findCourseByIdForTeachersAid_findCourseById_course_hasStudents_hasAbsences[];
}

export interface findCourseByIdForTeachersAid_findCourseById_course {
  __typename: "Course";
  name: string;
  hasStudents: findCourseByIdForTeachersAid_findCourseById_course_hasStudents[];
}

export interface findCourseByIdForTeachersAid_findCourseById {
  __typename: "FindCourseByIdPayload";
  course: findCourseByIdForTeachersAid_findCourseById_course;
}

export interface findCourseByIdForTeachersAid {
  findCourseById: findCourseByIdForTeachersAid_findCourseById;
}

export interface findCourseByIdForTeachersAidVariables {
  input: FindCourseByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: changePassword
// ====================================================

export interface changePassword_changePassword_user {
  __typename: "Student" | "Teacher";
  _id: string | null;
}

export interface changePassword_changePassword {
  __typename: "ChangePasswordPayload";
  user: changePassword_changePassword_user;
}

export interface changePassword {
  changePassword: changePassword_changePassword;
}

export interface changePasswordVariables {
  input: ChangePasswordInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_user {
  __typename: "Student" | "Teacher";
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
// GraphQL query operation: passwordCheck
// ====================================================

export interface passwordCheck_passwordCheck {
  __typename: "PasswordCheckPayload";
  firstTimeLoginIn: boolean;
}

export interface passwordCheck {
  passwordCheck: passwordCheck_passwordCheck;
}

export interface passwordCheckVariables {
  input: PasswordCheckInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findStudentProtocol
// ====================================================

export interface findStudentProtocol_findStudentById_student_hasProtocols {
  __typename: "Protocol";
  _id: string | null;
  completed: boolean;
  assignedDate: string;
  academicOutcomeType: AcademicOutcomeTypes;
  task: string;
  isActive: boolean;
  response: string | null;
}

export interface findStudentProtocol_findStudentById_student {
  __typename: "Student";
  hasProtocols: findStudentProtocol_findStudentById_student_hasProtocols[];
}

export interface findStudentProtocol_findStudentById {
  __typename: "FindStudentByIdPayload";
  student: findStudentProtocol_findStudentById_student;
}

export interface findStudentProtocol {
  findStudentById: findStudentProtocol_findStudentById;
}

export interface findStudentProtocolVariables {
  input: FindStudentByIdInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findActiveProtocolByStudent
// ====================================================

export interface findActiveProtocolByStudent_findActiveProtocolByStudent_protocol {
  __typename: "Protocol";
  _id: string | null;
  completed: boolean;
  assignedDate: string;
  academicOutcomeType: AcademicOutcomeTypes;
  task: string;
  isActive: boolean;
  response: string | null;
}

export interface findActiveProtocolByStudent_findActiveProtocolByStudent {
  __typename: "FindActiveProtocolByStudentPayload";
  protocol: findActiveProtocolByStudent_findActiveProtocolByStudent_protocol;
}

export interface findActiveProtocolByStudent {
  findActiveProtocolByStudent: findActiveProtocolByStudent_findActiveProtocolByStudent;
}

export interface findActiveProtocolByStudentVariables {
  input: FindActiveProtocolByStudentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: respondToProtocol
// ====================================================

export interface respondToProtocol_respondToProtocol_protocol {
  __typename: "Protocol";
  _id: string | null;
}

export interface respondToProtocol_respondToProtocol {
  __typename: "RespondToProtocolPayload";
  protocol: respondToProtocol_respondToProtocol_protocol;
}

export interface respondToProtocol {
  respondToProtocol: respondToProtocol_respondToProtocol;
}

export interface respondToProtocolVariables {
  input: RespondToProtocolInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findLessonStatus
// ====================================================

export interface findLessonStatus_findLessonStatus_lesson_vocabList {
  __typename: "TextSectionVocab";
  word: string;
  definition: string;
}

export interface findLessonStatus_findLessonStatus_lesson_pageNumbers {
  __typename: "PageNumbers";
  startingPage: number;
  endingPage: number;
}

export interface findLessonStatus_findLessonStatus_lesson_assignedCourses_hasCourseInfo_assignedSeats_student {
  __typename: "Student";
  firstName: string;
  lastName: string;
}

export interface findLessonStatus_findLessonStatus_lesson_assignedCourses_hasCourseInfo_assignedSeats {
  __typename: "StudentSeat";
  deskNumber: number;
  student: findLessonStatus_findLessonStatus_lesson_assignedCourses_hasCourseInfo_assignedSeats_student | null;
}

export interface findLessonStatus_findLessonStatus_lesson_assignedCourses_hasCourseInfo {
  __typename: "CourseInfo";
  assignedSeats: findLessonStatus_findLessonStatus_lesson_assignedCourses_hasCourseInfo_assignedSeats[];
}

export interface findLessonStatus_findLessonStatus_lesson_assignedCourses_hasSignInSheets_studentsSignInlog {
  __typename: "Student";
  _id: string | null;
}

export interface findLessonStatus_findLessonStatus_lesson_assignedCourses_hasSignInSheets {
  __typename: "StudentSignInSheet";
  studentsSignInlog: findLessonStatus_findLessonStatus_lesson_assignedCourses_hasSignInSheets_studentsSignInlog[] | null;
}

export interface findLessonStatus_findLessonStatus_lesson_assignedCourses {
  __typename: "Course";
  _id: string | null;
  name: string;
  hasCourseInfo: findLessonStatus_findLessonStatus_lesson_assignedCourses_hasCourseInfo | null;
  hasSignInSheets: findLessonStatus_findLessonStatus_lesson_assignedCourses_hasSignInSheets[];
}

export interface findLessonStatus_findLessonStatus_lesson_assignedSections {
  __typename: "LessonTextSections";
  startingSection: string;
  endingSection: string;
}

export interface findLessonStatus_findLessonStatus_lesson_duringActivities {
  __typename: "TextSectionProtocols";
  task: string;
  activityType: ProtocolActivityTypes;
  academicOutcomeTypes: AcademicOutcomeTypes;
  isActive: boolean;
  completed: boolean;
}

export interface findLessonStatus_findLessonStatus_lesson_beforeActivity {
  __typename: "TextSectionProtocols";
  task: string;
  activityType: ProtocolActivityTypes;
  academicOutcomeTypes: AcademicOutcomeTypes;
  isActive: boolean;
}

export interface findLessonStatus_findLessonStatus_lesson_afterActivity {
  __typename: "TextSectionProtocols";
  task: string;
  activityType: ProtocolActivityTypes;
  academicOutcomeTypes: AcademicOutcomeTypes;
  isActive: boolean;
}

export interface findLessonStatus_findLessonStatus_lesson {
  __typename: "Lesson";
  _id: string | null;
  lessonName: string;
  vocabList: findLessonStatus_findLessonStatus_lesson_vocabList[];
  assignedMarkingPeriod: MarkingPeriodEnum;
  pageNumbers: findLessonStatus_findLessonStatus_lesson_pageNumbers;
  assignedCourses: findLessonStatus_findLessonStatus_lesson_assignedCourses[];
  assignedSections: findLessonStatus_findLessonStatus_lesson_assignedSections;
  objectives: string | null;
  essentialQuestion: string;
  duringActivities: findLessonStatus_findLessonStatus_lesson_duringActivities[];
  beforeActivity: findLessonStatus_findLessonStatus_lesson_beforeActivity;
  afterActivity: findLessonStatus_findLessonStatus_lesson_afterActivity;
  dynamicLesson: DynamicLessonEnums;
}

export interface findLessonStatus_findLessonStatus {
  __typename: "FindLessonStatusPayload";
  lesson: findLessonStatus_findLessonStatus_lesson;
}

export interface findLessonStatus {
  findLessonStatus: findLessonStatus_findLessonStatus;
}

export interface findLessonStatusVariables {
  input: FindLessonStatusInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findLessonByCourseAndDate
// ====================================================

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_vocabList {
  __typename: "TextSectionVocab";
  word: string;
  definition: string;
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_pageNumbers {
  __typename: "PageNumbers";
  startingPage: number;
  endingPage: number;
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasCourseInfo_assignedSeats_student {
  __typename: "Student";
  firstName: string;
  lastName: string;
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasCourseInfo_assignedSeats {
  __typename: "StudentSeat";
  deskNumber: number;
  student: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasCourseInfo_assignedSeats_student | null;
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasCourseInfo {
  __typename: "CourseInfo";
  assignedSeats: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasCourseInfo_assignedSeats[];
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasSignInSheets_studentsSignInlog {
  __typename: "Student";
  _id: string | null;
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasSignInSheets {
  __typename: "StudentSignInSheet";
  studentsSignInlog: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasSignInSheets_studentsSignInlog[] | null;
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses {
  __typename: "Course";
  _id: string | null;
  name: string;
  hasCourseInfo: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasCourseInfo | null;
  hasSignInSheets: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasSignInSheets[];
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedSections {
  __typename: "LessonTextSections";
  startingSection: string;
  endingSection: string;
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities {
  __typename: "TextSectionProtocols";
  task: string;
  activityType: ProtocolActivityTypes;
  academicOutcomeTypes: AcademicOutcomeTypes;
  isActive: boolean;
  completed: boolean;
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_beforeActivity {
  __typename: "TextSectionProtocols";
  task: string;
  activityType: ProtocolActivityTypes;
  academicOutcomeTypes: AcademicOutcomeTypes;
  isActive: boolean;
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_afterActivity {
  __typename: "TextSectionProtocols";
  task: string;
  activityType: ProtocolActivityTypes;
  academicOutcomeTypes: AcademicOutcomeTypes;
  isActive: boolean;
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate_lesson {
  __typename: "Lesson";
  _id: string | null;
  lessonName: string;
  vocabList: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_vocabList[];
  assignedMarkingPeriod: MarkingPeriodEnum;
  pageNumbers: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_pageNumbers;
  assignedCourses: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses[];
  assignedSections: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedSections;
  objectives: string | null;
  essentialQuestion: string;
  duringActivities: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities[];
  beforeActivity: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_beforeActivity;
  afterActivity: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_afterActivity;
  dynamicLesson: DynamicLessonEnums;
}

export interface findLessonByCourseAndDate_findLessonByCourseAndDate {
  __typename: "FindLessonByCourseAndDatePayload";
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson | null;
}

export interface findLessonByCourseAndDate {
  findLessonByCourseAndDate: findLessonByCourseAndDate_findLessonByCourseAndDate;
}

export interface findLessonByCourseAndDateVariables {
  input: FindLessonByCourseAndDateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: studentSignedInCheck
// ====================================================

export interface studentSignedInCheck_findSchoolDayByDate_schoolDay_signInSheets_studentsSignInlog {
  __typename: "Student";
  _id: string | null;
}

export interface studentSignedInCheck_findSchoolDayByDate_schoolDay_signInSheets {
  __typename: "StudentSignInSheet";
  studentsSignInlog: studentSignedInCheck_findSchoolDayByDate_schoolDay_signInSheets_studentsSignInlog[] | null;
}

export interface studentSignedInCheck_findSchoolDayByDate_schoolDay {
  __typename: "SchoolDay";
  _id: string | null;
  signInSheets: studentSignedInCheck_findSchoolDayByDate_schoolDay_signInSheets[] | null;
}

export interface studentSignedInCheck_findSchoolDayByDate {
  __typename: "FindSchoolDayByDatePayload";
  schoolDay: studentSignedInCheck_findSchoolDayByDate_schoolDay | null;
}

export interface studentSignedInCheck {
  findSchoolDayByDate: studentSignedInCheck_findSchoolDayByDate;
}

export interface studentSignedInCheckVariables {
  input: FindSchoolDayByDateInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: studentSignIn
// ====================================================

export interface studentSignIn_studentSignIn_schoolDay {
  __typename: "SchoolDay";
  _id: string | null;
}

export interface studentSignIn_studentSignIn {
  __typename: "StudentSignInPayload";
  schoolDay: studentSignIn_studentSignIn_schoolDay;
}

export interface studentSignIn {
  studentSignIn: studentSignIn_studentSignIn;
}

export interface studentSignInVariables {
  input: StudentSignInInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createStudentQuestion
// ====================================================

export interface createStudentQuestion_createStudentQuestion_studentQuestions_questions_student {
  __typename: "Student";
  _id: string | null;
}

export interface createStudentQuestion_createStudentQuestion_studentQuestions_questions {
  __typename: "StudentQuestion";
  student: createStudentQuestion_createStudentQuestion_studentQuestions_questions_student;
  question: string;
}

export interface createStudentQuestion_createStudentQuestion_studentQuestions {
  __typename: "StudentQuestions";
  _id: string | null;
  questions: createStudentQuestion_createStudentQuestion_studentQuestions_questions[];
}

export interface createStudentQuestion_createStudentQuestion {
  __typename: "CreateStudentQuestionPayload";
  studentQuestions: createStudentQuestion_createStudentQuestion_studentQuestions;
}

export interface createStudentQuestion {
  createStudentQuestion: createStudentQuestion_createStudentQuestion;
}

export interface createStudentQuestionVariables {
  input: CreateStudentQuestionInput;
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

export interface enumValues_RubricSectionEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_RubricSectionEnum {
  __typename: "__Type";
  enumValues: enumValues_RubricSectionEnum_enumValues[] | null;
}

export interface enumValues_TimeOfDay_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_TimeOfDay {
  __typename: "__Type";
  enumValues: enumValues_TimeOfDay_enumValues[] | null;
}

export interface enumValues_InformationStructureEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_InformationStructureEnum {
  __typename: "__Type";
  enumValues: enumValues_InformationStructureEnum_enumValues[] | null;
}

export interface enumValues_DiscussionTypesEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_DiscussionTypesEnum {
  __typename: "__Type";
  enumValues: enumValues_DiscussionTypesEnum_enumValues[] | null;
}

export interface enumValues_ProtocolAssessmentEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_ProtocolAssessmentEnum {
  __typename: "__Type";
  enumValues: enumValues_ProtocolAssessmentEnum_enumValues[] | null;
}

export interface enumValues_CourseMaxSizeEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_CourseMaxSizeEnum {
  __typename: "__Type";
  enumValues: enumValues_CourseMaxSizeEnum_enumValues[] | null;
}

export interface enumValues_CourseTypeEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_CourseTypeEnum {
  __typename: "__Type";
  enumValues: enumValues_CourseTypeEnum_enumValues[] | null;
}

export interface enumValues_SchoolDayType_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_SchoolDayType {
  __typename: "__Type";
  enumValues: enumValues_SchoolDayType_enumValues[] | null;
}

export interface enumValues_AcademicOutcomeTypes_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_AcademicOutcomeTypes {
  __typename: "__Type";
  enumValues: enumValues_AcademicOutcomeTypes_enumValues[] | null;
}

export interface enumValues_ProtocolActivityTypes_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_ProtocolActivityTypes {
  __typename: "__Type";
  enumValues: enumValues_ProtocolActivityTypes_enumValues[] | null;
}

export interface enumValues_ContactTypeEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_ContactTypeEnum {
  __typename: "__Type";
  enumValues: enumValues_ContactTypeEnum_enumValues[] | null;
}

export interface enumValues_NounTypeEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_NounTypeEnum {
  __typename: "__Type";
  enumValues: enumValues_NounTypeEnum_enumValues[] | null;
}

export interface enumValues_VerbTypeEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_VerbTypeEnum {
  __typename: "__Type";
  enumValues: enumValues_VerbTypeEnum_enumValues[] | null;
}

export interface enumValues_QuestionWordEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_QuestionWordEnum {
  __typename: "__Type";
  enumValues: enumValues_QuestionWordEnum_enumValues[] | null;
}

export interface enumValues_LessonTypeEnum_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface enumValues_LessonTypeEnum {
  __typename: "__Type";
  enumValues: enumValues_LessonTypeEnum_enumValues[] | null;
}

export interface enumValues {
  MarkingPeriod: enumValues_MarkingPeriod | null;
  WritingLevelEnum: enumValues_WritingLevelEnum | null;
  QuestionTypeEnum: enumValues_QuestionTypeEnum | null;
  RubricSectionEnum: enumValues_RubricSectionEnum | null;
  TimeOfDay: enumValues_TimeOfDay | null;
  InformationStructureEnum: enumValues_InformationStructureEnum | null;
  DiscussionTypesEnum: enumValues_DiscussionTypesEnum | null;
  ProtocolAssessmentEnum: enumValues_ProtocolAssessmentEnum | null;
  CourseMaxSizeEnum: enumValues_CourseMaxSizeEnum | null;
  CourseTypeEnum: enumValues_CourseTypeEnum | null;
  SchoolDayType: enumValues_SchoolDayType | null;
  AcademicOutcomeTypes: enumValues_AcademicOutcomeTypes | null;
  ProtocolActivityTypes: enumValues_ProtocolActivityTypes | null;
  ContactTypeEnum: enumValues_ContactTypeEnum | null;
  NounTypeEnum: enumValues_NounTypeEnum | null;
  VerbTypeEnum: enumValues_VerbTypeEnum | null;
  QuestionWordEnum: enumValues_QuestionWordEnum | null;
  LessonTypeEnum: enumValues_LessonTypeEnum | null;
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
// GraphQL query operation: me
// ====================================================

export interface me_me_Teacher_teachesCourses_hasCourseInfo {
  __typename: "CourseInfo";
  startsAt: string;
  endsAt: string;
  schoolDayType: SchoolDayType;
}

export interface me_me_Teacher_teachesCourses {
  __typename: "Course";
  _id: string | null;
  name: string;
  hasCourseInfo: me_me_Teacher_teachesCourses_hasCourseInfo | null;
}

export interface me_me_Teacher {
  __typename: "Teacher";
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  _id: string | null;
  title: TitleEnum;
  teachesCourses: me_me_Teacher_teachesCourses[];
}

export interface me_me_Student_inCourses_hasCourseInfo {
  __typename: "CourseInfo";
  _id: string | null;
  startsAt: string;
  endsAt: string;
  schoolDayType: SchoolDayType;
}

export interface me_me_Student_inCourses {
  __typename: "Course";
  _id: string | null;
  name: string;
  hasCourseInfo: me_me_Student_inCourses_hasCourseInfo | null;
}

export interface me_me_Student_hasWritingMetrics_overallWritingMetric {
  __typename: "OverallWritingMetric";
  levelPoints: number;
}

export interface me_me_Student_hasWritingMetrics {
  __typename: "WritingMetrics";
  overallWritingMetric: me_me_Student_hasWritingMetrics_overallWritingMetric;
}

export interface me_me_Student {
  __typename: "Student";
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  _id: string | null;
  inCourses: me_me_Student_inCourses[];
  hasWritingMetrics: me_me_Student_hasWritingMetrics;
}

export type me_me = me_me_Teacher | me_me_Student;

export interface me {
  me: me_me | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateEssayQuestion
// ====================================================

export interface CreateEssayQuestion_createEssayQuestion_essayQuestion {
  __typename: "EssayQuestion";
  _id: string | null;
}

export interface CreateEssayQuestion_createEssayQuestion {
  __typename: "CreateEssayQuestionPayload";
  essayQuestion: CreateEssayQuestion_createEssayQuestion_essayQuestion;
}

export interface CreateEssayQuestion {
  createEssayQuestion: CreateEssayQuestion_createEssayQuestion;
}

export interface CreateEssayQuestionVariables {
  input: CreateEssayQuestionInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AcademicOutcomeTypes {
  CAUSE_AND_EFFECT_RECOGNITION = "CAUSE_AND_EFFECT_RECOGNITION",
  LOGIC_BUILDING = "LOGIC_BUILDING",
  SCHEMA_BUIDING = "SCHEMA_BUIDING",
  SOCRATIC_QUESTIONS = "SOCRATIC_QUESTIONS",
}

export enum BasicQuestionEnum {
  HOW = "HOW",
  WHY = "WHY",
}

export enum ContactTypeEnum {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  VIDEO = "VIDEO",
}

export enum CourseMaxSizeEnum {
  THIRTY = "THIRTY",
  THIRTY_SIX = "THIRTY_SIX",
  TWELVE = "TWELVE",
  TWENTY_FOUR = "TWENTY_FOUR",
  TWENTY_SIX = "TWENTY_SIX",
}

export enum CourseTypeEnum {
  ENGLISH_LANGUAGE_ARTS = "ENGLISH_LANGUAGE_ARTS",
  MATH = "MATH",
  RELATED_ARTS = "RELATED_ARTS",
  SCIENCE = "SCIENCE",
  SOCIAL_STUDIES = "SOCIAL_STUDIES",
}

export enum DiscussionTypesEnum {
  DISCUSSED = "DISCUSSED",
  LITTLE_TO_NO_DISCUSSION = "LITTLE_TO_NO_DISCUSSION",
  NOT_REQUIRED = "NOT_REQUIRED",
  SOME_DISCUSSION = "SOME_DISCUSSION",
  THOROUGHLY_DISCUSSED = "THOROUGHLY_DISCUSSED",
}

export enum DynamicLessonEnums {
  ASSIGNED_SEATING = "ASSIGNED_SEATING",
  EXIT_ACTIVITY = "EXIT_ACTIVITY",
  LESSON_DETAILS = "LESSON_DETAILS",
  OFF = "OFF",
  ON = "ON",
  PROTOCOLS = "PROTOCOLS",
  VOCAB = "VOCAB",
  WARM_UP = "WARM_UP",
}

export enum LessonTypeEnum {
  INTRODUCTORY = "INTRODUCTORY",
  REINFORCEMENT = "REINFORCEMENT",
}

export enum MarkingPeriodEnum {
  FIRST = "FIRST",
  FOURTH = "FOURTH",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

export enum NounTypeEnum {
  IDEA = "IDEA",
  IDEAS = "IDEAS",
  PEOPLE = "PEOPLE",
  PERSON = "PERSON",
  PLACE = "PLACE",
  PLACES = "PLACES",
  THING = "THING",
  THINGS = "THINGS",
}

export enum ProtocolActivityTypes {
  INDIVIDUAL = "INDIVIDUAL",
  SMALL_GROUP = "SMALL_GROUP",
  THINK_PAIR_SHARE = "THINK_PAIR_SHARE",
}

export enum ProtocolAssessmentEnum {
  REFUSED_TO_WORK = "REFUSED_TO_WORK",
  SLOW_TO_GET_STARTED = "SLOW_TO_GET_STARTED",
  WORKED_POORLY = "WORKED_POORLY",
  WORKED_VERY_WELL = "WORKED_VERY_WELL",
  WORKED_WELL = "WORKED_WELL",
}

export enum QuestionTypeEnum {
  HOW_CAUSE_EFFECT = "HOW_CAUSE_EFFECT",
  HOW_PROBLEM_SOLUTION = "HOW_PROBLEM_SOLUTION",
  WHY_CAUSE_EFFECT = "WHY_CAUSE_EFFECT",
}

export enum QuestionWordEnum {
  HOW = "HOW",
  WHY = "WHY",
}

export enum QuizQuestionDifficultyLevelEnum {
  CHALLENGING = "CHALLENGING",
  DIFFICULT = "DIFFICULT",
  EASY = "EASY",
}

export enum QuizQuestionTypeEnum {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
}

export enum RubricSectionEnum {
  ANSWER = "ANSWER",
  CONCLUSION = "CONCLUSION",
  GENERAL = "GENERAL",
  OVERALL = "OVERALL",
  TOPIC = "TOPIC",
}

export enum SchoolDayType {
  A = "A",
  AB = "AB",
  B = "B",
}

export enum StudentCohortEnum {
  RED = "RED",
  WHITE = "WHITE",
}

export enum TimeOfDay {
  AFTER_CLASS = "AFTER_CLASS",
  AFTER_SCHOOL = "AFTER_SCHOOL",
  BEFORE_CLASS = "BEFORE_CLASS",
  BEFORE_SCHOOL = "BEFORE_SCHOOL",
}

export enum TitleEnum {
  MISS = "MISS",
  MR = "MR",
  MRS = "MRS",
  MS = "MS",
}

export enum VerbTypeEnum {
  ACTION = "ACTION",
  BEING = "BEING",
  FEELING = "FEELING",
  HAVING = "HAVING",
}

export enum WritingLevelEnum {
  ACADEMIC = "ACADEMIC",
  ADVANCED = "ADVANCED",
  DEVELOPING = "DEVELOPING",
}

export interface AcademicSentenceStructureInput {
  object?: string | null;
  subject: string;
  subjectCompliment?: string | null;
  verb: string;
}

export interface AddCourseToTeacherInput {
  courseId: string;
  teacherId: string;
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

export interface AddStudentsToCourseInput {
  courseId: string;
  studentIds: string[];
}

export interface AdvancedSentenceStructureInput {
  object?: string | null;
  subject: string;
  subjectCompliment?: string | null;
  verb: string;
}

export interface AnswerListInput {
  answer: string;
  correct: boolean;
  partiallyCorrect: boolean;
}

export interface AssessIndividualProtocolsInput {
  assessment?: ProtocolAssessmentEnum | null;
  markingPeriod: MarkingPeriodEnum;
  protocolId: string;
}

export interface AssessStudentProtocolInput {
  assessment?: ProtocolAssessmentEnum | null;
  assignedDate?: string | null;
  discussionLevel?: DiscussionTypesEnum | null;
  markingPeriod: MarkingPeriodEnum;
  partnerIds?: string[] | null;
  protocolActivityType: ProtocolActivityTypes;
  studentId: string;
  task: string;
}

export interface AssignEssaysInput {
  assignedDate: any;
  associatedLessonId: string;
  dueDate: any;
  studentIds: string[];
}

export interface AssignReadingGuidesInput {
  assignedDate: any;
  associatedLessonId: string;
  dueDate: any;
  studentIds: string[];
}

export interface AssignSeatsInput {
  cohortBasedSeating: boolean;
  courseId: string;
  seat?: StudentSeatInput | null;
}

export interface BuildRubricEntryInput {
  entry: string;
  howToImprove?: string | null;
  rubricSection: RubricSectionEnum;
  rubricWritingLevels: WritingLevelEnum[];
  score: number;
}

export interface ChangePasswordInput {
  newPassword: string;
  oldPassword: string;
  userName: string;
}

export interface ControlCoolDownInput {
  isActive: boolean;
  lessonId: string;
}

export interface ControlWarmUpInput {
  isActive: boolean;
  lessonId: string;
}

export interface CreateAbsenceInput {
  dayAbsent: any;
  markingPeriod: MarkingPeriodEnum;
  studentId: string;
}

export interface CreateArticleReviewsInput {
  assignedCourseId: string[];
  assignedDate: string;
  dueDate: string;
  dueTime: TimeOfDay;
  hasAssignerId: string;
  markingPeriod: MarkingPeriodEnum;
}

export interface CreateCourseInfoInput {
  cohortBasedSeating: boolean;
  courseId: string;
  courseMaxSize: CourseMaxSizeEnum;
  courseType: CourseTypeEnum;
  endsAt: string;
  halfDayEndsAt: string;
  halfDayStartsAt: string;
  schoolDayType: SchoolDayType;
  startsAt: string;
}

export interface CreateCourseInput {
  name: string;
}

export interface CreateEssayInput {
  assignedCourseId: string[];
  assignedDate: string;
  associatedLessonId: string;
  dueDate: string;
  dueTime: TimeOfDay;
  hasAssignerId: string;
  markingPeriod: MarkingPeriodEnum;
  maxPoints: number;
  readings: ReadingsInput;
  topicList: TopicInput[];
}

export interface CreateEssayQuestionInput {
  associatedTextSectionsIds: string[];
  questionPartsInput: QuestionPartsContainerInput;
}

export interface CreateEssentialQuestionInput {
  associatedTextSectionsIds: string[];
  question: string;
}

export interface CreateExcusedLatenessInput {
  dayLateExcused: any;
  markingPeriod: MarkingPeriodEnum;
  studentId: string;
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
  lessonType: LessonTypeEnum;
  pageNumbers: PageNumbersInput;
  questionList: TextSectionQuestionsInput[];
  vocabList: TextSectionVocabInput[];
}

export interface CreateParentContactInput {
  contactType: ContactTypeEnum;
  contentOfContact: string;
  date: string;
  studentId: string;
  teacherId: string;
}

export interface CreateProtocolInput {
  academicOutcomeType: AcademicOutcomeTypes;
  markingPeriod: MarkingPeriodEnum;
  protocolActivityType: ProtocolActivityTypes;
  studentIds: string[];
  task: string;
}

export interface CreateQuizQuestionInput {
  answerList: AnswerListInput[];
  associatedTextSectionId: string;
  difficultyLevel: QuizQuestionDifficultyLevelEnum;
  question: string;
  questionType: QuizQuestionTypeEnum;
}

export interface CreateReadingGuideInput {
  assignedCourseIds: string[];
  assignedDate: string;
  associatedLessonId: string;
  dueDate: string;
  dueTime: TimeOfDay;
  hasAssignerId: string;
  markingPeriod: MarkingPeriodEnum;
  maxPoints: number;
  readings: ReadingsInput;
}

export interface CreateSchoolDayInput {
  cohortWeek: StudentCohortEnum;
  currentSchoolDayType: SchoolDayType;
  schoolDayCount: number;
}

export interface CreateSignInSheetsInput {
  courseIds: string[];
  todaysDate: string;
}

export interface CreateStudentQuestionInput {
  courseId: string;
  question: string;
  studentId: string;
}

export interface CreateTemporaryTasksInput {
  courseId: string;
  dateIssued: string;
  markingPeriod: MarkingPeriodEnum;
  taskNumber: number;
}

export interface CreateTextSectionInput {
  fromChapterId: string;
  hasProtocols: TextSectionProtocolsInput[];
  hasQuestions: TextSectionQuestionsInput[];
  hasVocab: TextSectionVocabInput[];
  header: string;
  pageNumbers: PageNumbersInput;
}

export interface CreateUnexcusedLatenessInput {
  dayLate: any;
  markingPeriod: MarkingPeriodEnum;
  studentId: string;
}

export interface CreateUnitInput {
  unitName: string;
}

export interface DevelopingSentenceStructureInput {
  object?: string | null;
  subject: string;
  subjectCompliment?: string | null;
  verb: string;
}

export interface FindActiveProtocolByStudentInput {
  studentId: string;
}

export interface FindActiveProtocolsByCourseInput {
  courseId: string;
}

export interface FindArticleReviewByIdInput {
  articleReviewId: string;
}

export interface FindArticleReviewsByCourseInput {
  courseId: string;
  markingPeriod?: MarkingPeriodEnum | null;
}

export interface FindArticleReviewsByStudentInput {
  markingPeriod: MarkingPeriodEnum;
  studentId: string;
}

export interface FindAssignmentByIdInput {
  assignmentId: string;
}

export interface FindAssignmentByStudentIdInput {
  studentId: string;
}

export interface FindChaptersByTextIdInput {
  textId: string;
}

export interface FindChaptersInTextInput {
  textTitle: string;
}

export interface FindCompletedEssaysByStudentIdInput {
  studentId: string;
}

export interface FindContactsByStudentIdInput {
  studentId: string;
}

export interface FindCourseByIdInput {
  courseId: string;
}

export interface FindCourseInfoByCourseIdInput {
  courseId: string;
}

export interface FindCoursesByIdInput {
  _ids: string[];
}

export interface FindEssayByIdInput {
  _id: string;
}

export interface FindEssayQuestionByIdInput {
  essayQuestionId: string;
}

export interface FindEssaysByAssociatedLessonIdAndCourseIdInput {
  courseId: string;
  lessonId: string;
}

export interface FindEssaysByAssociatedLessonIdInput {
  associatedLessonId: string;
}

export interface FindEssaysToCompleteByStudentIdInput {
  studentId: string;
}

export interface FindEssaysToGradeByIdInput {
  teacherId: string;
}

export interface FindEssentialQuestionsByAssociatedTextSectionIdsInput {
  textSectionIds: string[];
}

export interface FindLessonByCourseAndDateInput {
  courseId: string;
  lessonDate: any;
}

export interface FindLessonByCourseInput {
  courseId: string;
}

export interface FindLessonByIdInput {
  _id: string;
}

export interface FindLessonStatusInput {
  lessonId: string;
}

export interface FindLessonsByAssignedDateInput {
  assignedDate: string;
}

export interface FindLessonsByUnitInput {
  courseId: string;
  unitId: string;
}

export interface FindParentContactsByTeacherIdInput {
  teacherId: string;
}

export interface FindQuizQuestionsByTextSectionIdInput {
  associatedTextSectionId: string;
}

export interface FindReadingGuideByIdInput {
  readingGuideId: string;
}

export interface FindReadingGuidesByAssociatedLessonAndCourseIdInput {
  courseId: string;
  lessonId: string;
}

export interface FindReadingGuidesByCourseIdAndAssignedDateInput {
  assignedDate?: string | null;
  courseId: string;
}

export interface FindReadingGuidesToCompleteByStudentIdInput {
  studentId: string;
}

export interface FindResponsibilityPointsByCourseInput {
  courseId: string;
}

export interface FindResponsibilityPointsByStudentIdInput {
  studentId: string;
}

export interface FindSchoolDayByDateInput {
  date: any;
}

export interface FindStudentByIdInput {
  studentId: string;
}

export interface FindStudentQuestionsInput {
  courseId: string;
  date: string;
}

export interface FindStudentsByCourseInput {
  courseId: string;
}

export interface FindTemporaryTasksByStudentIdInput {
  studentId: string;
}

export interface FindTemporaryTasksInput {
  courseId: string;
  dateIssued: string;
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

export interface FindWritingMetricsInput {
  studentId: string;
}

export interface FinishProtocolInput {
  assignedDate: any;
  lessonId: string;
  studentIds: string[];
  task: string;
}

export interface GradeTemporaryTaskInput {
  _id: string;
  answered: boolean;
  lastGrade: number;
  responsibilityPoints: number;
}

export interface InitializeStudentsInput {
  courseId: string;
  studentIds: string[];
}

export interface LessonTextSectionsInput {
  endingSection: string;
  startingSection: string;
}

export interface LoginInput {
  password: string;
  userName: string;
}

export interface MarkTemporaryTaskAbsentInput {
  studentPresent?: boolean | null;
  taskId: string;
}

export interface PageNumbersInput {
  endingPage: number;
  startingPage: number;
}

export interface PasswordCheckInput {
  password: string;
}

export interface QuestionPartsContainerInput {
  completePredicate: string;
  completeSubject: string;
  compoundNoun: boolean;
  helpingVerb: string;
  modifiedQuestion: string;
  nounType: NounTypeEnum;
  object?: string | null;
  originalQuestion: string;
  questionType: QuestionTypeEnum;
  questionWord: QuestionWordEnum;
  simplePredicate: string;
  simpleSubject: string;
  subjectCompliment?: string | null;
  verbType: VerbTypeEnum;
}

export interface ReadingsInput {
  readingPages: string;
  readingSections: string;
}

export interface RegisterStudentInput {
  cohort: StudentCohortEnum;
  email?: string | null;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  password: string;
  schoolId?: string | null;
  userName: string;
  virtual: boolean;
}

export interface RemoveAbsenceInput {
  _id: string;
}

export interface RemoveAssignedSeatInput {
  cohortBased: boolean;
  cohortType?: StudentCohortEnum | null;
  courseId: string;
  deskNumber: number;
}

export interface RemoveCourseInput {
  courseId: string;
}

export interface RemoveLatenessInput {
  _id: string;
}

export interface RemoveProtocolInput {
  assignedDate: any;
  lessonId: string;
  studentIds: string[];
  task: string;
}

export interface RemoveRubricEntryInput {
  rubricEntryId: string;
}

export interface RespondToProtocolInput {
  protocolId: string;
  response: string;
}

export interface ResubmitEssayFinalDraftInput {
  essayId: string;
  submittedFinalDraft: SubmittedFinalDraftsInput;
}

export interface ReturnArticleReviewInput {
  articleReviewId: string;
}

export interface ReturnGradedEssayInput {
  _id: string;
  additionalComments?: string[] | null;
  draftNumber: number;
  gradingDraft: string;
  rubricEntries: ReturnedRubricEntryInput[];
  score: number;
}

export interface ReturnedRubricEntryInput {
  _id?: string | null;
  entry: string;
  howToImprove?: string | null;
  rubricSection: RubricSectionEnum;
  score: number;
}

export interface RubricEntryInput {
  entry: string;
  rubricSection: RubricSectionEnum;
  rubricWritingLevels: WritingLevelEnum[];
  score: number;
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

export interface StartProtocolInput {
  isActive: boolean;
  lessonId: string;
  task: string;
}

export interface StartReadingGuideInput {
  paperBased: boolean;
  readingGuideId: string;
}

export interface StudentSeatInput {
  deskNumber: number;
  redCohortStudentId?: string | null;
  studentId?: string | null;
  whiteCohortStudentId?: string | null;
}

export interface StudentSignInInput {
  courseId: string;
  lessonDate: string;
  studentId: string;
  virtual?: boolean | null;
}

export interface SubmitArticleReviewInput {
  articleReviewId: string;
  markingPeriod: MarkingPeriodEnum;
}

export interface SubmitEssayFinalDraftInput {
  _id: string;
  late: boolean;
  paperBased: boolean;
  submittedFinalDraft: SubmittedFinalDraftsInput;
  submitTime: string;
}

export interface SubmitReadingGuideInput {
  completeReadingGuide?: boolean | null;
  late: boolean;
  paperBased: boolean;
  readingGuideId: string;
  submitTime: string;
}

export interface SubmittedFinalDraftsInput {
  additionalComments?: string[] | null;
  draft: any;
  draftNumber: number;
  graded: boolean;
  gradingDraft: any;
  rubricEntries: RubricEntryInput[];
  score: number;
}

export interface TextSectionProtocolsInput {
  academicOutcomeTypes: AcademicOutcomeTypes;
  activityType: ProtocolActivityTypes;
  completed: boolean;
  isActive: boolean;
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
  essayQuestionId: string;
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

export interface UpdateArticleReviewInput {
  articleAuthor: string;
  articleLink: string;
  articleReviewId: string;
  articleTitle: string;
  bias?: boolean | null;
  issue: string;
  publishedDate?: string | null;
  solutions?: string | null;
  topicsImportance: string;
}

export interface UpdateCourseInfoInput {
  cohortBasedSeating?: boolean | null;
  courseId: string;
  courseMaxSize: CourseMaxSizeEnum;
  courseType?: CourseTypeEnum | null;
  endsAt?: string | null;
  halfDayEndsAt?: string | null;
  halfDayStartsAt?: string | null;
  name: string;
  schoolDayType?: SchoolDayType | null;
  startsAt?: string | null;
}

export interface UpdateDevelopingOrganizerInput {
  answer: string;
  basicQuestionType: BasicQuestionEnum;
  conclusion: string;
  developingSentenceStructure: DevelopingSentenceStructureInput;
  essayId: string;
  restatement: string;
}

export interface UpdateDynamicLessonInput {
  dynamicLessonUpdate: DynamicLessonEnums;
  lessonId: string;
}

export interface UpdateGradingDraftInput {
  draftNumber?: number | null;
  essayId: string;
  gradingDraft?: any | null;
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

export interface UpdateLessonProtocolInput {
  assignedDate: any;
  isActive: boolean;
  lessonId: string;
  studentIds: string[];
  task: string;
}

export interface UpdateProblemSolutionInput {
  essayId: string;
  problem: string;
  reasonForProblem: string;
  solvedBy: string;
  whySolutionSolved: string;
}

export interface UpdateReadingGuideInput {
  biggestProblem: string;
  howArePeopleInvolvedInProblems: string;
  importantPeople: string[];
  problems: string[];
  readingGuideId: string;
  reasonForBiggestProblem: string;
  sectionConsequences: string;
}

export interface UpdateResponsibilityPointsInput {
  markingPeriod?: MarkingPeriodEnum | null;
  points: number;
  studentId: string;
}

export interface UpdateRubricEntryInput {
  entry: string;
  howToImprove?: string | null;
  rubricEntryId: string;
  rubricSection: RubricSectionEnum;
  rubricWritingLevels: WritingLevelEnum[];
  score: number;
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

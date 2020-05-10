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
// GraphQL query operation: findTextTitles
// ====================================================

export interface findTextTitles_findTexts_texts {
  __typename: "Text";
  _id: string | null;
  textTitle: string;
}

export interface findTextTitles_findTexts {
  __typename: "FindTextsPayload";
  texts: findTextTitles_findTexts_texts[];
}

export interface findTextTitles {
  findTexts: findTextTitles_findTexts;
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
  chapterNumber: number;
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
// GraphQL query operation: me
// ====================================================

export interface me_me_Student {
  __typename: "Student";
  userName: string;
  firstName: string;
  lastName: string;
  _id: string | null;
}

export interface me_me_Teacher {
  __typename: "Teacher";
  userName: string;
  firstName: string;
  lastName: string;
  _id: string | null;
  title: TitleEnum;
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

export enum ProtocolActivityTypes {
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

export interface CreateTextSectionInput {
  fromChapterId: string;
  hasProtocols: TextSectionProtocolsInput[];
  hasQuestions: TextSectionQuestionsInput[];
  hasVocab: TextSectionVocabInput[];
  header: string;
  pageNumbers: PageNumbersInput;
}

export interface FindChaptersInTextInput {
  textTitle: string;
}

export interface LoginInput {
  password: string;
  userName: string;
}

export interface PageNumbersInput {
  endingPage: number;
  startingPage: number;
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

//==============================================================
// END Enums and Input Objects
//==============================================================

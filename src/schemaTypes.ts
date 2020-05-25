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
  period: string;
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

export interface findTextSectionsById_findTextSectionsById_textSections {
  __typename: "TextSection";
  hasVocab: findTextSectionsById_findTextSectionsById_textSections_hasVocab[];
  hasProtocols: findTextSectionsById_findTextSectionsById_textSections_hasProtocols[];
  hasQuestions: findTextSectionsById_findTextSectionsById_textSections_hasQuestions[];
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

export interface me_MarkingPeriod_enumValues {
  __typename: "__EnumValue";
  name: string;
}

export interface me_MarkingPeriod {
  __typename: "__Type";
  enumValues: me_MarkingPeriod_enumValues[] | null;
}

export interface me {
  me: me_me | null;
  MarkingPeriod: me_MarkingPeriod | null;
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

export interface AddNewChapterInput {
  chapterNumber: number;
  chapterTitle: string;
  textTitle: string;
}

export interface AddNewTextInput {
  ownerId: string;
  textTitle: string;
}

export interface CreateLessonInput {
  afterActivity: TextSectionProtocolsInput;
  assignedCourse: string[];
  assignedDate: any;
  assignedMarkingPeriod: MarkingPeriodEnum;
  assignedSections: LessonTextSectionsInput;
  beforeActivity: TextSectionProtocolsInput;
  duringActivities: TextSectionProtocolsInput[];
  essentialQuestion: string;
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

export interface FindChaptersInTextInput {
  textTitle: string;
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

export interface UpdateTextSectionInput {
  _id: string;
  fromChapterId: string;
  hasProtocols: TextSectionProtocolsInput[];
  hasQuestions: TextSectionQuestionsInput[];
  hasVocab: TextSectionVocabInput[];
  header: string;
  pageNumbers: PageNumbersInput;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

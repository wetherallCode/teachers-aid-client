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

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum TitleEnum {
  MISS = "MISS",
  MR = "MR",
  MRS = "MRS",
  MS = "MS",
}

export interface LoginInput {
  password: string;
  userName: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

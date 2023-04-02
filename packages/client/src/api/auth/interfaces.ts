import { IBadResponse } from "../interfaces";

export interface IUserData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  is_yandex_user?: boolean;
}

export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export interface ISignUpGoodResponse {
  id: number;
}

export type SignUpResponse = ISignUpGoodResponse | IBadResponse;

export type UserResponse = IUserData | IBadResponse;

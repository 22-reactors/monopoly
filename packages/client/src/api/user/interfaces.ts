import { IUser } from '../../utils/interfaces';
import { IBadResponse } from '../interfaces';

export interface IProfileData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}

export type ProfileResponse = IUser | IBadResponse;

export type IChangePasswordResponse = 'OK' | IBadResponse;

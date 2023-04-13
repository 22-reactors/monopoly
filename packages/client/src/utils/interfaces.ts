export interface IUser {
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

export interface IValue {
  value: string;
}

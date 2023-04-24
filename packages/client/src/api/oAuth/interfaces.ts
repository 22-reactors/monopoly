export interface IServiceYandexData {
  service_id: string;
}

export interface IBadResponse {
  reason: string;
}

export type UserResponse = IServiceYandexData | IBadResponse;

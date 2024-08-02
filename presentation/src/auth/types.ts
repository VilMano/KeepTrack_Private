import { IUser } from "../models/IUser";

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthStateType = {
  user: IUser;
  token?: string;
};


export type JWTContextType = {
  user: AuthStateType;
  method: string;
  authenticated: boolean;
  login: (userName: string, password: string) => Promise<void>;
};
import { createContext } from "react";
import { IUserAuth } from "../models/IUserAuth";
import { UserAuth } from "../models/UserAuth";

export const UserContext = createContext<IUserAuth>(new UserAuth());
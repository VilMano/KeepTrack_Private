import { createContext } from "react";
import { JWTContextType } from './types';

export const UserContext = createContext({} as JWTContextType);
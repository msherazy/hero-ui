import { createContext } from 'react';

export interface ContextUser {
  name: string;
  email: string;
}

interface UserContextType {
  userData: ContextUser | null;
  updateUserData: (data: ContextUser | null) => void;
}

export const UserContext = createContext<UserContextType>({
  userData: null,
  updateUserData: () => {},
});

import { type FC, type PropsWithChildren, useState } from 'react';

import { type ContextUser, UserContext } from '@/context/user-context';

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userData, setUserData] = useState<ContextUser | null>(null);

  const updateUserData = (data: ContextUser | null) => {
    setUserData(data);
  };

  return <UserContext.Provider value={{ userData, updateUserData }}>{children}</UserContext.Provider>;
};

export default UserProvider;

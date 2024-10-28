import './index.css';
import { useState } from 'react';

import Home from '@/components/Home';
import { useGetUserInfo, useUserContext } from '@/hooks';

import Signin from './components/Signin';
import Signup from './components/Signup';

const App = () => {
  const [showSignup, setShowSignup] = useState(true);
  const { userData } = useUserContext();

  useGetUserInfo();

  return userData ? (
    <Home name={userData.name} />
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {showSignup ? <Signup /> : <Signin />}
      <a onClick={() => setShowSignup((prev) => !prev)} className="cursor-pointer mt-4 text-blue-500 underline">
        {showSignup ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
      </a>
    </div>
  );
};

export default App;

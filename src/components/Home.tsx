import React, { useContext, useState } from 'react';
import { UserContext } from '@/context/user-context.ts';
import { HomeProps } from '@/types/index.ts';
import { useGetMedia } from '@/hooks/useGetMedia.ts';
import FileList from '@/components/FileList';
import FileUpload from '@/components/FileUpload';
import { Button } from '@/components/ui/button.tsx';

const Home: React.FC<HomeProps> = ({ name }) => {
  const { updateUserData } = useContext(UserContext);
  const [page] = useState<number>(1);
  const { docs, isFilesLoading, refetch } = useGetMedia(page);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-50 to-gray-100 gap-6 p-8">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
        Welcome to <span className="text-blue-500">Herogram</span>, {name}!
      </h1>

      <FileList files={docs} isFilesLoading={isFilesLoading} />

      <FileUpload refetch={refetch} />

      <Button
        onClick={() => {
          localStorage.removeItem('token');
          updateUserData(null);
        }}
        className="mt-4"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Home;
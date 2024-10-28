import React from 'react';
import { FileType } from '@/api';
import FileThumbnail from '@/components/FileThumbnail';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'sonner';

interface FileListProps {
  files: FileType[];
  isFilesLoading: boolean;
}

const FileList: React.FC<FileListProps> = ({ files, isFilesLoading }) => {
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast('copied');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  if (isFilesLoading) {
    return <p className="text-lg text-gray-600">Loading...</p>;
  }

  if (files.length === 0) {
    return <p className="text-lg text-gray-600">No uploaded content available yet.</p>;
  }

  return (
    <div className="w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your Uploaded Content</h2>
      <div className="h-64 overflow-y-auto">
        {files.map((file) => (
          <div key={file._id} className="flex items-center justify-between border p-4 rounded shadow-sm bg-white mb-2">
            <FileThumbnail type={file.type} url={file.url} originalName={file.originalName} />
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">
                {file.views} views · Shared: {file.shared ? 'Yes' : 'No'}
              </span>
              <button
                onClick={() => copyToClipboard(file.url)}
                className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
              >
                <FiCopy />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;

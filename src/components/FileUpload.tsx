import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button.tsx';
import api from '@/services/api';
import { Endpoints } from '@/utils/enpoints.ts';
import Modal from '@/components/Modal';
import { FiCheckCircle, FiFile, FiUploadCloud, FiXCircle } from 'react-icons/fi';

interface FileUploadProps {
  refetch: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ refetch }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'video/*': [] },
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      alert('Please select at least one file to upload.');
      return;
    }
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      setUploadStatus('Uploading...');
      await api.post(Endpoints.fileUpload, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus('Upload successful!');
      refetch();
    } catch (error) {
      setUploadStatus('Upload failed.');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)} className="flex items-center space-x-2">
        <FiUploadCloud /> <span>Upload Content</span>
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Upload Files">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-6 w-full text-center rounded-lg cursor-pointer ${
            isDragActive ? 'bg-green-50' : 'bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-green-600">Drop the files here...</p>
          ) : (
            <p className="text-gray-600">
              Drag 'n' drop some files here, or <span className="text-blue-500 underline">click</span> to select files
            </p>
          )}
        </div>

        {files.length > 0 && (
          <ul className="mt-4">
            {files.map((file, index) => (
              <li key={index} className="flex items-center space-x-2">
                <FiFile className="text-gray-500" />
                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        )}

        <Button onClick={handleUpload} className="mt-4 w-full" disabled={files.length === 0}>
          Upload Files
        </Button>

        {uploadStatus && (
          <div className="mt-2 flex items-center space-x-2">
            {uploadStatus.includes('successful') ? (
              <FiCheckCircle className="text-green-500" />
            ) : (
              <FiXCircle className="text-red-500" />
            )}
            <span>{uploadStatus}</span>
          </div>
        )}
      </Modal>
    </>
  );
};

export default FileUpload;
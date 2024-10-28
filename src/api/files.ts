import api from '@/services/api.ts';
import { Endpoints } from '@/utils/enpoints';

export type FileType = {
  _id: string;
  filename: string;
  url: string;
  tags: any[];
  views: number;
  originalName: string;
  shared: boolean;
  type: 'image' | 'video';
  owner: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const getFiles = async (page: number = 1) => {
  const response = await api.get(`${Endpoints.getFile}?page=${page}`);
  return response.data;
};

export const FilesApi = {
  getFiles,
};

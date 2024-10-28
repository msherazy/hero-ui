import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FilesApi } from '@/api';

export const useGetMedia = (page: number) => {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['files', page],
    queryFn: () => FilesApi.getFiles(page),
    placeholderData: keepPreviousData,
  });

  return { docs: data?.files, isFilesLoading: isLoading, isError, error, isFetching, ...data?.pagination, refetch };
};

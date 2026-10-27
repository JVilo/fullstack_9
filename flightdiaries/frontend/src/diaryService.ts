import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = () => {
  return axios.get<DiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

const create = async (newObject: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, newObject);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      let errorMessage = error.message;

      if (typeof data === 'string') {
        errorMessage = data;
      } else if (data && typeof data === 'object' && 'error' in data) {
        const errs = (data as { error: Array<{ path?: string[]; message: string }> }).error;
        if (Array.isArray(errs) && errs.length > 0) {
          const firstErr = errs[0];
          const field = firstErr.path && firstErr.path.length > 0 ? `${firstErr.path.join('.')}: ` : '';
          errorMessage = `${field}${firstErr.message}`;
        }
      }

      throw new Error(errorMessage, { cause: error });
    } else {
      throw new Error("An unexpected error occurred", { cause: error });
    }
  }
};

export default { getAll, create };
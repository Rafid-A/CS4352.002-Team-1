import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SAVED_JOBS: '@saved_jobs',
  FAVORITE_MENTORS: '@favorite_mentors',
  SAVED_COURSES: '@saved_courses',
};

// Generic functions for managing arrays in storage
export const getStoredArray = async (key: string): Promise<any[]> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return [];
  }
};

export const setStoredArray = async (key: string, data: any[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting ${key}:`, error);
  }
};

export const addToStoredArray = async (key: string, item: any): Promise<void> => {
  try {
    const currentData = await getStoredArray(key);
    // Check if item already exists (by id)
    if (!currentData.some((existing: any) => existing.id === item.id)) {
      currentData.push(item);
      await setStoredArray(key, currentData);
    }
  } catch (error) {
    console.error(`Error adding to ${key}:`, error);
  }
};

export const removeFromStoredArray = async (key: string, itemId: number): Promise<void> => {
  try {
    const currentData = await getStoredArray(key);
    const filtered = currentData.filter((item: any) => item.id !== itemId);
    await setStoredArray(key, filtered);
  } catch (error) {
    console.error(`Error removing from ${key}:`, error);
  }
};

export const isItemSaved = async (key: string, itemId: number): Promise<boolean> => {
  try {
    const currentData = await getStoredArray(key);
    return currentData.some((item: any) => item.id === itemId);
  } catch (error) {
    console.error(`Error checking if item is saved in ${key}:`, error);
    return false;
  }
};

// Specific functions for each data type
export const savedJobsStorage = {
  get: () => getStoredArray(STORAGE_KEYS.SAVED_JOBS),
  set: (data: any[]) => setStoredArray(STORAGE_KEYS.SAVED_JOBS, data),
  add: (job: any) => addToStoredArray(STORAGE_KEYS.SAVED_JOBS, job),
  remove: (jobId: number) => removeFromStoredArray(STORAGE_KEYS.SAVED_JOBS, jobId),
  isSaved: (jobId: number) => isItemSaved(STORAGE_KEYS.SAVED_JOBS, jobId),
};

export const favoriteMentorsStorage = {
  get: () => getStoredArray(STORAGE_KEYS.FAVORITE_MENTORS),
  set: (data: any[]) => setStoredArray(STORAGE_KEYS.FAVORITE_MENTORS, data),
  add: (mentor: any) => addToStoredArray(STORAGE_KEYS.FAVORITE_MENTORS, mentor),
  remove: (mentorId: number) => removeFromStoredArray(STORAGE_KEYS.FAVORITE_MENTORS, mentorId),
  isSaved: (mentorId: number) => isItemSaved(STORAGE_KEYS.FAVORITE_MENTORS, mentorId),
};

export const savedCoursesStorage = {
  get: () => getStoredArray(STORAGE_KEYS.SAVED_COURSES),
  set: (data: any[]) => setStoredArray(STORAGE_KEYS.SAVED_COURSES, data),
  add: (course: any) => addToStoredArray(STORAGE_KEYS.SAVED_COURSES, course),
  remove: (courseId: number) => removeFromStoredArray(STORAGE_KEYS.SAVED_COURSES, courseId),
  isSaved: (courseId: number) => isItemSaved(STORAGE_KEYS.SAVED_COURSES, courseId),
};


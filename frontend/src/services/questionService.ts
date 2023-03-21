import { get, post } from "./fetcher";
import { SectionsData, SectionData } from "sections";
import { DogAnswers } from "answers";
const BASE_URL = "http://127.0.0.1:8000";

export const getSections = async () => {
  return await get<SectionsData>(`${BASE_URL}/sections`);
};

export const getSectionById = async (id: number) => {
  return await get<SectionData>(`${BASE_URL}/section/${id}`);
};

export const postDogAnswers = async (
  dogAnswers: DogAnswers,
  user_id: number,
  dog_id: number
) => {
  const reqConfig = { data: dogAnswers };
  return await post<{ message: string } | undefined>(
    `${BASE_URL}/answers/${user_id}/${dog_id}`,
    reqConfig
  );
};

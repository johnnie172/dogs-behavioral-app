import { get } from "./fetcher";
import { SectionsData, SectionData } from "sections";

const BASE_URL = "http://127.0.0.1:8000"

export const getSections = async () => {
    return await get<SectionsData>(`${BASE_URL}/sections`)
};

export const getSectionById = async (id: number) => {
    return await get<SectionData>(`${BASE_URL}/section/${id}`)
};

import axios from "axios";

export const get = async <TData>(url: string): Promise<TData> => {
    // TODO: add cancel request
  try {
    const res = await axios.get<TData>(url);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error
  }
};

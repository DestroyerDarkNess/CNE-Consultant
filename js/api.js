import { API_HOST } from "../utils/constans.js";

export const consultCneDataApi = async (request) => {
  try {
    const { typeDni, dni } = request;
    // Estructuramos la url
    const endPoint = `${API_HOST}?typeDni=${typeDni}&searchInput=${dni}`;
    // Realizamos la peticion
    const response = await fetch(endPoint);
    //Recuperamos la peticion y formateamos a json
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

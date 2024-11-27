import axios from "axios";

// API base URL
const API_URL = "https://api.example.com"; // Замінити на фактичний URL

// Отримати інформацію про вакансію
export const getVacancyById = async (id: number) => {
    const response = await axios.get(`${API_URL}/getVacancy/${id}`);
    return response.data;
};

// Отримати схожі вакансії
export const getSimilarVacanciesById = async (id: number, size: number) => {
    const response = await axios.get(`${API_URL}/getSimilarVacanciesById`, {
        params: { vacancyId: id, size },
    });
    return response.data;
};

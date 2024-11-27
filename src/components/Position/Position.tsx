import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Використовуємо useParams
import { getVacancyById, getSimilarVacanciesById } from "./api";
import "./Position.css";

interface Vacancy {
    id: number;
    positionTitle: string;
    salary: number;
    description: string;
    companyName: string;
    datePosted: string;
    categoryName: string;
    yearsOfExperience: number;
    employmentTypeName: string;
    languages: { languageName: string; languageLevel: string }[];
}

const Position: React.FC = () => {
    const { vacancyId } = useParams<{ vacancyId: string }>(); // Отримуємо параметр vacancyId
    const [vacancy, setVacancy] = useState<Vacancy | null>(null);
    const [similarVacancies, setSimilarVacancies] = useState<Vacancy[]>([]);

    useEffect(() => {
        if (vacancyId) {
            const id = parseInt(vacancyId, 10);
            // Отримуємо дані вакансії
            getVacancyById(id).then(setVacancy);

            // Отримуємо схожі вакансії
            getSimilarVacanciesById(id, 3).then(setSimilarVacancies);
        }
    }, [vacancyId]);

    if (!vacancy) {
        return <div>Loading...</div>;
    }

    return (
        <div className="vacancy-page">
            <div className="vacancy-details">
                <h1>{vacancy.positionTitle}</h1>
                <p><strong>Company:</strong> {vacancy.companyName}</p>
                <p><strong>Location:</strong> {vacancy.categoryName}</p>
                <p><strong>Salary:</strong> ${vacancy.salary}</p>
                <p><strong>Description:</strong> {vacancy.description}</p>
                <p><strong>Employment Type:</strong> {vacancy.employmentTypeName}</p>
                <p><strong>Required Experience:</strong> {vacancy.yearsOfExperience} years</p>
                <div>
                    <strong>Languages:</strong>
                    <ul>
                        {vacancy.languages.map((lang, index) => (
                            <li key={index}>
                                {lang.languageName} ({lang.languageLevel})
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="apply-button">Apply for position</button>
            </div>

            <div className="similar-vacancies">
                <h2>Similar Vacancies</h2>
                <ul>
                    {similarVacancies.map((vac) => (
                        <li key={vac.id}>
                            <h3>{vac.positionTitle}</h3>
                            <p><strong>Company:</strong> {vac.companyName}</p>
                            <p><strong>Salary:</strong> ${vac.salary}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Position;

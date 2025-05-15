import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Position.css";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Loader from "../../reusableComponents/loader/Loader";

type VacancyData = {
    id: string;
    positionTitle: string;
    companyName: string;
    categoryName: string;
    employmentTypeName: string;
    languages: [{
        languageName: string;
        languageLevel: string
    }];
    salary: string;
    yearsOfExperience: number;
    description: string;
};

function Position() {
    const { vacancyId } = useParams<{ vacancyId: string }>();
    const [vacancy, setVacancy] = useState<VacancyData | null>(null);
    const [similarVacancies, setSimilarVacancies] = useState<VacancyData[]>([]);

    useEffect(() => {
        const getVacancyData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/job-vacancy/getVacancy/${vacancyId}`)
                setVacancy(response.data)
            }
            catch (err){
                console.log(err)
            }
        }

        const getSimilarVacancy = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/job-vacancy/getSimilarVacanciesById/${vacancyId}?size=3`)
                setSimilarVacancies(response.data)
            }
            catch (err){
                console.log(err)
            }
        }
        (async () => {
           await getVacancyData();
           await getSimilarVacancy();
        })()
    }, [vacancyId]);

    if (!vacancy) {
        return <Loader />;
    }

    return (
        <div className="vacancy-page">
            <div className="vacancy-details">
                <h1>{vacancy.positionTitle}</h1>
                <p>
                    <strong>Company:</strong> {vacancy.companyName}
                </p>
                <p>
                    <strong>Category:</strong> {vacancy.categoryName}
                </p>
                <p>
                    <strong>Salary:</strong> ${vacancy.salary}
                </p>
                <div className="description">
                    <strong>Description:</strong>
                    <ReactQuill readOnly={true}
                                theme="bubble"
                                value={vacancy.description}
                                id="vacancy-description-text"></ReactQuill>
                </div>
                <p>
                    <strong>Employment Type:</strong> {vacancy.employmentTypeName}
                </p>
                <p>
                    <strong>Required Experience:</strong> {vacancy.yearsOfExperience} years
                </p>
                <div>
                    <strong>Language:</strong> {vacancy.languages[0]? vacancy.languages[0].languageName : "N/A"}
                </div>
                <button className="apply-button">Apply for position</button>
            </div>
            <div className="similar-vacancies">
                <h2>Similar Vacancies</h2>
                <ul>
                    {similarVacancies.map((vac) => (
                        <li key={vac.id} className="short-vacancy">
                            <h3>{vac.positionTitle}</h3>
                            <p>
                                <strong>Company:</strong> {vac.companyName}
                            </p>
                            <p>
                                <strong>Salary:</strong> ${vac.salary}
                            </p>
                            <Link to={`/position/${vac.id}`} className="view-details">
                                View Details
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Position;

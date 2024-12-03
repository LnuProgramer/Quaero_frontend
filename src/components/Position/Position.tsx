import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Position.css";

type VacancyData = {
    id: string;
    positionTitle: string;
    companyName: string;
    categoryName: string;
    employmentType: string;
    languageName: string;
    salary: string;
    experience: number;
    description: string;
};


const vacanciesList: VacancyData[] = [
    {
        id: "1",
        positionTitle: "Senior Software Engineer",
        companyName: "TechCorp",
        categoryName: "IT & Software Development",
        employmentType: "Full-Time",
        languageName: "English",
        salary: "8000-12000",
        experience: 5,
        description:
            `**About the Role:**

TechCorp is seeking a highly skilled Senior Software Engineer to join our dynamic development team. You will be responsible for designing, developing, and implementing high-quality software solutions that meet our clients' needs.

**Responsibilities:**
- Lead the development of new features and applications.
- Collaborate with cross-functional teams to define, design, and ship new features.
- Ensure the performance, quality, and responsiveness of applications.
- Mentor junior developers and conduct code reviews.
- Stay up-to-date with the latest industry trends and technologies.

**Requirements:**
- Bachelor's degree in Computer Science or related field.
- At least 5 years of professional experience in software development.
- Proficient in JavaScript, TypeScript, and React.
- Experience with backend technologies like Node.js and databases like MongoDB.
- Strong problem-solving skills and attention to detail.
- Excellent communication skills in English.`,
    },
    {
        id: "2",
        positionTitle: "Graphic Designer",
        companyName: "Creative Minds",
        categoryName: "Design",
        employmentType: "Full-Time",
        languageName: "English",
        salary: "4000-6000",
        experience: 2,
        description:
            `**About the Role:**

Creative Minds is looking for a talented Graphic Designer to bring innovative ideas to our design team. You will work on a variety of products, including websites, books, magazines, product packaging, exhibitions, and corporate identity.

**Responsibilities:**
- Create visual concepts to communicate ideas that inspire and inform consumers.
- Develop graphics for product illustrations, logos, and websites.
- Work with copywriters and creative director to produce the final design.
- Test graphics across various media.
- Amend designs after feedback.

**Requirements:**
- Proven graphic designing experience.
- A strong portfolio of illustrations or other graphics.
- Familiarity with design software and technologies (such as InDesign, Illustrator, Photoshop).
- Excellent communication skills.
- Ability to work methodically and meet deadlines.
- Degree in Design, Fine Arts, or related field is a plus.`,
    },
    {
        id: "3",
        positionTitle: "Business Analyst",
        companyName: "FinTech Inc.",
        categoryName: "Business",
        employmentType: "Part-Time",
        languageName: "German",
        salary: "5000-7000",
        experience: 3,
        description:
            `**About the Role:**

FinTech Inc. is seeking a proactive Business Analyst to join our team. You will analyze our business needs and provide data-driven solutions to improve our financial products and services.

**Responsibilities:**
- Analyze business requirements and translate them into technical specifications.
- Conduct market analysis and competitor research.
- Work closely with stakeholders to understand their needs.
- Develop and monitor data quality metrics.
- Identify areas for improvement in existing processes and systems.

**Requirements:**
- Bachelor's degree in Business Administration, Finance, or related field.
- Minimum of 3 years experience in business analysis or a related field.
- Proficient in data analysis tools and software.
- Strong understanding of the financial industry.
- Excellent communication skills in German.
- Analytical thinking and problem-solving capabilities.`,
    },
    {
        id: "4",
        positionTitle: "1",
        companyName: "1",
        categoryName: "Frontend",
        employmentType: "Remote",
        languageName: "Spanish",
        salary: "1000",
        experience: 1,
        description:
            `**Test**`,
    },
];

const Position: React.FC = () => {
    const { vacancyId } = useParams<{ vacancyId: string }>(); // Отримуємо параметр vacancyId
    const [vacancy, setVacancy] = useState<VacancyData | null>(null);
    const [similarVacancies, setSimilarVacancies] = useState<VacancyData[]>([]);

    useEffect(() => {
        if (vacancyId) {
            // Знаходимо вакансію за id
            const currentVacancy =
                vacanciesList.find((vac) => vac.id === vacancyId) || null;
            setVacancy(currentVacancy);

            // Знаходимо решту три вакансії зі списку
            const similar = vacanciesList.filter((vac) => vac.id !== vacancyId);
            setSimilarVacancies(similar);
        }
    }, [vacancyId]);

    if (!vacancy) {
        return <div>Loading...</div>;
    }

    return (
        <div className="vacancy-page">
            {/* Деталі великої вакансії */}
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
                    {vacancy.description.split("\n").map((line, index) => {
                        // Якщо рядок починається з '**' та закінчується '**', вважаємо його заголовком
                        if (line.startsWith("**") && line.endsWith("**")) {
                            return (
                                <h3 key={index}>{line.replace(/\*\*/g, "").trim()}</h3>
                            );
                        } else if (line.startsWith("- ")) {
                            // Якщо рядок починається з '-', вважаємо його пунктом списку
                            return (
                                <li key={index}>{line.replace("- ", "").trim()}</li>
                            );
                        } else if (line.trim() === "") {
                            // Якщо порожній рядок, додаємо відступ
                            return <br key={index}/>;
                        } else {
                            return <p key={index}>{line}</p>;
                        }
                    })}
                </div>
                <p>
                    <strong>Employment Type:</strong> {vacancy.employmentType}
                </p>
                <p>
                    <strong>Required Experience:</strong> {vacancy.experience} years
                </p>
                <div>
                    <strong>Language:</strong> {vacancy.languageName}
                </div>
                <button className="apply-button">Apply for position</button>
            </div>

            {/* Короткий список схожих вакансій */}
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

// Catalog.tsx
import React, { useState } from "react";
import Vacancy from "../../reusableComponents/vacancy/Vacancy";
import "./Catalog.css";
import { useTranslation } from "react-i18next";
import Text from "../../reusableComponents/text/Text";
import { Link } from "react-router-dom";

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

// Вручну додані вакансії
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
            "As a Senior Software Engineer at TechCorp, you will be responsible for developing high-quality applications...",
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
            "We are looking for a creative Graphic Designer to join our team at Creative Minds...",
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
            "FinTech Inc. is seeking a skilled Business Analyst to improve our financial products...",
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
            "Test",
    },
];

type Filters = {
    positionTitle: string;
    companyName: string;
    categoryName: string;
    employmentType: string;
    languageName: string;
    minSalary: number;
    maxSalary: number;
    minYearsOfExperience: number;
    maxYearsOfExperience: number;
    sortBy: string;
    sortDirection: string;
};

function Catalog() {
    const { t } = useTranslation();

    const [filters, setFilters] = useState<Filters>({
        positionTitle: "",
        companyName: "",
        categoryName: "",
        employmentType: "",
        languageName: "",
        minSalary: 0,
        maxSalary: 0,
        minYearsOfExperience: 0,
        maxYearsOfExperience: 0,
        sortBy: "salary",
        sortDirection: "asc",
    });

    // Функція для фільтрації вакансій
    const applyFilters = (): VacancyData[] => {
        let filtered = vacanciesList;

        // Фільтруємо за назвою вакансії
        if (filters.positionTitle) {
            filtered = filtered.filter((vacancy) =>
                vacancy.positionTitle
                    .toLowerCase()
                    .includes(filters.positionTitle.toLowerCase())
            );
        }

        // Фільтруємо за назвою компанії
        if (filters.companyName) {
            filtered = filtered.filter((vacancy) =>
                vacancy.companyName
                    .toLowerCase()
                    .includes(filters.companyName.toLowerCase())
            );
        }

        // Фільтруємо за категорією
        if (filters.categoryName) {
            filtered = filtered.filter(
                (vacancy) => vacancy.categoryName === filters.categoryName
            );
        }

        // Фільтруємо за типом зайнятості
        if (filters.employmentType) {
            filtered = filtered.filter(
                (vacancy) => vacancy.employmentType === filters.employmentType
            );
        }

        // Фільтруємо за мовою
        if (filters.languageName) {
            filtered = filtered.filter(
                (vacancy) => vacancy.languageName === filters.languageName
            );
        }

        // Фільтруємо за зарплатою
        if (filters.minSalary > 0 || filters.maxSalary > 0) {
            filtered = filtered.filter((vacancy) => {
                const [minSalary, maxSalary] = vacancy.salary
                    .split("-")
                    .map(Number);
                return (
                    (filters.minSalary === 0 || maxSalary >= filters.minSalary) &&
                    (filters.maxSalary === 0 || minSalary <= filters.maxSalary)
                );
            });
        }

        // Фільтруємо за досвідом
        if (filters.minYearsOfExperience > 0) {
            filtered = filtered.filter(
                (vacancy) => vacancy.experience >= filters.minYearsOfExperience
            );
        }
        if (filters.maxYearsOfExperience > 0) {
            filtered = filtered.filter(
                (vacancy) => vacancy.experience <= filters.maxYearsOfExperience
            );
        }

        // Сортування
        if (filters.sortBy === "salary") {
            filtered = filtered.sort((a, b) => {
                const [minA] = a.salary.split("-").map(Number);
                const [minB] = b.salary.split("-").map(Number);
                return filters.sortDirection === "asc" ? minA - minB : minB - minA;
            });
        } else if (filters.sortBy === "positionTitle") {
            filtered = filtered.sort((a, b) => {
                return filters.sortDirection === "asc"
                    ? a.positionTitle.localeCompare(b.positionTitle)
                    : b.positionTitle.localeCompare(a.positionTitle);
            });
        }

        return filtered;
    };

    const handleFilterChange = (field: keyof Filters, value: string | number) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value,
        }));
    };

    const filteredVacancies = applyFilters();

    return (
        <div className="catalog-container">
            <div className="filters-sidebar">
                {/* Пошук за назвою вакансії */}
                <div className="search-bar">
                    <Text fontSize={24} as="h2">
                        {t("catalog.search")}
                    </Text>
                    <input
                        type="text"
                        placeholder="Search by position title"
                        value={filters.positionTitle}
                        onChange={(e) =>
                            handleFilterChange("positionTitle", e.target.value)
                        }
                        className="search-in"
                    />
                </div>
                {/* Пошук за назвою компанії */}
                <div className="search-bar">
                    <Text fontSize={24} as="h2">
                        {t("catalog.searchByCompany")}
                    </Text>
                    <input
                        type="text"
                        placeholder="Search by company name"
                        value={filters.companyName}
                        onChange={(e) =>
                            handleFilterChange("companyName", e.target.value)
                        }
                        className="search-in"
                    />
                </div>
                <Text fontSize={24} as="h2">
                    {t("catalog.filters")}
                </Text>
                <Text fontSize={20} as="h3">
                    {t("catalog.category")}
                </Text>
                <select
                    value={filters.categoryName}
                    onChange={(e) => handleFilterChange("categoryName", e.target.value)}
                >
                    <option value="">{t("catalog.optionAll")}</option>
                    <option value="IT & Software Development">
                        IT & Software Development
                    </option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Healthcare">Healthcare</option>
                </select>
                <Text fontSize={20} as="h3">
                    {t("catalog.workType")}
                </Text>
                <select
                    value={filters.employmentType}
                    onChange={(e) =>
                        handleFilterChange("employmentType", e.target.value)
                    }
                >
                    <option value="">{t("catalog.optionAll")}</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                </select>
                <Text fontSize={20} as="h3">
                    {t("catalog.language")}
                </Text>
                <select
                    value={filters.languageName}
                    onChange={(e) => handleFilterChange("languageName", e.target.value)}
                >
                    <option value="">{t("catalog.optionAll")}</option>
                    <option value="English">English</option>
                    <option value="German">German</option>
                    <option value="Spanish">Spanish</option>
                </select>
                <Text fontSize={20} as="h3">
                    {t("catalog.salaryRange")}
                </Text>
                <input
                    type="number"
                    placeholder="Min salary"
                    value={filters.minSalary}
                    onChange={(e) =>
                        handleFilterChange("minSalary", Number(e.target.value))
                    }
                />
                <input
                    type="number"
                    placeholder="Max salary"
                    value={filters.maxSalary}
                    onChange={(e) =>
                        handleFilterChange("maxSalary", Number(e.target.value))
                    }
                />
                <Text fontSize={20} as="h3">
                    {t("catalog.experienceRange")}
                </Text>
                <input
                    type="number"
                    placeholder="Min years of experience"
                    value={filters.minYearsOfExperience}
                    onChange={(e) =>
                        handleFilterChange(
                            "minYearsOfExperience",
                            Number(e.target.value)
                        )
                    }
                />
                <input
                    type="number"
                    placeholder="Max years of experience"
                    value={filters.maxYearsOfExperience}
                    onChange={(e) =>
                        handleFilterChange(
                            "maxYearsOfExperience",
                            Number(e.target.value)
                        )
                    }
                />
                <Text fontSize={20} as="h3">
                    {t("catalog.sortBy")}
                </Text>
                <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                    <option value="salary">{t("catalog.salary")}</option>
                    <option value="positionTitle">{t("catalog.positionTitle")}</option>
                </select>
                <Text fontSize={20} as="h3">
                    {t("catalog.sortDirection")}
                </Text>
                <select
                    value={filters.sortDirection}
                    onChange={(e) =>
                        handleFilterChange("sortDirection", e.target.value)
                    }
                >
                    <option value="asc">{t("catalog.ascending")}</option>
                    <option value="desc">{t("catalog.descending")}</option>
                </select>
            </div>

            <div className="vacancies-list">
                {filteredVacancies.length > 0 ? (
                    filteredVacancies.map((vacancy) => (
                        <Link
                            to={`/position/${vacancy.id}`}
                            key={vacancy.id}
                            className="vacancy-link"
                        >
                            <Vacancy
                                title={vacancy.positionTitle}
                                company={vacancy.companyName}
                                location={vacancy.employmentType}
                                workType={vacancy.employmentType}
                                salary={`${vacancy.salary}$`}
                                category={vacancy.categoryName}
                                language={vacancy.languageName}
                                experience={vacancy.experience}
                            />
                        </Link>
                    ))
                ) : (
                    <p>{t("catalog.noVacancies") || "No vacancies found"}</p>
                )}
            </div>
        </div>
    );
}

export default Catalog;

import React, { useEffect, useState } from "react";
import Vacancy from "../../reusableComponents/vacancy/Vacancy";
import "./Catalog.css";
import { useTranslation } from "react-i18next";
import Text from "../../reusableComponents/text/Text";
import { Link } from "react-router-dom";
import axios from "axios";

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
    salary: number;
    experience: number;
    description: string;
};

type Filters = {
    positionTitle: string;
    companyName: string;
    categoryName: string;
    employmentTypeName: string;
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
        employmentTypeName: "",
        languageName: "",
        minSalary: 0,
        maxSalary: 0,
        minYearsOfExperience: 0,
        maxYearsOfExperience: 0,
        sortBy: "salary",
        sortDirection: "asc",
    });
    const [vacanciesList, setVacanciesList] = useState<VacancyData[]>([]);

    useEffect(() => {
        const getAllFilteredAndSortedRequest = async () => {
            const response = await axios.post(`http://localhost:8080/getAllFilteredAndSorted?page=0&size=10`, filters)
            setVacanciesList(response.data.content);
        }
        getAllFilteredAndSortedRequest();
    }, [filters])

    const handleFilterChange = (field: keyof Filters, value: string | number) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value,
        }));
    };

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
        if (filters.employmentTypeName) {
            filtered = filtered.filter(
                (vacancy) => vacancy.employmentTypeName === filters.employmentTypeName
            );
        }

        // Фільтруємо за мовою
        if (filters.languageName) {
            filtered = filtered.filter((vacancy) =>
                vacancy.languages.some(
                    (lang) => lang.languageName === filters.languageName
                )
            );
        }

        // Фільтруємо за зарплатою
        if (filters.minSalary > 0 || filters.maxSalary > 0) {
            filtered = filtered.filter((vacancy) => {
                const salary = vacancy.salary;
                return (
                    (filters.minSalary === 0 || salary >= filters.minSalary) &&
                    (filters.maxSalary === 0 || salary <= filters.maxSalary)
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
                const salaryA = a.salary;
                const salaryB = b.salary;
                return filters.sortDirection === "asc" ? salaryA - salaryB : salaryB - salaryA;
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
                    value={filters.employmentTypeName}
                    onChange={(e) =>
                        handleFilterChange("employmentTypeName", e.target.value)
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
                    type="text"
                    placeholder="Min salary"
                    value={filters.minSalary || ""}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // Видаляє все, крім цифр
                        const sanitizedValue = value.replace(/^0+(?=\d)/, ""); // Видаляє провідні нулі
                        handleFilterChange("minSalary", sanitizedValue ? Number(sanitizedValue) : 0);
                    }}
                />
                <input
                    type="text"
                    placeholder="Max salary"
                    value={filters.maxSalary || ""}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // Видаляє все, крім цифр
                        const sanitizedValue = value.replace(/^0+(?=\d)/, ""); // Видаляє провідні нулі
                        handleFilterChange("maxSalary", sanitizedValue ? Number(sanitizedValue) : 0);
                    }}
                />

                <Text fontSize={20} as="h3">
                    {t("catalog.experienceRange")}
                </Text>
                <input
                    type="text"
                    placeholder="Min years of experience"
                    value={filters.minYearsOfExperience || ""}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // Видаляє все, крім цифр
                        const sanitizedValue = value.replace(/^0+(?=\d)/, ""); // Видаляє провідні нулі
                        handleFilterChange("minYearsOfExperience", sanitizedValue ? Number(sanitizedValue) : 0);
                    }}
                />
                <input
                    type="text"
                    placeholder="Max years of experience"
                    value={filters.maxYearsOfExperience || ""}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // Видаляє все, крім цифр
                        const sanitizedValue = value.replace(/^0+(?=\d)/, ""); // Видаляє провідні нулі
                        handleFilterChange("maxYearsOfExperience", sanitizedValue ? Number(sanitizedValue) : 0);
                    }}
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
                                location={vacancy.employmentTypeName}
                                workType={vacancy.employmentTypeName}
                                salary={`${vacancy.salary}$`}
                                category={vacancy.categoryName}
                                language={vacancy.languages && vacancy.languages.length > 0 ? vacancy.languages[0].languageName : "N/A"}
                                experience={vacancy.experience}
                            />
                        </Link>
                    ))
                ) : (
                    <p>{t("catalog.noVacanies") || "No vacancies found"}</p>
                )}
            </div>
        </div>
    );
}

export default Catalog;

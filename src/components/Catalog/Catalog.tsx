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
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [vacanciesList, setVacanciesList] = useState<VacancyData[]>([]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);

    useEffect(() => {
        const getAllFilteredAndSortedRequest = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:8080/getAllFilteredAndSorted?page=0&size=10`,
                    debouncedFilters
                );
                setVacanciesList(response.data.content);
            } catch (error) {
                console.error("Error fetching vacancies:", error);
            }
        };
        getAllFilteredAndSortedRequest();
    }, [debouncedFilters]);

    const handleFilterChange = (field: keyof Filters, value: string | number) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value,
        }));
    };

    const handleNumericFilterChange = (field: keyof Filters, value: string) => {
        const sanitizedValue = value.replace(/\D/g, "");
        const numericValue = sanitizedValue ? Number(sanitizedValue) : 0;

        setFilters((prevFilters) => {
            if (prevFilters[field] !== numericValue) {
                return { ...prevFilters, [field]: numericValue };
            }
            return prevFilters;
        });
    };


    return (
        <div className="catalog-container">
            <div className="filters-sidebar">
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
                    onChange={(e) => handleNumericFilterChange("minSalary", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Max salary"
                    value={filters.maxSalary || ""}
                    onChange={(e) => handleNumericFilterChange("maxSalary", e.target.value)}
                />
                <Text fontSize={20} as="h3">
                    {t("catalog.experienceRange")}
                </Text>
                <input
                    type="text"
                    placeholder="Min years of experience"
                    value={filters.minYearsOfExperience || ""}
                    onChange={(e) => handleNumericFilterChange("minYearsOfExperience", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Max years of experience"
                    value={filters.maxYearsOfExperience || ""}
                    onChange={(e) => handleNumericFilterChange("maxYearsOfExperience", e.target.value)}
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
                {vacanciesList.length > 0 ? (
                    vacanciesList.map((vacancy) => (
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

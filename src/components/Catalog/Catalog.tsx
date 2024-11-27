import React, { useEffect, useState } from "react";
import Vacancy from "../../reusableComponents/vacancy/Vacancy";
import "./Catalog.css";
import { useTranslation } from "react-i18next";
import Text from "../../reusableComponents/text/Text";

type VacancyData = {
    positionTitle: string;
    companyName: string;
    categoryName: string;
    employmentType: string;
    languageName: string;
    salary: number;
    experience: number;
};

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
    const [vacancies, setVacancies] = useState<VacancyData[]>([]);
    const [filters, setFilters] = useState<Filters>({
        positionTitle: "",
        companyName: "",
        categoryName: "all",
        employmentType: "all",
        languageName: "all",
        minSalary: 0,
        maxSalary: 0,
        minYearsOfExperience: 0,
        maxYearsOfExperience: 0,
        sortBy: "salary",
        sortDirection: "asc",
    });
    const { t } = useTranslation();

    const fetchVacancies = async () => {
        try {
            const appliedFilters = {
                ...filters,
                companyName: filters.companyName || undefined,
                minSalary: filters.minSalary > 0 ? filters.minSalary : undefined,
                maxSalary: filters.maxSalary > 0 ? filters.maxSalary : undefined,
                minYearsOfExperience:
                    filters.minYearsOfExperience > 0
                        ? filters.minYearsOfExperience
                        : undefined,
                maxYearsOfExperience:
                    filters.maxYearsOfExperience > 0
                        ? filters.maxYearsOfExperience
                        : undefined,
            };

            const response = await fetch("https://localhost:3000/catalog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(appliedFilters),
            });

            const data: VacancyData[] = await response.json();
            setVacancies(data);
        } catch (error) {
            console.error("Failed to fetch vacancies:", error);
        }
    };

    // Завантаження вакансій при зміні фільтрів
    useEffect(() => {
        fetchVacancies();
    }, [filters]);

    const handleFilterChange = (field: keyof Filters, value: string | number) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value,
        }));
    };

    return (
        <div className="catalog-container">
            <div className="filters-sidebar">
                {/* Пошук за назвою вакансії */}
                <div className="search-bar">
                    <Text fontSize={24} as="h2">{t("catalog.search")}</Text>
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
                    <Text fontSize={24} as="h2">{t("catalog.searchByCompany")}</Text>
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
                <Text fontSize={24} as="h2">{t("catalog.filters")}</Text>
                <Text fontSize={20} as="h3">{t("catalog.category")}</Text>
                <select
                    value={filters.categoryName}
                    onChange={(e) =>
                        handleFilterChange("categoryName", e.target.value)
                    }
                >
                    <option value="all">{t("catalog.optionAll")}</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Mobile">Mobile</option>
                </select>
                <Text fontSize={20} as="h3">{t("catalog.workType")}</Text>
                <select
                    value={filters.employmentType}
                    onChange={(e) =>
                        handleFilterChange("employmentType", e.target.value)
                    }
                >
                    <option value="all">{t("catalog.optionAll")}</option>
                    <option value="Remote">{t("catalog.optionRemote")}</option>
                    <option value="On-site">{t("catalog.optionOnSite")}</option>
                </select>
                <Text fontSize={20} as="h3">{t("catalog.language")}</Text>
                <select
                    value={filters.languageName}
                    onChange={(e) =>
                        handleFilterChange("languageName", e.target.value)
                    }
                >
                    <option value="all">{t("catalog.optionAll")}</option>
                    <option value="English">English</option>
                    <option value="Ukrainian">Ukrainian</option>
                </select>
                <Text fontSize={20} as="h3">{t("catalog.salaryRange")}</Text>
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
                <Text fontSize={20} as="h3">{t("catalog.experienceRange")}</Text>
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
                <Text fontSize={20} as="h3">{t("catalog.sortBy")}</Text>
                <select
                    value={filters.sortBy}
                    onChange={(e) =>
                        handleFilterChange("sortBy", e.target.value)
                    }
                >
                    <option value="salary">{t("catalog.salary")}</option>
                    <option value="positionTitle">{t("catalog.positionTitle")}</option>
                </select>
                <Text fontSize={20} as="h3">{t("catalog.sortDirection")}</Text>
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

            {/* Список вакансій */}
            <div className="vacancies-list">
                {vacancies.length > 0 ? (
                    vacancies.map((vacancy, index) => (
                        <Vacancy
                            key={index}
                            title={vacancy.positionTitle}
                            company={vacancy.companyName}
                            location={vacancy.employmentType}
                            workType={vacancy.employmentType}
                            salary={`${vacancy.salary}$`}
                            category={vacancy.categoryName}
                            language={vacancy.languageName}
                            experience={vacancy.experience}
                        />
                    ))
                ) : (
                    <p>No vacancies found</p>
                )}
            </div>
        </div>
    );
}

export default Catalog;

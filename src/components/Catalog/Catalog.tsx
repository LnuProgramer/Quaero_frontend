import React, { useEffect, useState } from "react";
import Vacancy from "../../reusableComponents/vacancy/Vacancy";
import "./Catalog.css";
import { useTranslation } from "react-i18next";
import Text from "../../reusableComponents/text/Text";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../reusableComponents/loader/Loader";
import Button from "../../reusableComponents/button/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { clearCache, getCache } from "../../utils/memoryCashe";

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
    yearsOfExperience: number;
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
    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState(false);
    const [page, setPage] = useState(0);
    const [vacanciesList, setVacanciesList] = useState<VacancyData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);
        return () => clearTimeout(handler);
    }, [filters]);

    useEffect(() => {
        const getAllFilteredAndSortedRequest = async () => {
            try {
                const cached = getCache("catalog_prefetch");
                if (cached) {
                    setVacanciesList(cached.content);
                    setIsFirst(cached.first);
                    setIsLast(cached.last);
                    clearCache("catalog_prefetch");
                } else {
                    const response = await axios.post(
                        `http://localhost:8080/job-vacancy/getAllFilteredAndSorted?page=0&size=3`,
                        debouncedFilters
                    );
                    setVacanciesList(response.data.content);
                    setIsFirst(response.data.first);
                    setIsLast(response.data.last);
                }
            } catch (error) {
                console.error("Error fetching vacancies:", error);
            }
            finally {
                setIsLoading(false);
            }
        };
        (async () => {
            await getAllFilteredAndSortedRequest();
        })();
    }, [debouncedFilters]);

    const pageHandler = async (toRight: boolean) => {
        const newPage = toRight ? page + 1 : Math.max(page - 1, 0);
        setPage(newPage);
        await executeRequest(newPage);
    };

    const executeRequest = async (currentPage: number) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/job-vacancy/getAllFilteredAndSorted?page=${currentPage}&size=3`,
                debouncedFilters
            );
            setVacanciesList(response.data.content);
            setIsFirst(response.data.first);
            setIsLast(response.data.last);
        } catch (error) {
            console.error("Error fetching vacancies:", error);
        }
    };


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

    if(isLoading) {
    return <Loader />
}
    return (
        <div className="catalog-container">
            <div className="filters-sidebar">
                <div className="search-bar">
                    <Text fontSize={24} as="h2">
                        {t("catalog.search")}
                    </Text>
                    <input
                        type="text"
                        placeholder={t("catalog.searchByTitleDescription")}
                        value={filters.positionTitle}
                        onChange={(e) =>
                            handleFilterChange("positionTitle", e.target.value)
                        }
                        className="search-in"
                    />
                </div>
                <div className="search-bar">
                    <Text fontSize={24} as="h2">
                        {t("catalog.searchByCompany")}
                    </Text>
                    <input
                        type="text"
                        placeholder={t("catalog.searchByCompanyDescription")}
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
                    placeholder={t("catalog.minSalary")}
                    value={filters.minSalary || ""}
                    onChange={(e) => handleNumericFilterChange("minSalary", e.target.value)}
                />
                <input
                    type="text"
                    placeholder={t("catalog.maxSalary")}
                    value={filters.maxSalary || ""}
                    onChange={(e) => handleNumericFilterChange("maxSalary", e.target.value)}
                />
                <Text fontSize={20} as="h3">
                    {t("catalog.experienceRange")}
                </Text>
                <input
                    type="text"
                    placeholder={t("catalog.minYears")}
                    value={filters.minYearsOfExperience || ""}
                    onChange={(e) => handleNumericFilterChange("minYearsOfExperience", e.target.value)}
                />
                <input
                    type="text"
                    placeholder={t("catalog.maxYears")}
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
                                experience={vacancy.yearsOfExperience}
                            />
                        </Link>
                    ))
                ) : (
                    <p>{t("catalog.noVacanies") || "No vacancies found"}</p>
                )}
                <div id="catalog-button-wraper">
                    <Button className="change-page-button" buttonColor={isFirst ? "grey" : "primary"}
                            fontSize={24} buttonText={<FaArrowLeft size={40} />} onClick={() => pageHandler(false)}
                    disabled={isFirst} />
                    <Button className="change-page-button" buttonColor={isLast ? "grey" : "primary"}
                            fontSize={24}  buttonText={<FaArrowRight size={40} />} onClick={() => pageHandler(true)}
                    disabled={isLast}/>
                </div>
            </div>

        </div>
    );
}

export default Catalog;

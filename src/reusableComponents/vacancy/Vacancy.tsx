import React from "react";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import Text from "../text/Text";
import "./Vacancy.scss";

type VacancyProps = {
    title: string;
    company: string;
    location: string;
    workType: string;
    salary: string;
    category: string;
    language: string;
    experience: number;
    link?: string;
    showButton?: boolean;
};

function Vacancy({ title, company, location, workType, salary, category, language, experience, link, showButton=true }: Readonly<VacancyProps>) {
    const { t } = useTranslation();

    return (
        <div className="vacancy">
            <div className="vacancy-info">
                <Text
                    fontSize={24}
                    className="title"
                    as="a"
                    href={link ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {title}
                </Text>
                <Text fontSize={24} as="h2">{company}</Text>
                <Text fontSize={20} as="p">{location}</Text>
                <Text fontSize={20} as="p">{t("catalog.workType")}: {workType}</Text>
                <Text fontSize={20} as="p">{t("catalog.category")}: {category}</Text>
                <Text fontSize={20} as="p">{t("catalog.language")}: {language}</Text>
                <Text fontSize={20} as="p">{t("catalog.experience")}: {experience} {t("catalog.years")}</Text>
                <Text fontSize={24} as="h3">{t("catalog.salary")}: {salary}</Text>
            </div>
            {showButton && (
                <div className="vacancy-button-wrapper">
                <Button
                    fontSize={24}
                    buttonText={t("vacancy.applyPosition")}
                    className="vacancy-buttons"
                    buttonColor="primary"
                />
            </div>
            )}
        </div>
    );
}

export default Vacancy;

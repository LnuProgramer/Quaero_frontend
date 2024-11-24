import React from 'react';
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import Text from "../text/Text";
import "./Vacancy.scss"

function Vacancy() {

    const {t, i18n} = useTranslation();
    return (
        <div className="vacancy">
        <div className="vacancy-info">
            <Text fontSize={24} as="h1">Frontend Developer</Text>
            <Text fontSize={24} as="h2">Name of the company</Text>
            <Text fontSize={24} as="p">Country, city, format</Text>
            <Text fontSize={24} as="h3">Salary (600$)</Text>
        </div>
            <div className="vacancy-button-wrapper">
                <Button fontSize={24} buttonText={t("vacancy.applyPosition")} className="vacancy-buttons" buttonColor="primary"/>
            </div>
        </div>
    );
}

export default Vacancy;
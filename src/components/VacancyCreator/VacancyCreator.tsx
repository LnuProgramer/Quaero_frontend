import React, { useState } from 'react';
import Text from "../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";
import Button from "../../reusableComponents/button/Button";
import "./VacancyCreator.scss"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function VacancyCreator() {
    const {t, i18n} = useTranslation();
    const [text, setText] = useState("");

    const modules = {
        toolbar: [
            ["bold", "italic", "underline"], // Жирний, курсив, підкреслення
            [{ header: 1 }, { header: 2 }], // Заголовки
            [{ list: "ordered" }, { list: "bullet" }], // Нумеровані й марковані списки
            ["link", "image"], // Посилання та зображення
            ["clean"], // Очистити форматування
        ],
    }

    return (
        <div id="vacancy-creator">
            <div id="vacancy-creator-wrapper">
            <div id="vacancy-creator-inputs-wrapper">
                <Text fontSize={24} as="h1">{t("vacancyCreator.createVacancy")}</Text>
                <Text fontSize={20} as="h2">{t("vacancyCreator.position")}</Text>
                <input className="input"></input>
                <Text fontSize={20} as="h2">{t("vacancyCreator.company")}</Text>
                <input className="input"></input>
                <Text fontSize={20} as="h2">{t("vacancyCreator.workFormat")}</Text>
                <input className="input"></input>
                <Text fontSize={20} as="h2">{t("vacancyCreator.salary")}</Text>
                <input className="input"></input>
                <Text fontSize={20} as="h2">{t("vacancyCreator.detailedRequirements")}</Text>
                <ReactQuill theme="bubble" value={text} onChange={setText} modules={modules} placeholder={t("profileHR.aboutPlaceholder")} id="vacancy-creator-requirements-text" />
            </div>
            <div id="vacancy-creator-button-wrapper">
                <Button fontSize={20} buttonText={t("vacancyCreator.create")} buttonColor="primary" id="vacancy-creator-button"></Button>
            </div>
            </div>
        </div>
    );
}

export default VacancyCreator;
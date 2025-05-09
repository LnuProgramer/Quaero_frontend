import React, { useState } from 'react';
import Text from "../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";
import Button from "../../reusableComponents/button/Button";
import "./VacancyCreator.scss"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import authAxios from "../../utils/authAxios";

interface FormDataVacancy {
    companyName: string,
    description : string,
    positionTitle : string,
    salary : number,
    yearsOfExperience : number,
    categoryName : string,
    employmentTypeName : string,
    languages: Array<{ languageName: string; languageLevel: string }>;
}

function VacancyCreator() {
    const {t} = useTranslation();
    const id = localStorage.getItem("id");
    const [formData, setFormData] = useState<FormDataVacancy>({
        companyName: "",
        description : "",
        positionTitle : "",
        salary : 0,
        yearsOfExperience : 0,
        categoryName : "frontend",
        employmentTypeName : "onSite",
        languages: [
            {
                languageName: "",
                languageLevel: "beginner"
            }
        ]
    });

    const modules = {
        toolbar: [
            ["bold", "italic", "underline"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) {
            console.error("User ID not found in localStorage.");
            return;
        }

        const vacancyData = {
            ...formData,
            user_id: id,
        };

        try {
            await authAxios.post(`http://localhost:8080/job-vacancy/setVacancy/${id}`, vacancyData);
        } catch (error) {
        } finally {
            window.location.href = `/profile/${id}`
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleQuillChange = (value: string) => {
        setFormData({ ...formData, description: value });
    };

    return (
        <div id="vacancy-creator">
            <form id="vacancy-creator-wrapper" onSubmit={handleSubmit}>
                <div id="vacancy-creator-inputs-wrapper">
                    <Text fontSize={24} as="h1">{t("vacancyCreator.createVacancy")}</Text>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.position")}</Text>
                    <input className="input" name="positionTitle" value={formData.positionTitle}
                           onChange={handleInputChange} required></input>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.company")}</Text>
                    <input className="input" name="companyName" value={formData.companyName}
                           onChange={handleInputChange} required></input>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.category")}</Text>
                    <select
                        className="input"
                        name="category_id"
                        value={formData.categoryName}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="mobile">Mobile</option>
                    </select>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.yearsOfExperience")}</Text>
                    <input className="input" inputMode="numeric" name="yearsOfExperience" value={formData.yearsOfExperience}
                           onChange={(e) => {
                               const numericValue = e.target.value.replace(/\D/g, ""); // Видаляє всі символи, крім цифр
                               setFormData((prevFormData) => ({
                                   ...prevFormData,
                                   yearsOfExperience: numericValue ? Number(numericValue) : 0, // Конвертація у число
                               }));
                           }}
                           required></input>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.workFormat")}</Text>
                    <select className="input" name="employmentTypeName" value={formData.employmentTypeName}
                            onChange={handleInputChange} required>
                        <option value="onSite">On-site</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.salary")}</Text>
                    <input
                        className="input"
                        inputMode="numeric"
                        name="salary"
                        value={formData.salary}
                        onChange={(e) => {
                            const numericValue = e.target.value.replace(/\D/g, ""); // Видаляє всі символи, крім цифр
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                salary: numericValue ? Number(numericValue) : 0, // Конвертація у число
                            }));
                        }}
                        required
                    />

                    <Text fontSize={20} as="h2">{t("vacancyCreator.language")}</Text>
                    <input className="input" name="languageName" value={formData.languages[0]?.languageName || ""}
                           onChange={(e) => {
                               const updatedLanguages = [...formData.languages];
                               updatedLanguages[0] = {
                                   ...updatedLanguages[0],
                                   languageName: e.target.value,
                               };
                               setFormData({...formData, languages: updatedLanguages});
                           }} required></input>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.languageLevel")}</Text>
                    <select
                        className="input"
                        name="languageLevel"
                        value={formData.languages[0]?.languageLevel || ""}
                        onChange={(e) => {
                            const updatedLanguages = [...formData.languages];
                            updatedLanguages[0] = {
                                ...updatedLanguages[0],
                                languageLevel: e.target.value,
                            };
                            setFormData({...formData, languages: updatedLanguages});
                        }}
                        required
                    >
                        <option value="beginner">Beginner</option>
                        <option value="preIntermediate">Pre-intermediate</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="upperIntermediate">Upper-Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="proficiency">Proficiency</option>
                        <option value="native">Native</option>
                    </select>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.detailedRequirements")}</Text>
                    <ReactQuill theme="bubble" value={formData.description} onChange={handleQuillChange}
                                modules={modules} placeholder={t("profileHR.aboutPlaceholder")}
                                id="vacancy-creator-requirements-text"/>
                </div>
                <div id="vacancy-creator-button-wrapper">
                    <Button type="submit" fontSize={20} buttonText={t("vacancyCreator.create")} buttonColor="primary"
                            id="vacancy-creator-button"></Button>
                </div>
            </form>
        </div>
    );
}

export default VacancyCreator;
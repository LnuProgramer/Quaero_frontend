import React, { useState } from 'react';
import Text from "../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";
import Button from "../../reusableComponents/button/Button";
import "./VacancyCreator.scss"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";

interface FormDataVacancy {
    company_name: string,
    description : string,
    position_title : string,
    salary : string,
    years_of_experience : string,
    category_id : string,
    employment_type_id : string,
    language_level : string,
    language_name : string,
    name: string,
}

function VacancyCreator() {
    const {t} = useTranslation();
    const [formData, setFormData] = useState<FormDataVacancy>({
        company_name: "",
        description : "",
        position_title : "",
        salary : "",
        years_of_experience : "",
        category_id : "",
        employment_type_id : "",
        language_level : "",
        language_name : "",
        name: "",
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

        const userId = localStorage.getItem("id");
        if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
        }

        const vacancyData = {
            ...formData,
            user_id: userId,
        };

        try {
            const res = await axios.post("http://localhost:3030/creating-vacancy", vacancyData);
            console.log("Vacancy created successfully:", res.data);
        } catch (error) {
            console.error("Error creating vacancy:", error);
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
                    <Text fontSize={20} as="h2">{t("vacancyCreator.name")}</Text>
                    <input className="input" name="name" value={formData.name} onChange={handleInputChange}></input>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.position")}</Text>
                    <input className="input" name="position_title" value={formData.position_title} onChange={handleInputChange}></input>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.company")}</Text>
                    <input className="input" name="company_name" value={formData.company_name} onChange={handleInputChange}></input>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.category")}</Text>
                    <select
                        className="input"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleInputChange}
                    >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Mobile">Mobile</option>
                    </select>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.yearsOfExperience")}</Text>
                    <input className="input" name="years_of_experience" value={formData.years_of_experience} onChange={handleInputChange}></input>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.workFormat")}</Text>
                    <select className="input" name="employment_type_id" value={formData.employment_type_id}
                            onChange={handleInputChange}>
                        <option value="On-site">On-site</option>
                        <option value="Remote">Remote</option>
                        <option value="Hibrid">Hybrid</option>
                    </select>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.salary")}</Text>
                    <input className="input" name="salary" value={formData.salary} onChange={handleInputChange}></input>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.language")}</Text>
                    <input className="input" name="language_name" value={formData.language_name}
                           onChange={handleInputChange}></input>
                    <Text fontSize={20} as="h2">{t("vacancyCreator.languageLevel")}</Text>
                    <select
                        className="input"
                        name="language_level"
                        value={formData.language_level}
                        onChange={handleInputChange}
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Pre-intermediate">Pre-intermediate</option>
                        <option value="Upper-Intermediate">Upper-Intermediate</option>
                        <option value="Advanced ">Advanced</option>
                        <option value="Proficiency">Proficiency</option>
                        <option value="Native">Native</option>
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
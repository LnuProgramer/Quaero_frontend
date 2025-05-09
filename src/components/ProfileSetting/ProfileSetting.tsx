import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import axios from "axios";
import Text from "../../reusableComponents/text/Text";
import "./ProfileSetting.scss"
import Button from "../../reusableComponents/button/Button";
import authAxios from "../../utils/authAxios";

interface FormDataProfile {
    firstName: string,
    lastName: string,
    phone: number,
    country : string,
    city : string,
    position : string,
    companyName : string,
}

function ProfileSetting() {
    const {t} = useTranslation();
    const [role, setRole] = useState<string | null>(null);
    const id = localStorage.getItem("id");
    const [formData, setFormData] = useState<FormDataProfile>({
        firstName: "",
        lastName: "",
        phone: 0,
        country : "",
        city : "",
        position : "",
        companyName: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const vacancyData = {
            ...formData,
        };

        try {
            await authAxios.patch(`http://localhost:8080/profile/setUserInfo/${id}`, vacancyData);
        } catch (error) {
            return;
        } finally {
            window.location.href = `/profile/${id}`
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const fetchRole = async () => {
            try {
                if (id) {
                    const response = await authAxios.get(`http://localhost:8080/profile/getRole/${id}`);
                    setRole(response.data);
                }
            } catch (error) {
                console.error("Помилка під час отримання ролі:", error);
            }
        };
        const fetchUserInfo = async () => {
            try {
                const response = await authAxios.get(`http://localhost:8080/profile/getUserInfo/${id}`);
                const userData = response.data;

                setFormData({
                    firstName: userData.name,
                    lastName: userData.surname,
                    phone: userData.phone,
                    country : userData.country,
                    city : userData.city,
                    position : userData.position,
                    companyName : userData.companyName,
                })
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        (async () => {
            await fetchRole();
            await fetchUserInfo();
        })()
    }, [id]);

    if (!id) {
        return <Text fontSize={24}>Invalid user ID</Text>;
    }

    return (
        <div id="profile-info-editor">
            <form id="profile-info-editor-wrapper" onSubmit={handleSubmit}>
                <div id="profile-info-editor-inputs-wrapper">
                    <Text fontSize={24} as="h1">{t("profileEditor.profileSettings")}</Text>
                    <Text fontSize={20} as="h2">{t("profileEditor.firstName")}</Text>
                    <input className="input" name="firstName" value={formData.firstName}
                           onChange={handleInputChange}></input>
                    <Text fontSize={20} as="h2">{t("profileEditor.lastName")}</Text>
                    <input className="input" name="lastName" value={formData.lastName}
                           onChange={handleInputChange}></input>
                    <Text fontSize={20} as="h2">{t("profileEditor.phone")}</Text>
                    <input className="input" name="phone" value={formData.phone} onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, "");
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            phone: numericValue ? Number(numericValue) : 0,
                        }));
                    }}></input>
                    <Text fontSize={20} as="h2">{t("profileEditor.country")}</Text>
                    <input className="input" name="country" value={formData.country}
                           onChange={handleInputChange}></input>
                    <Text fontSize={20} as="h2">{t("profileEditor.city")}</Text>
                    <input className="input" name="city" value={formData.city}
                           onChange={handleInputChange}></input>
                    {role === "ROLE_EMPLOYEE" && (
                        <>
                        <Text fontSize={20} as="h2">{t("profileEditor.position")}</Text>
                        <input className="input" name="position" value={formData.position}
                               onChange={handleInputChange}></input>
                        </>)}
                    {role === "ROLE_RECRUITER" && (
                        <>
                            <Text fontSize={20} as="h2">{t("profileEditor.companyName")}</Text>
                            <input className="input" name="companyName" value={formData.companyName}
                                   onChange={handleInputChange}></input>
                    </>)}
                </div>
                <div id="profile-info-editor-button-wrapper">
                    <Button type="submit" fontSize={20} buttonText={t("profileEditor.save")} buttonColor="primary"
                            id="profile-info-editor-button"></Button>
                    <Button fontSize={20} buttonText={t("profileEditor.exit")} buttonColor="pink"
                            id="profile-info-editor-button" onClick={() => {
                                localStorage.removeItem("id");
                                localStorage.removeItem("accessToken ");
                                localStorage.removeItem("refreshToken ");
                                window.location.href = "/"
                    }}></Button>
                </div>
            </form>
        </div>
    );
}


export default ProfileSetting;
import React, { useState, useEffect } from 'react';
import Button from "../../../reusableComponents/button/Button";
import "./ProfileHR.scss"
import Text from "../../../reusableComponents/text/Text";
import {useTranslation} from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import { IoSettingsSharp } from "react-icons/io5";

interface profileHrProps {
    userID: string;
}

interface UserDataHr {
    name: string,
    surname: string,
    country: string,
    city: string,
    companyName :string,
    additionalInfo: string[],
    description: string,
}

function ProfileHR({userID}: profileHrProps) {
    const { t } = useTranslation();
    const [userData, setUserData] = useState<UserDataHr | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isMyProfile, setIsMyProfile] = useState<boolean>(false);


    // Стан для введеного тексту в ReactQuill
    const [text, setText] = useState<string>("");

    const [isTextChanged, setIsTextChanged] = useState<boolean>(false);

    const [additionalInfo, setAdditionalInfo] = useState<string[]>([]);

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [editedText, setEditedText] = useState<string>(additionalInfo.join("\n"));

    const modules = {
        toolbar: [
            ["bold", "italic", "underline"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    useEffect(() => {

        const checkUsers = () => {
            if(userID == localStorage.getItem("id")) {
                setIsMyProfile(true);
            }
            else {
                setIsMyProfile(false);
            }
        }
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/getUserInfo/${userID}`);
                const userData = response.data;

                setUserData(userData);
                setText(userData.description || "");
                setAdditionalInfo(userData.additionalInfo || []);
                setEditedText((userData.additionalInfo || []).join("\n"));
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
            finally {
                setLoading(false);
                setIsTextChanged(false);
            }
        };

        fetchUserData();
        checkUsers();
    }, [userID]);

    useEffect(() => {
        if (!loading) {
            setIsTextChanged(text !== userData?.description);
        }
    }, [text, userData, loading]);

    const handleSaveAdditionalInfo =  async () => {
        const parsedInfo = editedText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line !== "");
        setAdditionalInfo(parsedInfo);
        await axios.put(`http://localhost:8080/setAdditionalInfo${userID}`, parsedInfo);
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        await axios.put(`http://localhost:8080/setAboutMe${userID}`, text,{
            headers: {
                "Content-Type": "text/plain",
            },})
        setIsTextChanged(false);
    };

    const renderAdditionalInfo = (info: string): JSX.Element => {
        const urlPattern = /^(https?:\/\/[^\s]+)$/i; // Регулярний вираз для перевірки URL
        if (urlPattern.test(info)) {
            return (
                <a href={info} target="_blank" rel="noopener noreferrer" className="info-link">
                    {info}
                </a>
            );
        }
        return <span>{info}</span>;
    };

    return (
        <div id="profile-hr">
            <div className="bg-circle" id="left-middle-bg-circle"></div>
            <div className="bg-circle" id="right-bottom-bg-circle"></div>
            <div id="profile-hr-wrapper">
                <div id="profile-hr-content-wrapper">
                    <div id="photo-hr-wrapper">
                        <img className="profile-photo" src="/images/profile/UserDefaultPhoto.svg" alt="profile-photo"></img>
                    </div>
                    <div id="profile-hr-main-content-wrapper">
                        <div id="profile-hr-left-content-wrapper">
                            <div id="profile-hr-user-info-wrapper">
                                <Text fontSize={30} as="h1">{userData?.name && userData?.surname ? `${userData.name} ${userData.surname}` : t("profileHR.nameSurname")}</Text>
                                <Text fontSize={25} as="h2">{userData?.companyName ? `${userData.companyName}` : t("profileHR.companyName")}</Text>
                                <Text fontSize={25} as="h2">{userData?.country && userData?.city ? `${userData.country}, ${userData.city}` : t("profileEmployee.countryCity")}</Text>
                                {isMyProfile && (<IoSettingsSharp size={25} id="setting-icon" />)}
                            </div>
                            <div id="profile-hr-other-info-wrapper">
                                {isMyProfile && (<div className="profile-hr-block">
                                    <Text fontSize={20} as="h2">{t("profileHR.myContacts")}</Text>
                                    <Text fontSize={20} as="a">{t("profileHR.moreDetailsHere")}</Text>
                                </div>)}

                                <div className="profile-hr-block">
                                    <Text fontSize={20} as="h2" id="additional-information-text">
                                        {t("profileHR.additionalInformation")}
                                    </Text>
                                    {!isEditing ? (
                                        <>
                                            {additionalInfo.map((info, index) => (
                                                <Text key={index} fontSize={20} as="p">
                                                    {renderAdditionalInfo(info)}
                                                </Text>
                                            ))}
                                            {isMyProfile && ( <Button
                                                fontSize={20}
                                                fontWeight={500}
                                                buttonText={t("profileHR.edit")}
                                                className="additional-info-buttons"
                                                onClick={() => setIsEditing(true)}
                                            />)}
                                        </>
                                    ) : (
                                        <div>
                                            <textarea
                                                value={editedText}
                                                onChange={(e) => setEditedText(e.target.value)}
                                                className="edit-textarea"
                                                placeholder="Enter each item (links or text) on a new line"
                                            />
                                            <Button
                                                fontSize={20}
                                                fontWeight={500}
                                                buttonText={t("profileHR.save")}
                                                buttonColor="primary"
                                                className="additional-info-buttons"
                                                onClick={handleSaveAdditionalInfo}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div id="profile-hr-right-content-wrapper">
                            {isMyProfile && (<div id="profile-hr-buttons-wrapper">
                                <Button fontSize={20} fontWeight={500} buttonText={t("profileHR.addNewVacancy")}
                                        className="profile-hr-buttons"/>
                                <Button fontSize={20} fontWeight={500} buttonText={t("profileHR.openVacancies")}
                                        className="profile-hr-buttons"/>
                            </div>)}
                            <div id="profile-hr-about-wrapper" className={`profile-hr-block ${!isMyProfile && "margin"}`}>
                                <Text fontSize={20} as="h2">{t("profileHR.aboutCompany")}</Text>
                                <ReactQuill
                                    theme="bubble"
                                    value={text}
                                    onChange={setText}
                                    modules={modules}
                                    placeholder={t("profileHR.aboutPlaceholder")}
                                    id="profile-hr-about-text"
                                    readOnly={!isMyProfile}
                                />
                                {isTextChanged && isMyProfile && (
                                    <div id="submit-button-wrapper">
                                        <Button
                                            fontSize={20}
                                            fontWeight={500}
                                            buttonText={t("profileHR.save")}
                                            buttonColor="primary"
                                            className="profile-hr-buttons"
                                            onClick={handleSubmit}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileHR;

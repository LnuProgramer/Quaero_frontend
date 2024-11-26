import React, { useState, useEffect } from 'react';
import Button from "../../../reusableComponents/button/Button";
import "./ProfileHR.scss"
import Text from "../../../reusableComponents/text/Text";
import {useTranslation} from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function ProfileHR() {
    const { t } = useTranslation();

    // Стан для введеного тексту в ReactQuill
    const [text, setText] = useState<string>("");

    const [isTextChanged, setIsTextChanged] = useState<boolean>(false);

    const [additionalInfo, setAdditionalInfo] = useState<string[]>([
        "https://example.com",
        "Phone number",
    ]);

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
        setIsTextChanged(text !== "");
    }, [text]);

    const handleSaveAdditionalInfo = (): void => {
        const parsedInfo = editedText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line !== "");
        setAdditionalInfo(parsedInfo);
        setIsEditing(false);

        console.log("Data sent to server:", parsedInfo);
    };

    const handleSubmit = (): void => {
        console.log("Quill text submitted:", text);
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
                                <Text fontSize={30} as="h1">Ім’я Прізвище HR</Text>
                                <Text fontSize={25} as="h2">Назва компанії</Text>
                                <Text fontSize={25} as="h2">Країна, місто</Text>
                            </div>
                            <div id="profile-hr-other-info-wrapper">
                                <div className="profile-hr-block">
                                    <Text fontSize={20} as="h2">{t("profileHR.myContacts")}</Text>
                                    <Text fontSize={20} as="a">{t("profileHR.moreDetailsHere")}</Text>
                                </div>
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
                                            <Button
                                                fontSize={20}
                                                fontWeight={500}
                                                buttonText={t("profileHR.edit")}
                                                className="additional-info-buttons"
                                                onClick={() => setIsEditing(true)}
                                            />
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
                            <div id="profile-hr-buttons-wrapper">
                                <Button fontSize={20} fontWeight={500} buttonText={t("profileHR.addNewVacancy")}
                                        className="profile-hr-buttons"/>
                                <Button fontSize={20} fontWeight={500} buttonText={t("profileHR.openVacancies")}
                                        className="profile-hr-buttons"/>
                            </div>
                            <div id="profile-hr-about-wrapper" className="profile-hr-block">
                                <Text fontSize={20} as="h2">{t("profileHR.aboutCompany")}</Text>
                                <ReactQuill
                                    theme="bubble"
                                    value={text}
                                    onChange={setText}
                                    modules={modules}
                                    placeholder={t("profileHR.aboutPlaceholder")}
                                    id="profile-hr-about-text"
                                />
                                {isTextChanged && (
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

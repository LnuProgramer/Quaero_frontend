import React, { useEffect, useState } from 'react';
import Button from "../../../reusableComponents/button/Button";
import "./ProfileEmployee.scss";
import Text from "../../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function ProfileEmployee() {
    const { t } = useTranslation();

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
        const urlPattern = /^(https?:\/\/[^\s]+)$/i;
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
        <div id="profile-employee">
            <div className="bg-circle" id="left-middle-bg-circle"></div>
            <div className="bg-circle" id="right-bottom-bg-circle"></div>
            <div id="profile-employee-wrapper">
                <div id="profile-employee-content-wrapper">
                    <div id="photo-employee-wrapper">
                        <img className="profile-photo" src="/images/profile/UserDefaultPhoto.svg" alt="profile-photo" />
                    </div>
                    <div id="profile-employee-main-content-wrapper">
                        <div id="profile-employee-left-content-wrapper">
                            <div id="profile-employee-user-info-wrapper">
                                <Text fontSize={30} as="h1">Ім’я Прізвище</Text>
                                <Text fontSize={25} as="h2">Посада</Text>
                                <Text fontSize={25} as="h2">Країна, місто</Text>
                            </div>
                            <div id="profile-employee-other-info-wrapper">
                                <div className="profile-employee-block">
                                    <Text fontSize={20} as="h2">{t("profileEmployee.myResume")}</Text>
                                    <Text fontSize={20} as="a">{t("profileEmployee.downloadHere")}</Text>
                                </div>
                                <div className="profile-employee-block">
                                    <Text fontSize={20} as="h2" id="additional-information-text">
                                        {t("profileEmployee.additionalInformation")}
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
                                                buttonText={t("profileEmployee.edit")}
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
                                                buttonText={t("profileEmployee.save")}
                                                buttonColor="primary"
                                                className="additional-info-buttons"
                                                onClick={handleSaveAdditionalInfo}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div id="profile-employee-right-content-wrapper">
                            <div id="profile-employee-buttons-wrapper">
                                <Button
                                    fontSize={20}
                                    fontWeight={500}
                                    buttonText={t("profileEmployee.establishContact")}
                                    className="profile-employee-buttons"
                                />
                                <Button
                                    fontSize={20}
                                    fontWeight={500}
                                    buttonColor="primary"
                                    buttonText={t("profileEmployee.writeMessage")}
                                    className="profile-employee-buttons"
                                />
                            </div>
                            <div id="profile-employee-about-wrapper" className="profile-employee-block">
                                <Text fontSize={20} as="h2">{t("profileEmployee.aboutMe")}</Text>
                                <ReactQuill
                                    theme="bubble"
                                    value={text}
                                    onChange={setText}
                                    modules={modules}
                                    placeholder={t("profileHR.aboutPlaceholder")}
                                    id="profile-employee-about-text"
                                />
                                {isTextChanged && (
                                    <div id="submit-button-wrapper">
                                        <Button
                                            fontSize={20}
                                            fontWeight={500}
                                            buttonText={t("profileEmployee.save")}
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

export default ProfileEmployee;

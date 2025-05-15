import React, { useEffect, useState } from 'react';
import Button from "../../../reusableComponents/button/Button";
import "./ProfileEmployee.scss";
import Text from "../../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { IoSettingsSharp } from "react-icons/io5";
import Loader from "../../../reusableComponents/loader/Loader";
import authAxios from "../../../utils/authAxios";
import { useNavigate } from "react-router-dom";

interface ProfileEmployeeProps {
    employeeID: string;
}

interface UserDataEmployee {
    name: string,
    surname: string,
    country: string,
    city: string,
    position: string,
    additionalInfo: string[],
    description: string,
}

function ProfileEmployee({employeeID}: Readonly<ProfileEmployeeProps>) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [userData, setUserData] = useState<UserDataEmployee | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isMyProfile, setIsMyProfile] = useState<boolean>(false);

    const [text, setText] = useState<string>();

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
            if(employeeID === localStorage.getItem("id")) {
                setIsMyProfile(true);
            }
            else {
                setIsMyProfile(false);
            }
        }

        const fetchUserData = async () => {
            try {
                const response = await authAxios.get(`http://localhost:8080/getUserInfo/${employeeID}`);
                const userData = response.data;

                setUserData(userData);
                setText(userData.description || "");
                setAdditionalInfo(userData.additionalInfo || []);
                setEditedText((userData.additionalInfo || []).join("\n"));
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
                setIsTextChanged(false);
            }
        };

        (async () => {
            await fetchUserData();
        })()
        checkUsers();
    }, [employeeID]);


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
        await authAxios.put(`http://localhost:8080/setAdditionalInfo${employeeID}`, parsedInfo);
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        await authAxios.put(`http://localhost:8080/setAboutMe${employeeID}`, text,{
            headers: {
                "Content-Type": "text/plain",
            },})
        setIsTextChanged(false);
    };

    const renderAdditionalInfo = (info: string): JSX.Element => {
        const urlPattern = /^(https?:\/\/\S+)$/i;
        if (urlPattern.test(info)) {
            return (
                <a href={info} target="_blank" rel="noopener noreferrer" className="info-link">
                    {info}
                </a>
            );
        }
        return <span>{info}</span>;
    };

    if (loading) {
        return <Loader />
    }

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
                                <Text fontSize={30} as="h1">{userData?.name && userData?.surname ? `${userData.name} ${userData.surname}` : t("profileEmployee.nameSurname")}</Text>
                                <Text fontSize={25} as="h2">{userData?.position ? `${userData.position}` : t("profileEmployee.position")}</Text>
                                <Text fontSize={25} as="h2">{userData?.country && userData?.city ? `${userData.country}, ${userData.city}` : t("profileEmployee.countryCity")}</Text>
                                {isMyProfile && (<IoSettingsSharp size={25} onClick={() => navigate("/profile/settings")} className="setting-icon" />)}
                            </div>
                            <div id="profile-employee-other-info-wrapper">
                                <div className="profile-employee-block">
                                    <Text fontSize={20} as="h2">{t("profileEmployee.myResume")}</Text>
                                    <Text fontSize={20} as="a">{t(`profileEmployee${isMyProfile ? ".downloadHere" : ".uploadHere"}`)}</Text>
                                </div>
                                <div className="profile-employee-block" id="profile-employee-additional">
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
                                            {isMyProfile && (<Button
                                                fontSize={20}
                                                fontWeight={500}
                                                buttonText={t("profileEmployee.edit")}
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
                                                placeholder={t("profileEmployee.textArea")}
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
                                    onClick={() => {navigate("/")}}
                                    className="profile-employee-buttons"
                                />
                                <Button
                                    fontSize={20}
                                    fontWeight={500}
                                    buttonColor="primary"
                                    buttonText={t("profileEmployee.writeMessage")}
                                    onClick={() => navigate("/")}
                                    className="profile-employee-buttons"
                                />
                            </div>
                            <div id="profile-employee-about-wrapper" className="profile-employee-block">
                                <Text fontSize={20} as="h2">{t("profileEmployee.aboutMe")}</Text>
                                <ReactQuill
                                    theme="bubble"
                                    value={text}
                                    onChange={(value: string) => setText(value)}
                                    modules={modules}
                                    placeholder={t("profileHR.aboutPlaceholder")}
                                    id="profile-employee-about-text"
                                    readOnly={!isMyProfile}
                                />
                                {isTextChanged && isMyProfile && (
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

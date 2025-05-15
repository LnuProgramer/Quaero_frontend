import React, { useState, useEffect } from 'react';
import Button from "../../../reusableComponents/button/Button";
import "./ProfileHR.scss"
import Text from "../../../reusableComponents/text/Text";
import {useTranslation} from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { IoSettingsSharp } from "react-icons/io5";
import Loader from "../../../reusableComponents/loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import Vacancy from "../../../reusableComponents/vacancy/Vacancy";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import authAxios from "../../../utils/authAxios";
import { getCache } from "../../../utils/memoryCashe";

interface ProfileHrProps {
    hrID: string;
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

type ProfileHrVacancyData = {
    id: string;
    positionTitle: string;
    companyName: string;
    categoryName: string;
    employmentTypeName: string;
    languages: [{
        languageName: string;
        languageLevel: string
    }];
    salary: number;
    yearsOfExperience: number;
    description: string;
};

function ProfileHR({hrID}: Readonly<ProfileHrProps>) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [userData, setUserData] = useState<UserDataHr | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
    const [vacancies, setVacancies] = useState<ProfileHrVacancyData[]>([]);
    const [vacanciesPage, setVacanciesPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);

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
            if(hrID === localStorage.getItem("id")) {
                setIsMyProfile(true);
            }
            else {
                setIsMyProfile(false);
            }
        }
        const fetchUserData = async () => {
            try {
                const cachedUserData = getCache("prefetchedUserData");
                const cachedOpenVacancies = getCache("prefetchedOpenVacancies")
                if (cachedUserData) {
                    setUserData(cachedUserData);
                    setText(cachedUserData.description || "");
                    setAdditionalInfo(cachedUserData.additionalInfo || []);
                    setEditedText((cachedUserData.additionalInfo || []).join("\n"));
                }
                else {
                    const userDataResponse = await authAxios.get(`http://localhost:8080/profile/getUserInfo/${hrID}`);
                    const userDataHR = userDataResponse.data;
                    setUserData(userDataHR);
                    setText(userDataHR.description || "");
                    setAdditionalInfo(userDataHR.additionalInfo || []);
                    setEditedText((userDataHR.additionalInfo || []).join("\n"));
                }
                if (cachedOpenVacancies){
                    const vacanciesData = cachedOpenVacancies;
                    if (vacanciesData) {
                        setVacancies(vacanciesData.content);
                        setIsFirstPage(vacanciesData.first)
                        setIsLastPage(vacanciesData.last)
                    } else {
                        setVacancies([]);
                    }
                }
                else
                {
                    const openVacanciesResponse = await authAxios.get(`http://localhost:8080/job-vacancy/getVacanciesByHr/${hrID}?page=0&size=3`);
                    const vacanciesData = openVacanciesResponse.data;
                    if (vacanciesData) {
                        setVacancies(vacanciesData.content);
                        setIsFirstPage(vacanciesData.first)
                        setIsLastPage(vacanciesData.last)
                    } else {
                        setVacancies([]);
                    }
                }

            } catch (error) {
                console.error("Error fetching user data:", error);
                setVacancies([]);
            } finally {
                setLoading(false);
                setIsTextChanged(false);
            }
    };

        (async () => {
            await fetchUserData();
        })()
        checkUsers();
    }, [hrID]);

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
        await authAxios.put(`http://localhost:8080/profile/setAdditionalInfo/${hrID}`, parsedInfo);
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        await authAxios.put(`http://localhost:8080/profile/setAboutMe/${hrID}`, text,{
            headers: {
                "Content-Type": "text/plain",
            },})
        setIsTextChanged(false);
    };

    const renderAdditionalInfo = (info: string): JSX.Element => {
        const urlPattern = /^(https?:\/\/\S+)$/i; // Регулярний вираз для перевірки URL
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

    const pageHandler = async (toRight: boolean) => {
        const newPage = toRight ? vacanciesPage + 1 : Math.max(vacanciesPage - 1, 0);
        setVacanciesPage(newPage);
        await executeRequest(newPage);
    };


    const executeRequest = async (currentPage: number) => {
        try {
            const response = await authAxios.get(
                `http://localhost:8080/job-vacancy/getVacanciesByHr/${hrID}?page=${currentPage}&size=3`,
            );
            setVacancies(response.data.content);
            setIsFirstPage(response.data.first);
            setIsLastPage(response.data.last);

        } catch (error) {
            console.error("Error fetching vacancies:", error);
        }
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
                                {isMyProfile && (<IoSettingsSharp size={25} onClick={() => navigate("/profile/settings")} className="setting-icon" />)}
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
                                        onClick={() => navigate("/vacancy/create")} className="profile-hr-buttons"/>
                                <Button fontSize={20} fontWeight={500} buttonText={t("profileHR.openVacancies")}
                                        onClick={() => navigate("/catalog")} className="profile-hr-buttons"/>
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
                    {vacancies && vacancies.length > 0 && (
                        <div id="profile-hr-open-vacancies-wrapper">
                            <Text fontSize={34} as="h1">{t("profileHR.yourOpenVacancies")}</Text>

                            <div id="profile-hr-open-vacancies">
                                {vacancies.map((vacancy) => (
                                    <Link
                                        to={`/position/${vacancy.id}`}
                                        key={vacancy.id}
                                        className="vacancy-link"
                                    >
                                        <Vacancy
                                            title={vacancy.positionTitle}
                                            company={vacancy.companyName}
                                            location={vacancy.employmentTypeName}
                                            workType={vacancy.employmentTypeName}
                                            salary={`${vacancy.salary}$`}
                                            category={vacancy.categoryName}
                                            language={vacancy.languages && vacancy.languages.length > 0 ? vacancy.languages[0].languageName : "N/A"}
                                            experience={vacancy.yearsOfExperience}
                                            showButton={hrID !== localStorage.getItem("id")}
                                        />
                                    </Link>
                                ))}
                            </div>
                            <div id="catalog-button-wraper">
                                <Button className="change-page-button" buttonColor={isFirstPage ? "grey" : "primary"}
                                        fontSize={24} buttonText={<FaArrowLeft size={40}/>}
                                        onClick={() => pageHandler(false)}
                                        disabled={isFirstPage}/>
                                <Button className="change-page-button" buttonColor={isLastPage ? "grey" : "primary"}
                                        fontSize={24} buttonText={<FaArrowRight size={40}/>}
                                        onClick={() => pageHandler(true)}
                                        disabled={isLastPage}/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileHR;

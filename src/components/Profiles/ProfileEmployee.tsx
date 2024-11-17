import React from 'react';
import Button from "../../reusableComponents/button/Button";
import "./ProfileEmployee.scss"
import Text from "../../reusableComponents/text/Text";
import "../../utils/i18n"
import {useTranslation} from "react-i18next";

function ProfileEmployee() {
    const {t, i18n} = useTranslation();

    return (
        <div id="profile-employee">
            <div className="bg-circle" id="left-middle-bg-circle"></div>
            <div className="bg-circle" id="right-bottom-bg-circle"></div>
            <div id="profile-employee-wrapper">
                <div id="profile-employee-content-wrapper">
                    <div id="photo-wrapper">
                        <img id="profile-photo" src="/images/profile/UserDefaultPhoto.svg" alt="profile-photo"></img>
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
                                    <Text fontSize={20} as="h2" id="additional-information-text">{t("profileEmployee.additionalInformation")}</Text>
                                    <Text fontSize={20} as="p">Some Info</Text>
                                </div>
                            </div>
                        </div>
                        <div id="profile-employee-right-content-wrapper">
                            <div id="profile-employee-buttons-wrapper">
                                <Button fontSize={20} fontWeight={500} buttonText={t("profileEmployee.establishContact")} className="profile-employee-buttons"/>
                                <Button fontSize={20} fontWeight={500} buttonColor="primary" buttonText={t("profileEmployee.WriteMessage")} className="profile-employee-buttons"/>
                            </div>
                            <div id="profile-employee-about-wrapper" className="profile-employee-block">
                                <Text fontSize={20} as="h2">{t("profileEmployee.AboutMe")}</Text>
                                <Text fontSize={20} as="p">Some Text About Me </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileEmployee;
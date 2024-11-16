import React from 'react';
import Button from "../../reusableComponents/button/Button";
import "./ProfileEmployee.scss"
import Text from "../../reusableComponents/text/Text";

function ProfileEmployee() {
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
                                <div className="profile-employee-block"></div>
                                <div className="profile-employee-block"></div>
                            </div>
                        </div>
                        <div id="profile-employee-right-content-wrapper">
                            <div id="profile-employee-buttons-wrapper"></div>
                            <div id="profile-employee-about-wrapper"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileEmployee;
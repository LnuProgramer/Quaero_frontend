import React from 'react';
import Button from "../../reusableComponents/button/Button";
import "./ProfileEmployee.scss"

function ProfileEmployee() {
    return (
        <div className="profile">
            <Button fontSize={20} buttonText={"Встановити контакт"} className={"profile-buttons"}/>
            <Button fontSize={20} buttonText={"Встановити контакт"} buttonColor="primary" className={"profile-buttons"}/>
        </div>
    );
}

export default ProfileEmployee;
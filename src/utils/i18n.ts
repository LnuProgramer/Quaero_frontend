import i18n from 'i18next';
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    resources: {
        en:{
            translation:{
            profileEmployee: {
                myResume: "My resume",
                downloadHere: "Download Here",
                additionalInformation: "Additional information:",
                establishContact: "Establish contact",
                WriteMessage: "Write a message",
                AboutMe: "About me",
            }
            }
        },
        ua: {
            translation: {
                profileEmployee: {
                    myResume: "Моє резюме",
                    downloadHere: "Завантажити тут",
                    additionalInformation: "Додаткова інформація:",
                    establishContact: "Встановити контакт",
                    WriteMessage: "Написати повідомлення",
                    AboutMe: "Про мене",
                }
            }
        }
    }
})
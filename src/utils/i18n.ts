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
                writeMessage: "Write a message",
                aboutMe: "About me",
            },

            profileHR: {
                myContacts: "My contacts",
                moreDetailsHere: "More details here",
                additionalInformation: "Additional information:",
                addNewVacancy: "Add new vacancy",
                openVacancies: "Open vacancies",
                aboutCompany: "About company",
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
                    writeMessage: "Написати повідомлення",
                    aboutMe: "Про мене",
                },

                profileHR: {
                    myContacts: "Мої контакти",
                    moreDetailsHere: "Детальніше тут",
                    additionalInformation: "Додаткова інформація:",
                    addNewVacancy: "Додати нову ваканцію",
                    openVacancies: "Відкриті ваканції",
                    aboutCompany: "Про компанію",
                }
            }
        }
    }
})
import i18n from 'i18next';
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    resources: {
        en:{
            translation:{
                homePage: {
                    jobSearch: "Job search",
                    postAd : "Post an ad",
                    featuredAds: "Featured ads",
                    addResume: "Add a resume!",
                    addResumeDescription: "Post your resume so that employers notice you faster",
                    create: "Create",
                    downloadFile: "Download the file",
                    howPrepareForInterview: "How to prepare for an interview",
                    tipsFromHR: {
                        tipsFrom: "Tips from the ",
                        headHr: "Head of HR ",
                        at:"at ",
                        google: "Google!",
                    },
                    readMore: "Read more",
                    featuredAdsForYou: "Featured ads for you",
                    articles: "Articles",
                    contacts: "Contacts",
                    aboutUs: "About Us",
                    help: "Help",
                    ourPartners: "Our partners",
                    socialNetworks: "Social Networks",
                },
                profileEmployee: {
                    myResume: "My resume",
                    downloadHere: "Download Here",
                    additionalInformation: "Additional information:",
                    establishContact: "Establish contact",
                    writeMessage: "Write a message",
                    aboutMe: "About me",
                    aboutPlaceholder: "Write something here..."
                },

                profileHR: {
                    myContacts: "My contacts",
                    moreDetailsHere: "More details here",
                    additionalInformation: "Additional information:",
                    addNewVacancy: "Add new vacancy",
                    openVacancies: "Open vacancies",
                    aboutCompany: "About company",
                    aboutPlaceholder: "Write something here..."
                },

                vacancy: {
                    applyPosition: "Apply for position"
                },

                header: {
                    loginNav: "Login",
                    vacancies: "Vacancies",
                    messages: "Messages",
                    profile: "Profile",
                    searchPlaceHolder: "Search...",
                }
            }
        },

        uk: {
            translation: {
                homePage: {
                    jobSearch: "Пошук вакансій",
                    postAd : "Розмістити оголошення",
                    featuredAds: "Рекомендовані оголошення",
                    addResume: "Додайте резюме!",
                    addResumeDescription: "Розмістіть ваше резюме щоб роботодавці швидше вас замітили",
                    create: "Створити",
                    downloadFile: "Завантажити файл",
                    howPrepareForInterview: "Як підготуватись до співбесіди",
                    tipsFromHR: {
                        tipsFrom: "Поради від",
                        headHr: "Head of HR",
                        at:"компанії",
                        google: "Google!",
                    },
                    readMore: "Читати далі",
                    featuredAdsForYou: "Рекомендовані оголошення для вас",
                    articles: "Статті",
                    contacts: "Контакти",
                    aboutUs: "Про нас",
                    help: "Допомога",
                    ourPartners: "Наші партнери",
                    socialNetworks: "Соцмережі",
                },
                profileEmployee: {
                    myResume: "Моє резюме",
                    downloadHere: "Завантажити тут",
                    additionalInformation: "Додаткова інформація:",
                    establishContact: "Встановити контакт",
                    writeMessage: "Написати повідомлення",
                    aboutMe: "Про мене",
                    aboutPlaceholder: "Напишіть щось тут..."
                },

                profileHR: {
                    myContacts: "Мої контакти",
                    moreDetailsHere: "Детальніше тут",
                    additionalInformation: "Додаткова інформація:",
                    addNewVacancy: "Додати нову ваканцію",
                    openVacancies: "Відкриті ваканції",
                    aboutCompany: "Про компанію",
                    aboutPlaceholder: "Напишіть щось тут..."
                },

                vacancy: {
                    applyPosition: "Подайте заявку на посаду"
                },
                header: {
                    loginNav: "Увійти",
                    vacancies: "Вакансії",
                    messages: "Повідомлення",
                    profile: "Профіль",
                    searchPlaceHolder: "Пошук...",
                }
            }
        }
    }
})
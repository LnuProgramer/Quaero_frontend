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
                    aboutPlaceholder: "Write something here...",
                    save: "Save",
                    edit: "Edit",
                    nameSurname: "Name and Surname",
                    position: "Position",
                    countryCity: "Country, City",
                    textArea:"Enter each item (links or text) on a new line..."
                },

                profileHR: {
                    myContacts: "My contacts",
                    moreDetailsHere: "More details here",
                    additionalInformation: "Additional information:",
                    addNewVacancy: "Add new vacancy",
                    openVacancies: "Open vacancies",
                    aboutCompany: "About company",
                    aboutPlaceholder: "Write something here...",
                    save: "Save",
                    edit: "Edit",
                    nameSurname: "Name and Surname",
                    companyName: "Company name",
                    countryCity: "Country, City",
                    textArea:"Enter each item (links or text) on a new line..."
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
                },

                security: {
                    setLogin: "Login",
                    setRegister: "Register",
                    inputEmail: "Email",
                    inputFirstName: "First Name",
                    inputLastName: "Last Name",
                    inputPassword: "Password",
                    submitLogin: "Login",
                    submitRegister: "Register",
                    labelRole: "Role",
                    optionEmployer: "Employer",
                    optionEmployee: "Employee",
                },
                vacancyCreator:{
                    createVacancy: "Create vacancy",
                    position: "Position",
                    company: "Company",
                    workFormat: "Work format",
                    salary: "Salary",
                    detailedRequirements: "Detailed description of requirements",
                    create: "Create vacancy",
                },
                errorPage:{
                    error: "Error 404",
                    description: "This page doesn't exist",
                },
                catalog:{
                    search: "Search by title",
                    searchByCompany: "Search by company",
                    filters: "Filters",
                    workType: "Work type",
                    optionAll: "All",
                    optionRemote: "Remote",
                    optionOnSite:"On-site",
                    language: "Language",
                    category: "Category",
                    experience: "Experience",
                    experienceRange: "Experience Range",
                    years: "Years",
                    sortBy: "Sort by",
                    ascending: "Ascending",
                    descending: "Descending",
                    sortDirection: "Sort Direction",
                    positionTitle: "Position title",
                    noVacanies: "No vacanies found",
                    salary: "Salary",
                    salaryRange: "Salary Range",
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
                    aboutPlaceholder: "Напишіть щось тут...",
                    save: "Зберегти",
                    edit: "Редагувати",
                    nameSurname: "Ім'я та Прізвище",
                    position: "Позиція",
                    countryCity: "Країна, місто",
                    textArea:"Введіть кожен елемент (посилання або текст) у новому рядку..."
                },

                profileHR: {
                    myContacts: "Мої контакти",
                    moreDetailsHere: "Детальніше тут",
                    additionalInformation: "Додаткова інформація:",
                    addNewVacancy: "Додати нову ваканцію",
                    openVacancies: "Відкриті ваканції",
                    aboutCompany: "Про компанію",
                    aboutPlaceholder: "Напишіть щось тут...",
                    save: "Зберегти",
                    edit: "Редагувати",
                    nameSurname: "Ім'я та Прізвище",
                    companyName: "Назва компанії",
                    countryCity: "Країна, місто",
                    textArea:"Введіть кожен елемент (посилання або текст) у новому рядку..."
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
                },
                security: {
                    setLogin: "Логін",
                    setRegister: "Зареєструватись",
                    inputEmail: "Електронна адреса",
                    inputFirstName: "Ім'я",
                    inputLastName: "Прізвище",
                    inputPassword: "Пароль",
                    submitLogin: "Увійти",
                    submitRegister: "Зареєструватись",
                    labelRole: "Роль",
                    optionEmployer: "Роботодавець",
                    optionEmployee: "Працівник",
                },
                vacancyCreator:{
                    createVacancy: "Створити вакансію",
                    position: "Посада",
                    company: "Компанія",
                    workFormat: "Формат роботи",
                    salary: "Зарплата",
                    detailedRequirements: "Детальний опис вимог",
                    create: "Створити",
                },
                errorPage:{
                    error: "Помилка 404",
                    description: "Цієї сторінки не існує",
                },
                catalog:{
                    search: "Пошук за назвою",
                    searchByCompany: "Пошук за компанією",
                    filters: "Фільтри",
                    workType: "Тип роботи",
                    optionAll: "Усі",
                    optionRemote: "Віддалено",
                    optionOnSite:"Офіс",
                    language: "Мова",
                    category: "Категорія",
                    experience: "Досвід",
                    experienceRange: "Діапазон досвіду",
                    years: "Роки",
                    sortBy: "Сортувати по",
                    ascending: "Зростанню",
                    descending: "Спаданню",
                    sortDirection: "Напрямок сортування",
                    positionTitle: "Назва посади",
                    noVacanies: "Вакансій не знайдено",
                    salary: "Зарплата",
                    salaryRange: "Діапазон заробітних плат",
                }
            }
        }
    }
})
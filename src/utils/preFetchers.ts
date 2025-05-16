// utils/prefetchers.ts
import axios from "axios";
import { setCache } from "./memoryCashe";
import authAxios from "./authAxios";

export const prefetchCatalogData = async () => {
    const filters = {
        positionTitle: "",
        companyName: "",
        categoryName: "",
        employmentTypeName: "",
        languageName: "",
        minSalary: 0,
        maxSalary: 0,
        minYearsOfExperience: 0,
        maxYearsOfExperience: 0,
        sortBy: "salary",
        sortDirection: "asc",
    };

    try {
        const response = await axios.post(
            `http://localhost:8080/job-vacancy/getAllFilteredAndSorted?page=0&size=3`,
            filters
        );

        // Збережи в кеш (можна в localStorage або MemoryCache)
        setCache("prefetchedCatalogData", response.data);
        import(/* webpackPrefetch: true */ "../components/Catalog/Catalog");
    } catch (err) {
        console.error("Prefetch catalog data failed:", err);
    }
};

export const prefetchProfileData = async () => {
    const userId = localStorage.getItem("id")
    import(/* webpackPrefetch: true */ "../components/Profiles/Profile")
    const userDataResponse = await authAxios.get(`http://localhost:8080/profile/getUserInfo/${userId}`);
    setCache("prefetchedUserData", userDataResponse.data);

    const userRoleResponse = await authAxios.get(`http://localhost:8080/profile/getRole/${userId}`);
    const newAccessToken = userRoleResponse.headers["x-new-access-token"];
    setCache("prefetchedUserRole", userRoleResponse.data);

    if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
    }
    if (userRoleResponse.data === "ROLE_RECRUITER") {
        import(/* webpackPrefetch: true */ "../components/Profiles/HR/ProfileHR")
        const openVacanciesResponse = await authAxios.get(`http://localhost:8080/job-vacancy/getVacanciesByHr/${userId}?page=0&size=3`);
        setCache("prefetchedOpenVacancies", openVacanciesResponse.data)
    } else if (userRoleResponse.data === "ROLE_EMPLOYEE") {
        import(/* webpackPrefetch: true */ "../components/Profiles/Employee/ProfileEmployee")
    }
}

export const prefetchSettingsData = async () => {
    const userId = localStorage.getItem("id")
    import(/* webpackPrefetch: true */ "../components/ProfileSetting/ProfileSetting")
    const userDataResponse = await authAxios.get(`http://localhost:8080/profile/getUserInfo/${userId}`);
    setCache("prefetchedUserData", userDataResponse.data);

    const userRoleResponse = await authAxios.get(`http://localhost:8080/profile/getRole/${userId}`);
    const newAccessToken = userRoleResponse.headers["x-new-access-token"];
    setCache("prefetchedUserRole", userRoleResponse.data);

    if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
    }
}

export const prefetchHomeData = async () => {
    import(/* webpackPrefetch: true */ "../components/Home/Home");
}

export const prefetchLoginData = async () => {
    import(/* webpackPrefetch: true */ "../components/Security/Security");
}

export const prefetchVideoChatData = async () => {
    import(/* webpackPrefetch: true */ "../components/VideoChat/VideoChat");
}

export const prefetchCreateData = async () => {
    import(/* webpackPrefetch: true */ "../components/VacancyCreator/VacancyCreator");
}
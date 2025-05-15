import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { prefetchCatalogData, prefetchProfileData } from "./preFetchers";
import { getCache } from "./memoryCashe";

type Props = {
    children: React.ReactNode;
};

export const PagePredictor = ({ children }: Props) => {
    const location = useLocation();

    useEffect(() => {
        const currentPage = location.pathname.replace("/", "") || "home";
        console.log(currentPage);

        axios.post("http://localhost:8080/ml/predict", { currentPage })
            .then((res) => {
                const nextPage = res.data.nextPage;
                prefetchPage(nextPage);
            })
            .catch((err) => {
                console.error("Prediction error:", err);
            });
    }, [location.pathname]);

    const prefetchPage = async (page: string) => {
        switch (page) {
            case "catalog":
                await  prefetchCatalogData();
                console.log("prefetch Catalog");
                break;
            case "profile":
                await prefetchProfileData();
                console.log("prefetch Profile");
                break;
            case "home":
                import(/* webpackPrefetch: true */ "../components/Home/Home");
                console.log("prefetch Home");
                break;
            case "login":
                import(/* webpackPrefetch: true */ "../components/Security/Security");
                console.log("prefetch Security");
                break;
            case "settings":
                import(/* webpackPrefetch: true */ "../components/ProfileSetting/ProfileSetting");
                console.log("prefetch Settings");
                break;
            case "videoChat":
                import(/* webpackPrefetch: true */ "../components/VideoChat/VideoChat");
                console.log("prefetch VideoChat");
                break;
            case "create":
                import(/* webpackPrefetch: true */ "../components/VacancyCreator/VacancyCreator");
                console.log("prefetch VacancyCreator");
                break;
            default:
                break;
        }
    };

    return <>{children}</>;
};

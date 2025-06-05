import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
    prefetchCatalogData, prefetchCreateData,
    prefetchHomeData,
    prefetchLoginData,
    prefetchProfileData,
    prefetchSettingsData, prefetchVideoChatData
} from "./preFetchers";

type Props = {
    children: React.ReactNode;
};

    export const PagePredictor = ({ children }: Props) => {
    const location = useLocation();

    useEffect(() => {
        const pathSegments = location.pathname.split("/").filter(Boolean);

        let currentPage = pathSegments[0] || "home";
        if (pathSegments[1] === "settings") {
            currentPage = pathSegments[1]
        }
        else if (pathSegments[0] === "video-chat"){
            currentPage = "videoChat"
        }
        else if (pathSegments[1] === "create")
            currentPage = pathSegments[1]

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
                //await prefetchProfileData();
                console.log("prefetch Profile");
                break;
            case "home":
                await prefetchHomeData();
                console.log("prefetch Home");
                break;
            case "login":
              await prefetchLoginData()
                console.log("prefetch Security");
                break;
            case "settings":
                await prefetchSettingsData()
                console.log("prefetch Settings");
                break;
            case "videoChat":
                await prefetchVideoChatData()
                console.log("prefetch VideoChat");
                break;
            case "create":
                await prefetchCreateData()
                console.log("prefetch VacancyCreator");
                break;
            default:
                break;
        }
    };

    return <>{children}</>;
};

import React from 'react';
import Text from "../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";
import "./404Error.scss";

function ErrorPage()
{
    const { t } = useTranslation();
    return (
        <div id="error-page">
            <div id="error-page-content-wrapper">
                <Text fontSize={64} as="h1">{t("errorPage.error")}</Text>
                <Text fontSize={24}>{t("errorPage.description")}</Text>
            </div>
        </div>
    );
}

export default ErrorPage;
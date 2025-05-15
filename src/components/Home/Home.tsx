import React from 'react';
import "./Home.scss"
import Button from "../../reusableComponents/button/Button";
import { useTranslation } from "react-i18next";
import Text from "../../reusableComponents/text/Text";
import { FaXTwitter, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    return (
        <div id="home">
            <div className="home-circles" id="home-circle-small-1"></div>
            <div className="home-circles" id="home-circle-small-2"></div>
            <div className="home-circles home-gradient-1" id="home-circle-big-1"></div>
            <div className="home-circles home-gradient-2" id="home-circle-big-2"></div>
            <div id="home-buttons-wrapper">
                <Button fontSize={28} buttonText={t("homePage.jobSearch")} className="home-buttons" onClick={() => navigate("/catalog")}/>
                <Button fontSize={28} buttonText={t("homePage.postAd")} buttonColor="pink" className="home-buttons"/>
            </div>
            <div id="home-additional-info-wrapper">
            <Text fontSize={50} as="h1">{t("homePage.featuredAds")}</Text>
                <div id="home-additional-info-block-wrapper">
                    <div className="home-additional-info-block">
                        <Text fontSize={27} as="h2">{t("homePage.addResume")}</Text>
                        <Text fontSize={27}>{t("homePage.addResumeDescription")}</Text>
                        <div id="home-additional-info-block-buttons-wrapper">
                            <Button fontSize={27} buttonText={t("homePage.create")} buttonColor="green" className="home-additional-info-block-button"/>
                            <Button fontSize={27} buttonText={t("homePage.downloadFile")} buttonColor="primary" className="home-additional-info-block-button"/>
                        </div>
                    </div>
                    <div className="home-additional-info-block">
                        <Text fontSize={27} as="h2">{t("homePage.howPrepareForInterview")}</Text>
                        <Text fontSize={27}>
                            {t("homePage.tipsFromHR.tipsFrom")} <span>{t("homePage.tipsFromHR.headHr")}</span>
                            {t("homePage.tipsFromHR.at")} <span>{t("homePage.tipsFromHR.google")}</span>
                        </Text>
                        <Button fontSize={27} buttonText={t("homePage.readMore")} buttonColor="grey"
                                className="home-additional-info-block-button" id="home-additional-info-block-right-button"/>
                    </div>
                </div>
                <div id="recommended-vacancies-wrapper">
                    <div id="recommended-vacancies-text-wrapper">
                    <Text fontSize={30} as="h2">{t("homePage.featuredAdsForYou")}</Text>
                    <Text fontSize={30} as="a">{t("homePage.articles")}</Text>
                    </div>

                </div>
                <footer>
                    <div id="footer-left-wrapper">
                        <div className="footer-left-block">
                            <Text fontSize={27} as="a">{t("homePage.contacts")}</Text>
                            <Text fontSize={27} as="a">{t("homePage.help")}</Text>

                        </div>
                        <div className="footer-left-block">
                            <Text fontSize={27} as="a">{t("homePage.aboutUs")}</Text>
                            <Text fontSize={27} as="a">{t("homePage.ourPartners")}</Text>
                        </div>
                    </div>
                    <div id="footer-right-wrapper">
                        <Text fontSize={27}>{t("homePage.socialNetworks")}</Text>
                        <div id="footer-right-social-networks-wrapper">
                            <div className="social-networks-button">
                                <FaFacebookF size={25} />
                            </div>
                            <div className="social-networks-button">
                                <FaInstagram size={25} />
                            </div>
                            <div className="social-networks-button">
                                <FaXTwitter size={25} />
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Home;
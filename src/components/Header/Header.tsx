import React, { useState } from 'react';
import './Header.css';
import Text from "../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";
import { useAuth } from '../../utils/AuthContext';

const Header: React.FC = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const { t, i18n } = useTranslation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            window.location.href = "/catalog";
        }
    };

    const handleLanguageChange = React.useCallback((lang: string) => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang).then(() => {
                localStorage.setItem('selectedLanguage', lang); // Зберігаємо вибрану мову
            });
        }
    }, [i18n]);

    return (
        <header className="header">
            <div className="left-nav">
                <div className="logo">
                    <Text className="mainLogo" fontSize={30} as="a" href="/">Quaero</Text>
                    <Text fontSize={13} as="p">vacancies for you</Text>
                </div>
                <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
                    <button className="search-button" onClick={toggleSearch}>
                        <div className="search-icon-wrapper">
                            <img className="search-icon" src="/images/header/Search.svg" alt="search-icon" />
                        </div>
                    </button>
                </div>
            </div>
            <nav className="nav">
                {isLoggedIn ? (
                    <>
                        <Text className="right-nav" fontSize={25} as="a" href="/notifications">
                            {t("header.messages")}
                        </Text>
                        <Text className="right-nav" fontSize={25} as="a" href="/profile">
                            {t("header.profile")}
                        </Text>
                        <button onClick={() => setIsLoggedIn(false)}>
                            {t("header.logout")}
                        </button>
                    </>
                ) : (
                    <Text className="right-nav" fontSize={25} as="a" href="/login">
                        {t("header.loginNav")}
                    </Text>
                )}
            </nav>
            <div className="language-switcher">
                <button
                    onClick={() => handleLanguageChange('en')}
                    className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                >
                    EN
                </button>
                |
                <button
                    onClick={() => handleLanguageChange('uk')}
                    className={`lang-btn ${i18n.language === 'uk' ? 'active' : ''}`}
                >
                    UA
                </button>
            </div>
        </header>
    );
};

export default Header;

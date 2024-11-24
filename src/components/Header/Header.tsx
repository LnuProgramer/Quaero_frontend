import React, { useState } from 'react';
import './Header.css';
import Text from "../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

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
                            <img className="search-icon" src="/images/header/Search.svg"
                                 alt="search-icon" />
                        </div>
                    </button>
                    <input
                        type="text"
                        className="search-input"
                        value={searchText}
                        onChange={handleSearchChange}
                        placeholder={t("header.searchPlaceHolder")}
                    />
                </div>
            </div>
            <nav className="nav">
                {isLoggedIn ? (
                    <>
                        <Text className="right-nav"  fontSize={25} as="a" href="/vacancies">
                            {t("header.vacancies")}
                        </Text>
                        <Text className="right-nav"  fontSize={25} as="a" href="/notifications">
                            {t("header.messages")}
                        </Text>
                        <Text className="right-nav"  fontSize={25} as="a" href="/profile">
                            {t("header.profile")}
                        </Text>
                    </>
                ) : (
                    <Text className="right-nav" fontSize={25} as="a" href="/login">
                        {t("header.loginNav")}
                    </Text>
                )}
            </nav>
        </header>
    );
};

export default Header;

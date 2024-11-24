import React, { useState } from 'react';
import './Header.css';
import Text from "../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

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
                    <Text fontSize={30} as="h1">Quaero</Text>
                    <Text fontSize={13} as="p">vacancies for you</Text>
                </div>
                <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
                    <button className="search-button" onClick={toggleSearch}>
                        <div className="search-icon-wrapper">
                            <img className="search-icon" src="/images/header/Search.svg"
                                 alt="search-icon"></img>
                        </div>
                    </button>
                    <input
                        type="text"
                        className="search-input"
                        value={searchText}
                        onChange={handleSearchChange}
                        placeholder={t("header.seacrhPlaceHolder")}
                    />
                </div>
            </div>
            <nav className="nav">
                <Text id="login" fontSize={25} as="a" href="/login">
                    {t("header.loginNav")}
                </Text>
            </nav>
        </header>
    );
};

export default Header;

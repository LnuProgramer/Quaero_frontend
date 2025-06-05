import React, { useEffect, useState } from 'react';
import './Header.scss';
import Text from "../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";
import { useAuth } from '../../utils/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { markRenderStart} from "../../utils/measureRender";

function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const { t, i18n } = useTranslation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("id"))
            setIsLoggedIn(true)
        else
            setIsLoggedIn(false);
    }, []);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            markRenderStart()
            navigate("/catalog")
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
                    <Text className="mainLogo" fontSize={30} as="a">
                        <Link to={"/"} onClick={() => markRenderStart()}>Quaero</Link></Text>
                    <Text fontSize={13} as="p">Jobs for you</Text>
                </div>
                <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
                    <button className="search-button" onClick={toggleSearch}>
                        <div className="search-icon-wrapper">
                            <img className="search-icon" src={"/images/header/Search.svg"} alt="search-icon" />
                        </div>
                    </button>
                </div>
            </div>
            <nav className="nav">
                {isLoggedIn ? (
                    <>
                        <Text className="right-nav" fontSize={25} as="span">
                            <Link to={"/video-chat"} onClick={() => markRenderStart()}>
                            {t("header.messages")}
                            </Link>
                        </Text>
                        <Text className="right-nav" fontSize={25} as="span">
                            <Link to={`/profile/${localStorage.getItem("id")}`} onClick={() => markRenderStart()}>
                            {t("header.profile")}
                            </Link>
                        </Text>
                    </>
                ) : (
                    <Text className="right-nav" fontSize={25} as="span">
                        <Link to={"/login"} onClick={() => markRenderStart()}>
                        {t("header.loginNav")}
                        </Link>
                    </Text>
                )}
            </nav>
            <div className="language-switcher">
                <button
                    onClick={() => handleLanguageChange('en')}
                    className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                >
                    EN{''}
                </button>
                |{''}
                <button
                    onClick={() => handleLanguageChange('uk')}
                    className={`lang-btn ${i18n.language === 'uk' ? 'active' : ''}`}
                >
                    UA
                </button>
            </div>
        </header>
    );
}

export default Header;

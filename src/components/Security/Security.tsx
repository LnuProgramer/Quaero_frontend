import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Security.css';
import Text from "../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { markRenderEnd } from "../../utils/measureRender";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

function Security() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:8080/auth/signIn', {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('id', response.data.userId);
        return;
      } else {
        if (!formData.role) {
          alert(t("security.roleRequired"));
          return;
        }

        const response = await axios.post('http://localhost:8080/auth/signUp', {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('id', response.data.userId);
        return;
      }
    } catch (error) {
      console.error('Auth error', error);
    } finally {
      navigate("/")
    }
  };

  useEffect(() => {
    markRenderEnd("Login")
  }, []);
  return (
      <div className="page-container">
        <div className="form-container">
          <div className="avatar-container">
            <div className="avatar">
              <img className="avatarSvg" src="/images/profile/UserDefaultPhoto.svg" alt="profile-photo"/>
            </div>
          </div>
          <div className="form-toggle">
            <button
                className={`toggle-button ${isLogin ? 'active' : 'inactive'}`}
                onClick={() => setIsLogin(true)}
            >
              {t("security.setLogin")}
            </button>
            <button
                className={`toggle-button ${!isLogin ? 'active' : 'inactive'}`}
                onClick={() => setIsLogin(false)}
            >
              {t("security.setRegister")}
            </button>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <Text fontSize={20} as="p">{t("security.inputEmail")}</Text>
            <input
                className="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            {!isLogin && (
                <div className="additional-fields">
                  <Text fontSize={20} as="p">{t("security.inputFirstName")}</Text>
                  <input
                      className="input"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                  />
                  <Text fontSize={20} as="p">{t("security.inputLastName")}</Text>
                  <input
                      className="input"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                  />
                </div>
            )}
            <Text fontSize={20} as="p">{t("security.inputPassword")}</Text>
            <input
                className="input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
            />
            {!isLogin && (
                <div className="form-group role-selection">
                  <Text fontSize={20} as="p">{t("security.labelRole")}</Text>
                  <div className="role-options">
                    <label>
                      <input
                          type="radio"
                          name="role"
                          value="ROLE_RECRUITER"
                          onChange={handleInputChange}
                          required
                      />
                      {t("security.optionEmployer")}
                    </label>
                    <label>
                      <input
                          className="radio"
                          type="radio"
                          name="role"
                          value="ROLE_EMPLOYEE"
                          onChange={handleInputChange}
                          required
                      />
                      {t("security.optionEmployee")}
                    </label>
                  </div>
                </div>
            )}
            <button className="submit-button" type="submit">
              {isLogin ? t("security.submitLogin") : t("security.submitRegister")}
            </button>
          </form>
        </div>
      </div>
  );
}

export default Security;

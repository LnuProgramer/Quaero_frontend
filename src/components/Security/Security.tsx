import React, { useState } from 'react';
import axios from 'axios';
import './Security.css';
import Text from "../../reusableComponents/text/Text";
import { useTranslation } from "react-i18next";

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

const Security: React.FC = () => {
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
        const response = await axios.post('/auth/login', {
          usernameOrEmail: formData.email,
          password: formData.password,
        });
        console.log('Login successful', response.data);
      } else {
        if (!formData.role) {
          alert(t("security.roleRequired"));
          return;
        }

        const response = await axios.post('/auth/register', {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        });
        console.log('Registration successful', response.data);
      }
    } catch (error) {
      console.error('Auth error', error);
    }
  };

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
                          value="employer"
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
                          value="employee"
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
};

export default Security;

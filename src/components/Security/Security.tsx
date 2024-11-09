import React, { useState } from 'react';
import axios from 'axios';
import './Security.css';

interface FormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const Security: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
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
        const response = await axios.post('/auth/register', {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="form-toggle">
          <button className={`toggle-button ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Увійти</button>
          <button className={`toggle-button ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Зареєструватись</button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Електронна адреса"
            required
          />
          {!isLogin && (
            <input
              className="input"
              type="text"
              name="fullName"
              value={`${formData.firstName} ${formData.lastName}`}
              onChange={handleInputChange}
              placeholder="Ім'я та Прізвище"
              required
            />
          )}
          <input
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Пароль"
            required
          />
          <button className="submit-button" type="submit">
            {isLogin ? 'Увійти' : 'Зареєструватись'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Security;
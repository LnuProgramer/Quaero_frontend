import React, { useEffect, useState } from 'react';
import ProfileEmployee from "./Employee/ProfileEmployee";
import ProfileHR from "./HR/ProfileHR";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
    const [role, setRole] = useState(null);
    const { id } = useParams<{ id: string }>(); // Отримуємо ID з URL

    useEffect(()  => {
        const fetchRole = async () => {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:8080/getRole/${id}`);
                    setRole(response.data);
                }
            } catch (error) {
                console.error("Помилка під час отримання ролі:", error);
            }
        };
        fetchRole();
    }, [])

    return (
        <div>{
            role === "hr" ? (<ProfileHR />)
            : role === "employee" && (<ProfileEmployee />)
        }
        </div>
    );
}

export default Profile;
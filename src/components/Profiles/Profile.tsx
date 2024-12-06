import React, { useEffect, useState } from 'react';
import ProfileEmployee from "./Employee/ProfileEmployee";
import ProfileHR from "./HR/ProfileHR";
import axios from "axios";
import { useParams } from "react-router-dom";
import Text from "../../reusableComponents/text/Text";

function Profile() {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchRole = async () => {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:8080/getRole/${id}`);
                    setRole(response.data);
                }
            } catch (error) {
                console.error("Помилка під час отримання ролі:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRole();
    }, [id]);

    if (!id) {
        return <Text fontSize={24}>Invalid user ID</Text>;
    }

    if (loading) {
        return <Text fontSize={24}>Loading...</Text>;
    }

    return (
        <div>
            {role === "ROLE_RECRUITER" ? (
                <ProfileHR userID={id} />
            ) : role === "ROLE_EMPLOYEE" ? (
                <ProfileEmployee userID={id} />
            ) : (
                <div>Role not recognized</div>
            )}
        </div>
    );
}

export default Profile;

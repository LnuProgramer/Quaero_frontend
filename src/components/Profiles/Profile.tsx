import React, { useEffect, useState } from 'react';
import ProfileEmployee from "./Employee/ProfileEmployee";
import ProfileHR from "./HR/ProfileHR";
import axios from "axios";
import { useParams } from "react-router-dom";
import Text from "../../reusableComponents/text/Text";
import Loader from "../../reusableComponents/loader/Loader";

function RoleCheck(role: string | null, id: string) {
    if (role === "ROLE_RECRUITER") {
        return <ProfileHR hrID={id}/>
    } else if (role === "ROLE_EMPLOYEE") {
        return <ProfileEmployee employeeID={id}/>
    } else {
        return <div>Role not recognized</div>
    }
}

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
        (async () => {
            await fetchRole();
        })()
    }, [id]);

    if (!id) {
        return <Text fontSize={24}>Invalid user ID</Text>;
    }

    if (loading) {
        return <Loader />;
    }

    return (
        RoleCheck(role, id)
    );
}

export default Profile;

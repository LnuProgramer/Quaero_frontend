import React, { useEffect, useState } from 'react';
import ProfileEmployee from "./Employee/ProfileEmployee";
import ProfileHR from "./HR/ProfileHR";
import { useParams } from "react-router-dom";
import Text from "../../reusableComponents/text/Text";
import Loader from "../../reusableComponents/loader/Loader";
import authAxios from "../../utils/authAxios";
import { clearCache, getCache } from "../../utils/memoryCashe";

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
                const cachedUserRole = getCache("prefetchedUserRole");
                if (cachedUserRole){
                    clearCache("prefetchedUserRole")
                    setRole(cachedUserRole);
                }
                else {
                    if (id) {
                        const response = await authAxios.get(`http://localhost:8080/profile/getRole/${id}`);
                        const newAccessToken = response.headers["x-new-access-token"];
                        if (newAccessToken) {
                            localStorage.setItem("accessToken", newAccessToken);
                        }
                        setRole(response.data);
                    }
                }
            } catch (error) {
                console.error("Error while fetching role:", error);
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
        return <Loader />;
    }

    return (
        RoleCheck(role, id)
    );
}

export default Profile;

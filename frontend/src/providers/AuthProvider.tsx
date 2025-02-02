// React imports
import { useEffect, useState, ReactNode } from "react";

// Clerk Imports
import { useAuth } from "@clerk/clerk-react"

// Axios Instance
import axiosInstance from "@/lib/axios";

// Auth Store
import { useAuthStore } from "@/store/useAuthStore";

// Shared imports
import Loader from "@/shared/Loader";

// Function for updating API token 
const updateAPIToken = (token: string | null) => {
    if (token) {
        // Setting token 
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["Authorization"]; // deleting token
    }
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { getToken } = useAuth();
    const { checkAdminStatus } = useAuthStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateAPIToken(token);

                if (token) {
                    await checkAdminStatus();
                }
            } catch (error: any) {
                console.error("Error in auth provider : ", error.message);
            } finally {
                setLoading(false);
            }
        }

        initAuth();
    }, [getToken, checkAdminStatus]);

    if (loading) return <Loader />

    return (
        <div>{children}</div>
    )
}

export default AuthProvider;
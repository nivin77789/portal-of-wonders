import { useState, useEffect } from "react";

export interface UserProfile {
    initialWeight: number;
    height: number;
    startDate: string;
    endDate: string;
}

export const useAuth = () => {
    // Real implementation would use Firebase Auth
    // For now, mock a user if "isAuthenticated" is true
    const [user, setUser] = useState<{ uid: string } | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const isAuth = localStorage.getItem("isAuthenticated") === "true";
        if (isAuth) {
            setUser({ uid: "mock-user-id" });
            setUserProfile({
                initialWeight: 75,
                height: 180,
                startDate: "2024-01-01",
                endDate: "2024-03-15",
            });
        }
    }, []);

    return { user, userProfile };
};

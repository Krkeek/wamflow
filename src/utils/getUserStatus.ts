import {jwtDecode} from "jwt-decode";
import {IGetUserStatus} from "../../declarations";



export const getUserStatus =  (): IGetUserStatus => {

    let isLoggedIn = false;
    if (document.cookie) {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('JWT='))
            ?.split('=')[1];

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // @ts-ignore
                isLoggedIn = decodedToken.exp > Date.now() / 1000;
            } catch (e) {
                isLoggedIn = false;
            }
        } else {
            isLoggedIn = false;
        }
    }


    const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
        return null;
    };

    const userInfoCookie = getCookie("userInfo");

    let userInfo = null;

    if (userInfoCookie) {
        try {
            const decodedCookie = decodeURIComponent(userInfoCookie);
            userInfo = JSON.parse(decodedCookie);
        } catch (error) {
            console.error("Error parsing userInfo:", error);
        }
    } else {
        console.log("userInfo cookie not found");
    }

    return {
        isLoggedIn: isLoggedIn,
        userInfo: userInfo,
    };
};

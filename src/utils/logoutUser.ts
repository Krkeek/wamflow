import {redirect} from "next/navigation";

export const logoutUser = () => {
    document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    redirect('/');
}
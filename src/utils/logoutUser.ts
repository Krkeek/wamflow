import { redirect } from "next/navigation";

export const logoutUser = async () => {

    const response = await fetch('/api/v1/auth/blacklist',{
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    });
    const responseBody = await response.json()
    if(responseBody.success) {
        redirect('/');
    }
};

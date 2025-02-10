
export const logoutUser = async () => {


    const response = await fetch('/api/v1/auth/blacklist',{
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    });
    const result = await response.json();
    return result.success;

};

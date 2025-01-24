
export const validPassword = (password: string) =>{

    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const validLength = password.length >= 8 && password.length<= 20

    return {"hasUpperCase": hasUpperCase, "hasNumber": hasNumber , "validLength": validLength}
}
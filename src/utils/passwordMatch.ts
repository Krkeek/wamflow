
export const passwordMatch= (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
}
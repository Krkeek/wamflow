
export const passwordMatch= (password: FormDataEntryValue | null, confirmPassword: FormDataEntryValue | null): boolean => {
    return password === confirmPassword;
}
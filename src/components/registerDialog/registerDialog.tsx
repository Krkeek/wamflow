"use client";
import styles from './registerDialog.module.css';
import Image from "next/image";
import { FormEvent, useState } from "react";
import { setNotificationBox } from "@/libs/redux/features/notificationBoxSlice";
import { useAppDispatch } from "@/libs/redux/hooks";
import { passwordMatch } from "@/utils/passwordMatch";
import { signInWithProvider } from "@/server/utils/signInWithProvider";
import { setUserStatus } from "@/libs/redux/features/userStatusSlice";
import { getUserStatus } from "@/utils/getUserStatus";
import { setIsLoading } from "@/libs/redux/features/loadingSlice";
import { SIGN_IN_PROVIDER } from "@/constants";

interface RegisterDialogProps {
    isOpen: boolean;
    setIsOpenAction: (isOpen: boolean) => void;
}

const RegisterDialog = ({ isOpen, setIsOpenAction }: RegisterDialogProps) => {
    const dispatch = useAppDispatch();
    const [isRegister, setIsRegister] = useState(false);

    const closeDialog = () => {
        setIsOpenAction(false);
        setIsRegister(false);
    };

    const showNotification = (message: string, isWarning: boolean) => {
        dispatch(setNotificationBox({ message, isWarning }));
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        dispatch(setIsLoading(true));
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const requestData = {
            email: formData.get("email"),
            password: formData.get("password"),
            name: formData.get("name"),
        };

        let responseBody;
        if (isRegister) {
            if (passwordMatch(formData.get("password"), formData.get("confirmPassword"))) {
                responseBody = await submitRegistration(requestData);
            } else {
                showNotification("Passwords don't match", true);
            }
        } else {
            responseBody = await submitLogin(requestData);
        }

        handleResponse(responseBody);
        dispatch(setIsLoading(false));
    };

    const submitRegistration = async (data: any) => {
        const response = await fetch('/api/v1/users/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    };

    const submitLogin = async (data: any) => {
        const response = await fetch('/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    };

    const handleResponse = (responseBody: any) => {
        if (!responseBody.success) {
            showNotification(responseBody.message, true);
        } else {
            const username = getUserStatus().userInfo?.accountDetails.name;
            dispatch(setNotificationBox({ message: `Logged in as ${username}` }));
            dispatch(setUserStatus(getUserStatus()));
            closeDialog();
        }
    };

    const handleSubmitWithProvider = async (provider: string) => {
        dispatch(setIsLoading(true));
        const signInResult = await signInWithProvider(provider);

        if (signInResult.success) {
            const { accessToken, userInfo, isNewUser } = signInResult;
            const endpoint = isNewUser ? '/api/v1/users/register/' : '/api/v1/users/login/';
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    userInfo,
                    isNewUser,
                }),
            });

            const responseBody = await response.json();
            handleResponse(responseBody);
        } else {
            showNotification("Error with provider: " + signInResult.message, true);
        }
        dispatch(setIsLoading(false));
    };

    if (!isOpen) return null;

    return (
        <form onSubmit={handleFormSubmit}>
            <div className={`${styles.Container}`}>
                <div className={`${styles.ContentContainer}`}>
                    <Image
                        onClick={closeDialog}
                        src={'/assets/close.webp'}
                        width={20}
                        height={20}
                        className={`${styles.CloseButton}`}
                        alt={'close'}
                    />
                    <div className={`${styles.Title}`}>{isRegister ? "Let's get started" : "Welcome back!"}</div>
                    {isRegister && (
                        <>
                            <label className={`${styles.Label}`}>Name</label>
                            <input required autoComplete="given-name" className={`${styles.Input}`} placeholder={'Matze Lippmann'} type="text" name={'name'} />
                        </>
                    )}
                    <label className={`${styles.Label}`}>Email</label>
                    <input required autoComplete="email" className={`${styles.Input}`} type="email" placeholder={"matze_lippmann@hotmail.com"} name={'email'} />
                    <label className={`${styles.Label}`}>Password</label>
                    <input required className={`${styles.Input}`} type='password' name={'password'} />
                    {isRegister && (
                        <>
                            <label className={`${styles.Label}`}>Confirm Password</label>
                            <input required className={`${styles.Input}`} type="password" name={'confirmPassword'} />
                        </>
                    )}
                    <button type={"submit"} className={`${styles.Button}`}>{isRegister ? "Register" : "Sign in"}</button>
                    <div className={`${styles.LoginSentence}`}>
                        {isRegister ? "Already have an account? " : "Create a new account? "}
                        <span onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Sign in" : "Register"}</span>
                    </div>
                    <button onClick={() => handleSubmitWithProvider(SIGN_IN_PROVIDER.GOOGLE)} type={"button"} className={`${styles.Button} ${styles.ProviderButton}`}>
                        <Image className={`${styles.OtherButtonImage}`} width={15} height={15} src={'/assets/google.webp'} alt={'google'} />
                        Sign in with Google
                    </button>
                    <button onClick={() => handleSubmitWithProvider(SIGN_IN_PROVIDER.GITHUB)} type={"button"} className={`${styles.Button} ${styles.ProviderButton}`}>
                        <Image className={`${styles.OtherButtonImage}`} width={15} height={15} src={'/assets/github.webp'} alt={'github'} />
                        Sign in with Github
                    </button>
                </div>
            </div>
        </form>
    );
};

export default RegisterDialog;
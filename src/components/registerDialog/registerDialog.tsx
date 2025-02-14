"use client"
import styles from './registerDialog.module.css'
import Image from "next/image";
import {FormEvent, useState} from "react";
import {redirect} from "next/navigation";
import {setNotificationBox} from "@/libs/redux/features/notificationBoxSlice";
import {useAppDispatch} from "@/libs/redux/hooks";
import {passwordMatch} from "@/utils/passwordMatch";
import {signInWithGoogle} from "@/server/utils/signInWithGoogle";
import {setUserStatus} from "@/libs/redux/features/userStatusSlice";
import {getUserStatus} from "@/utils/getUserStatus";

interface RegisterDialogProps {
    isOpen: boolean;
    setIsOpenAction: (isOpen: boolean) => void;
}

export const RegisterDialog = ({isOpen, setIsOpenAction}: RegisterDialogProps) => {

    const dispatch = useAppDispatch()
    const [isRegister, setIsRegister] = useState(false);
    const closeDialog = () => {
        setIsOpenAction(false);
        setIsRegister(false)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{

        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        if (isRegister) {
            if (passwordMatch(formData.get('password'), formData.get('confirmPassword'))){
                const response = await fetch('/api/v1/users/register',{
                    method: "POST",
                    headers:{
                        "Content-Type" : "application/json",
                        "Access-Control-Allow-Origin" : "*"
                    },
                    body: JSON.stringify({
                        email: formData.get('email'),
                        password: formData.get('password'),
                        name: formData.get('name'),
                    })

                });
                const responseBody = await response.json()
                if (!responseBody.success){
                    console.log(responseBody.success)
                    dispatch(setNotificationBox({message: responseBody.message + ": "+responseBody.additionalInformation, isWarning: true}))

                }
                else {
                    //Task success
                    const username = getUserStatus().userInfo?.accountDetails.name;
                    dispatch(setNotificationBox({message:`Logged in as ${username}`}));
                    dispatch(setUserStatus(getUserStatus()));
                    closeDialog();
                }
            }
            else {
                dispatch(setNotificationBox({message: "Passwords don't match", isWarning: true}))
            }
        }
        else {
            const response = await fetch('/api/v1/users/login',{
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    "Access-Control-Allow-Origin" : "*"
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password')
                })
            });
            const responseBody = await response.json();
            if (!responseBody.success){
                dispatch(setNotificationBox({message: responseBody.message, isWarning: true}));
            }
            else {
                //Task success
                const username = getUserStatus().userInfo?.accountDetails.name;
                dispatch(setNotificationBox({message:`Logged in as ${username}`}));
                dispatch(setUserStatus(getUserStatus()));
                closeDialog();
            }

        }
    }

    const googleSubmit = async () => {
        const googleSignInResult = await signInWithGoogle();
        if (googleSignInResult.status){
            const response = await fetch('/api/v1/users/login/google',{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json",
                    "Access-Control-Allow-Origin" : "*"
                },
                body: JSON.stringify({
                    googleSignInResult: googleSignInResult,

                })
            });
            const responseBody = await response.json()
        }
    }

    if (!isOpen) return null;

    return (
        <>
        {isOpen && (
            <form onSubmit={handleSubmit}>
                <div className={`${styles.Container}`}>
                    <div className={`${styles.ContentContainer}`}>
                        <Image onClick={closeDialog} src={'/assets/close.webp'} width={20} height={20}
                               className={`${styles.CloseButton}`} alt={'close'}/>
                        <div
                            className={`${styles.Title}`}>   {isRegister ? "Let's get started" : "Welcome back!"}</div>
                        {isRegister && (
                            <>
                                <label className={`${styles.Label}`}>Name</label>
                                <input required autoComplete="given-name" className={`${styles.Input}`}
                                       placeholder={'Matze Lippmann'} type="text" name={'name'}/>
                            </>
                        )}
                        <label className={`${styles.Label}`}>Email</label>
                        <input required autoComplete="email" className={`${styles.Input}`} type="email"
                               placeholder={"matze_lippmann@hotmail.com"} name={'email'}/>
                        <label className={`${styles.Label}`}>Password</label>
                        <input required className={`${styles.Input}`} type='password' name={'password'}/>
                        {isRegister && (
                            <>
                                <label className={`${styles.Label}`}>Confirm Password</label>
                                <input required className={`${styles.Input}`} type="password" name={'confirmPassword'}/>
                            </>
                        )}
                        <button type={"submit"}
                                className={`${styles.Button}`}>{isRegister ? "Register" : "Sign in"}</button>
                        <div
                            className={`${styles.LoginSentence}`}>{isRegister ? "Already have an account? " : "Create a new account? "}<span
                            onClick={() => setIsRegister(!isRegister)}> {isRegister ? "Sign in" : "Register"}</span>
                        </div>
                        <button type={"button"} className={`${styles.Button} ${styles.ProviderButton}`}>
                            <Image
                                className={`${styles.OtherButtonImage}`} width={15} height={15}
                                src={'/assets/google.webp'} alt={'google'}/>
                            Sign in with Google
                        </button>
                        <button type={"button"} className={`${styles.Button} ${styles.ProviderButton}`}>
                            <Image
                                className={`${styles.OtherButtonImage}`} width={15} height={15}
                                src={'/assets/github.webp'} alt={'github'}/>
                            Sign in with Github
                        </button>

                    </div>
                </div>
            </form>
        )
        }
        </>
    )
}

export default RegisterDialog
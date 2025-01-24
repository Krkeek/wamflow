import styles from './registerDialog.module.css'
import Image from "next/image";
import {useState} from "react";

interface RegisterDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const registerDialog = ({isOpen, setIsOpen}: RegisterDialogProps) => {

    const [isRegister, setIsRegister] = useState(false);

    const closeDialog = () => {
        setIsOpen(false);
        setIsRegister(false)
    }

    if (!isOpen) return null;

    return (
    <>

        {isOpen && (
            <div className={`${styles.Container}`}>
                <div className={`${styles.ContentContainer}`}>
                    <Image onClick={closeDialog} src={'/assets/close.webp'} width={20} height={20} className={`${styles.CloseButton}`} alt={'close'} />
                    <div className={`${styles.Title}`}>   {isRegister ? "Let's get started" : "Welcome back!"}</div>
                    {isRegister && (
                        <>
                            <label className={`${styles.Label}`}>Name</label>
                            <input className={`${styles.Input}`} placeholder={'Matze Lippmann'} type="text"/>
                        </>
                    )}
                    <label className={`${styles.Label}`}>Email</label>
                    <input className={`${styles.Input}`} type="email" placeholder={"matze_lippmann@hotmail.com"}/>
                    <label className={`${styles.Label}`}>Password</label>
                    <input className={`${styles.Input}`} type='password'/>
                    {isRegister && (
                        <>
                            <label className={`${styles.Label}`}>Confirm Password</label>
                            <input className={`${styles.Input}`} type="password"/>
                        </>
                    )}
                    <button className={`${styles.Button}`}>{isRegister ? "Register" : "Sign in"}</button>
                    <div className={`${styles.LoginSentence}`}>{isRegister ? "Already have an account? " : "Create a new account? "}<span onClick={() => setIsRegister(!isRegister)}> {isRegister ? "Sign in" : "Register"}</span></div>

                </div>
            </div>
        )}
    </>
    )
}

export default registerDialog
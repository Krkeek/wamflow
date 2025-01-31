import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from "@/firebase";


interface SuccessResponseData {
    status: boolean;
    user: any
    accessToken?: string;
}

interface FailResponseData {
    status: boolean;
    message: string;
}

export const signInWithGoogle = async (): Promise<SuccessResponseData | FailResponseData> => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider); // Wait for the result of signInWithPopup
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        return {
            status: true,
            user: user,
            accessToken: token,
        };

    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
       /* const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);*/

        return {
            status: false,
            message: errorCode + " : " + errorMessage
        };
    }

};
import { signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import {auth} from "@/firebase";



interface ResponseData {
    success: boolean;
    userInfo?: any;
    message?: string;
    isNewUser?: boolean,
    accessToken?: any,


}

export const signInWithGoogle = async (): Promise<ResponseData> => {
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        if (result){
            const user = result.user;
            const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

            return {
                success: true,
                userInfo: user,
                isNewUser: isNewUser,
                accessToken: await user.getIdToken(),
            };
        }
        else {
            return {
                success: false,
                message: "Error while signInWithGoogle"
            };
        }

    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            success: false,
            message: errorCode + " : " + errorMessage
        };
    }

};
import { signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo, GithubAuthProvider } from "firebase/auth";
import {auth} from "@/firebase";
import {SIGN_IN_PROVIDER} from "@/constants";



interface ResponseData {
    success: boolean;
    userInfo?: any;
    message?: string;
    isNewUser?: boolean,
    accessToken?: any,


}

export const signInWithProvider = async (signInProvider: string): Promise<ResponseData> => {
    let provider;
    if (signInProvider === SIGN_IN_PROVIDER.GOOGLE) {
        provider = new GoogleAuthProvider();
    }
    else if (signInProvider === SIGN_IN_PROVIDER.GITHUB) {
        provider = new GithubAuthProvider();
    }
    else {
        return {
            success: false,
            message: "No signInProvider provided",
        };
    }
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
                message: "Error while signInWithProvider"
            };
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.code
        };
    }
};
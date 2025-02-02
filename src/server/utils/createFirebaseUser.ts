import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/firebase";
import {POSTResponseData} from "@/app/api/v1/users/register/types";
import * as jose from "jose";


export default async function createFirebaseUser(email: string, password: string) {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const JWT = await userCredential.user.getIdToken();
        const decodedJWT = jose.decodeJwt(JWT);


        const responseData: POSTResponseData = {
            success: true,
            message: 'Firebase user created.',
            data: {
                JWT: JWT,
                decodedJWT: decodedJWT
            }
        }
        return responseData

    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code" + errorCode)
        if (errorCode === "auth/email-already-in-use") {
            return {
                success: false,
                message: "Email already exists."
            }
        } else {
            return {
                success: false,
                message: errorCode + " : " + errorMessage
            }
        }
    }
}
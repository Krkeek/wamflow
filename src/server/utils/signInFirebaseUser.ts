import {signInWithEmailAndPassword} from "firebase/auth";
import {User} from "@firebase/auth";
import {auth} from "@/firebase";


export default async function signInFirebaseUser(email: string, password: string):Promise<{status: boolean, message: User | string}> {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in
        return  {
            status: true,
            message: userCredential.user
        }
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code" + errorCode)
        if (errorCode === "auth/invalid-email" || errorCode === "auth/invalid-credential") {
            return {
                status: false,
                message: "Invalid Email or password"
            }
        } else {
            return {
                status: false,
                message: errorCode + " : " + errorMessage
            }
        }
    }
}
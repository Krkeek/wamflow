import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/firebase";

export default async function createFirebaseUser(email: string, password: string) {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {
            status: true,
            message: await userCredential.user.getIdToken()
        }
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code" + errorCode)
        if (errorCode === "auth/email-already-in-use") {
            return {
                status: false,
                message: "Email already exists."
            }
        } else {
            return {
                status: false,
                message: errorCode + " : " + errorMessage
            }
        }
    }
}
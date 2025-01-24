import {auth} from "@/firebase";

export const  deleteFirebaseUser = async () => {
    auth.currentUser?.delete()
        .then(()=>{
            console.log("User Deleted.")
        })
        .catch((reason)=>{
            console.log("Error Deleting the user!")
        })
}
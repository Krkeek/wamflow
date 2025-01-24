import {User} from "@/server/models/User";
import {formatDate} from "@/server/utils/dateConverter";


type UserData = {
    uid: string,
    name: string,
    email: string
}

export const buildUserObject =  (data: UserData): User => {

    return  {
        UID: data.uid,
        accountDetails: {
            name: data.name,
            email: data.email,
        },
        accountCreated: formatDate(new Date()),
        active: true,
        accountPreferences: {
            darkMode: true
        }
    }
}

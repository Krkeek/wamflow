import {User} from "@/server/models/User";
import {formatDate} from "@/server/utils/dateConverter";
import {Property} from "@/server/models/Property";


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
            darkMode: false
        }
    }
}


type PropertyData = {
    elementID: string;
    name: string;
    value: string | boolean;
    type: string;
}


export const buildPropertyObject =  (data: PropertyData): Property => {
    return  {
        elementID: data.elementID,
        userUID: data.elementID,
        name: data.name,
        value: data.value,
        type: data.type,
        accountCreated: formatDate(new Date()),
        active: true,
    }
}

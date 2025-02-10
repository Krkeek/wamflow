import {db} from "@/server/utils/mongoDB";

interface IReturn {
    accountDetails: {
        name: string
        email: string,
    }
    accountCreated: string,
    active: boolean,
    accountPreferences: {
        darkMode: boolean
    }
}

export const getUserInfo = async (userUID: any): Promise<IReturn | null> => {
    const collection = db.collection('users');

    const userInfo = await collection.findOne<IReturn>(
        { UID: userUID },
        { projection: { _id: 0, UID: 0 } }
    );

    return userInfo || null;
};
import { NextRequest, NextResponse } from "next/server";
import { validPassword } from "@/server/utils/validPassword";
import createFirebaseUser from "@/server/utils/createFirebaseUser";
import { buildUserObject } from "@/server/utils/ObjectBuilder";
import { deleteFirebaseUser } from "@/server/utils/deleteFirebaseUser";
import { db } from "@/server/utils/mongoDB";
import { POSTRequestDataSchema } from "@/app/api/v1/users/register/types";
import { BasicResponseData } from "@/app/api/type";
import { POSTRequestDataGoogleSchema } from "@/app/api/v1/users/login/types";
import {setUserCookies} from "@/server/utils/apiHelpers";
import {getUserInfo} from "@/server/utils/getUserInfo";

const insertUserIntoDB = async (userUID: string, name: string, email: string) => {
    try {
        const user = buildUserObject({ uid: userUID, name, email });
        const collection = db.collection("users");
        const result = await collection.insertOne(user);
        return { success: true, insertedId: result.insertedId };
    } catch (error) {
        await deleteFirebaseUser();
        return { success: false, error };
    }
};

const handleFirebaseError = (message: string, status: number = 400) =>
    NextResponse.json<BasicResponseData>({ success: false, message }, { status });

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const normalRegister = POSTRequestDataSchema.safeParse(body);
        const googleRegister = POSTRequestDataGoogleSchema.safeParse(body);

        if (normalRegister.success) {
            const { name, email, password } = normalRegister.data;
            const { hasUpperCase, hasNumber, validLength } = validPassword(password);

            if (!hasUpperCase || !hasNumber || !validLength) {
                return handleFirebaseError("Invalid password", 400);
            }

            const result: BasicResponseData = await createFirebaseUser(email, password);
            if (!result.success) return handleFirebaseError(result.message);

            const { JWT, decodedJWT } = result.data;
            const userUID = decodedJWT.user_id;
            const dbResult = await insertUserIntoDB(userUID, name, email);
            if (!dbResult.success) return handleFirebaseError("Adding User Failed in MongoDB.", 500);
            const userInfo = await getUserInfo(userUID);
            await setUserCookies(JWT, userInfo);

            return NextResponse.json<BasicResponseData>(
                { success: true, message: "User created.", data: dbResult.insertedId },
                { status: 200 }
            );
        }

        if (googleRegister.success) {
            const { userInfo, isNewUser } = googleRegister.data;
            const authHeader = req.headers.get("Authorization");

            if (!authHeader?.startsWith("Bearer ")) return handleFirebaseError("Authorization header missing.", 401);
            const JWT = authHeader.substring(7);
            if (!isNewUser) return handleFirebaseError("This is not a new user, wrong API request.", 500);

            const userUID = userInfo.uid;
            const dbResult = await insertUserIntoDB(userUID, userInfo.displayName, userInfo.email);
            if (!dbResult.success) return handleFirebaseError("Adding User Failed in MongoDB.", 500);
            const userInfoDb = await getUserInfo(userUID);

            await setUserCookies(JWT, userInfoDb);

            return NextResponse.json<BasicResponseData>(
                { success: true, message: "User created.", data: dbResult.insertedId },
                { status: 200 }
            );
        }

        return handleFirebaseError("Invalid request data", 400);
    } catch (error) {
        console.error("Register error:", error);
        return handleFirebaseError("Internal Server Error.", 500);
    }
}
import { NextRequest, NextResponse } from "next/server";
import signInFirebaseUser from "@/server/utils/signInFirebaseUser";
import * as jose from "jose";
import { getUserInfo } from "@/server/utils/getUserInfo";
import { POSTRequestDataGoogleSchema, POSTRequestDataSchema } from "@/app/api/v1/users/login/types";
import {handleAuthError, handleLoginResponse, setUserCookies} from "@/server/utils/apiHelpers";


export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json();
        const normalLogin = POSTRequestDataSchema.safeParse(body);
        const googleLogin = POSTRequestDataGoogleSchema.safeParse(body);

        if (normalLogin.success) {
            const { email, password } = normalLogin.data;
            const result = await signInFirebaseUser(email, password);

            if (!result.status || typeof result.message === "string") {
                return handleAuthError(result.message || "Login failed.", 401);
            }

            const accessToken = await result.message.getIdToken(true);
            const decodedJWT = jose.decodeJwt(accessToken);
            const userUID = decodedJWT.user_id;

            if (!userUID) return handleAuthError("Invalid token: UID not found.");

            const userInfo = await getUserInfo(userUID);
            await setUserCookies(accessToken, userInfo);

            return handleLoginResponse();
        }

        if (googleLogin.success) {
            const { userInfo, isNewUser } = googleLogin.data;
            const authHeader = req.headers.get("Authorization");

            if (!authHeader?.startsWith("Bearer ")) {
                return handleAuthError("Authorization header missing or invalid.", 401);
            }

            const accessToken = authHeader.substring(7);

            if (isNewUser) return handleAuthError("This is a new user, wrong API request.", 500);
            if (!accessToken) return handleAuthError("Access Token is not defined.", 500);

            const userUID = userInfo.uid;
            if (!userUID) return handleAuthError("Invalid token: UID not found.");

            const userInfoData = await getUserInfo(userUID);
            await setUserCookies(accessToken, userInfoData);

            return handleLoginResponse();
        }

        return handleAuthError("Invalid request data", 400);

    } catch (error) {
        console.error("Login error:", error);
        return handleAuthError("Internal Server Error.", 500);
    }
}
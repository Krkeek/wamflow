import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {BasicResponseData} from "@/app/api/type";

export const setUserCookies = async (accessToken: string, userInfo: any) => {
    const cookiesStore = await cookies();
    cookiesStore.set("JWT", accessToken, { secure: true, sameSite: "strict", path: "/" });
    cookiesStore.set("userInfo", JSON.stringify(userInfo), { secure: true, sameSite: "strict", path: "/" });
};
export const handleLoginResponse = () =>
    NextResponse.json<BasicResponseData>({ success: true, message: "User is logged in." }, { status: 200 });

export const handleAuthError = (message: string, status: number = 400) =>
    NextResponse.json<BasicResponseData>({ success: false, message }, { status });

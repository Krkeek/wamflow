import {NextRequest, NextResponse} from "next/server";
import {BasicResponseData} from "@/app/api/type";
import {cookies} from "next/headers";
import {buildUserObject} from "@/server/utils/ObjectBuilder";
import {db} from "@/server/utils/mongoDB";
import {getUserInfo} from "@/server/utils/getUserInfo";
import {POSTResponseData} from "@/app/api/v1/users/register/types";
import {deleteFirebaseUser} from "@/server/utils/deleteFirebaseUser";

type RequestData = {
    userInfo?: any;
    isNewUser?: boolean,
    accessToken?: any;
}


export async function POST (req: NextRequest) {
    try {

        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({
                success: false,
                message: "Authorization header missing or invalid.",
            }, { status: 401 });
        }
        const requestData: RequestData = await req.json();
        const JWT = authHeader.substring(7);
        const cookiesStore = await cookies();

        if (requestData.isNewUser){
            return NextResponse.json<BasicResponseData>({
                success: false,
                message: "Is is a new user, wrong api request",
            },{
                status: 500
            })
        }else {

            if (!JWT) {
                return NextResponse.json<BasicResponseData>({
                    success: false,
                    message: "Access Token is not defined",
                },{
                    status: 500
                })
            }
            else {

                const userUID = requestData.userInfo.uid

                const userInfo = await getUserInfo(userUID);

                cookiesStore.set('JWT',JWT,{
                    sameSite:'none',
                    secure: true
                });

                cookiesStore.set("userInfo", JSON.stringify(userInfo), {
                    sameSite: "none",
                    secure: true,
                    httpOnly: false,

                });

                return NextResponse.json<any>({
                    success: true,
                    userInfo: userInfo
                },{
                    status: 200
                })

            }

        }
    }
    catch (error) {
        return NextResponse.json<BasicResponseData>({
            success: false,
            message: "Error while processing the google account",
        },{
            status: 500
        })
    }
}
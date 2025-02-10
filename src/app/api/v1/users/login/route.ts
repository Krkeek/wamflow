import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import signInFirebaseUser from "@/server/utils/signInFirebaseUser";
import {BasicResponseData} from "@/app/api/type";
import * as jose from "jose";
import {getUserInfo} from "@/server/utils/getUserInfo";


type RequestData = {
    email:string,
    password:string
}

type SuccessResponseData = {
    success: boolean,
    userInfo: any
}

export async function POST (req: NextRequest){


    const {email, password}: RequestData = await req.json();
    const result = await signInFirebaseUser(email, password);


    if (result.status && typeof result.message !== 'string'){
        const accessToken = await result.message.getIdToken(true);

        const cookiesStore = await cookies();
        cookiesStore.set('JWT',accessToken,{
            sameSite:'none',
            secure: true
        });



        const decodedJWT = jose.decodeJwt(accessToken);
        const userUID = decodedJWT.user_id;

        if (!userUID) {
            return NextResponse.json<BasicResponseData>({
                success: false,
                message: "UID not found in the token.",
            }, { status: 400 });
        }else {

            const userInfo = await getUserInfo(userUID);

            cookiesStore.set("userInfo", JSON.stringify(userInfo), {
                sameSite: "none",
                secure: true,
                httpOnly: false,

            });


            return NextResponse.json<SuccessResponseData>({
                success: result.status,
                userInfo: userInfo
            },{
                status: 200
            })

        }
    }else if (!result.status && typeof result.message === 'string') {
        return NextResponse.json<BasicResponseData>({
            success: result.status,
            message: result.message
        },{
            status: 401
        })

    }

}
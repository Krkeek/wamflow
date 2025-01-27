import {NextRequest, NextResponse} from "next/server";


import {cookies} from "next/headers";
import signInFirebaseUser from "@/server/utils/signInFirebaseUser";


type RequestData = {
    email:string,
    password:string
}

type SuccessResponseData = {
    status: boolean,
    accessToken: string,
}
type FailResponseData = {
    status: boolean,
    message: string
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


        return NextResponse.json<SuccessResponseData>({
            status: result.status,
            accessToken: accessToken,
        },{
            status: 200
        })

    }else if (!result.status && typeof result.message === 'string') {
        return NextResponse.json<FailResponseData>({
            status: result.status,
            message: result.message
        },{
            status: 401
        })

    }

}
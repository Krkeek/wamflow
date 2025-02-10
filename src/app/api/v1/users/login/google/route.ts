import {NextRequest, NextResponse} from "next/server";
import {signInWithGoogle} from "@/server/utils/signInWithGoogle";


type SuccessData = {
    status: boolean;
    user: any
    accessToken?: string;
}

type FailData =  {
    status: boolean;
    message: string;
}


type ResponseBody = {
    status: boolean,
    message: any,
    additionalInformation: any
}


export async function POST (req: NextRequest) {


    return NextResponse.json<ResponseBody>({
        status: true,
        message: " ",
        additionalInformation: " "

    },{
        status: 200
    })

}
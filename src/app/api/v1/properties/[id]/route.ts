import {NextRequest} from "next/server";
import {Property} from "@/server/models/Property";

type POSTRequestData = {
    properties: Property[];
}
export async function GET (req: NextRequest) {


}


export async function POST (req: NextRequest) {
    try {
        const requestData: POSTRequestData = await req.json();




    }catch (e){

    }


}

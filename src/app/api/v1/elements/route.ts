import {NextRequest, NextResponse} from "next/server";
import {verifyAuth} from "@/server/utils/verifyAuth";
import {db} from "@/server/utils/mongoDB";
import {BasicResponseData} from "@/app/api/type";
import {GETResponseData, POSTRequestDataSchema} from "@/app/api/v1/elements/types";
import {WamElement} from "@/server/models/Element";

export async function GET (req: NextRequest) {

    try {
        const isAuthenticated = await verifyAuth(req);
        if (isAuthenticated instanceof NextResponse) {
            return isAuthenticated;
        }

        const userUID = isAuthenticated.decodedJWT.user_id;

        if (!userUID) {
            return NextResponse.json<BasicResponseData>({
                success: false,
                message: "UID not found in the token.",
            }, { status: 400 });
        }


        const collection = db.collection('WamElements');
        const userElements: WamElement[] = await collection
            .find({ userUID })
            .project<Exclude<WamElement, '_id'>>({ _id: 0 })
            .toArray();

        if (userElements.length === 0) {
            return NextResponse.json<BasicResponseData>({
                success: false,
                message: "No Elements found for the user.",
            }, { status: 404 });
        }
        return NextResponse.json<GETResponseData>({
            success: true,
            message: "Properties are fetched successfully.",
            elements: userElements,
        }, { status: 200 });


    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json<BasicResponseData>({
            success: false,
            message: "Error while fetching the properties.",
            data: error.message,
        }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const isAuthenticated = await verifyAuth(req);

        if (isAuthenticated instanceof NextResponse) {
            return isAuthenticated;
        }

        const body = await req.json();
        const validatedData = POSTRequestDataSchema.parse(body);
        const collection = db.collection('WamElements');
        await collection.insertOne(validatedData.element);

        return NextResponse.json<BasicResponseData>({
            success: true,
            message: "WamElement is saved successfully.",
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json<BasicResponseData>({
            success: false,
            message: "Error while saving the WamElement.",
            data: error.message,
        }, { status: 500 });
    }
}
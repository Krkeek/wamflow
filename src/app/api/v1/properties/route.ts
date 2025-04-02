import {NextRequest, NextResponse} from "next/server";
import {GETResponseData, POSTRequestDataSchema} from "@/app/api/v1/properties/types";
import {db} from "@/server/utils/mongoDB";
import {verifyAuth} from "@/server/utils/verifyAuth";
import {BasicResponseData} from "@/app/api/type";
import {Property} from "@/server/models/Property";
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


        const collection = db.collection('properties');
        const userProperties: Property[] = await collection
            .find({ userUID })
            .project<Exclude<Property, '_id'>>({ _id: 0 })
            .toArray();

        if (userProperties.length === 0) {
            return NextResponse.json<BasicResponseData>({
                success: false,
                message: "No properties found for the user.",
            }, { status: 404 });
        }
        return NextResponse.json<GETResponseData>({
            success: true,
            message: "Properties are fetched successfully.",
            properties: userProperties,
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
        const collection = db.collection('properties');

        for (const property of validatedData.properties) {
            await collection.insertOne(property);
        }

        return NextResponse.json<BasicResponseData>({
            success: true,
            message: "Properties are saved successfully.",
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json<BasicResponseData>({
            success: false,
            message: "Error while saving the properties.",
            data: error.message,
        }, { status: 500 });
    }
}
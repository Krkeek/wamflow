import {NextRequest, NextResponse} from "next/server";
import {BasicResponseData} from "@/app/api/type";
import {verifyAuth} from "@/server/utils/verifyAuth";
import {db} from "@/server/utils/mongoDB";
import {Graph} from "@/server/models/Graph";


export async function POST(req: NextRequest) {
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

        const body = await req.json();
        const newGraph: Graph = {
            userId: userUID,
            graphData: body.graph,
            elementSelected: body.elementSelected,
            linkSelected: body.linkSelected,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const collection = db.collection('graphs');
        const existingGraph = await collection.findOne({ userId: userUID });


        if (existingGraph) {
            const updatedGraph = await collection.updateOne(
                { userId: userUID },
                {
                    $set: {
                        graphData: body.graph,
                        elementSelected: body.elementSelected,
                        linkSelected: body.linkSelected,
                        updatedAt: new Date().toISOString(),
                    },
                }
            );
            if (updatedGraph.modifiedCount > 0) {
                return NextResponse.json<BasicResponseData>({
                    success: true,
                    message: "Graph saved successfully",
                }, { status: 200 });
            } else {
                return NextResponse.json<BasicResponseData>({
                    success: false,
                    message: "Error while saving the graph",
                }, { status: 400 });

            }
        }

        await collection.insertOne(newGraph);
        return NextResponse.json<BasicResponseData>({
            success: true,
            message: `Graph saved successfully`,
        }, { status: 200 });

    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json<BasicResponseData>({
            success: false,
            message: "Error while saving the graph.",
            data: error.message,
        }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {

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

        const collection = db.collection('graphs');
        const existingGraph: any = await collection.findOne(
            { userId: userUID },
            { projection: { graphData: 1, elementSelected: 1, linkSelected: 1 } }
        );
        if (existingGraph) {
            const { graphData, elementSelected, linkSelected } = existingGraph;
            return NextResponse.json<BasicResponseData>({
                success: true,
                message: ``,
                data: { elementSelected, graph: graphData, linkSelected: linkSelected },
            }, { status: 200 });
        }
        else {
            return NextResponse.json<BasicResponseData>({
                success: true,
                message: ``,
            }, { status: 200 });
        }


    }
    catch (error: any) {
        console.log(error);
        return NextResponse.json<BasicResponseData>({
            success: false,
            message: "Error while loading the graph.",
            data: error.message,
        }, { status: 500 });
    }
}
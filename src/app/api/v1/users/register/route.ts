import {NextRequest, NextResponse} from "next/server";
import {validPassword} from "@/server/utils/validPassword";
import createFirebaseUser from "@/server/utils/createFirebaseUser";
import {cookies} from "next/headers";
import {buildUserObject} from "@/server/utils/ObjectBuilder";
import {deleteFirebaseUser} from "@/server/utils/deleteFirebaseUser";
import {db} from "@/server/utils/mongoDB";
import {POSTRequestDataSchema, POSTResponseData} from "@/app/api/v1/users/register/types";


export async function POST (req: NextRequest) {

    const body = await req.json();
    const validatedData = POSTRequestDataSchema.parse(body);

    const { hasUpperCase, hasNumber ,validLength} = validPassword(validatedData.password);

    if (!hasUpperCase || !hasNumber || !validLength){
        return NextResponse.json<POSTResponseData>({
            success: false,
            message: `Invalid password`,
            data: [`${!hasUpperCase ? "Minimum one uppercase, ": ""}${!hasNumber ? "Minimum one number, " : ""}${!validLength ? "Between 8 and 25 character": ""}`]

        },{
            status: 400
        })
    }
    else {
        //create firebase user
        const result: POSTResponseData  = await createFirebaseUser(validatedData.email,validatedData.password);
        if (!result.success){
            return NextResponse.json<POSTResponseData>({
                success: false,
                message: result.message,
            },{
                status: 400
            })

        }
        else {
            const cookiesStore = await cookies();
            cookiesStore.set('JWT', result.data.JWT, {
                sameSite: 'none',
                secure: true
            });

            const userUID = result.data.decodedJWT.user_id;
            //Create User (model)
            const userData = {
                uid: userUID,
                name: validatedData.name,
                email: validatedData.email
            }

            const user = buildUserObject(userData);

            //Create user for MongoDB

            try {
                const collection = db.collection('users');
                const result = await collection.insertOne(user);
                const responseBody: POSTResponseData = {
                    success: true,
                    message: "User created.",
                    data: result.insertedId
                }
                return NextResponse.json<POSTResponseData>(responseBody, {
                    status: 200
                })

            } catch (error) {
                await deleteFirebaseUser()
                const responseBody: POSTResponseData = {
                    success: false,
                    message: "Adding User Failed in MongoDB.",
                    data: [error]
                }
                return NextResponse.json<POSTResponseData>(responseBody, {
                    status: 500
                })
            }


        }


    }


}
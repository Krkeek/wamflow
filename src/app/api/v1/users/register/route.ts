import {NextRequest, NextResponse} from "next/server";
import {validPassword} from "@/server/utils/validPassword";
import createFirebaseUser from "@/server/utils/createFirebaseUser";
import {cookies} from "next/headers";
import {buildUserObject} from "@/server/utils/buildUserObject";
import {deleteFirebaseUser} from "@/server/utils/deleteFirebaseUser";
import {db} from "@/server/utils/mongoConnect";


type RequestBody = {
    name: string,
    email: string,
    password: string
}

type ResponseBody = {
    status: boolean,
    message: string,
    additionalInformation: any
}


export async function POST (req: NextRequest) {

    const { name, email, password}: RequestBody = await req.json();

    //Validate Password
    const { hasUpperCase, hasNumber ,validLength} = validPassword(password);

    if (!hasUpperCase || !hasNumber || !validLength){
        return NextResponse.json<ResponseBody>({
            status: false,
            message: `Invalid password`,
            additionalInformation: [`${!hasUpperCase ? "Minimum one uppercase, ": ""}${!hasNumber ? "Minimum one number, " : ""}${!validLength ? "Between 8 and 25 character": ""}`]

        },{
            status: 400
        })
    }
    else {
        //create firebase user
        const result = await createFirebaseUser(email,password);
        if (!result.status){
            return NextResponse.json<ResponseBody>({
                status: false,
                message: result.message,
                additionalInformation: null
            },{
                status: 400
            })

        }
        else {
            const cookiesStore = cookies();
            cookiesStore.set('JWT', result.message, {
                sameSite: 'none',
                secure: true
            });

            //Create User (model)
            const userData = {
                uid: result.message,
                name: name,
                email: email
            }

            const user = buildUserObject(userData);

            //Create user for MongoDB

            try {
                const collection = db.collection('users');
                const result = await collection.insertOne(user);
                console.log(result);
                const responseBody: ResponseBody = {
                    status: true,
                    message: "User created.",
                    additionalInformation: result.insertedId
                }
                return NextResponse.json<ResponseBody>(responseBody, {
                    status: 200
                })

            } catch (error) {
                await deleteFirebaseUser()
                const responseBody: ResponseBody = {
                    status: false,
                    message: "Adding User Failed in MongoDB.",
                    additionalInformation: [error]
                }
                return NextResponse.json<ResponseBody>(responseBody, {
                    status: 500
                })
            }


        }


    }


}
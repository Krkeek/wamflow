import { NextRequest, NextResponse } from 'next/server';
import { getFirebasePublicKeys } from "@/server/utils/getFirebasePublicKey";
import {verifyToken} from "@/middleware";
import * as jose from 'jose'


export const verifyAuth = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({
                success: false,
                message: "Authorization header missing or invalid.",
            }, { status: 401 });
        }

        const JWT = authHeader.substring(7);
        let decodedJWT: any = null;

        const publicKeys = await getFirebasePublicKeys();

        let isVerified = false;

        for (const publicKey in publicKeys) {
            isVerified = await verifyToken(JWT, publicKeys[publicKey]);
            if (isVerified) {
                break;
            }
        }
        decodedJWT = await jose.decodeJwt(JWT);
        return { JWT, decodedJWT };

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error during token verification.",
            data: error.message,
        }, { status: 500 });
    }
};

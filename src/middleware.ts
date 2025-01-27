import { NextRequest, NextResponse } from 'next/server';
import {cookies} from "next/headers";
import * as jose from 'jose'
import {getFirebasePublicKeys} from "@/server/utils/getFirebasePublicKey";


export async function middleware(request: NextRequest){

    const JWT = (await cookies()).get('JWT')?.value;

    if (JWT !== undefined){
        const result = await getFirebasePublicKeys();
        let isVerified = false;
        for(const publicKey in result){
            console.log("Now we are verifying:")
            console.log(publicKey)
            isVerified = await verifyToken(JWT, result[publicKey]);
            if (isVerified){
                break
            }
        }
        if (!isVerified){
            if (request.nextUrl.pathname.startsWith('/homePage')) {
                return (NextResponse.redirect(new URL('/',request.url)));
            }
        }else {
            if (request.nextUrl.pathname === '/') {
                return (NextResponse.redirect(new URL('/homePage',request.url)));
            }
        }

    }else {
        console.log('JWT is undefined');
        if (request.nextUrl.pathname.startsWith('/homePage')) {
            return (NextResponse.redirect(new URL('/',request.url)));
        }
    }
}
async function verifyToken(token: string, publicKey: string) {
    try {
        const alg = 'RS256';
        const ecPublicKey = await jose.importX509(publicKey, alg);
        const decoded = await jose.jwtVerify(token, ecPublicKey);
        console.log('JWT token is verified');
        return true
        // You can return or do something else with the decoded token
    } catch (error: any) {
        console.log(error);

        if (error.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED'){
            console.log('Change the public Key!')
        }


        return false
    }

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};


import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import redis from "@/server/utils/redis";
import {POSTResponseData} from "@/app/api/v1/auth/blacklist/type";

export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies()
        const JWT = cookieStore.get('JWT')?.value;

        if (!JWT) {
            return NextResponse.json({ message: 'No JWT provided' }, { status: 400 });
        }

        await redis?.set(`blacklist:${JWT}`, 'blacklisted', 'EX', 3600 * 24 * 7); // Expires in 1 week
        cookieStore.set('JWT', '', { expires: new Date(0) })
        cookieStore.delete('userInfo')

        return NextResponse.json<POSTResponseData>({
            success: true,
            message: 'Logged out and token blacklisted successfully'
        }, {
            status: 200
        })

    } catch (error: any) {

        return NextResponse.json<POSTResponseData>({
            success: false,
            message: 'Error during logout',
            data: error.message,
        }, {
            status: 404
        })

    }
}
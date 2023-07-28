import { NextResponse } from 'next/server';
import cookie from "cookie";

export async function POST(req: Request, res: Response) {

    return new NextResponse(undefined, {
        status: 200,
        headers: {
            'Set-Cookie': cookie.serialize('connect.sid', "", {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                expires: new Date(0),
                path: '/',
            })
        }
    })
};
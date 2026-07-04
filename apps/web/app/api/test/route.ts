import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";

export async function GET(request: NextRequest){
    console.log("REQUEST--->", request.nextUrl.pathname)
    try {
        const data = await prisma.user.findMany()
        return NextResponse.json({data})
    } catch (error) {
        console.error("ERROR--->", error)
        return NextResponse.json({ message: "Something went wrong" });
    }
}
import { NextRequest, NextResponse } from "next/server";
import { getUploadUrl } from "@/lib/s3";

export async function GET(request: NextRequest){
    try {
        const url = await getUploadUrl
    } catch (error) {
        
    }
}
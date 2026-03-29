import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();

    await client.user.create({
        data: {
            username: data.username,
            password: data.password
        }
    })

    return NextResponse.json({
        message: "You have signed up"
    })
}
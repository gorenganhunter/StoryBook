import Users from "@/controllers/user";
import { NextRequest, NextResponse } from "next/server";

const userInstance = Users.getInstances();

export async function GET(req: NextRequest) {
    const user = await userInstance.authRequest(req)
    if(!user) return NextResponse.json({msg: "Invalid Authentication."}, { status: 401 })

    const id = req.nextUrl.pathname.split("/")[3]

    const page = req.nextUrl.searchParams.get("page")
    const limit = 5
    const bookmarks = await userInstance.getBookmarks(id, page ? parseInt(page) : 1, limit)

    return NextResponse.json({ bookmarks })
}

export async function POST(req: NextRequest) {
    const user = await userInstance.authRequest(req)
    if(!user) return NextResponse.json({msg: "Invalid Authentication."}, { status: 401 })

    const id = req.nextUrl.pathname.split("/")[3]

    const status = await userInstance.createBookmark(user._id.toString(), id)
    if (status !== 200) return NextResponse.json({ msg: "Failed" }, { status: 500 })

    return NextResponse.json({ msg: "Success!" })
}

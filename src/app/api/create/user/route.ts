import { type NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../../../../server/db";

export async function GET(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - Kind Auth User not found" },
        { status: 401 },
      );
    }
    const isUserExist = await prisma.user.findUnique({
      where: {
        kindUserId: user.id,
      },
    });
    if (isUserExist) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    const newUser = await prisma.user.create({
      data: {
        kindUserId: user.id,
        email: user?.email ?? "",
        name: `${user?.given_name} ${user?.family_name}`,
        profilePic: user?.picture ?? "",
      },
    });
    if (newUser) {
      return NextResponse.redirect(new URL("/", req.url));
      // return NextResponse.redirect(new URL("/onboarding", req.url));
    }
    return NextResponse.json(
      { error: "Error in creating user" },
      { status: 500 },
    );
  } catch (e: unknown) {
    console.log("Error in create user route", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

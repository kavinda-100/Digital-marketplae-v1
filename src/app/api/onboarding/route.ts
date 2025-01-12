import { type NextRequest, NextResponse } from "next/server";
import { onBoardingSchema } from "../../../zod/onBoarding";
import { zodIssueError } from "@/zod";
import { prisma } from "../../../server/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    // get body from request
    const body: unknown = await req.json();
    console.log("POST onboarding data arrived", body);
    // check the user is authenticated
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    // if a user is not authenticated, return 401
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // validate body
    const validatedData = onBoardingSchema.safeParse(body);
    console.log("POST onboarding data validated", validatedData);
    //* if data is not valid, return 400
    if (!validatedData.success) {
      return NextResponse.json(
        { error: zodIssueError(validatedData.error.errors) },
        { status: 400 },
      );
    }
    // if data is valid, create onboarding
    const onboarding = await prisma.onBoarding.create({
      data: {
        kindUserId: user.id,
        role: validatedData.data.role,
        city: validatedData.data.city,
        state: validatedData.data.state,
        country: validatedData.data.country,
        zip: validatedData.data.zip,
      },
    });
    console.log("POST onboarding created", onboarding);
    // if onboarding is not created, return 500
    if (!onboarding) {
      return NextResponse.json(
        { error: "Error occur when creating onboarding" },
        { status: 500 },
      );
    }
    // add the user to basic plan/subscriptions
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );

    const plan = await prisma.subscription.create({
      data: {
        kindUserId: user.id,
        plan: "basic",
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
    // if plan is not created, return 500
    if (!plan) {
      return NextResponse.json(
        { error: "Error occur when creating subscription" },
        { status: 500 },
      );
    }
    // if everything is successful,
    // revalidate the homepage
    revalidatePath("/", "page");
    // return success
    return NextResponse.json(
      { message: "Onboarding is successfully created" },
      { status: 201 },
    );
  } catch (e: unknown) {
    console.log("Error POST onboarding", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

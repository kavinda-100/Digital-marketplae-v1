import { type NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProductSchema } from "../../../zod/seller";
import { zodIssueError } from "../../../zod";
import { prisma } from "../../../server/db";

export async function POST(req: NextRequest) {
  try {
    // get data from a client
    const body: unknown = await req.json();
    console.log("data from client", body);
    // check if the user is authenticated
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // validate the data
    const validatedData = ProductSchema.safeParse(body);
    console.log("validated data", validatedData);
    // if the data is invalid, return an error
    if (!validatedData.success) {
      return NextResponse.json(
        { message: zodIssueError(validatedData.error.errors) },
        { status: 400 },
      );
    }
    // create a product
    const newProduct = await prisma.product.create({
      data: {
        sellerId: user.id,
        name: validatedData.data.name,
        shortDescription: validatedData.data.shortDescription,
        longDescription: validatedData.data.longDescription,
        price: Number(validatedData.data.price),
        productType: validatedData.data.productType,
        productUrl: validatedData.data.productUrl,
      },
    });
    // if product not created, return an error
    if (!newProduct) {
      return NextResponse.json(
        { message: "Error creating product" },
        { status: 500 },
      );
    }
    console.log("new product created", newProduct);
    // add the thumbnail urls
    await Promise.all([
      validatedData.data.thumbnailUrls.map(async ({ url, key }) => {
        await prisma.thumbnail.create({
          data: {
            productId: newProduct.id,
            url,
            key,
          },
        });
      }),
    ]);
    // return a success message
    return NextResponse.json({ message: "Product created" }, { status: 201 });
  } catch (e: unknown) {
    console.log("Error in POST /api/product", e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

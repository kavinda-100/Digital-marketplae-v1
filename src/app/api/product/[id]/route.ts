import { type NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProductSchema } from "../../../../zod/seller";
import { zodIssueError } from "../../../../zod";
import { prisma } from "../../../../server/db";
import { revalidatePath } from "next/cache";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body: unknown = await req.json();
    const id = (await params).id;
    console.log("params id", id);
    console.log("body arrived", body);
    // if params.id is not a provided, return an error
    if (!id) {
      return NextResponse.json(
        { error: "Invalid Product ID" },
        { status: 400 },
      );
    }
    // check if the user is authenticated
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // validate the request body
    const validatedBody = ProductSchema.safeParse(body);
    // if the body is invalid, return an error
    if (!validatedBody.success) {
      return NextResponse.json(
        { error: zodIssueError(validatedBody.error.errors) },
        { status: 400 },
      );
    }
    // check if the product exists
    const oldProduct = await prisma.product.findUnique({ where: { id } });
    // if the product does not exist, return an error
    if (!oldProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    // update the product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        sellerId: user.id,
        name: validatedBody.data.name,
        shortDescription: validatedBody.data.shortDescription,
        longDescription: validatedBody.data.longDescription,
        price: Number(validatedBody.data.price),
        productType: validatedBody.data.productType,
        productUrl: validatedBody.data.productUrl,
      },
    });
    // if the product is not updated, return an error
    if (!updatedProduct) {
      return NextResponse.json(
        { error: "An error occurred while updating the product" },
        { status: 500 },
      );
    }
    // delete the old thumbnail
    await prisma.thumbnail.deleteMany({ where: { productId: id } });
    // create the new thumbnail
    await Promise.all([
      validatedBody.data.thumbnailUrls.map(async ({ url, key }) => {
        await prisma.thumbnail.create({
          data: {
            url,
            key,
            productId: id,
          },
        });
      }),
    ]);
    // revalidate the product
    revalidatePath("/", "layout");
    // return the success response
    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 },
    );
  } catch (e: unknown) {
    console.log("Error in PATCH /api/product/%5Bid%5D/route.ts", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;
    console.log("params id", id);
    // if params.id is not a provided, return an error
    if (!id) {
      return NextResponse.json(
        { error: "Invalid Product ID" },
        { status: 400 },
      );
    }
    // check if the user is authenticated
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // check if the product exists
    const product = await prisma.product.findUnique({ where: { id } });
    // if the product does not exist, return an error
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    console.log("product", product);
    // delete the product
    const deletedProduct = await prisma.product.delete({ where: { id } });
    // if the product is not deleted, return an error
    if (!deletedProduct) {
      return NextResponse.json(
        { error: "An error occurred while deleting the product" },
        { status: 500 },
      );
    }
    console.log("deletedProduct", deletedProduct);
    // delete the thumbnail
    await prisma.thumbnail.deleteMany({ where: { productId: id } });
    // revalidate the product
    revalidatePath("/", "layout");
    // return the success response
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (e: unknown) {
    console.log("Error in DELETE /api/product/%5Bid%5D/route.ts", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

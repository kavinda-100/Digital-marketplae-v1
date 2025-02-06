import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import redirectPage from "../../pages/RedirectPage";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { prisma } from "../../server/db";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { randomLetter } from "../../lib/utils";
import ShippingDetails from "./ShippingDetails";
import DeleteAccount from "./DeleteAccount";

async function getUserShippingAddress(userId: string) {
  try {
    const shippingAddress = await prisma.onBoarding.findFirst({
      where: {
        kindUserId: userId,
      },
      select: {
        city: true,
        country: true,
        state: true,
        zip: true,
      },
    });
    if (!shippingAddress) {
      return null;
    }
    return {
      city: shippingAddress.city,
      country: shippingAddress.country,
      state: shippingAddress.state,
      zip: shippingAddress.zip,
    };
  } catch (e: unknown) {
    console.log("Error while fetching user shipping address", e);
    return null;
  }
}

const ProfilePage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirectPage();
  }
  const shippingAddress = await getUserShippingAddress(user.id);
  return (
    <section className={"container mx-auto p-2"}>
      <Card className={"mx-auto max-w-6xl"}>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={"flex flex-col space-y-3"}>
            <Label>Profile Picture</Label>
            <Avatar>
              <AvatarImage src={user.picture ?? ""} />
              <AvatarFallback>
                {user.given_name?.charAt(0) ?? randomLetter()}
              </AvatarFallback>
            </Avatar>
            <Label>Email</Label>
            <Input disabled value={user.email ?? ""} />
            <Label>First Name</Label>
            <Input disabled value={user.given_name ?? ""} />
            <Label>Last Name</Label>
            <Input disabled value={user.family_name ?? ""} />
            <Label>Username</Label>
            <Input disabled value={user.username ?? ""} />
            <Label>Phone Number</Label>
            <Input disabled value={user.phone_number ?? ""} />
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <ShippingDetails
            city={shippingAddress?.city}
            country={shippingAddress?.country}
            state={shippingAddress?.state}
            zip={shippingAddress?.zip}
          />
        </CardContent>
        <CardFooter>
          <DeleteAccount />
        </CardFooter>
      </Card>
    </section>
  );
};
export default ProfilePage;

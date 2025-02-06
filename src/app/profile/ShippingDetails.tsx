"use client";

import React from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { updateOnBoarding } from "../../actions/userActions";

type ShippingDetailsProps = {
  city: string | undefined | null;
  country: string | undefined | null;
  state: string | undefined | null;
  zip: string | undefined | null;
};

const ShippingDetails = ({
  city,
  country,
  state,
  zip,
}: ShippingDetailsProps) => {
  const [form, setForm] = React.useState({
    city: city ?? "",
    country: country ?? "",
    state: state ?? "",
    zip: zip ?? "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => updateOnBoarding({ data: form }),
    onSuccess: () => {
      toast.success("Shipping details updated");
    },
    onError: (error) => {
      toast.error(error.message ?? "Error while updating shipping details");
    },
  });

  async function handleSubmit() {
    if (!form.city || !form.country || !form.state || !form.zip) {
      toast.error("Please fill all fields");
      return;
    }
    mutate();
  }
  return (
    <div className={"flex flex-col space-y-3"}>
      <Label>City</Label>
      <Input
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />
      <Label>State</Label>
      <Input
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
      />
      <Label>Country</Label>
      <Input
        value={form.country}
        onChange={(e) => setForm({ ...form, country: e.target.value })}
      />
      <Label>Zip Code</Label>
      <Input
        value={form.zip}
        onChange={(e) => setForm({ ...form, zip: e.target.value })}
      />

      <Button className={"w-fit"} onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};
export default ShippingDetails;

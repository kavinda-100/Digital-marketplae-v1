import { env } from "@/env";

export type PricingDetailType = {
  id: number;
  title: string;
  price: number;
  isMostPopular: boolean;
  features: {
    name: string;
  }[];
  type: "basic" | "pro" | "enterprise";
  link: string;
};

export const PricingDetails: PricingDetailType[] = [
  {
    id: 1,
    title: "Basic",
    price: 0,
    isMostPopular: false,
    features: [
      { name: "1 User" },
      { name: "Basic Support" },
      { name: "3 products can be sold" },
      { name: "No Customization" },
      { name: "No Refund Policy" },
      { name: "Community support" },
      { name: "Standard Stripe processing" },
      { name: "1GB file storage" },
    ],
    type: "basic",
    link: "#",
  },
  {
    id: 2,
    title: "Pro",
    price: 29.99,
    isMostPopular: true,
    features: [
      { name: "Up to 5 Users" },
      { name: "Priority Support" },
      { name: "Unlimited products can be sold" },
      { name: "Custom Branding" },
      { name: "Flexible Refund Policy" },
      { name: "Exclusive webinars" },
      { name: "Stripe advanced features" },
      { name: "10GB file storage" },
      { name: "Advanced sales insights" },
    ],
    type: "pro",
    link: env.NEXT_PUBLIC_STRIPE_MONTHLY_PRO_LINK,
  },
  {
    id: 3,
    title: "Enterprise",
    price: 99.99,
    isMostPopular: false,
    features: [
      { name: "Unlimited Users" },
      { name: "24/7 Support" },
      { name: "Unlimited products can be sold" },
      { name: "Full Customization" },
      { name: "No transaction fees" },
      { name: "Personal account manager" },
      { name: "Custom Stripe integration" },
      { name: "Unlimited file storage" },
      { name: "Advanced analytics and marketing tools" },
    ],
    type: "enterprise",
    link: env.NEXT_PUBLIC_STRIPE_MONTHLY_ENTERPRISE_LINK,
  },
];

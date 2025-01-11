type SingleProductPageProps = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  thumbnail: {
    url: string;
    key: string;
  }[];
  productType: "TEMPLATES" | "UIKITS" | "ICONS";
  productUrl?: string;
  kindUserId?: string;
};

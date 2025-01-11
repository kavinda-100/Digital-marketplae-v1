export const DomainURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `${process.env.DOMAIN_NAME}`;

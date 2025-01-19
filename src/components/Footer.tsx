import React from "react";
import Link from "next/link";

const services = [
  { name: "Web Design", href: "#" },
  { name: "Development", href: "#" },
  { name: "Digital Marketing", href: "#" },
  { name: "SEO Services", href: "#" },
];

const aboutUs = [
  { name: "Our Team", href: "#" },
  { name: "Our Mission", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Testimonials", href: "#" },
];

const support = [
  { name: "Contact Us", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

const followUs = [
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
];

const comunity = [
  { name: "Blog", href: "#" },
  { name: "Forum", href: "#" },
  { name: "Newsletter", href: "#" },
  { name: "Podcast", href: "#" },
];

const Footer = () => {
  return (
    <footer className="container mx-auto bg-background py-8">
      <div className="w-full px-4">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Digital <span className="text-primary">Hub</span>
        </h1>

        <div className="mb-6 flex w-full flex-col justify-evenly md:flex-row">
          <div className="mb-4 flex-1 md:mb-0">
            <h2 className="text-lg font-semibold">Services</h2>
            <ul className="mt-2 space-y-1">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="opacity-60 hover:text-primary hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4 flex-1 md:mb-0">
            <h2 className="text-lg font-semibold">About Us</h2>
            <ul className="mt-2 space-y-1">
              {aboutUs.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="opacity-60 hover:text-primary hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4 flex-1 md:mb-0">
            <h2 className="text-lg font-semibold">Support</h2>
            <ul className="mt-2 space-y-1">
              {support.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="opacity-60 hover:text-primary hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4 flex-1 md:mb-0">
            <h2 className="text-lg font-semibold">Support</h2>
            <ul className="mt-2 space-y-1">
              {comunity.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="opacity-60 hover:text-primary hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold">Follow Us</h2>
            <ul className="mt-2 space-y-1">
              {followUs.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="opacity-60 hover:text-primary hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="mb-2 text-sm">
            All rights reserved &copy; {new Date().getFullYear()} Digital Hub
          </p>
          <p className="text-sm">
            Developed by{" "}
            <span className="font-mono font-bold text-primary/80">
              Kavinda Rathnayake
            </span>
            <br />
            More projects on{" "}
            <Link
              href="https://github.com/kavinda-100"
              className="font-medium underline hover:text-primary"
            >
              GitHub.com
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

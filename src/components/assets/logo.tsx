"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Logo() {
  return (
    <>
      <Link className="logo lg:w-[15%] md:w-4/12 sm:w-[20%]" href="/">
        <Image
          src="/SB9 1.svg"
          alt="study buddy logo"
          className="w-full logo md:inline-block hidden"
          sizes="100vw"
          width={0}
          height={0}
          style={{ width: "100%", height: "100%" }}
        />
      </Link>
    </>
  );
}

export function AnalyticsImg() {
  return (
    <Image
      src="/wink.png"
      alt="advanced to english background image"
      className="w-full object-cover overflow-hidden rounded-xl"
      sizes="100vw"
      width={0}
      height={0}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function BannerLogo() {
  return (
    <>
      <Image
        src="/SB9-02.png"
        alt="study buddy logo"
        className="object-cover opacity-45"
        width={500}
        height={500}
      />
    </>
  );
}

export const MobileLogo = () => {
  return (
    <div className="relative">
      <Link href="/">
        <Image
          src="/SB9 5.svg"
          alt="sbd logo"
          width={40}
          height={40}
        />
      </Link>
    </div>
  );
};
export const VisibleMobileLogo = () => {
  return (
    <div className="relative">
      <Link href="/">
        <Image
          src="/SB9 5.svg"
          alt="sbd logo"
          className="inline-block"
          width={80}
          height={80}
        />
      </Link>
    </div>
  );
};

export const MobileLogo2 = () => {
  return (
    <div className="relative">
      <Link href="/">
        <Image
          src="/SB9 5.svg"
          alt="sbd logo"
          className="inline-block"
          width={40}
          height={40}
        />
      </Link>
    </div>
  );
};

export function LoginImage() {
  return (
    <Image
      src="/Lesson-rafiki.png"
      alt="advanced to english background image"
      className="w-full object-cover"
      sizes="100vw"
      width={0}
      height={0}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function StripeSuccess() {
  return (
    <Image
      src="/Successful-purchase-pana.svg"
      alt="advanced to english background image"
      className="w-full object-cover"
      sizes="100vw"
      width={0}
      height={0}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function MeetingTicket() {
  return (
    <Image
      src="/scheduling2.webp"
      alt="advanced to english background image"
      className="w-full object-contain"
      sizes="100vw"
      width={0}
      height={0}
      style={{ width: "60%", height: "60%" }}
    />
  );
}
export function LoginImage2() {
  return (
    <Image
      src="/Marketing-rafiki.svg"
      alt="become an affiliate with study buddy"
      className="w-full object-cover"
      sizes="100vw"
      width={0}
      height={0}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function SvgComponent3() {
  return (
    <>
      <Image
        src="/SB9-02.png"
        alt="Study buddy logo"
        className="w-full object-cover"
        sizes="100vw"
        width={0}
        height={0}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
}

export function NewSvgComponent() {
  return (
    <>
      <Image
        src="/Welcome-rafiki.svg"
        alt="Study buddy logo"
        className="w-full object-cover"
        sizes="100vw"
        width={0}
        height={0}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
}

export function StudentComponent() {
  return (
    <>
      <Image
        src="/Nerd-rafiki.png"
        alt="Study buddy logo"
        className="w-full object-cover"
        sizes="60%"
        width={0}
        height={0}
        style={{ width: "40%", height: "40%" }}
      />
    </>
  );
}

export function MobileStudentComponent() {
  return (
    <>
      <Image
        src="/Nerd-rafiki.png"
        alt="Study buddy logo"
        className="w-full object-cover"
        sizes="100%"
        width={0}
        height={0}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
}
export function RestrictedComponent() {
  return (
    <>
      <Image
        src="/restricted-rafiki.svg"
        alt="Study buddy logo"
        className="object-cover"
        width={500}
        height={400}
      />
    </>
  );
}

export function PendingComponent() {
  return (
    <>
      <Image
        src="/pending.png"
        alt="Study buddy logo"
        className="object-cover"
        width={500}
        height={400}
      />
    </>
  );
}

export function Unavailable() {
  return (
    <>
      <Image
        src="/503-Error-Service-Unavailable-rafiki.svg"
        alt="Study buddy logo"
        className="w-full object-cover"
        sizes="100vw"
        width={0}
        height={0}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
}

export function NotFoundImg() {
  return (
    <>
      <Image
        src="/not_found.png"
        alt="Study buddy logo"
        className="object-cover"
        sizes="60%"
        width={0}
        height={0}
        style={{ width: "40%", height: "40%" }}
      />
    </>
  );
}
export function MobileNotFoundImg() {
  return (
    <>
      <Image
        src="/not_found.png"
        alt="Study buddy logo"
        className="object-cover"
        sizes="60%"
        width={0}
        height={0}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
}
export function MobileNotFoundImg2() {
  return (
    <>
      <Image
        src="/not_found.png"
        alt="Study buddy logo"
        className="object-cover"
        sizes="50%"
        width={250}
        height={450}
      />
    </>
  );
}

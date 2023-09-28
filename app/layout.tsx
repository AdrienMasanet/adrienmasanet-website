"use client";

import "../styles/globals.scss";

import { Analytics } from "@vercel/analytics/react";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import React from "react";

import { LoadingCompleteProvider } from "../context/LoadingCompleteContext";

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <title>Adrien Masanet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Adrien Masanet, développeur polyvalent et passionné."
        />
        <meta name="author" content="Adrien Masanet" />
      </head>
      <body>
        <ReCaptchaProvider
          reCaptchaKey={
            process.env.NEXT_PUBLIC_RECAPTCHA_V3_PUBLIC_API_KEY as string
          }
        >
          <LoadingCompleteProvider>{children}</LoadingCompleteProvider>
        </ReCaptchaProvider>
        <Analytics />
      </body>
    </html>
  );
}

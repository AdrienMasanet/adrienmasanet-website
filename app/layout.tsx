"use client";

import "../styles/globals.scss";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function MainPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <title>Adrien Masanet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Adrien Masanet, développeur polyvalent et passionné." />
        <meta name="author" content="Adrien Masanet" />
      </head>
      <body>
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_V3_PUBLIC_API_KEY as string}>{children}</GoogleReCaptchaProvider>
      </body>
    </html>
  );
}

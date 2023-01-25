import "../styles/globals.scss";

export default function MainPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <title>Adrien Masanet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Adrien Masanet, développeur polyvalent et passionné." />
        <meta name="author" content="Adrien Masanet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

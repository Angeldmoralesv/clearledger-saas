import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "ClearLedger — Conciliación financiera automatizada",
  description:
    "ClearLedger cruza tus facturas de factoring contra tu ERP en minutos, marca cada partida como conciliada o en discrepancia, y elimina el cuadre manual de fin de mes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={plexMono.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700,900&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

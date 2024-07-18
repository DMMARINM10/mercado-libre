import { Suspense } from "react";
import "@/styles/globals.scss";
import SearchBar from "@/components/SearchBar";

export const metadata = {
  title: 'Mercado Libre',
  description: 'Buscador de Mercado Libre'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Suspense fallback={<></>}>
          <SearchBar />
          <main className="content">
            {children}
          </main>
        </Suspense>
      </body>
    </html>
  );
}

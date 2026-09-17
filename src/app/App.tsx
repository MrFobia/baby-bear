import { useState } from "react";
import ApoyoPsicologico from "../imports/ApoyoPsicologico/ApoyoPsicologico";
import PerfilAdminInscritas from "../imports/PerfilAdminInscritas/PerfilAdminInscritas";
import ProductosCatalogo from "../imports/Productos/ProductosCatalogo";
import ProductoDetalle from "../imports/Productos/ProductoDetalle";
import { registerNavigate, registerProductSlug, registerToggleLang, type Lang } from "./navigation";

type Page = "home" | "dashboard" | "productos" | "producto";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [productSlug, setProductSlug] = useState("pulsera-baby-bear");
  const [lang, setLang] = useState<Lang>("es");
  registerNavigate(setPage);
  registerProductSlug(setProductSlug);
  registerToggleLang(() => setLang(l => (l === "es" ? "en" : "es")));

  return (
    <div className="size-full">
      {page === "dashboard" ? (
        <PerfilAdminInscritas />
      ) : page === "productos" ? (
        <ProductosCatalogo lang={lang} />
      ) : page === "producto" ? (
        <ProductoDetalle slug={productSlug} lang={lang} />
      ) : (
        <ApoyoPsicologico />
      )}
    </div>
  );
}

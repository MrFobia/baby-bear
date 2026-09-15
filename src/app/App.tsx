import { useState } from "react";
import ApoyoPsicologico from "../imports/ApoyoPsicologico/ApoyoPsicologico";
import PerfilAdminInscritas from "../imports/PerfilAdminInscritas/PerfilAdminInscritas";
import ProductosCatalogo from "../imports/Productos/ProductosCatalogo";
import ProductoDetalle from "../imports/Productos/ProductoDetalle";
import { registerNavigate, registerProductSlug } from "./navigation";

type Page = "home" | "dashboard" | "productos" | "producto";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [productSlug, setProductSlug] = useState("pulsera-baby-bear");
  registerNavigate(setPage);
  registerProductSlug(setProductSlug);

  return (
    <div className="size-full">
      {page === "dashboard" ? (
        <PerfilAdminInscritas />
      ) : page === "productos" ? (
        <ProductosCatalogo />
      ) : page === "producto" ? (
        <ProductoDetalle slug={productSlug} />
      ) : (
        <ApoyoPsicologico />
      )}
    </div>
  );
}

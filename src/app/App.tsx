import { useState } from "react";
import ApoyoPsicologico from "../imports/ApoyoPsicologico/ApoyoPsicologico";
import PerfilAdminInscritas from "../imports/PerfilAdminInscritas/PerfilAdminInscritas";
import { registerNavigate } from "./navigation";

export default function App() {
  const [page, setPage] = useState<"home" | "dashboard">("home");
  registerNavigate(setPage);

  return (
    <div className="size-full">
      {page === "dashboard" ? <PerfilAdminInscritas /> : <ApoyoPsicologico />}
    </div>
  );
}

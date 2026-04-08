"use client";

import { useState } from "react";
import { C, font } from "@/lib/tokens";
import type { TabId } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { TabInicio } from "@/features/inicio/TabInicio";
import { TabOportunidades } from "@/features/oportunidades/TabOportunidades";
import { TabMiRubro } from "@/features/mi-rubro/TabMiRubro";
import { TabTransparencia } from "@/features/transparencia/TabTransparencia";
import { TabGestion } from "@/features/gestion/TabGestion";
import { TabCiudadania } from "@/features/ciudadania/TabCiudadania";
import { TabSectores } from "@/features/sectores/TabSectores";

export default function Page() {
  const [tab, setTab] = useState<TabId>("inicio");

  return (
    <div
      style={{
        fontFamily: font,
        background: C.bg,
        minHeight: "100vh",
        color: C.t1,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <Header onLogoClick={() => setTab("inicio")} />
      <NavBar activeTab={tab} onTabChange={setTab} />

      <main style={{ padding: "24px 32px", maxWidth: 1200, margin: "0 auto" }}>
        {tab === "inicio" && <TabInicio onNavigate={setTab} />}
        {tab === "oportunidades" && <TabOportunidades />}
        {tab === "mirubro" && <TabMiRubro />}
        {tab === "transparencia" && <TabTransparencia />}
        {tab === "gestion" && <TabGestion />}
        {tab === "ciudadania" && <TabCiudadania />}
        {tab === "sectores" && <TabSectores />}
      </main>

      <Footer />
    </div>
  );
}

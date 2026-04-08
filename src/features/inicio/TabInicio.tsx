"use client";

import { C, font, cardStyle, mono } from "@/lib/tokens";
import { Section } from "@/components/common/Section";
import { AnimNum } from "@/components/common/AnimNum";
import { FeatureCard } from "./FeatureCard";
import type { TabId } from "@/lib/types";

interface TabInicioProps {
  onNavigate: (tab: TabId) => void;
}

const heroStats = [
  { n: 57600, lbl: "Licitaciones en 2026", sfx: "" },
  { n: 2567, lbl: "Miles de millones transados", pfx: "$", sfx: "MM" },
  { n: 118400, lbl: "Proveedores activos", sfx: "" },
  { n: 850, lbl: "Organismos del Estado", sfx: "" },
];

const audiences = [
  { icon: "🏢", title: "Proveedores", color: C.teal, who: "Empresas y emprendedores que quieren vender al Estado" },
  { icon: "🔍", title: "Periodistas", color: "#E8593C", who: "Investigadores que fiscalizan el gasto público" },
  { icon: "🏛️", title: "Funcionarios", color: C.purple, who: "Gestores que quieren mejorar sus compras" },
  { icon: "👤", title: "Ciudadanos", color: C.blue, who: "Personas que quieren saber en qué se gasta" },
];

export function TabInicio({ onNavigate }: TabInicioProps) {
  return (
    <div style={{ fontFamily: font }}>
      {/* HERO */}
      <div style={{ textAlign: "center", padding: "48px 20px 40px" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 24,
            color: "#fff",
            marginBottom: 20,
            boxShadow: `0 8px 24px ${C.blue}30`,
          }}
        >
          MP
        </div>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: "0 0 10px",
            lineHeight: 1.15,
            color: C.t1,
          }}
        >
          Compras públicas de Chile,
          <br />
          explicadas con datos
        </h1>
        <p style={{ fontSize: 17, color: C.t2, maxWidth: 620, margin: "0 auto 28px", lineHeight: 1.6 }}>
          Más de $2.5 billones al año pasan por Mercado Público. Esta plataforma te muestra a dónde va ese
          dinero, quién lo gasta y cómo puedes participar — todo desde la API oficial de ChileCompra.
        </p>
        <button
          onClick={() => onNavigate("oportunidades")}
          style={{
            background: C.blue,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "14px 32px",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: font,
            boxShadow: `0 4px 14px ${C.blue}40`,
            transition: "transform 0.12s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
        >
          Ver oportunidades abiertas
        </button>
      </div>

      {/* STATS BAR */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
        {heroStats.map((s, i) => (
          <div key={i} style={{ ...cardStyle, textAlign: "center", padding: "20px 16px" }}>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: C.blue }}>
              <AnimNum target={s.n} prefix={s.pfx ?? ""} suffix={s.sfx ?? ""} />
            </div>
            <div style={{ fontSize: 12, color: C.t3, marginTop: 4, fontWeight: 500 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* PARA QUIÉN */}
      <Section title="¿Para quién es esta plataforma?" sub="Diseñada para cuatro audiencias con necesidades distintas">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
          {audiences.map((a, i) => (
            <div key={i} style={{ ...cardStyle, textAlign: "center", padding: "24px 18px" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{a.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: a.color }}>{a.title}</div>
              <div style={{ fontSize: 13, color: C.t3, lineHeight: 1.5 }}>{a.who}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* QUÉ PUEDES HACER */}
      <Section title="Qué puedes hacer" sub="Cada sección resuelve una pregunta concreta">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <FeatureCard icon="🎯" color={C.teal} title="Oportunidades" tag="Proveedores"
            desc="Licitaciones abiertas ahora mismo con filtros por rubro, región y monto. Encuentra negocios con el Estado en segundos."
            onClick={() => onNavigate("oportunidades")} />
          <FeatureCard icon="📊" color={C.teal} title="Mi Rubro" tag="Proveedores"
            desc="Elige tu categoría (salud, aseo, informática) y ve quién compra, cuánto se gasta, quién gana y a qué precios."
            onClick={() => onNavigate("mirubro")} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <FeatureCard icon="🔎" color="#E8593C" title="Transparencia" tag="Fiscalización"
            desc="Indicadores de riesgo: licitaciones con un solo oferente, tratos directos sin competencia, concentración de proveedores."
            onClick={() => onNavigate("transparencia")} />
          <FeatureCard icon="⚡" color={C.purple} title="Gestión" tag="Funcionarios"
            desc="Benchmarking entre organismos: días de adjudicación, tasas de desiertas, participación MiPyme."
            onClick={() => onNavigate("gestion")} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <FeatureCard icon="🏘️" color={C.blue} title="Mi Municipalidad" tag="Ciudadanía"
            desc="Busca tu comuna y conoce qué compra tu municipalidad, cuánto gasta y cuántas MiPymes participan."
            onClick={() => onNavigate("ciudadania")} />
          <FeatureCard icon="🏛️" color={C.gray} title="Sectores del Estado" tag="Exploración"
            desc="Vista panorámica por sector: Salud, Educación, Defensa, Obras Públicas, Municipalidades y Poder Judicial."
            onClick={() => onNavigate("sectores")} />
        </div>
      </Section>

      {/* FUENTE */}
      <div style={{ ...cardStyle, marginTop: 32, display: "flex", gap: 20, alignItems: "center" }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: C.green + "14",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            flexShrink: 0,
          }}
        >
          📡
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Datos en tiempo real desde la API oficial</div>
          <p style={{ fontSize: 14, color: C.t2, margin: 0, lineHeight: 1.55 }}>
            Toda la información proviene de la API de Mercado Público de ChileCompra (
            <span style={{ fontFamily: mono, fontSize: 12, color: C.blue }}>api.mercadopublico.cl</span>
            ). Los datos son públicos, gratuitos y se actualizan diariamente.
          </p>
        </div>
      </div>

      {/* CÓMO FUNCIONA */}
      <div style={{ marginTop: 32, marginBottom: 20 }}>
        <Section title="¿Cómo funciona?" sub="Tres capas de procesamiento para transformar datos crudos en información útil">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {[
              { step: "1", title: "Ingesta diaria", desc: "Un proceso automático consulta la API de Mercado Público cada noche y descarga licitaciones y órdenes de compra del día.", color: C.blue },
              { step: "2", title: "Enriquecimiento", desc: "Cada licitación se clasifica por sector, región y rubro. Se calculan métricas de competencia, concentración y tendencias.", color: C.teal },
              { step: "3", title: "Visualización", desc: "Los datos procesados alimentan dashboards interactivos diseñados para cada tipo de usuario y necesidad.", color: C.green },
            ].map((s, i) => (
              <div key={i} style={{ ...cardStyle, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 12, right: 16, fontSize: 48, fontWeight: 800, color: s.color, opacity: 0.08 }}>{s.step}</div>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: s.color + "14",
                    color: s.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 12,
                  }}
                >
                  {s.step}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: C.t2, margin: 0, lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
